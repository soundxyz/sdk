import type { Address, Chain, Hex, PublicClient } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../abi/super-minter'
import type { MerkleProvider, TransactionGasOptions } from '../../../utils/types'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { getTierCurrentMaxMintable } from './helpers'
import type { GetEditionContractInfoReturnType, SuperMinterSchedule } from './info'
import type { MintParameters } from '../../types'
import {
  MINT_FALLBACK_GAS_LIMIT,
  MINT_GAS_LIMIT_MULTIPLIER,
  NULL_ADDRESS,
  UINT32_MAX,
  scaleAmount,
} from '../../../utils/helpers'

export type GetTotalMintPriceAndFeesParams = {
  tier: number
  scheduleNum: number
  quantity: number
}

export type GetTotalMintPriceAndFeesReturnType = {
  // The required Ether value.
  // `subTotal + platformFlatFee`.
  total: bigint
  // The total price before any additive fees.
  subTotal: bigint
  // The price per token.
  unitPrice: bigint
  // The total platform fees.
  // `platformFlatFee + platformMintBPSFee`.
  platformFee: bigint
  // The total platform flat fees.
  // `platformTxFlatFee + platformMintFlatFee`.
  platformFlatFee: bigint
  // The platform per-transaction flat fees.
  platformTxFlatFee: bigint
  // The total platform per-token flat fees.
  platformMintFlatFee: bigint
  // The total platform per-token BPS fees.
  platformMintBPSFee: bigint
  // The total affiliate fees.
  affiliateFee: bigint
}

export async function getTotalMintPriceAndFees<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
  { tier, scheduleNum, quantity }: GetTotalMintPriceAndFeesParams,
): Promise<GetTotalMintPriceAndFeesReturnType> {
  return client.readContract({
    abi: SUPER_MINTER_ABI,
    address: SUPER_MINTER_ADDRESS,
    functionName: 'totalPriceAndFees',
    args: [editionAddress, tier, scheduleNum, quantity],
  })
}

export type GetPlatformFeesParams = {
  platform: Address
  tiers: number[]
}

export type GetPlatformFeesReturnType = {
  perTxFlat: bigint
  perMintFlat: bigint
  perMintBPS: number
  active: boolean
}[]

export async function getPlatformFees<Client extends Pick<PublicClient, 'multicall'>>(
  client: Client,
  { platform, tiers }: GetPlatformFeesParams,
): Promise<GetPlatformFeesReturnType> {
  return client.multicall({
    contracts: tiers.map((tier) => ({
      abi: SUPER_MINTER_ABI,
      address: SUPER_MINTER_ADDRESS,
      functionName: 'platformFeeConfig',
      args: [platform, tier],
    })),
    allowFailure: false,
  })
}

export type GetMintEligibilityParams = {
  tier: number
  scheduleNum: number
  collectorAddress: Address
}

export type GetMintEligibilityReturnType = {
  numberMintedOnSchedule: number
  remainingEligibility: number
}

export async function mintEligibility<Client extends Pick<PublicClient, 'multicall'>>(
  client: Client,
  { merkleProvider }: { merkleProvider: MerkleProvider },
  { editionAddress }: { editionAddress: Address },
  { tier, scheduleNum, collectorAddress }: GetMintEligibilityParams,
): Promise<GetMintEligibilityReturnType> {
  const [numberMintedOnSchedule, scheduleInfo, tierInfo] = await client.multicall({
    contracts: [
      {
        abi: SUPER_MINTER_ABI,
        address: SUPER_MINTER_ADDRESS,
        functionName: 'numberMinted',
        args: [editionAddress, tier, scheduleNum, collectorAddress],
      },
      {
        abi: SUPER_MINTER_ABI,
        address: SUPER_MINTER_ADDRESS,
        functionName: 'mintInfo',
        args: [editionAddress, tier, scheduleNum],
      },
      {
        abi: SOUND_EDITION_V2_ABI,
        address: editionAddress,
        functionName: 'tierInfo',
        args: [tier],
      },
    ],
    allowFailure: false,
  })

  const { paused, mode, maxMintable, minted, maxMintablePerAccount } = scheduleInfo

  if (paused) {
    return {
      numberMintedOnSchedule,
      remainingEligibility: 0,
    }
  }

  const tierCurrentMax = tierInfo.mintConcluded ? 0 : Math.max(getTierCurrentMaxMintable(tierInfo) - tierInfo.minted, 0)

  const availableOnSchedule = maxMintable - minted
  const remainingPerAccountLimit = maxMintablePerAccount - numberMintedOnSchedule
  const remainingEligibility = Math.min(availableOnSchedule, remainingPerAccountLimit, tierCurrentMax)

  // default
  if (mode === 0) {
    return {
      numberMintedOnSchedule,
      remainingEligibility,
    }
  }

  // merkle
  if (mode === 1) {
    const { merkleRoot } = scheduleInfo

    const proof = await merkleProvider.merkleProof({ merkleRoot, userAddress: collectorAddress })

    if (!proof?.length) {
      return {
        numberMintedOnSchedule,
        remainingEligibility: 0,
      }
    }
    return {
      numberMintedOnSchedule,
      remainingEligibility,
    }
  } else if (mode === 2) {
    throw new Error('Not implemented')
  } else {
    throw new Error('Unknown minting mode')
  }
}

export interface MintTieredEditionArgs extends TransactionGasOptions {
  tier: GetEditionContractInfoReturnType['tierInfo'][number]
  userAddress: Address
  mintTo: Address
  quantity: number
  schedule: SuperMinterSchedule

  chain: Chain

  affiliate?: Address
  affiliateProof?: Hex[]
  attributionId?: bigint
}

export async function editionMintParameters<
  Client extends Pick<PublicClient, 'estimateContractGas' | 'multicall' | 'readContract'>,
>(
  client: Client,
  { merkleProvider }: { merkleProvider: MerkleProvider },
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
  {
    mintTo,
    quantity,
    schedule,
    tier,
    userAddress,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    chain,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],
    attributionId = 0n,
  }: MintTieredEditionArgs,
) {
  const eligibility = await mintEligibility(
    client,
    { merkleProvider },
    {
      editionAddress,
    },
    {
      collectorAddress: mintTo,
      scheduleNum: schedule.scheduleNum,
      tier: tier.tier,
    },
  )

  if (!eligibility.remainingEligibility) {
    return {
      abi: SUPER_MINTER_ABI,
      mint: {
        type: 'not-eligible',
      },
    } as const satisfies MintParameters
  }

  const {
    signedPrice,
    signedQuantity,
    signedClaimTicket,
    signedDeadline,
    signature,
  }: {
    signedPrice: bigint
    signedQuantity: number
    signedClaimTicket: number
    signedDeadline: number
    signature: Hex
  } = { signature: NULL_ADDRESS, signedPrice: 0n, signedQuantity: 0, signedClaimTicket: 0, signedDeadline: 0 }

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const allowlistedQuantity = UINT32_MAX

  const { total: value } = await getTotalMintPriceAndFees(
    client,
    {
      editionAddress,
    },
    {
      tier: tier.tier,
      quantity,
      scheduleNum: schedule.scheduleNum,
    },
  )

  const sharedWriteContractParameters = {
    address: SUPER_MINTER_ADDRESS,
    abi: SUPER_MINTER_ABI,
    functionName: 'mintTo',
    account: userAddress,
    value,
    chain,
  } as const

  switch (schedule.mode) {
    case 'DEFAULT': {
      const args = [
        {
          edition: editionAddress,
          tier: tier.tier,
          scheduleNum: schedule.scheduleNum,
          to: mintTo,
          quantity,
          allowlisted: NULL_ADDRESS,
          allowlistedQuantity,
          allowlistProof: [],
          signedPrice,
          signedQuantity,
          signedClaimTicket,
          signedDeadline,
          signature,
          affiliate,
          affiliateProof,
          attributionId,
        },
      ] as const

      let gasEstimate: bigint | null

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        gasEstimate = txnOverrides.gas = scaleAmount({
          amount: await client.estimateContractGas({
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          }),
          multiplier: MINT_GAS_LIMIT_MULTIPLIER,
        })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT

        gasEstimate = null
      }

      return {
        abi: SUPER_MINTER_ABI,
        mint: {
          type: 'mint',
          input: {
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          },
          gasEstimate,
        },
      } as const satisfies MintParameters
    }

    case 'VERIFY_MERKLE': {
      const proof = await merkleProvider.merkleProof({ merkleRoot: schedule.merkleRoot, userAddress: mintTo })

      if (!proof?.length) {
        return {
          abi: SUPER_MINTER_ABI,
          mint: {
            type: 'not-eligible',
          },
        } as const satisfies MintParameters
      }

      const args = [
        {
          edition: editionAddress,
          tier: tier.tier,
          scheduleNum: schedule.scheduleNum,
          to: mintTo,
          quantity,
          allowlisted: mintTo,
          allowlistedQuantity,
          allowlistProof: proof,
          signedPrice,
          signedQuantity,
          signedClaimTicket,
          signedDeadline,
          signature,
          affiliate,
          affiliateProof,
          attributionId,
        },
      ] as const

      let gasEstimate: bigint | null

      try {
        // Add a buffer to the gas estimate to account for node provider estimate variance.
        gasEstimate = txnOverrides.gas = scaleAmount({
          amount: await client.estimateContractGas({
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          }),
          multiplier: MINT_GAS_LIMIT_MULTIPLIER,
        })
      } catch (err) {
        // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
        txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT

        gasEstimate = null
      }

      return {
        abi: SUPER_MINTER_ABI,
        mint: {
          type: 'mint',
          input: {
            args,
            ...sharedWriteContractParameters,
            ...txnOverrides,
          },
          gasEstimate,
        },
      } as const satisfies MintParameters
    }

    case 'VERIFY_SIGNATURE':
    default: {
      throw Error('Not implemented')
    }
  }
}

import type { Account, Address, Chain, Hex, PublicClient } from 'viem'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS, UINT32_MAX } from '../../../utils/constants'
import { curry, exhaustiveGuard, scaleAmount } from '../../../utils/helpers'
import type { MerkleProvider, TransactionGasOptions, TypeFromUnion } from '../../../utils/types'
import type { MintParameters } from '../../types'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { getSuperMinterForEdition, getTierCurrentMaxMintable } from './helpers'
import type { SuperMinterSchedule } from './info'

export type GetTotalMintPriceAndFeesParams = {
  tier: number
  scheduleNum: number
  quantity: number

  editionAddress: Address
}

export type GetTotalMintPriceAndFeesReturnType = {
  /** The required Ether value. */
  total: bigint
  /** The total price before any additive fees. */
  subTotal: bigint
  /** The price per token. */
  unitPrice: bigint
} & (
  | {
      /** SuperMinterV1 */
      version: '1'
      /** The total platform fees.
       `platformFlatFee + platformMintBPSFee`. */
      platformFee: bigint
      /** The total platform flat fees.
       `platformTxFlatFee + platformMintFlatFee`. */
      platformFlatFee: bigint
      /** The platform per-transaction flat fees. */
      platformTxFlatFee: bigint
      /** The total platform per-token flat fees. */
      platformMintFlatFee: bigint
      /** The total platform per-token BPS fees. */
      platformMintBPSFee: bigint
      /** The total affiliate fees. */
      affiliateFee: bigint
    }
  | {
      /** SuperMinterV2 */
      version: '2'
      /** The total artist fees. */
      finalArtistFee: bigint
      /** The total platform fees. */
      finalAffiliateFee: bigint
      /** The total platform fees. */
      finalPlatformFee: bigint
    }
)

export async function getTotalMintPriceAndFees<Client extends Pick<PublicClient, 'readContract' | 'multicall'>>(
  client: Client,
  { tier, scheduleNum, quantity, editionAddress }: GetTotalMintPriceAndFeesParams,
): Promise<GetTotalMintPriceAndFeesReturnType> {
  const superMinter = await getSuperMinterForEdition(client, { editionAddress })

  switch (superMinter.version) {
    case '1': {
      const { abi, address } = superMinter
      return client
        .readContract({
          abi,
          address,
          functionName: 'totalPriceAndFees',
          args: [editionAddress, tier, scheduleNum, quantity],
        })
        .then((res) => ({ ...res, version: superMinter.version }))
    }

    case '2': {
      const { abi, address } = superMinter
      return client
        .readContract({
          abi,
          address,
          functionName: 'totalPriceAndFees',
          args: [editionAddress, tier, scheduleNum, quantity, false],
        })
        .then((res) => ({ ...res, version: superMinter.version }))
    }
    default:
      exhaustiveGuard(superMinter)
  }
}

export type GetMintEligibilityParams = {
  editionAddress: Address

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
  { tier, scheduleNum, collectorAddress, editionAddress }: GetMintEligibilityParams,
): Promise<GetMintEligibilityReturnType> {
  const { address, abi } = await getSuperMinterForEdition(client, { editionAddress })

  const [numberMintedOnSchedule, scheduleInfo, tierInfo] = await client.multicall({
    contracts: [
      {
        abi,
        address,
        functionName: 'numberMinted',
        args: [editionAddress, tier, scheduleNum, collectorAddress],
      },
      {
        abi,
        address,
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
  editionAddress: Address

  account: Address | Account
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
    mintTo,
    quantity,
    schedule,
    account,
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    chain,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],
    attributionId = 0n,
  }: MintTieredEditionArgs,
) {
  const tier = schedule.tier

  const eligibility = await mintEligibility(
    client,
    { merkleProvider },
    {
      collectorAddress: mintTo,
      scheduleNum: schedule.scheduleNum,
      tier,
      editionAddress,
    },
  )

  if (!eligibility.remainingEligibility) {
    return {
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

  const { total: value } = await getTotalMintPriceAndFees(client, {
    tier,
    quantity,
    scheduleNum: schedule.scheduleNum,
    editionAddress,
  })

  const superMinter = await getSuperMinterForEdition(client, { editionAddress })

  const sharedWriteContractParameters = {
    address: superMinter.address,
    abi: superMinter.abi,
    functionName: 'mintTo',
    account,
    value,
    chain,
  } as const

  switch (schedule.mode) {
    case 'DEFAULT': {
      const args = [
        {
          edition: editionAddress,
          tier,
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
          amount: await client.estimateContractGas<Chain, typeof superMinter.abi, 'mintTo'>({
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
          mint: {
            type: 'not-eligible',
          },
        } as const satisfies MintParameters
      }

      const args = [
        {
          edition: editionAddress,
          tier,
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
          amount: await client.estimateContractGas<Chain, typeof superMinter.abi, 'mintTo'>({
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

export type EditionMintContractInput = TypeFromUnion<Awaited<ReturnType<typeof editionMintParameters>>['mint'], 'mint'>

export function editionV2PublicActionsMint<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'estimateContractGas'> & {
    editionV2?: {}
    merkleProvider: MerkleProvider
  },
>(client: Client) {
  return {
    editionV2: {
      ...client.editionV2,

      totalMintPriceAndFees: curry(getTotalMintPriceAndFees)(client),

      eligibility: curry(mintEligibility)(client)({ merkleProvider: client.merkleProvider }),

      mintParameters: curry(editionMintParameters)(client)({ merkleProvider: client.merkleProvider }),
    },
  }
}

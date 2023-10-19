import type { Account, Address, Chain, Hex, PublicClient } from 'viem'
import { isSoundV1_2 } from './interface'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS, scaleAmount } from '../../../utils/helpers'
import type { TransactionGasOptions } from '../../../utils/types'
import { samv1Abi } from '../abi/sam-v1'
import { InvalidOffsetError, InvalidQuantityError, UnsupportedMinterError } from '../../../utils/errors'
import { interfaceIds } from '../interfaceIds'
import { samV1_1Abi } from '../abi/sam-v1_1'

export interface SamEditionAddress {
  editionAddress: Address
  samAddress: Address
}

export interface SamBuyOptions extends TransactionGasOptions {
  account: Address | Account

  mintTo: Address

  quantity: number

  maxTotalValue: bigint

  attributonId?: bigint

  affiliate?: Address
  affiliateProof?: Hex[]

  /**
   * Chain of expected edition to be minted
   */
  chain: Chain
}

export interface SamSellOptions extends TransactionGasOptions {
  userAddress: Address

  /**
   * Chain of expected edition to be minted
   */
  chain: Chain

  tokenIds: (bigint | number | string)[] | null | undefined

  minimumPayout: bigint

  attributonId?: bigint
}

export async function SamContractAddress<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress }: { editionAddress: Address },
) {
  const isSoundV1_2_OrGreaterValue = await isSoundV1_2(client, { editionAddress })

  if (!isSoundV1_2_OrGreaterValue) return null

  return await client
    .readContract({
      abi: soundEditionV1_2Abi,
      address: editionAddress,
      functionName: 'sam',
    })
    .then((value) => (value === NULL_ADDRESS ? null : value))
}

export async function SamSellParameters<Client extends Pick<PublicClient, 'readContract' | 'estimateContractGas'>>(
  client: Client,
  { editionAddress, samAddress }: SamEditionAddress,
  {
    userAddress,

    tokenIds,

    minimumPayout,

    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,

    chain,
  }: SamSellOptions,
) {
  const tokenIdsContract = tokenIds?.map((v) => BigInt(v)).sort((a, b) => (a > b ? 1 : -1))

  if (!tokenIdsContract?.length) {
    return {
      type: 'not-available',
    } as const
  }

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const input = {
    abi: samv1Abi,
    account: userAddress,
    address: samAddress,
    chain,
    functionName: 'sell',
    args: [editionAddress, tokenIdsContract, minimumPayout, userAddress, attributonId],
    ...txnOverrides,
  } as const

  let gasEstimate: bigint | null

  try {
    // Add a buffer to the gas estimate to account for node provider estimate variance.
    gasEstimate = txnOverrides.gas = scaleAmount({
      amount: await client.estimateContractGas(input),
      multiplier: MINT_GAS_LIMIT_MULTIPLIER,
    })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
    gasEstimate = null
  }

  return {
    type: 'available',
    input: {
      ...input,
      ...txnOverrides,
    },
    gasEstimate,
  } as const
}

export async function SamBuyParameters<Client extends Pick<PublicClient, 'readContract' | 'estimateContractGas'>>(
  client: Client,
  { editionAddress, samAddress }: SamEditionAddress,
  {
    quantity,

    account,
    mintTo,

    maxTotalValue,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],

    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    chain,
  }: SamBuyOptions,
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const input = {
    abi: samv1Abi,
    account,
    address: samAddress,
    chain,
    functionName: 'buy',
    args: [editionAddress, mintTo, quantity, affiliate, affiliateProof, attributonId],
    value: maxTotalValue,
    ...txnOverrides,
  } as const
  let gasEstimate: bigint | null

  try {
    // Add a buffer to the gas estimate to account for node provider estimate variance.
    gasEstimate = txnOverrides.gas = scaleAmount({
      amount: await client.estimateContractGas(input),
      multiplier: MINT_GAS_LIMIT_MULTIPLIER,
    })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gas = MINT_FALLBACK_GAS_LIMIT
    gasEstimate = null
  }

  return {
    type: 'mint',
    input: {
      ...input,
      ...txnOverrides,
    },
    gasEstimate,
  } as const
}

export async function SamTotalSellPrice<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress, samAddress }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  return client.readContract({
    abi: samv1Abi,
    address: samAddress,
    functionName: 'totalSellPrice',
    args: [editionAddress, offset, quantity],
  })
}

export async function SamTotalBuyPrice<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress, samAddress }: SamEditionAddress,
  { offset, quantity }: { offset: number; quantity: number },
) {
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity <= 0)
    throw new InvalidQuantityError({ quantity })

  if (typeof offset !== 'number' || !Number.isInteger(offset) || offset < 0) throw new InvalidOffsetError({ offset })

  const [total, platformFee, artistFee, goldenEggFee, affiliateFee] = await client.readContract({
    abi: samv1Abi,
    address: samAddress,
    functionName: 'totalBuyPriceAndFees',
    args: [editionAddress, offset, quantity],
  })

  return {
    total,
    platformFee,
    artistFee,
    goldenEggFee,
    affiliateFee,
  }
}

export interface SAM {
  platformFeeBPS: number
  platformPerTxFlatFee: bigint
  basePrice: bigint
  linearPriceSlope: bigint
  inflectionPrice: bigint
  inflectionPoint: number
  goldenEggFeesAccrued: bigint
  balance: bigint
  supply: number
  maxSupply: number
  buyFreezeTime: number
  artistFeeBPS: number
  affiliateFeeBPS: number
  goldenEggFeeBPS: number
  affiliateMerkleRoot: Hex
}

export async function SamEditionInfo<Client extends Pick<PublicClient, 'readContract' | 'multicall'>>(
  client: Client,

  { editionAddress, samAddress }: SamEditionAddress,
): Promise<SAM | null> {
  const interfaceId = await client.readContract({
    abi: samv1Abi,
    address: samAddress,
    functionName: 'moduleInterfaceId',
  })

  switch (interfaceId) {
    case interfaceIds.ISAM: {
      const [info, platformFeeBPS] = await client.multicall({
        contracts: [
          {
            abi: samv1Abi,
            address: samAddress,
            functionName: 'samInfo',
            args: [editionAddress],
          },
          {
            abi: samv1Abi,
            address: samAddress,
            functionName: 'platformFeeBPS',
          },
        ],
        allowFailure: false,
      })

      return { ...info, platformFeeBPS, platformPerTxFlatFee: 0n }
    }
    case interfaceIds.ISAMV1_1: {
      return client.readContract({
        abi: samV1_1Abi,
        address: samAddress,
        functionName: 'samInfo',
        args: [editionAddress],
      })
    }
    default:
      throw new UnsupportedMinterError({
        interfaceId,
      })
  }
}

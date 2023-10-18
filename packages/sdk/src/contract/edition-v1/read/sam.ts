import type { Address, Chain, Hex, PublicClient } from 'viem'
import { isSoundV1_2_OrGreater } from './interface'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
import { MINT_FALLBACK_GAS_LIMIT, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS, scaleAmount } from '../../../utils/helpers'
import type { TransactionGasOptions } from '../../../utils/types'
import { samv1Abi } from '../abi/sam-v1'
import { InvalidQuantityError } from '../../../utils/errors'

export interface SamEditionAddress {
  editionAddress: Address
}

export interface SamBuyOptions extends TransactionGasOptions {
  samAddress: Address

  userAddress: Address

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
  samAddress: Address

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
  { editionAddress }: SamEditionAddress,
) {
  const isSoundV1_2_OrGreaterValue = await isSoundV1_2_OrGreater(client, { editionAddress })

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
  { editionAddress }: SamEditionAddress,
  {
    samAddress,
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
  { editionAddress }: SamEditionAddress,
  {
    quantity,

    userAddress,
    mintTo,

    maxTotalValue,

    affiliate = NULL_ADDRESS,
    affiliateProof = [],

    attributonId = 0n,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    chain,

    samAddress,
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
    account: userAddress,
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

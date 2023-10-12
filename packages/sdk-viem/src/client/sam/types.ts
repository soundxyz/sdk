import type { Address, Chain, Hex } from 'viem'
import type { TransactionGasOptions } from '../../types'

export interface SamEditionAddress {
  editionAddress: Address
}

export interface SamBuyOptions extends TransactionGasOptions {
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
  /**
   * Chain of expected edition to be minted
   */
  chain: Chain

  tokenIds: (bigint | number | string)[]

  minimumPayout: bigint

  attributonId?: bigint
}

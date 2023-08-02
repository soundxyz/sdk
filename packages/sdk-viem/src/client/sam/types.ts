import type { Chain } from 'viem'
import type { SoundContractValidation, TransactionGasOptions } from '../../types'

export interface SamEditionAddress extends SoundContractValidation {
  editionAddress: string
}

export interface SamBuyOptions extends SoundContractValidation, TransactionGasOptions {
  quantity: number

  maxTotalValue: bigint

  attributonId?: bigint

  affiliate?: string
  affiliateProof?: string[]

  /**
   * Chain of expected edition to be minted
   */
  chain: Chain
}

export interface SamSellOptions extends SoundContractValidation, TransactionGasOptions {
  /**
   * Chain of expected edition to be minted
   */
  chain: Chain

  tokenIds: (bigint | number | string)[]

  minimumPayout: bigint

  attributonId?: bigint
}

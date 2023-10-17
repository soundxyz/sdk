import type { BigNumberish } from '@ethersproject/bignumber'
import type { BytesLike, SoundContractValidation } from '../../types'

export interface SamEditionAddress extends SoundContractValidation {
  editionAddress: string
}

export interface SamBuyOptions extends SoundContractValidation {
  quantity: number

  maxTotalValue: BigNumberish

  attributonId?: BigNumberish

  affiliate?: string
  affiliateProof?: BytesLike[]

  /**
   * Customize contract's call gas limit
   */
  gasLimit?: BigNumberish

  /**
   * Customize contract's call max fee per gas
   */
  maxFeePerGas?: BigNumberish

  /**
   * Customize contract's call max priority fee per gas
   */

  maxPriorityFeePerGas?: BigNumberish
}

export interface SamSellOptions extends SoundContractValidation {
  tokenIds: BigNumberish[]

  minimumPayout: BigNumberish

  attributonId?: BigNumberish

  /**
   * Customize contract's call gas limit
   */
  gasLimit?: BigNumberish

  /**
   * Customize contract's call max fee per gas
   */
  maxFeePerGas?: BigNumberish

  /**
   * Customize contract's call max priority fee per gas
   */

  maxPriorityFeePerGas?: BigNumberish
}

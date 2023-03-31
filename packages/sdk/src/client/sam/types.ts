import { BigNumberish } from '@ethersproject/bignumber'
import { BytesLike } from '../../types'

export interface SamEditionAddress {
  editionAddress: string
}

export interface SamBuyOptions {
  quantity: number

  price: BigNumberish

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

export interface SamSellOptions {
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

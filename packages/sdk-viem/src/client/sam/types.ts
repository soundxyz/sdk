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
}

export interface SamSellOptions extends SoundContractValidation, TransactionGasOptions {
  tokenIds: (bigint | number | string)[]

  minimumPayout: bigint

  attributonId?: bigint
}

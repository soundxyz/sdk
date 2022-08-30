import { BigNumber } from '@ethersproject/bignumber'

import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'

const SUPPORTED_CHAIN_IDS = [
  1, // mainnet
  5, // goerli
  1337, // hardhat
  31337, // hardhat
] as const

export type ChainId = typeof SUPPORTED_CHAIN_IDS[number]

export type SignerOrProvider = Signer | Provider

export type SoundClientConfig = {
  provider?: Provider
  signer?: Signer
  apiKey: string
}

export type MintInfo = {
  interfaceId: string
  editionAddress: string
  minterAddress: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintable: number | { maxMintableLower: number; maxMintableUpper: number; closingTime: number }
  maxMintablePerAccount: number
  totalMinted: number
}

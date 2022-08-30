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

import type { BigNumber } from '@ethersproject/bignumber'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import type { interfaceIds } from './utils/constants'

const SUPPORTED_CHAIN_IDS = [
  1, // mainnet
  5, // goerli
  1337, // hardhat
  31337, // hardhat
] as const

export type ChainId = typeof SUPPORTED_CHAIN_IDS[number]

export type SignerOrProvider = Signer | Provider

export type SoundClientConfig = (
  | {
      provider: Provider
      signer?: Signer
    }
  | {
      provider?: Provider
      signer: Signer
    }
) & { apiKey: string }

export type MintInfoBase = {
  editionAddress: string
  minterAddress: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintablePerAccount: number
  totalMinted: number
}

export type MinterInterfaceId =
  | typeof interfaceIds.IMerkleDropMinter
  | typeof interfaceIds.IFixedPriceSignatureMinter
  | typeof interfaceIds.IRangeEditionMinter

export type MintInfo =
  | (MintInfoBase & {
      interfaceId: typeof interfaceIds.IRangeEditionMinter
      maxMintableLower: number
      maxMintableUpper: number
      closingTime: number
    })
  | (MintInfoBase & {
      interfaceId: typeof interfaceIds.IMerkleDropMinter | typeof interfaceIds.IFixedPriceSignatureMinter
      maxMintable: number
    })

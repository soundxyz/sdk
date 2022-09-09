import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { contractAddresses } from '@soundxyz/sound-protocol'

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IFixedPriceSignatureMinter]: FixedPriceSignatureMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
} as const

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

export const ApiEndpointsMap = {
  production: 'https://api.sound.xyz/graphql',
  staging: 'https://staging.api.sound.xyz/graphql',
  preview: 'https://preview.api.sound.xyz/graphql',
} as const

export type ApiEnvironments = keyof typeof ApiEndpointsMap

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2

export const supportedChainIds = {
  MAINNET: 1,
  GOERLI: 5,
  LOCAL: 1337, // hardhat or anvil
  LOCAL_ALT: 31337, // hardhat
} as const

export const soundCreatorAddresses = {
  // [supportedChainIds.MAINNET]: 'TODO',
  [supportedChainIds.GOERLI]: {
    single: contractAddresses.preview.soundCreatorV1.single,
    album: contractAddresses.preview.soundCreatorV1.album,
  },
}

export function isSoundCreatorAddressChain(chain: number): chain is keyof typeof soundCreatorAddresses {
  return chain in soundCreatorAddresses
}

export const supportedNetworks = Object.values(supportedChainIds)

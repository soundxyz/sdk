import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
} from '@soundxyz/sound-protocol/typechain/index'

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
  development: 'http://localhost:4000/graphql',
}

export type ApiEnvironments = keyof typeof ApiEndpointsMap

// This is hardcoded on the contract so we always know its 2
export const MINTER_ROLE = 2

export const supportedChainIds = {
  MAINNET: 1,
  GOERLI: 5,
  LOCAL: 1337, // hardhat or anvil
  LOCAL_ALT: 31337, // hardhat
} as const

export const supportedNetworks = Object.values(supportedChainIds)

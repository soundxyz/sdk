import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
} from '@soundxyz/sound-protocol/typechain/index'

export const interfaceIds = {
  ISoundEditionV1: '0x3a8afed4',
  IMinterModule: '0x37c74bd8',
  IFixedPriceSignatureMinter: '0x110099e0',
  IMerkleDropMinter: '0x84b6980c',
  IRangeEditionMinter: '0xc73d6ffa',
} as const

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
  MAINNET: 1, // mainnet
  GOERLI: 5, // goerli
  LOCAL: 1337, // hardhat or anvil
  LOCAL_ALT: 31337, // hardhat
} as const

export const soundCreatorAddresses = {
  // [supportedChainIds.MAINNET]: 'TODO',
  [supportedChainIds.GOERLI]: '0x063df381b76207fa7ef94bc7f81f68cb6708ee0e',
  [supportedChainIds.LOCAL]: '0x6990f7bAcB34883E87f0aE9f0639E1fcAcCaA675', // <-  deterministic based on order of deployment in tests
  [supportedChainIds.LOCAL_ALT]: '0x6990f7bAcB34883E87f0aE9f0639E1fcAcCaA675', // <-  deterministic based on order of deployment in tests
}

export const minterNames = {
  MerkleDropMinter: 'MerkleDropMinter',
  FixedPriceSignatureMinter: 'FixedPriceSignatureMinter',
  RangeEditionMinter: 'RangeEditionMinter',
}

export const supportedNetworks = Object.values(supportedChainIds)

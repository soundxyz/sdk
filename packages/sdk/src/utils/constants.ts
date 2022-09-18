import { interfaceIds } from '@soundxyz/sound-protocol'
import { RangeEditionMinter__factory, MerkleDropMinter__factory } from '@soundxyz/sound-protocol/typechain/index'

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
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

export const contractAddresses = {
  staging: {
    soundFeeRegistry: '0x52036f39c309a877307cc5abc2f9bd77b2d76eb6',
    goldenEggMetadata: '0x3ad47ee14651a0b9206da858e9a845379ccbe69e',
    fixedPriceSignatureMinter: '0x9bdb780adc351f193e2e5db524feef0fdc46fcfc',
    merkleDropMinter: '0xca6df03fc390e3e8fd5846e34de6899ced9a1a88',
    rangeEditionMinter: '0x8990fe778ad96f8121afe5a236de2262350ebf6e',
    editionMaxMinter: '0xa33f01bb3b022238914587be1589c089afccdd83',
    soundEditionV1: '0xbead69ebfdcc209df4d5566cb288d854da544a6d',
    soundCreatorV1: '0x308138ae484b7bbb6c7d337d67a4e7e4e196ce98',
  },
  preview: {
    soundFeeRegistry: '0xfa853c4320be1e636bf7a56862108866e9578e5b',
    goldenEggMetadata: '0x60aa65aa025fc93a3d649aceadcd3769f0e07e37',
    fixedPriceSignatureMinter: '0xafe303b159e57b93374c7865dcfe70e0586ef068',
    merkleDropMinter: '0x4755676a4193606573bebd14585099b5c2c96c0a',
    rangeEditionMinter: '0xb5df216dc0fcf912db0cf325580a2e089d759c03',
    editionMaxMinter: '0xe766475e69e8cba1da8e66792f8a5fa40d5585df',
    soundEditionV1: '0x919de384453ec121030d0d759058ed1449a7fa23',
    soundCreatorV1: '0x6cd50f684f2f08faa4a7267bb9ac4a71d9464a4d',
  },
}

export const supportedNetworks = Object.values(supportedChainIds)

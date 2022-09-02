import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
} from '@soundxyz/sound-protocol/typechain/index'

export const interfaceIds = {
  ISoundEditionV1: '0x7c4a8a95',
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

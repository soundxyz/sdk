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
}

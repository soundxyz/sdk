import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
} from '@soundxyz/sound-protocol/typechain/index'

export type MinterFactoryType =
  | RangeEditionMinter__factory
  | FixedPriceSignatureMinter__factory
  | MerkleDropMinter__factory

export const chainIdToInfo: {
  [chainId: number]: { [contractName: string]: { address: string; deployedAtBlock?: number } }
} = {
  // goerli
  5: {
    SoundCreatorV1: {
      address: '',
      deployedAtBlock: 0,
    },
  },
}

export const UINT32_MAX = 4294967295

export const interfaceIds = {
  ISoundEditionV1: '0x41f5b0cb',
  IMinterModule: '0x84634360',
  IFixedPriceSignatureMinter: '0x81ca70f4',
  IMerkleDropMinter: '0x84b6980c',
  IRangeEditionMinter: '0xc73d6ffa',
}

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IFixedPriceSignatureMinter]: FixedPriceSignatureMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
}

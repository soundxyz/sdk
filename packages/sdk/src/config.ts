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
  IMinterModule: '0x97656fd6',
  IFixedPriceSignatureMinter: '0xc7843744',
  IMerkleDropMinter: '0xd73b07f1',
  IRangeEditionMinter: '0xfd5ca5c9',
}

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IFixedPriceSignatureMinter]: FixedPriceSignatureMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
}

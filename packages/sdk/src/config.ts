import {
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
  ISoundEditionV1__factory,
  IRangeEditionMinter__factory,
  IFixedPriceSignatureMinter__factory,
  IMerkleDropMinter__factory,
  IMinterModule__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { getInterfaceID } from './utils/interface'

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
  ISoundEditionV1: getInterfaceID(ISoundEditionV1__factory.createInterface()),
  IMinterModule: getInterfaceID(IMinterModule__factory.createInterface()),
  IFixedPriceSignatureMinter: getInterfaceID(IFixedPriceSignatureMinter__factory.createInterface()),
  IMerkleDropMinter: getInterfaceID(IMerkleDropMinter__factory.createInterface()),
  IRangeEditionMinter: getInterfaceID(IRangeEditionMinter__factory.createInterface()),
}

export const minterFactoryMap = {
  [interfaceIds.IRangeEditionMinter]: RangeEditionMinter__factory,
  [interfaceIds.IFixedPriceSignatureMinter]: FixedPriceSignatureMinter__factory,
  [interfaceIds.IMerkleDropMinter]: MerkleDropMinter__factory,
}

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

export const interfaceIds = {
  ISoundEditionV1: '0x3b8ebf6f',
  IMinterModule: '0x41af72ad',
  IFixedPriceSignatureMinter: '0xc7843744',
  IMerkleDropMinter: '0x7deee220',
  IRangeEditionMinter: '0xfd5ca5c9',
}

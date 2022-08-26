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
  ISoundEditionV1: '0x41f5b0cb',
  IMinterModule: '0x97656fd6',
  IFixedPriceSignatureMinter: '0xc7843744',
  IMerkleDropMinter: '0xd73b07f1',
  IRangeEditionMinter: '0xfd5ca5c9',
}

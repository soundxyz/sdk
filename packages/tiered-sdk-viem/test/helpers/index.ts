import { NON_NULL_ADDRESS, NULL_ADDRESS } from '../../src/utils/constants'
import { ONE_HOUR, PRICE } from '../test-constants'
import { MerkleTestHelper } from './merkle'
import type { Address } from 'viem'

import type { EditionConfig, MerkleDropConfig, RangeEditionConfig } from '../../src/types'
export function now() {
  return Math.floor(Date.now() / 1000)
}

export const getGenericEditionConfig = () =>
  ({
    name: 'Test',
    symbol: 'TEST',
    metadataModule: NULL_ADDRESS,
    baseURI: 'https://test.com',
    contractURI: 'https://test.com',
    fundingRecipient: NON_NULL_ADDRESS,
    royaltyBPS: 0,
    editionMaxMintableLower: 10,
    editionMaxMintableUpper: 10,
    editionCutoffTime: 999999,
    shouldEnableMintRandomness: true,
    shouldFreezeMetadata: false,
    enableOperatorFiltering: true,

    setSAM: null,
  }) satisfies EditionConfig

const startTime = now()
const cutoffTime = startTime + ONE_HOUR / 2
const endTime = cutoffTime + ONE_HOUR

export const getGenericRangeMintConfig = ({ minterAddress }: { minterAddress: Address }): RangeEditionConfig => ({
  mintType: 'RangeEdition' as const,
  minterAddress,
  price: PRICE,
  startTime,
  cutoffTime,
  endTime,
  maxMintableLower: 3,
  maxMintableUpper: 4,
  maxMintablePerAccount: 1,
  affiliateFeeBPS: 0,
})

export const getGenericMerkleMintConfig = ({ minterAddress }: { minterAddress: Address }): MerkleDropConfig => {
  const merkleTestHelper = MerkleTestHelper()
  const merkleTree = merkleTestHelper.getMerkleTree()
  const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)

  return {
    mintType: 'MerkleDrop' as const,
    minterAddress,
    price: PRICE,
    startTime,
    endTime,
    maxMintable: 4,
    maxMintablePerAccount: 1,
    affiliateFeeBPS: 0,
    merkleRoot,
  }
}

export const didntThrowExpectedError = () => {
  throw Error(`Didn't throw expected error`)
}

export { MerkleTestHelper }

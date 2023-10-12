import { MerkleTestHelper } from './merkle'
import type { MerkleDropConfig, RangeEditionConfig } from '../../src/types'
export declare function now(): number
export declare const getGenericEditionConfig: () => {
  name: string
  symbol: string
  metadataModule: string
  baseURI: string
  contractURI: string
  fundingRecipient: string
  royaltyBPS: number
  editionMaxMintableLower: number
  editionMaxMintableUpper: number
  editionCutoffTime: number
  shouldEnableMintRandomness: true
  shouldFreezeMetadata: false
  enableOperatorFiltering: true
  setSAM: null
}
export declare const getGenericRangeMintConfig: ({ minterAddress }: { minterAddress: string }) => RangeEditionConfig
export declare const getGenericMerkleMintConfig: ({ minterAddress }: { minterAddress: string }) => MerkleDropConfig
export declare const didntThrowExpectedError: () => never
export { MerkleTestHelper }

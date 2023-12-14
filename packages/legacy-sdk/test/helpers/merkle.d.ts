import { MerkleTree } from 'merkletreejs'
import type { Address } from 'viem'
export declare const MerkleTestHelper: () => {
  getMerkleTree: (addresses?: Address[]) => MerkleTree
  getMerkleRoot: (merkleTree: MerkleTree) => string
  getProof: ({ merkleTree, address }: { merkleTree: MerkleTree; address: string }) => `0x${string}`[]
  emptyMerkleTree: MerkleTree
}

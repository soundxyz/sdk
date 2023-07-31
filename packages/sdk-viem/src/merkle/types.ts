import type { Hex } from 'viem'

export interface MerkleProofParameters {
  merkleRoot: string
  userAddress: string
}

export interface MerkleProofProvider {
  merkleProof(merkleProofParams: MerkleProofParameters): Promise<Hex[] | null> | Hex[] | null
}

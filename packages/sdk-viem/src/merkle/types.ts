import type { Address, Hex } from 'viem'

export interface MerkleProofParameters {
  merkleRoot: Hex
  userAddress: Address
}

export interface MerkleProofProvider {
  merkleProof(merkleProofParams: MerkleProofParameters): Promise<Hex[] | null> | Hex[] | null
}

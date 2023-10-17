export interface MerkleProofParameters {
  merkleRoot: string
  userAddress: string
}

export interface MerkleProofProvider {
  merkleProof(merkleProofParams: MerkleProofParameters): Promise<string[] | null> | string[] | null
}

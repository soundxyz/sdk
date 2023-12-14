import type { MerkleProofParameters } from '../../types'
import { SoundClientInstance } from '../instance'

export async function getMerkleProof(this: SoundClientInstance, { merkleRoot, userAddress }: MerkleProofParameters) {
  const { instance, expectMerkleProvider } = this
  return instance.idempotentCachedCall(`merkle-proof-${merkleRoot}-${userAddress}`, async function getMerkleProof() {
    return expectMerkleProvider().merkleProof({ merkleRoot, userAddress })
  })
}

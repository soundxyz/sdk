import type { MerkleProvider } from './utils/types'

export function withMerkleProvider(merkleProvider: MerkleProvider) {
  return function withMerkleProvider() {
    return {
      merkleProvider,
    }
  }
}

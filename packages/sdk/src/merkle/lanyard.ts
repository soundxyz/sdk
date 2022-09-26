import type { MerkleProofProvider } from './types'
import { z } from 'zod'
import { UnexpectedLanyardResponse } from '../errors'

const lanyardProofResponseSchema = z.object({
  proof: z.array(z.string()),
  unhashedLeaf: z.string().nullable(),
})

export const LanyardMerkleProofProvider: MerkleProofProvider & { lanyardAPIEndpoint: URL; headers: HeadersInit } = {
  lanyardAPIEndpoint: new URL('https://lanyard.org/api/v1/proof'),
  headers: {
    accept: 'application/json',
  },
  async merkleProof({ merkleRoot, userAddress }) {
    const url = new URL(this.lanyardAPIEndpoint)
    url.searchParams.set('root', merkleRoot)
    url.searchParams.set('unhashedLeaf', userAddress)

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers,
      mode: 'cors',
    })

    if (response.status !== 200) throw new UnexpectedLanyardResponse({ response })

    const json = await response.json()

    const { proof } = lanyardProofResponseSchema.parse(json)

    return proof
  },
}

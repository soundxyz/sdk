import type { MerkleProofProvider } from './types'
import { z } from 'zod'
import { isHex } from 'viem'

import { UnexpectedLanyardResponse } from '../errors'

const lanyardProofResponseSchema = z.union([
  z.object({
    proof: z.array(z.string().refine(isHex)),
    unhashedLeaf: z.string().nullable().optional(),
  }),
  z
    .object({
      error: z.boolean(),
      message: z.string().nullable(),
    })
    .partial(),
])

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
    }).catch((err) => {
      throw new UnexpectedLanyardResponse({
        response: null,
        cause: err,
      })
    })

    let json: unknown

    try {
      json = await response.json()
    } catch (err) {
      throw new UnexpectedLanyardResponse({ response, cause: err })
    }

    const parsedJson = lanyardProofResponseSchema.safeParse(json)

    if (!parsedJson.success) {
      throw new UnexpectedLanyardResponse({ response, zodError: parsedJson.error, cause: parsedJson.error })
    }

    const jsonData = parsedJson.data

    if ('proof' in jsonData) {
      return jsonData.proof
    }

    return null
  },
}

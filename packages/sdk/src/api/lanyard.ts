import type { MerkleProvider } from '../utils/types'
import { string, union, array, object, boolean } from 'zod'

import { UnexpectedLanyardResponse } from '../utils/errors'
import { isHex } from 'viem'

const lanyardProofResponseSchema = union([
  object({
    proof: array(
      string().refine(isHex, {
        message: 'Proof is not a hex string',
      }),
    ),
    unhashedLeaf: string().nullable().optional(),
  }),
  object({
    error: boolean(),
    message: string().nullable(),
  }).partial(),
])

export interface BaseLanyardMerkleProofProvider {
  lanyardAPIEndpoint: URL
  fetchOptions: Partial<RequestInit>
}

export const LanyardMerkleProvider = {
  lanyardAPIEndpoint: new URL('https://lanyard.org/api/v1/proof'),
  fetchOptions: {
    method: 'GET',
    mode: 'cors',
    headers: {
      accept: 'application/json',
    },
  },
  async merkleProof({ merkleRoot, userAddress }) {
    this
    const url = new URL(this.lanyardAPIEndpoint)
    url.searchParams.set('root', merkleRoot)
    url.searchParams.set('unhashedLeaf', userAddress)

    const response = await fetch(url, this.fetchOptions).catch((err) => {
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
} satisfies BaseLanyardMerkleProofProvider & MerkleProvider

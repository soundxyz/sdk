import { z } from 'zod'

import { SoundAPIGraphQLError, UnexpectedApiResponse, MissingApiKey } from '../utils/errors'
import { MerkleProof, type MerkleProofQuery, type MerkleProofQueryVariables, Test, type TestQuery } from './graphql/gql'

import type { ExecutionResult, MerkleProofParameters } from '../utils/types'

const graphqlRequestBody = z.object({
  data: z.record(z.unknown()).nullable().optional(),
  errors: z
    .array(
      z.object({
        message: z.string(),
        locations: z.array(z.object({ line: z.number(), column: z.number() })).optional(),
        path: z.array(z.union([z.string(), z.number()])).optional(),
        extensions: z.record(z.unknown()).optional(),
      }),
    )
    .optional(),
  extensions: z.record(z.unknown()).optional(),
})

const CLIENT_KEY_HEADER = 'x-sound-client-key'

export interface SoundAPIConfig {
  /**
   * @default "https://api.sound.xyz/graphql"
   */
  apiEndpoint?: string | URL
  /**
   * API Key required to interact with Sound.xyz endpoints
   */
  apiKey: string
}

export function SoundAPI({ apiEndpoint = 'https://api.sound.xyz/graphql', apiKey }: SoundAPIConfig) {
  const apiUrl = new URL(apiEndpoint)

  function graphqlRequest<
    Data extends Record<string, unknown> = Record<string, unknown>,
    Variables extends Record<string, unknown> = Record<string, never>,
  >({ query, variables }: { query: string; variables?: Variables }) {
    if (!apiKey) throw new MissingApiKey()

    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        [CLIENT_KEY_HEADER]: apiKey,
      },
      body: JSON.stringify(
        variables
          ? {
              query,
              variables,
            }
          : {
              query,
            },
      ),
      mode: 'cors',
    })
      .then((response) =>
        response.json().then<ExecutionResult<Data>>(
          // @ts-expect-error
          graphqlRequestBody.parse,
        ),
      )
      .catch((error: unknown) => {
        throw new UnexpectedApiResponse({ error })
      })
  }

  return {
    async check() {
      const response = await graphqlRequest<TestQuery>({
        query: Test,
      })

      return response.errors ? { errors: response.errors } : null
    },

    async merkleProof({ merkleRoot, userAddress }: MerkleProofParameters) {
      const { data, errors } = await graphqlRequest<MerkleProofQuery, MerkleProofQueryVariables>({
        query: MerkleProof,
        variables: {
          root: merkleRoot,
          unhashedLeaf: userAddress,
        },
      })

      if (errors) throw new SoundAPIGraphQLError({ graphqlErrors: errors })

      if (!data?.merkleTreeProof) return null

      return data.merkleTreeProof.proof
    },
  }
}

export type SoundAPI = ReturnType<typeof SoundAPI>

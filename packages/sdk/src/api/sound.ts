import { object, record, array, unknown, string, number, union } from 'zod'

import { SoundAPIGraphQLError, UnexpectedApiResponse, MissingApiKey } from '../utils/errors'
import {
  MerkleProof,
  type MerkleProofQuery,
  type MerkleProofQueryVariables,
  Test,
  type TestQuery,
  type EditionOwnedTokenIdsQuery,
  type EditionOwnedTokenIdsQueryVariables,
  EditionOwnedTokenIds,
  type EditionOwnedTokenIdsInput,
} from './graphql/gql'

import type { ExecutionResult, MerkleProofParameters, MerkleProofProvider } from '../utils/types'
import { isHexList } from '../utils/helpers'

const graphqlRequestBody = object({
  data: record(unknown()).nullable().optional(),
  errors: array(
    object({
      message: string(),
      locations: array(object({ line: number(), column: number() })).optional(),
      path: array(union([string(), number()])).optional(),
      extensions: record(unknown()).optional(),
    }),
  ).optional(),
  extensions: record(unknown()).optional(),
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

  /**
   * Customize base fetch options
   */
  fetchOptions?: Omit<Partial<RequestInit>, 'body' | 'method' | 'headers'> & { headers?: Record<string, string> }
}

export function SoundAPI({ apiEndpoint = 'https://api.sound.xyz/graphql', apiKey, fetchOptions }: SoundAPIConfig) {
  const apiUrl = new URL(apiEndpoint)

  function graphqlRequest<
    Data extends Record<string, unknown> = Record<string, unknown>,
    Variables extends Record<string, unknown> = Record<string, never>,
  >({ query, variables }: { query: string; variables?: Variables }) {
    if (!apiKey) throw new MissingApiKey()

    return fetch(apiUrl, {
      method: 'POST',
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
      ...fetchOptions,
      headers: {
        'content-type': 'application/json',
        [CLIENT_KEY_HEADER]: apiKey,
        ...fetchOptions?.headers,
      },
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

      if (!data?.merkleTreeProof || !isHexList(data.merkleTreeProof.proof)) return null

      return data.merkleTreeProof.proof
    },

    editionOwnedTokenIds(input: EditionOwnedTokenIdsInput) {
      return graphqlRequest<EditionOwnedTokenIdsQuery, EditionOwnedTokenIdsQueryVariables>({
        query: EditionOwnedTokenIds,
        variables: {
          input,
        },
      })
    },
  } satisfies Record<string, unknown> & MerkleProofProvider
}

export type SoundAPI = ReturnType<typeof SoundAPI>

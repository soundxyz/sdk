import { UnexpectedApiResponse } from './errors'
import { Test, TestQuery } from './api/graphql/gql'

import type { ExecutionResult } from './types'
import { Minters } from './subgraph/graphql/gql'
import type { MintersQueryVariables, MintersQuery } from './subgraph/graphql/gql'
import { graphqlRequestBody } from './api'

export interface SoundSubgraphConfig {
  /**
   * @default "https://api.thegraph.com/subgraphs/name/saihaj/sound-sdk-mainnet"
   */
  apiEndpoint?: string | URL
}

export function SoundSubgraph({
  apiEndpoint = 'https://api.thegraph.com/subgraphs/name/saihaj/sound-sdk-mainnet',
}: SoundSubgraphConfig) {
  const apiUrl = new URL(apiEndpoint)

  function graphqlRequest<
    Data extends Record<string, unknown> = Record<string, unknown>,
    Variables extends Record<string, unknown> = Record<string, never>,
  >({ query, variables }: { query: string; variables?: Variables }) {
    return fetch(apiUrl, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
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
    minterInfo({ editionAddress }: MintersQueryVariables) {
      return graphqlRequest<MintersQuery, MintersQueryVariables>({
        query: Minters,
        variables: {
          editionAddress,
        },
      })
    },
  }
}

export type SoundSubgraph = ReturnType<typeof SoundSubgraph>

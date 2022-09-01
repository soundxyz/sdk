import { z } from 'zod'
import { UnexpectedApiResponse } from '../errors'
import type { ExecutionResult } from '../types'
import { ApiEndpointsMap, ApiEnvironments } from '../utils/constants'
import {
  AudioFromTrack,
  AudioFromTrackQuery,
  AudioFromTrackQueryVariables,
  ReleaseInfo,
  ReleaseInfoQuery,
  ReleaseInfoQueryVariables,
  Test,
  TestQuery,
} from './graphql/gql'

const graphqlRequestBody = z.object({
  data: z.record(z.unknown()).nullable().optional(),
  errors: z.array(z.object({ message: z.string() })).optional(),
  extensions: z.record(z.unknown()).optional(),
})

const CLIENT_KEY_HEADER = 'x-sound-client-key'

export function SoundAPI({
  environment = 'production',
  apiKey,
}: {
  /**
   * @default "production"
   */
  environment?: ApiEnvironments
  apiKey: string
}) {
  const apiUrl = new URL(ApiEndpointsMap[environment])

  function graphqlRequest<
    Data extends Record<string, unknown> = Record<string, unknown>,
    Variables extends Record<string, unknown> = Record<string, never>,
  >({ query, variables }: { query: string; variables?: Variables }) {
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
    })
      .then((response) =>
        response.json().then<ExecutionResult<Data>>(
          // @ts-expect-error
          graphqlRequestBody.parse,
        ),
      )
      .catch((err) => {
        throw new UnexpectedApiResponse(err)
      })
  }

  return {
    async check() {
      const response = await graphqlRequest<TestQuery>({
        query: Test,
      })

      return response.errors ? { errors: response.errors } : null
    },
    releaseInfo({ id: releaseId }: { id: string }) {
      return graphqlRequest<ReleaseInfoQuery, ReleaseInfoQueryVariables>({
        query: ReleaseInfo,
        variables: {
          releaseId,
        },
      })
    },
    audioFromTrack({ trackId }: { trackId: string }) {
      return graphqlRequest<AudioFromTrackQuery, AudioFromTrackQueryVariables>({
        query: AudioFromTrack,
        variables: {
          trackId,
        },
      })
    },
  }
}

import { ApiEndpointsMap, ApiEnvironments } from '../utils/constants'
import { z, ZodError } from 'zod'
import type { ExecutionResult } from 'graphql'
import { Test, TestQuery } from './graphql/gql'
import { UnexpectedApiResponse } from '../errors'

const graphqlRequestBody = z.object({
  data: z.record(z.unknown()).nullable(),
  errors: z
    .array(z.object({ message: z.string() }))
    .nullable()
    .optional(),
  extensions: z.record(z.unknown()).nullable().optional(),
})

export function SoundAPI({
  environment = 'production',
}: {
  /**
   * @default "production"
   */
  environment?: ApiEnvironments
} = {}) {
  const apiUrl = new URL(ApiEndpointsMap[environment])

  function graphqlRequest<Data>({ query }: { query: string }) {
    return fetch(apiUrl, {
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query,
      }),
    }).then(
      (response) =>
        response
          .json()
          .then(graphqlRequestBody.parse, (err) => {
            if (err instanceof UnexpectedApiResponse) throw err

            throw new UnexpectedApiResponse({
              unexpectedError: err,
            })
          })
          .then(
            (value) => value as ExecutionResult<Data>,
            (err) => {
              if (err instanceof UnexpectedApiResponse) throw err

              throw new UnexpectedApiResponse({
                zodError: err instanceof ZodError ? err : undefined,
                unexpectedError: err,
              })
            },
          ),
      (err) => {
        if (err instanceof UnexpectedApiResponse) throw err

        throw new UnexpectedApiResponse({
          unexpectedError: err,
        })
      },
    )
  }

  return {
    test() {
      return graphqlRequest<TestQuery>({
        query: Test,
      })
    },
  }
}

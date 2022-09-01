import type { GraphQLError } from './types'

export class MissingSignerError extends Error {
  readonly name = 'MissingSignerError'

  constructor(message?: string) {
    super(message || 'Must provide signer')
  }
}

export class MissingSignerOrProviderError extends Error {
  readonly name = 'MissingSignerOrProviderError'

  constructor(message?: string) {
    super(message || 'Must provide signer or provider')
  }
}

export class InvalidAddressError extends Error {
  readonly name = 'InvalidAddressError'

  constructor(message?: string) {
    super(message || 'Must provide valid address')
  }
}

export class NotSoundEditionError extends Error {
  readonly name = 'NotSoundEditionError'

  constructor(message?: string) {
    super(message || 'Address must be a sound edition contract')
  }
}

export class SoundNotFoundError extends Error {
  readonly name = 'SoundNotFound'

  public readonly releaseId: string
  public readonly graphqlErrors: readonly GraphQLError[] | undefined

  constructor({ releaseId, graphqlErrors }: { releaseId: string; graphqlErrors: readonly GraphQLError[] | undefined }) {
    super('Sound could not be found')

    this.releaseId = releaseId
    this.graphqlErrors = graphqlErrors
  }
}

export class UnexpectedApiResponse extends Error {
  readonly name = 'UnexpectedApiResponse'

  readonly originalError?: Error

  readonly unexpectedOriginalError?: unknown

  constructor(error: unknown) {
    super('Unexpected API Response')

    if (error instanceof Error) {
      this.originalError = error
    } else {
      this.unexpectedOriginalError = error
    }
  }
}

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

  readonly contractAddress: string
  readonly editionId: string | null
  readonly graphqlErrors: readonly GraphQLError[] | undefined

  constructor({
    contractAddress,
    editionId = null,
    graphqlErrors,
  }: {
    contractAddress: string
    editionId?: string | null
    graphqlErrors: readonly GraphQLError[] | undefined
  }) {
    super('Sound could not be found')

    this.contractAddress = contractAddress
    this.editionId = editionId

    this.graphqlErrors = graphqlErrors
  }
}

export class SoundAPILoginError extends Error {
  readonly name = 'SoundAPILoginError'

  readonly publicAddress: string
  readonly graphqlErrors: readonly GraphQLError[] | undefined

  constructor({
    publicAddress,
    graphqlErrors,
  }: {
    publicAddress: string
    graphqlErrors: readonly GraphQLError[] | undefined
  }) {
    super('Error while trying to login into Sound.xyz API')

    this.publicAddress = publicAddress
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

export class InvalidQuantityError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide valid quantity')
    this.name = 'InvalidQuantityError'
  }
}

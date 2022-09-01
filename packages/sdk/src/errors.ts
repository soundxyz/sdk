import type { ZodError } from 'zod'

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

export class UnexpectedApiResponse extends Error {
  readonly name = 'UnexpectedApiResponse'

  readonly zodError: ZodError | null
  readonly unexpectedError: unknown

  constructor({ zodError, unexpectedError }: { zodError?: ZodError; unexpectedError: unknown }) {
    super('Unexpected API Response was found')

    this.zodError = zodError || null
    this.unexpectedError = unexpectedError
  }
}

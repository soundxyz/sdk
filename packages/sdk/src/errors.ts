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

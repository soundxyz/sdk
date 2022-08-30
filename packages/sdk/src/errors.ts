export class MissingSignerError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide signer')
    this.name = 'MissingSignerError'
  }
}

export class MissingSignerOrProviderError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide signer or provider')
    this.name = 'MissingSignerOrProviderError'
  }
}

export class InvalidAddressError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide valid address')
    this.name = 'InvalidAddressError'
  }
}

export class NotSoundEditionError extends Error {
  constructor(message?: string) {
    super(message || 'Address must be a sound edition contract')
    this.name = 'NotSoundEditionError'
  }
}

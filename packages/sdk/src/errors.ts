export class UnsupportedChainError extends Error {
  constructor(message?: string) {
    super(message || 'Unsupported chain')
    this.name = 'UnsupportedChainError'
  }
}

export class MissingProviderError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide provider')
    this.name = 'MissingProviderError'
  }
}

export class MissingSignerError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide signer')
    this.name = 'MissingSignerError'
  }
}

export class InvalidAddressError extends Error {
  constructor(message?: string) {
    super(message || 'Must provide valid address')
    this.name = 'InvalidAddressError'
  }
}

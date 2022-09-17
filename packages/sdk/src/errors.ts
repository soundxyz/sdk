import type { GraphQLExecutionErrors, MintScheduleBase } from './types'

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

export class UnsupportedNetworkError extends Error {
  readonly name = 'UnsupportedNetworkError'

  readonly chainId: number
  constructor({ chainId }: { chainId: number }) {
    super('Unsupported network chain ID')

    this.chainId = chainId
  }
}

export class CreatorAddressMissingForLocalError extends Error {
  readonly name = 'CreatorAddressMissingForLocalError'

  constructor(message?: string) {
    super(message || 'Must pass in soundCreatorAddress when using with a local network')
  }
}

export class InvalidAddressError extends Error {
  readonly name = 'InvalidAddressError'

  constructor(message?: string) {
    super(message || 'Must provide valid address')
  }
}

export class UnsupportedMinterError extends Error {
  readonly name = 'UnsupportedMinterError'

  constructor(message?: string) {
    super(message || 'Minter not handled by sdk')
  }
}

export class NotSoundEditionError extends Error {
  readonly name = 'NotSoundEditionError'

  readonly contractAddress: string
  constructor({ contractAddress }: { contractAddress: string }) {
    super('Address must be a sound edition contract')

    this.contractAddress = contractAddress
  }
}

export class SoundNotFoundError extends Error {
  readonly name = 'SoundNotFound'

  readonly contractAddress: string
  readonly editionId: string | null
  readonly graphqlErrors: GraphQLExecutionErrors | undefined

  constructor({
    contractAddress,
    editionId = null,
    graphqlErrors,
  }: {
    contractAddress: string
    editionId?: string | null
    graphqlErrors: GraphQLExecutionErrors | undefined
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
  readonly graphqlErrors: GraphQLExecutionErrors | undefined

  constructor({
    publicAddress,
    graphqlErrors,
  }: {
    publicAddress: string
    graphqlErrors: GraphQLExecutionErrors | undefined
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

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message || 'Requested resource not found')
  }
}

export class NotEligibleMint extends Error {
  readonly mintSchedule: MintScheduleBase
  readonly userAddress: string
  readonly eligibleMintQuantity: number

  constructor({
    mintSchedule,
    userAddress,
    eligibleMintQuantity,
  }: {
    mintSchedule: MintScheduleBase
    userAddress: string
    eligibleMintQuantity: number
  }) {
    super('Not eligible to mint')

    this.mintSchedule = mintSchedule
    this.userAddress = userAddress
    this.eligibleMintQuantity = eligibleMintQuantity
  }
}

export class MissingApiKey extends Error {
  constructor() {
    super('Missing "apiKey" while creating SoundAPI instance')
  }
}

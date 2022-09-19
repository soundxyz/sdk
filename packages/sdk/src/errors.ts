import type { GraphQLExecutionErrors, MintScheduleBase } from './types'

export class MissingSignerError extends Error {
  readonly name = 'MissingSignerError'

  constructor() {
    super('Must provide signer')
  }
}

export class MissingSignerOrProviderError extends Error {
  readonly name = 'MissingSignerOrProviderError'

  constructor() {
    super('Must provide signer or provider')
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

export class CreatorAddressMissing extends Error {
  readonly name = 'CreatorAddressMissingError'

  constructor() {
    super('"soundCreatorAddress" was not specified and it\'s required for the requested action')
  }
}

export class InvalidAddressError extends Error {
  readonly name = 'InvalidAddressError'

  readonly address: string

  constructor({ address }: { address: string }) {
    super(`Invalid address: ${JSON.stringify(address)}`)

    this.address = address
  }
}

export class UnsupportedMinterError extends Error {
  readonly name = 'UnsupportedMinterError'

  readonly interfaceId: string

  constructor({ interfaceId }: { interfaceId: string }) {
    super('Minter not handled by sdk')

    this.interfaceId = interfaceId
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
  readonly name = 'SoundNotFoundError'

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
  readonly name = 'UnexpectedApiResponseError'

  readonly originalError?: Error

  readonly unexpectedOriginalError?: unknown

  readonly graphqlErrors?: GraphQLExecutionErrors

  constructor(error: unknown, { graphqlErrors }: { graphqlErrors?: GraphQLExecutionErrors } = {}) {
    super('Unexpected API Response')

    if (error instanceof Error) {
      this.originalError = error
    } else {
      this.unexpectedOriginalError = error
    }

    if (graphqlErrors) {
      this.graphqlErrors = graphqlErrors
    }
  }
}

export class InvalidQuantityError extends Error {
  readonly name = 'InvalidQuantityError'

  readonly quantity: number

  constructor({ quantity }: { quantity: number }) {
    super('Must provide valid quantity')

    this.quantity = quantity
  }
}

export class NotEligibleMint extends Error {
  readonly name = 'NotEligibleMintError'

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
  readonly name = 'MissingApiKeyError'

  constructor() {
    super('Missing "apiKey" while creating SoundAPI instance')
  }
}

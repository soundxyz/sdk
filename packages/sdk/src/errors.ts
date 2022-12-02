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

export class SoundAPIGraphQLError extends Error {
  readonly name = 'SoundAPIGraphQLError'

  readonly graphqlErrors: GraphQLExecutionErrors

  constructor({ graphqlErrors }: { graphqlErrors: GraphQLExecutionErrors }) {
    super('Sound.xyz API GraphQL Error')

    this.graphqlErrors = graphqlErrors
  }
}

export class UnexpectedApiResponse extends Error {
  readonly name = 'UnexpectedApiResponseError'

  readonly originalError?: Error

  readonly unexpectedOriginalError?: unknown

  readonly graphqlErrors?: GraphQLExecutionErrors

  constructor({
    message,
    error,
    graphqlErrors,
  }: { message?: string; error?: unknown; graphqlErrors?: GraphQLExecutionErrors } = {}) {
    super(message || 'Unexpected API Response')

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

export class MissingSoundAPI extends Error {
  readonly name = 'MissingSoundAPIError'

  constructor() {
    super('Missing required "soundAPI" while creating SoundClient instance')
  }
}

export class MissingMerkleProvider extends Error {
  readonly name = 'MissingMerkleProviderError'

  constructor() {
    super('Missing required "merkleProvider" while creating SoundClient instance')
  }
}

export class UnexpectedLanyardResponse extends Error {
  readonly name = 'UnexpectedLanyardResponseError'

  readonly response: Response

  constructor({ response }: { response: Response }) {
    super(`Unexpected lanyard API response, status code ${response.status}`)

    this.response = response
  }
}

export class InvalidFundingRecipientError extends Error {
  readonly name = 'InvalidFundingRecipientError'

  readonly fundingRecipient: string

  constructor({ fundingRecipient }: { fundingRecipient: string }) {
    super('fundingRecipient must be a valid address')

    this.fundingRecipient = fundingRecipient
  }
}

export class InvalidEditionMaxMintableRangeError extends Error {
  readonly name = 'InvalidEditionMaxMintableRangeError'

  readonly editionMaxMintableLower: number
  readonly editionMaxMintableUpper: number

  constructor({
    editionMaxMintableLower,
    editionMaxMintableUpper,
  }: {
    editionMaxMintableLower: number
    editionMaxMintableUpper: number
  }) {
    super('editionMaxMintableLower cannot be greater than editionMaxMintableUpper')

    this.editionMaxMintableLower = editionMaxMintableLower
    this.editionMaxMintableUpper = editionMaxMintableUpper
  }
}

export class InvalidMaxMintableError extends Error {
  readonly name = 'InvalidMaxMintableError'

  readonly maxMintableLower: number
  readonly maxMintableUpper: number

  constructor({ maxMintableLower, maxMintableUpper }: { maxMintableLower: number; maxMintableUpper: number }) {
    super('maxMintableLower cannot be greater than maxMintableUpper')

    this.maxMintableLower = maxMintableLower
    this.maxMintableUpper = maxMintableUpper
  }
}

export class MaxMintablePerAccountError extends Error {
  readonly name = 'MaxMintablePerAccountError'

  readonly maxMintablePerAccount: number

  constructor({ maxMintablePerAccount }: { maxMintablePerAccount: number }) {
    super('maxMintablePerAccount must be greater than 0')

    this.maxMintablePerAccount = maxMintablePerAccount
  }
}

export class InvalidMerkleRootError extends Error {
  readonly name = 'InvalidMerkleRootError'

  readonly merkleRoot: string

  constructor({ merkleRoot }: { merkleRoot: string }) {
    super('merkleRoot must be a valid bytes32 hash')

    this.merkleRoot = merkleRoot
  }
}

export class InvalidTimeValuesError extends Error {
  readonly name = 'InvalidTimeValuesError'

  readonly startTime: number
  readonly cutoffTime: number
  readonly endTime: number

  constructor({ startTime, cutoffTime, endTime }: { startTime: number; cutoffTime: number; endTime: number }) {
    super('startTime must be earlier than cutoffTime and cutoffTime must be earlier than endTime')

    this.startTime = startTime
    this.cutoffTime = cutoffTime
    this.endTime = endTime
  }
}

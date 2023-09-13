import type { Address } from 'viem'
import type { AddressInputType, GraphQLExecutionErrors, MintSchedule } from './types'
import type { ZodError } from 'zod'

export class MissingSignerError extends Error {
  readonly name = 'MissingSignerError'

  constructor() {
    super('Must provide signer')
  }
}

export class MissingProviderError extends Error {
  readonly name = 'MissingProviderError'

  constructor() {
    super('Must provide provider')
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

  readonly type: AddressInputType
  readonly address: string

  constructor({ type, address, message }: { type: AddressInputType; address: string; message?: string }) {
    super(message || 'Invalid address')

    this.type = type
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

  constructor({ contractAddress }: { contractAddress: Address }) {
    super('Address must be a sound edition contract')

    this.contractAddress = contractAddress
  }
}

export class SamNotFoundError extends Error {
  readonly name = 'SamNotFoundError'

  readonly contractAddress: string

  constructor({ contractAddress }: { contractAddress: string }) {
    super('SAM could not be found for edition')

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

    this.quantity = Number(quantity)
  }
}

export class InvalidOffsetError extends Error {
  readonly name = 'InvalidOffsetError'

  readonly offset: number

  constructor({ offset }: { offset: number }) {
    super('Must provide valid non-negative integer offset')

    this.offset = offset
  }
}

export class InvalidTokenIdError extends Error {
  readonly name = 'InvalidTokenIdError'

  readonly tokenId: string

  constructor({ tokenId }: { tokenId: string }) {
    super('Must provide valid token id')

    this.tokenId = tokenId
  }
}

export class InvalidAttributonIdError extends Error {
  readonly name = 'InvalidAttributonIdError'

  readonly attributonId: string

  constructor({ attributonId }: { attributonId: string }) {
    super('Must provide valid BigNumber-like attributon id')

    this.attributonId = attributonId
  }
}

export class NotEligibleMint extends Error {
  readonly name = 'NotEligibleMintError'

  readonly userAddress: string
  readonly eligibleMintQuantity?: bigint
  readonly mintSchedule: MintSchedule

  constructor({
    userAddress,
    eligibleMintQuantity,
    mintSchedule,
  }: {
    userAddress: string
    eligibleMintQuantity?: bigint
    mintSchedule: MintSchedule
  }) {
    super('Not eligible to mint')

    this.userAddress = userAddress
    this.eligibleMintQuantity = eligibleMintQuantity
    this.mintSchedule = mintSchedule
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

  readonly response: Response | null

  readonly zodError: ZodError | null

  constructor({ response, zodError, cause }: { response: Response | null; zodError?: ZodError; cause?: unknown }) {
    super(
      response ? `Unexpected lanyard API response, status code ${response.status}` : 'Unexpected lanyard API response',
      {
        cause,
      },
    )

    this.response = response

    this.zodError = zodError || null
  }
}

export class InvalidEditionMaxMintableError extends Error {
  readonly name = 'InvalidEditionMaxMintableError'

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

export class InvalidMaxMintablePerAccountError extends Error {
  readonly name = 'InvalidMaxMintablePerAccountError'

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

export class InvalidTxHashError extends Error {
  readonly name = 'InvalidTxHashError'

  readonly txHash: string

  constructor({ txHash }: { txHash: string }) {
    super('Must be a valid bytes32 transaction hash')

    this.txHash = txHash
  }
}

export class InvalidMerkleProofError extends Error {
  readonly name = 'InvalidMerkleProofError'

  readonly proof: readonly string[]

  constructor({ proof }: { proof: readonly string[] }) {
    super('Must be a valid merkle proof')

    this.proof = proof
  }
}

export class InvalidHexError extends Error {
  readonly name = 'InvalidHexError'

  readonly value: string

  constructor({ value }: { value: string }) {
    super('Must be a valid hex value that starts with 0x')

    this.value = value
  }
}

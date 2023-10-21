import { UINT32_MAX } from './constants'
import type { AddressInputType, GraphQLExecutionErrors } from './types'
import type { ZodError } from 'zod'

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

  constructor({ contractAddress }: { contractAddress: string }) {
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

export class MissingApiKey extends Error {
  readonly name = 'MissingApiKeyError'

  constructor() {
    super('Missing "apiKey" while creating SoundAPI instance')
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

export class InvalidOffsetError extends Error {
  readonly name = 'InvalidOffsetError'

  readonly offset: number

  constructor({ offset }: { offset: number }) {
    super('Must provide valid non-negative integer offset')

    this.offset = offset
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

export class InvalidUint32 extends Error {
  readonly field: string

  constructor(
    {
      field,
      value,
    }: {
      field: string
      value: unknown
    },
    options?: ErrorOptions,
  ) {
    super(`Invalid uint32, maximum of ${UINT32_MAX} and minimum of 0, but provided ${String(value)}`, options)

    this.field = field
  }
}

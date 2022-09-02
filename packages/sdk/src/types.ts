import type { BigNumber } from '@ethersproject/bignumber'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import type { ApiEnvironments, interfaceIds, supportedChainIds } from './utils/constants'

/*********************************************************
                PROTOCOL TYPES
 ********************************************************/

type ValueOf<T> = T[keyof T]

export type ChainId = ValueOf<typeof supportedChainIds>

export type SignerOrProvider = Signer | Provider

export type SoundClientConfig = (
  | {
      provider: Provider
      signer?: Signer
    }
  | {
      provider?: Provider
      signer: Signer
    }
) & {
  apiKey: string
  /**
   * @default "production"
   */
  environment?: ApiEnvironments
}

export type MintInfoBase = {
  editionAddress: string
  minterAddress: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintablePerAccount: number
  totalMinted: number
}

export type MinterInterfaceId =
  | typeof interfaceIds.IMerkleDropMinter
  | typeof interfaceIds.IFixedPriceSignatureMinter
  | typeof interfaceIds.IRangeEditionMinter

export type MintInfo =
  | (MintInfoBase & {
      interfaceId: typeof interfaceIds.IRangeEditionMinter
      maxMintableLower: number
      maxMintableUpper: number
      closingTime: number
    })
  | (MintInfoBase & {
      interfaceId: typeof interfaceIds.IMerkleDropMinter | typeof interfaceIds.IFixedPriceSignatureMinter
      maxMintable: number
    })

/**
 * The arguments required by SoundEdition.initialize
 */
export type EditionConfig = {
  name: string
  symbol: string
  metadataModule: string
  baseURI: string
  contractURI: string
  fundingRecipient: string
  royaltyBPS: number
  editionMaxMintable: number
  mintRandomnessTokenThreshold: number
  mintRandomnessTimeThreshold: number
}

enum minterNames {
  'RangeEditionMinter',
  'FixedPriceSignatureMinter',
  'MerkleDropMinter',
}

/**
 * The arguments required for all minter calls.
 */
export type MintConfigBase = {
  edition: string
  minter: string
  price: number
  startTime: number
  endTime: number
  affiliateFeeBPS: number
}

/**
 * The custom arguments required by each minter
 */
export type MintConfig =
  | (MintConfigBase & {
      name: minterNames.RangeEditionMinter
      closingTime: number
      maxMintableLower: number
      maxMintableUpper: number
      maxMintablePerAccount: number
    })
  | (MintConfigBase & {
      name: minterNames.MerkleDropMinter
      merkleRootHash: string
      maxMintable: number
      maxMintablePerAccount: number
    })
  | (MintConfigBase & {
      name: minterNames.FixedPriceSignatureMinter
      signer: string
      maxMintable: number
    })

/*********************************************************
                    API TYPES
 ********************************************************/

export type GraphQLExecutionErrors = readonly [GraphQLError, ...Array<GraphQLError>]
export interface ExecutionResult<
  TData extends Record<string, unknown> = Record<string, unknown>,
  TExtensions extends Record<string, unknown> = Record<string, unknown>,
> {
  errors?: GraphQLExecutionErrors
  data?: TData | null
  extensions?: TExtensions
}

export interface GraphQLError {
  /**
   * A short, human-readable summary of the problem that **SHOULD NOT** change
   * from occurrence to occurrence of the problem, except for purposes of
   * localization.
   */
  readonly message: string
  /**
   * If an error can be associated to a particular point in the requested
   * GraphQL document, it should contain a list of locations.
   */
  readonly locations?: ReadonlyArray<SourceLocation>
  /**
   * If an error can be associated to a particular field in the GraphQL result,
   * it _must_ contain an entry with the key `path` that details the path of
   * the response field which experienced the error. This allows clients to
   * identify whether a null result is intentional or caused by a runtime error.
   */
  readonly path?: ReadonlyArray<string | number>
  /**
   * Reserved for implementors to extend the protocol however they see fit,
   * and hence there are no additional restrictions on its contents.
   */
  readonly extensions?: {
    [key: string]: unknown
  }
}

export interface SourceLocation {
  readonly line: number
  readonly column: number
}

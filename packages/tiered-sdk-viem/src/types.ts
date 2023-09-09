import type {
  Address,
  Chain,
  FeeValuesEIP1559,
  PublicClient,
  TransactionRequestBase,
  WalletClient,
  BlockTag,
  Hex,
} from 'viem'
import type { MerkleProofProvider } from './merkle/types'
import type { SoundAPI } from './api'

export type BlockOrBlockTag = bigint | BlockTag

export interface SoundContractValidation {
  /**
   * Assume valid Sound.xyz contract, skipping safety checks
   *
   * @default false
   */
  assumeValidSoundContract?: boolean
}

type LazyOption<T extends object> = T | (() => T | Promise<T>)

export type ClientProvider = Pick<
  PublicClient,
  'chain' | 'readContract' | 'getFilterLogs' | 'createEventFilter' | 'estimateContractGas'
>
export type Wallet = Pick<WalletClient, 'account' | 'chain' | 'writeContract' | 'signMessage' | 'sendTransaction'>

export type SoundClientContractProvider =
  | {
      client: LazyOption<ClientProvider>
      account?: LazyOption<WalletClient>
    }
  | {
      client?: LazyOption<ClientProvider>
      account: LazyOption<WalletClient>
    }

export type MerkleProvider = MerkleProofProvider

export interface BaseSoundClientConfig {
  /**
   * @default console.error
   */
  onError?: (err: unknown) => void

  /**
   * Sound.xyz API instance
   */
  soundAPI?: SoundAPI

  /**
   * Merkle provider to be used
   */
  merkleProvider?: MerkleProvider
}

export type SoundClientConfig = SoundClientContractProvider & BaseSoundClientConfig

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

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export * from './merkle/types'

export type AddressInputType =
  | 'DEPLOYER'
  | 'SOUND_EDITION'
  | 'MINTER'
  | 'FUNDING_RECIPIENT'
  | 'METADATA_MODULE'
  | 'SAM'
  | 'AFFILIATE'
  | 'WALLET'
  | 'CREATOR_ADDRESS'
  | 'GENERIC'

export type Bytes = ArrayLike<number>

export type BytesLike = Bytes | string

export declare type PromiseOrValue<T> = T | Promise<T>

type TupleSplit<T, N extends number, O extends readonly any[] = readonly []> = O['length'] extends N
  ? [O, T]
  : T extends readonly [infer F, ...infer R]
  ? TupleSplit<readonly [...R], N, readonly [...O, F]>
  : [O, T]

export type TakeFirst<T extends readonly any[], N extends number> = TupleSplit<T, N>[0]

export interface MintScheduleBase {
  editionAddress: Address
  minterAddress: Address
  mintId: bigint
  startTime: number
  endTime: number
  mintPaused: boolean
  price: bigint
  maxMintablePerAccount: number
  totalMinted: number
  affiliateFeeBPS: number
  platformTransactionFee: bigint
}

export interface TransactionGasOptions
  extends Partial<Pick<FeeValuesEIP1559, 'maxFeePerGas' | 'maxPriorityFeePerGas'>>,
    Pick<TransactionRequestBase, 'gas'> {}

interface SharedMintOptions extends SoundContractValidation, TransactionGasOptions {
  /**
   * Chain of edition to be minted
   */
  chain: Chain

  /**
   * Amount of NFTs to be minted
   */
  quantity: number

  /**
   * Optional affiliate address
   */
  affiliate?: string

  /**
   * Skip quantity eligibility pre-mint checks
   *
   * @default false
   */
  skipQuantityChecks?: boolean

  /**
   * Pre-provide merkle proof to be used for merkle drops
   *
   * By default if it's not specified, it will use the pre-specified Merkle Provider on Sound Client instance
   *
   * If null or empty array is provided, not eligible safe-check will be thrown
   */
  merkleProof?: string[] | null | undefined
}

export type EstimatableTransaction = {
  gasEstimate: bigint
  startTransaction: () => Promise<{ transactionHash: Address }>
}

export type ContractCall = {
  contractAddress: Address
  calldata: Address
}

export interface SamConfig {
  contractAddress: string

  basePrice: bigint
  linearPriceSlope: bigint | string | number
  inflectionPrice: bigint | number | string
  inflectionPoint: number

  artistFeeBPS: number
  goldenEggFeeBPS: number
  affiliateFeeBPS: number
}

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
  editionMaxMintableLower: number
  editionMaxMintableUpper: number
  editionCutoffTime: number
  shouldFreezeMetadata: boolean
  shouldEnableMintRandomness: boolean
  enableOperatorFiltering: boolean

  setSAM: SamConfig | null
}

/**
 * The arguments required for all minter calls.
 */
export type MintConfigBase = {
  minterAddress: string
  price: bigint
  startTime: number
  endTime: number
  affiliateFeeBPS: number
}

/**
 * The custom arguments required by each minter
 */
export type MerkleDropConfig = MintConfigBase & {
  mintType: 'MerkleDrop'
  merkleRoot: string
  maxMintable: number
  maxMintablePerAccount: number
}

export type RangeEditionConfig = MintConfigBase & {
  mintType: 'RangeEdition'
  cutoffTime: number
  maxMintableLower: number
  maxMintableUpper: number
  maxMintablePerAccount: number
}

export type MintConfig = MerkleDropConfig | RangeEditionConfig

export type SuperMinterConfig = MintConfig & {
  maxMintable: number
  affiliateMerkleRoot: Hex
  tier: number
  platform: Address
  mode: number
  signer: Address
  merkleRoot: Hex
}
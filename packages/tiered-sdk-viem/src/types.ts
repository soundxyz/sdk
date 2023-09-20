import type { Address, FeeValuesEIP1559, PublicClient, TransactionRequestBase, WalletClient, BlockTag, Hex } from 'viem'
import type { MerkleProofProvider } from './merkle/types'
import type { SoundAPI } from './api'

export type BlockOrBlockTag = bigint | BlockTag

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

export interface TransactionGasOptions
  extends Partial<Pick<FeeValuesEIP1559, 'maxFeePerGas' | 'maxPriorityFeePerGas'>>,
    Pick<TransactionRequestBase, 'gas'> {}

export type EstimatableTransaction = {
  gasEstimate: bigint
  startTransaction: () => Promise<{ transactionHash: Address }>
}

export type ContractCall = {
  contractAddress: Address
  calldata: Address
}

/**
 * The arguments required by SoundEdition.initialize
 */
export type TieredEditionConfig = {
  name: string
  symbol: string
  metadataModule: Address
  baseURI: string
  contractURI: string
  fundingRecipient: Address
  royaltyBPS: number
  shouldFreezeMetadata: boolean
  shouldFreezeTierCreation: boolean
}

export type TierConfig = {
  tier: number
  cutoffTime: number
  isFrozen: boolean
  maxMintableLower: number
  maxMintableUpper: number
  mintRandomnessEnabled: false
  baseURI: string
}

type ScheduleConfigBase = {
  edition: Address
  tier: number
  scheduleNum: number
  platform: Address
  price: bigint
  startTime: number
  endTime: number
  maxMintablePerAccount: number
  maxMintable: number
  minted: number
  affiliateFeeBPS: number
  paused: boolean
  hasMints: boolean
  affiliateMerkleRoot: Hex
}
export type DefaultScheduleConfig = ScheduleConfigBase & {
  mode: 'DEFAULT'
}
export type MerkleScheduleConfig = ScheduleConfigBase & {
  mode: 'VERIFY_MERKLE'
  merkleRoot: Hex
}
export type SignatureScheduleConfig = ScheduleConfigBase & {
  mode: 'VERIFY_SIGNATURE'
  signer: Address
  usePlatformSigner: boolean
}
export type MinterScheduleConfig = DefaultScheduleConfig | MerkleScheduleConfig | SignatureScheduleConfig

export type ScheduleBase = ScheduleConfigBase & {
  minted: number
  hasMints: boolean
}
export type DefaultSchedule = ScheduleBase & {
  mode: 'DEFAULT'
}
export type MerkleSchedule = ScheduleBase & {
  mode: 'VERIFY_MERKLE'
  merkleRoot: Hex
}
export type SignatureSchedule = ScheduleBase & {
  mode: 'VERIFY_SIGNATURE'
  signer: Address
  usePlatformSigner: boolean
}

export type SuperMinterSchedule = DefaultSchedule | MerkleSchedule | SignatureSchedule

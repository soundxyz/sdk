import type { PublicClient, WalletClient } from 'viem'
import type { MerkleProofProvider } from './merkle/types'
import type { SoundAPI } from './api'

export type BlockOrBlockHash = string | number

export interface SoundContractValidation {
  /**
   * Assume valid Sound.xyz contract, skipping safety checks
   *
   * @default false
   */
  assumeValidSoundContract?: boolean
}

type LazyOption<T extends object> = T | (() => T | Promise<T>)

export type { PublicClient, WalletClient }

export type SoundClientContractProvider =
  | {
      client: LazyOption<PublicClient>
      account?: LazyOption<WalletClient>
    }
  | {
      client?: LazyOption<PublicClient>
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

export type ExpandTypeChainStructOutput<T> = Expand<Omit<T, keyof [] | number | `${number}`>>

export type Bytes = ArrayLike<number>

export type BytesLike = Bytes | string

export declare type PromiseOrValue<T> = T | Promise<T>

type TupleSplit<T, N extends number, O extends readonly any[] = readonly []> = O['length'] extends N
  ? [O, T]
  : T extends readonly [infer F, ...infer R]
  ? TupleSplit<readonly [...R], N, readonly [...O, F]>
  : [O, T]

export type TakeFirst<T extends readonly any[], N extends number> = TupleSplit<T, N>[0]

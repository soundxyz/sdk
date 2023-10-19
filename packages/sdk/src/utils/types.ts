import type { BlockTag, FeeValuesEIP1559, Hex, TransactionRequestBase } from 'viem'

export interface MerkleProofParameters {
  merkleRoot: string
  userAddress: string
}

export interface MerkleProvider {
  merkleProof(merkleProofParams: MerkleProofParameters): Promise<Hex[] | null> | Hex[] | null
}

export type LazyOption<T extends object> = T | (() => T | Promise<T>)

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

export declare type PromiseOrValue<T> = T | Promise<T>

export type FromBlock = bigint | BlockTag

export interface TransactionGasOptions
  extends Readonly<Partial<Pick<FeeValuesEIP1559, 'maxFeePerGas' | 'maxPriorityFeePerGas'>>>,
    Readonly<Pick<TransactionRequestBase, 'gas'>> {}

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type TypeFromUnion<Union extends { type: string }, Type extends string> = Union extends {
  type: Type
}
  ? Union
  : never

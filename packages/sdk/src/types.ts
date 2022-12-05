import type { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import type { interfaceIds } from '@soundxyz/sound-protocol'
import type { SoundAPI } from './api'
import type { MerkleProofProvider } from './merkle/types'
import type { SoundSubgraph } from './subgraph'

/*********************************************************
                PROTOCOL TYPES
 ********************************************************/

export type SignerOrProvider = Signer | Provider

export type BlockOrBlockHash = string | number

export interface MintOptions {
  /**
   * Mint Schedule to mint froms
   */
  mintSchedule: MintSchedule

  /**
   * Amount of NFTs to be minted
   */
  quantity: number

  /**
   * Optional affiliate address
   */
  affiliate?: string

  /**
   * Customize contract's call gas limit
   */
  gasLimit?: BigNumberish

  /**
   * Customize contract's call max fee per gas
   */
  maxFeePerGas?: BigNumberish

  /**
   * Customize contract's call max priority fee per gas
   */

  maxPriorityFeePerGas?: BigNumberish
}

export type MerkleProvider = MerkleProofProvider

export interface BaseSoundClientConfig {
  soundCreatorAddress?: string
  /**
   * @default console.error
   */
  onError?: (err: unknown) => void

  /**
   * Sound.xyz API instance
   */
  soundAPI?: SoundAPI

  /**
   * Sound's subgraph instance
   */
  soundSubgraph?: SoundSubgraph

  /**
   * Merkle provider to be used
   */
  merkleProvider?: MerkleProvider
}

type LazyOption<T extends object> = T | (() => T | Promise<T>)

export type { Signer, Provider }

export type SoundClientConfig = (
  | {
      provider: LazyOption<Provider>
      signer?: LazyOption<Signer>
    }
  | {
      provider?: LazyOption<Provider>
      signer: LazyOption<Signer>
    }
) &
  BaseSoundClientConfig

export type MintScheduleBase = {
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

export type MinterInterfaceId = typeof interfaceIds.IMerkleDropMinter | typeof interfaceIds.IRangeEditionMinter

export type RangeEditionSchedule = MintScheduleBase & {
  mintType: 'RangeEdition'
  maxMintableLower: number
  maxMintableUpper: number
  cutoffTime: number
  maxMintable: (unixTimestamp?: number) => number
}

export type MerkleDropSchedule = MintScheduleBase & {
  mintType: 'MerkleDrop'
  maxMintable: number
  merkleRoot: string
}

export type MintSchedule = RangeEditionSchedule | MerkleDropSchedule

export function isRangeEditionSchedule(schedule: MintSchedule): schedule is RangeEditionSchedule {
  return schedule.mintType === 'RangeEdition'
}

export function isMerkleDropSchedule(schedule: MintSchedule): schedule is MerkleDropSchedule {
  return schedule.mintType === 'MerkleDrop'
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
}

/**
 * The arguments required for all minter calls.
 */
export type MintConfigBase = {
  minterAddress: string
  price: BigNumberish
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

export function isMerkleDropConfig(config: MintConfig): config is MerkleDropConfig {
  return config.mintType === 'MerkleDrop'
}

export function isRangeEditionConfig(config: MintConfig): config is RangeEditionConfig {
  return config.mintType === 'RangeEdition'
}

export type ContractCall = {
  contractAddress: string
  calldata: string
}

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

import type { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import { interfaceIds } from '@soundxyz/sound-protocol'
import type { SoundAPI } from './api'
import type { MerkleProofProvider } from './merkle/types'
import type { ContractTransaction } from '@ethersproject/contracts'

/*********************************************************
                PROTOCOL TYPES
 ********************************************************/

export type SignerOrProvider = Signer | Provider

export type BlockOrBlockHash = string | number

export interface SoundContractValidation {
  /**
   * Assume valid Sound.xyz contract, skipping safety checks
   *
   * @default false
   */
  assumeValidSoundContract?: boolean
}

interface SharedMintOptions extends SoundContractValidation {
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
  merkleProof?: string[] | null
}

export interface MintOptions extends SharedMintOptions {
  /**
   * Mint Schedule to mint from
   */
  mintSchedule: MintSchedule
}

export interface MintToOptions extends SharedMintOptions {
  /**
   * Mint Schedule to mint from
   */
  mintSchedule: V2MintSchedule

  /**
   * Recipient address that should receive the NFT(s)
   */
  mintToAddress?: string

  attributonId?: BigNumberish

  affiliateProof?: BytesLike[]
}

export type MerkleProvider = MerkleProofProvider

export interface BaseSoundClientConfig {
  /**
   * Creator Address to be used as contract creator reference
   */
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
   * Merkle provider to be used
   */
  merkleProvider?: MerkleProvider
}

type LazyOption<T extends object> = T | (() => T | Promise<T>)

export type { Signer, Provider }

export type SoundClientContractProvider =
  | {
      provider: LazyOption<Provider>
      signer?: LazyOption<Signer>
    }
  | {
      provider?: LazyOption<Provider>
      signer: LazyOption<Signer>
    }

export type SoundClientConfig = SoundClientContractProvider & BaseSoundClientConfig

export interface SAM {
  basePrice: BigNumber
  inflectionPrice: BigNumber
  inflectionPoint: number

  balance: BigNumber

  supply: number
  maxSupply: number

  buyFreezeTime: number

  goldenEggFeesAccrued: BigNumber

  artistFeeBPS: number
  affiliateFeeBPS: number
  goldenEggFeeBPS: number
}

export interface MintScheduleBase {
  editionAddress: string
  minterAddress: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintablePerAccount: number
  totalMinted: number
  affiliateFeeBPS: number
}

export const HANDLED_MINTER_INTERFACE_IDS = [
  interfaceIds.IMerkleDropMinter,
  interfaceIds.IMerkleDropMinterV2,
  interfaceIds.IRangeEditionMinter,
  interfaceIds.IRangeEditionMinterV2,
] as const
export type MinterInterfaceId = (typeof HANDLED_MINTER_INTERFACE_IDS)[number]

export interface RangeEditionSchedule extends MintScheduleBase {
  mintType: 'RangeEdition'
  interfaceId: typeof interfaceIds.IRangeEditionMinter | typeof interfaceIds.IRangeEditionMinterV2
  maxMintableLower: number
  maxMintableUpper: number
  cutoffTime: number
  maxMintable: (unixTimestamp?: number) => number
}
export interface RangeEditionV1Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinter
}
export interface RangeEditionV2Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinterV2
}

export interface MerkleDropSchedule extends MintScheduleBase {
  mintType: 'MerkleDrop'
  interfaceId: typeof interfaceIds.IMerkleDropMinter | typeof interfaceIds.IMerkleDropMinterV2
  maxMintable: number
  merkleRoot: string
}
export interface MerkleDropV1Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinter
}
export interface MerkleDropV2Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinterV2
}

export type V2MintSchedule = RangeEditionV2Schedule | MerkleDropV2Schedule

export type MintSchedule = RangeEditionV1Schedule | MerkleDropV1Schedule | V2MintSchedule

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

  setSAM: SamConfig | null
}

export interface SamConfig {
  contractAddress: string

  basePrice: BigNumberish
  linearPriceSlope: BigNumberish
  inflectionPrice: BigNumberish
  inflectionPoint: BigNumberish

  artistFeeBPS: BigNumberish
  goldenEggFeeBPS: BigNumberish
  affiliateFeeBPS: BigNumberish
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

export { ContractErrorName, ContractErrorSigHashToName } from './utils/constants'

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

export type EstimatableTransaction = { gasEstimate: BigNumber; startTransaction: () => Promise<ContractTransaction> }

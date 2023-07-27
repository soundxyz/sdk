import type { PublicClient, WalletClient } from 'viem'
import type { MerkleProofProvider } from './merkle/types'
import type { SoundAPI } from './api'
import { interfaceIds } from '@soundxyz/sound-protocol/interfaceIds'

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

export type Bytes = ArrayLike<number>

export type BytesLike = Bytes | string

export declare type PromiseOrValue<T> = T | Promise<T>

type TupleSplit<T, N extends number, O extends readonly any[] = readonly []> = O['length'] extends N
  ? [O, T]
  : T extends readonly [infer F, ...infer R]
  ? TupleSplit<readonly [...R], N, readonly [...O, F]>
  : [O, T]

export type TakeFirst<T extends readonly any[], N extends number> = TupleSplit<T, N>[0]

export const HANDLED_MINTER_INTERFACE_IDS = [
  interfaceIds.IMerkleDropMinter,
  interfaceIds.IMerkleDropMinterV2,
  interfaceIds.IMerkleDropMinterV2_1,
  interfaceIds.IRangeEditionMinter,
  interfaceIds.IRangeEditionMinterV2,
  interfaceIds.IRangeEditionMinterV2_1,
] as const
export type MinterInterfaceId = (typeof HANDLED_MINTER_INTERFACE_IDS)[number]

export const HANDLED_SAM_INTERFACE_IDS = [interfaceIds.ISAM, interfaceIds.ISAMV1_1] as const
export type SAMInterfaceId = (typeof HANDLED_SAM_INTERFACE_IDS)[number]

export interface MintScheduleBase {
  editionAddress: string
  minterAddress: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: bigint
  maxMintablePerAccount: number
  totalMinted: number
  affiliateFeeBPS: number
  platformTransactionFee: bigint
}

export interface RangeEditionSchedule extends MintScheduleBase {
  mintType: 'RangeEdition'
  interfaceId:
    | typeof interfaceIds.IRangeEditionMinter
    | typeof interfaceIds.IRangeEditionMinterV2
    | typeof interfaceIds.IRangeEditionMinterV2_1
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

export interface RangeEditionV2_1Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinterV2_1
}

export interface MerkleDropSchedule extends MintScheduleBase {
  mintType: 'MerkleDrop'
  interfaceId:
    | typeof interfaceIds.IMerkleDropMinter
    | typeof interfaceIds.IMerkleDropMinterV2
    | typeof interfaceIds.IMerkleDropMinterV2_1
  maxMintable: number
  merkleRoot: string
}
export interface MerkleDropV1Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinter
}
export interface MerkleDropV2Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinterV2
}

export interface MerkleDropV2_1Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinterV2_1
}

export type V1MintSchedule = RangeEditionV1Schedule | MerkleDropV1Schedule
export type V2MintSchedule = RangeEditionV2Schedule | MerkleDropV2Schedule
export type V2_1MintSchedule = RangeEditionV2_1Schedule | MerkleDropV2_1Schedule

export type MintSchedule = V1MintSchedule | V2MintSchedule | V2_1MintSchedule

export function isRangeEditionSchedule(schedule: MintSchedule): schedule is RangeEditionSchedule {
  return schedule.mintType === 'RangeEdition'
}

export function isMerkleDropSchedule(schedule: MintSchedule): schedule is MerkleDropSchedule {
  return schedule.mintType === 'MerkleDrop'
}

import type { Address, Hex } from 'viem'

export interface MerkleProofParameters {
  merkleRoot: Hex
  userAddress: Address
}

export interface MerkleProofProvider {
  merkleProof(merkleProofParams: MerkleProofParameters): Promise<Hex[] | null> | Hex[] | null
}

export type MerkleProvider = MerkleProofProvider

export type ContractCall = {
  contractAddress: Address
  calldata: Address
}

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
  mintRandomnessEnabled: boolean
  baseURI: string
}

type ScheduleConfigBase = {
  tier: number
  platform: Address
  price: bigint
  startTime: number
  endTime: number
  maxMintablePerAccount: number
  maxMintable: number
  affiliateFeeBPS: number
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
  scheduleNum: number
  minted: number
  hasMints: boolean
  paused: boolean
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

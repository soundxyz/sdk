import type { Address, Hex, PublicClient } from 'viem'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { getTierCurrentMaxMintable } from './helpers'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../abi/super-minter'
import { nowUnixTimestamp } from '../../../utils/helpers'
import { curry } from '../../../utils/helpers'

export type GetEditionContractInfoParams = {
  edition: Address
}

export type GetEditionContractInfoReturnType = {
  baseURI: string
  contractURI: string
  name: string
  symbol: string
  fundingRecipient: Address
  metadataModule: Address
  isMetadataFrozen: boolean
  isCreateTierFrozen: boolean
  royaltyBPS: number
  nextTokenId: bigint
  totalBurned: bigint
  totalMinted: bigint
  totalSupply: bigint
  tierInfo: readonly {
    tier: number
    maxMintable: number | ((unixTimestamp?: number) => number)
    maxMintableLower: number
    maxMintableUpper: number
    cutoffTime: number
    minted: number
    mintRandomness: bigint
    mintConcluded: boolean
    mintRandomnessEnabled: boolean
    isFrozen: boolean
  }[]
}

export async function editionContractInfo<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { edition }: GetEditionContractInfoParams,
): Promise<GetEditionContractInfoReturnType> {
  const data = await client.readContract({
    abi: SOUND_EDITION_V2_ABI,
    address: edition,
    functionName: 'editionInfo',
  })

  return {
    ...data,
    tierInfo: data.tierInfo.map((tierInfo) => ({
      ...tierInfo,
      maxMintable:
        tierInfo.maxMintableLower === tierInfo.maxMintableUpper
          ? tierInfo.maxMintableLower
          : (unixTimestamp?: number) => getTierCurrentMaxMintable(tierInfo, unixTimestamp),
    })),
  }
}

export type TieredEditionConfig = {
  name: string
  symbol: string
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

export type GetMintingSchedulesParams = {
  editionAddress: Address
  unixTimestamp?: number
}

export type GetMintingSchedulesReturnType = {
  schedules: readonly SuperMinterSchedule[]
  activeSchedules: readonly SuperMinterSchedule[]
}

export async function mintingSchedules<Client extends Pick<PublicClient, 'readContract'>>(
  client: Client,
  { editionAddress, unixTimestamp = nowUnixTimestamp() }: GetMintingSchedulesParams,
): Promise<GetMintingSchedulesReturnType> {
  const schedules: SuperMinterSchedule[] = await client
    .readContract({
      abi: SUPER_MINTER_ABI,
      address: SUPER_MINTER_ADDRESS,
      functionName: 'mintInfoList',
      args: [editionAddress],
    })
    .then((schedules) =>
      schedules.map((schedule) => ({
        ...schedule,
        mode: schedule.mode === 0 ? 'DEFAULT' : schedule.mode === 1 ? 'VERIFY_MERKLE' : 'VERIFY_SIGNATURE',
      })),
    )

  const activeSchedules = schedules.filter((mintSchedule) => {
    return mintSchedule.startTime <= unixTimestamp && mintSchedule.endTime > unixTimestamp && !mintSchedule.paused
  })

  return {
    schedules,
    activeSchedules,
  }
}

export function editionV2PublicActionsInfo<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'estimateContractGas'> & { editionV2?: {} },
>(client: Client) {
  return {
    editionV2: {
      ...client.editionV2,
      info: curry(editionContractInfo)(client),
      mintSchedules: curry(mintingSchedules)(client),
    },
  }
}

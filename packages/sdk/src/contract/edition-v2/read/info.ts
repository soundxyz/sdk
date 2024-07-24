import type { Address, Hex, PublicClient } from 'viem'
import { curry, nowUnixTimestamp } from '../../../utils/helpers'
import { SOUND_EDITION_V2_ABI } from '../abi/sound-edition-v2'
import { getSuperMinterForEdition, getTierCurrentMaxMintable } from './helpers'
import { isSoundV2 } from './interface'

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
  {
    editionAddress,
  }: {
    editionAddress: Address
  },
): Promise<GetEditionContractInfoReturnType> {
  const data = await client.readContract({
    abi: SOUND_EDITION_V2_ABI,
    address: editionAddress,
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
}

export type PlatformAirdropScheduleConfig = ScheduleConfigBase & {
  mode: 'PLATFORM_AIRDROP'
}

export type MinterScheduleConfig =
  | DefaultScheduleConfig
  | MerkleScheduleConfig
  | SignatureScheduleConfig
  | PlatformAirdropScheduleConfig

export type ScheduleBase = ScheduleConfigBase & {
  minterAddress: Address
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
}
export type PlatformAirdropSchedule = ScheduleBase & {
  mode: 'PLATFORM_AIRDROP'
}

export type SuperMinterSchedule = DefaultSchedule | MerkleSchedule | SignatureSchedule | PlatformAirdropSchedule

export type GetMintingSchedulesParams = {
  editionAddress: Address
  unixTimestamp?: number
}

export type GetMintingSchedulesReturnType = {
  schedules: readonly SuperMinterSchedule[]
  activeSchedules: readonly SuperMinterSchedule[]
}

export async function mintingSchedules<Client extends Pick<PublicClient, 'readContract' | 'multicall'>>(
  client: Client,
  { editionAddress, unixTimestamp = nowUnixTimestamp() }: GetMintingSchedulesParams,
): Promise<GetMintingSchedulesReturnType> {
  const { address, abi } = await getSuperMinterForEdition(client, { editionAddress })

  const schedules: SuperMinterSchedule[] = await client
    .readContract({
      abi,
      address,
      functionName: 'mintInfoList',
      args: [editionAddress],
    })
    .then((schedules) =>
      schedules.map((schedule): SuperMinterSchedule => {
        const scheduleData = {
          ...schedule,
          minterAddress: address,
        } satisfies Omit<SuperMinterSchedule, 'mode'>
        switch (schedule.mode) {
          case 0: {
            return {
              ...scheduleData,
              mode: 'DEFAULT',
            }
          }
          case 1: {
            return {
              ...scheduleData,
              mode: 'VERIFY_MERKLE',
            }
          }
          case 2: {
            return {
              ...scheduleData,
              mode: 'VERIFY_SIGNATURE',
            }
          }
          case 3: {
            return {
              ...scheduleData,
              mode: 'PLATFORM_AIRDROP',
            }
          }
          default: {
            throw Error(`Unsupported schedule mode ${schedule.mode}`)
          }
        }
      }),
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
      isSoundV2: curry(isSoundV2)(client),

      info: curry(editionContractInfo)(client),
      mintSchedules: curry(mintingSchedules)(client),
    },
  }
}

import type { Hex, PublicClient } from 'viem'
import { Address } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'

export interface GetMintingSchedulesParams {
  editionAddress: Address
  superMinterAddress: Address
  unixTimestamp?: number
}

export interface ScheduleBase {
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
export interface DefaultSchedule extends ScheduleBase {
  type: 'DEFAULT'
}
export interface MerkleSchedule extends ScheduleBase {
  type: 'VERIFY_MERKLE'
  merkleRoot: Hex
}
export interface SignatureSchedules extends ScheduleBase {
  type: 'VERIFY_SIGNATURE'
  signer: Address
  usePlatformSigner: boolean
}

export type SuperMinterSchedule = DefaultSchedule | MerkleSchedule | SignatureSchedules

export interface GetMintingSchedulesReturnType {
  schedules: readonly SuperMinterSchedule[]
  activeSchedules: readonly SuperMinterSchedule[]
}

export async function getMintingSchedules(
  client: PublicClient,
  { editionAddress, superMinterAddress, unixTimestamp = Date.now() / 1000 }: GetMintingSchedulesParams,
): Promise<GetMintingSchedulesReturnType> {
  const schedules: SuperMinterSchedule[] = await client
    .readContract({
      abi: SuperMinterV1Config.abi,
      address: superMinterAddress,
      functionName: 'mintInfoList',
      args: [editionAddress],
    })
    .then((schedules) =>
      schedules.map((schedule) => ({
        ...schedule,
        type: schedule.mode === 0 ? 'DEFAULT' : schedule.mode === 1 ? 'VERIFY_MERKLE' : 'VERIFY_SIGNATURE',
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

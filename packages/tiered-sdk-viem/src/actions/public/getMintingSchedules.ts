import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'
import type { SuperMinterSchedule } from '../../types'

export type GetMintingSchedulesParams = {
  editionAddress: Address
  superMinterAddress: Address
  unixTimestamp?: number
}

export type GetMintingSchedulesReturnType = {
  schedules: readonly SuperMinterSchedule[]
  activeSchedules: readonly SuperMinterSchedule[]
}

export async function getMintingSchedules<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
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

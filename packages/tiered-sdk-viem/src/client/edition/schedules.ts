import { type Address } from 'viem'

import { SoundClientInstance } from '../instance'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'

export async function mintSchedules(
  this: SoundClientInstance,
  {
    editionAddress,
    superMinterAddress,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: Address
    superMinterAddress: Address
    timestamp?: number
  },
) {
  const { expectClient } = this
  const client = await expectClient()

  const schedules = await client.readContract({
    abi: SuperMinterV1Config.abi,
    address: superMinterAddress,
    functionName: 'mintInfoList',
    args: [editionAddress],
  })

  const activeSchedules = schedules.filter((mintSchedule) => {
    return mintSchedule.startTime <= timestamp && mintSchedule.endTime > timestamp && !mintSchedule.paused
  })

  return {
    schedules,
    activeSchedules,
  }
}

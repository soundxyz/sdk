import type { PublicClient } from 'viem'
import {
  type GetEditionContractInfoParams,
  type GetEditionContractInfoReturnType,
  getEditionContractInfo,
} from '../actions/public/getEditionContractInfo'
import {
  type GetMintingSchedulesParams,
  type GetMintingSchedulesReturnType,
  getMintingSchedules,
} from '../actions/public/getMintingSchedules'

export interface PublicEditionActions {
  getEditionContractInfo: (args: GetEditionContractInfoParams) => Promise<GetEditionContractInfoReturnType>
  getMintingSchedules: (args: GetMintingSchedulesParams) => Promise<GetMintingSchedulesReturnType>
}

export function publicEditionActions(client: PublicClient): PublicEditionActions {
  return {
    getEditionContractInfo: (args) => getEditionContractInfo(client, args),
    getMintingSchedules: (args) => getMintingSchedules(client, args),
  }
}

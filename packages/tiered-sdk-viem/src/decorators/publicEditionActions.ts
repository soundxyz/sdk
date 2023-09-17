import { PublicClient } from 'viem'
import {
  GetEditionContractInfoParams,
  GetEditionContractInfoReturnType,
  getEditionContractInfo,
} from '../actions/public/getEditionContractInfo'
import {
  GetMintingSchedulesParams,
  GetMintingSchedulesReturnType,
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

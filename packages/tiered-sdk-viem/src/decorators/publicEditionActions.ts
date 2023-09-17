import type { Chain, PublicClient, Transport } from 'viem'
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

export type PublicEditionActions = {
  getEditionContractInfo: (args: GetEditionContractInfoParams) => Promise<GetEditionContractInfoReturnType>
  getMintingSchedules: (args: GetMintingSchedulesParams) => Promise<GetMintingSchedulesReturnType>
}

export function publicEditionActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(client: PublicClient<TTransport, TChain>): PublicEditionActions {
  return {
    getEditionContractInfo: (args) => getEditionContractInfo(client, args),
    getMintingSchedules: (args) => getMintingSchedules(client, args),
  }
}

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
import {
  getExpectedEditionAddress,
  type GetExpectedEditionAddressParams,
  type GetExpectedEditionAddressReturnType,
} from '../actions/public/getExpectedEditionAddress'
import {
  getPlatformFees,
  type GetPlatformFeesParams,
  type GetPlatformFeesReturnType,
} from '../actions/public/getPlatformFees'

export type PublicTieredEditionActions = {
  getEditionContractInfo: (args: GetEditionContractInfoParams) => Promise<GetEditionContractInfoReturnType>
  getMintingSchedules: (args: GetMintingSchedulesParams) => Promise<GetMintingSchedulesReturnType>
  getExpectedEditionAddress: (args: GetExpectedEditionAddressParams) => Promise<GetExpectedEditionAddressReturnType>
  getPlatformFees: (args: GetPlatformFeesParams) => Promise<GetPlatformFeesReturnType>
}

export function publicTieredEditionActions<
  TTransport extends Transport = Transport,
  TChain extends Chain | undefined = Chain | undefined,
>(client: PublicClient<TTransport, TChain>): PublicTieredEditionActions {
  return {
    getEditionContractInfo: (args) => getEditionContractInfo<TChain>(client, args),
    getMintingSchedules: (args) => getMintingSchedules<TChain>(client, args),
    getExpectedEditionAddress: (args) => getExpectedEditionAddress<TChain>(client, args),
    getPlatformFees: (args) => getPlatformFees<TChain>(client, args),
  }
}

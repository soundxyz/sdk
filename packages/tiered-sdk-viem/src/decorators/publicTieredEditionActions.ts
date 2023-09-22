import type { Chain, PublicClient, Transport } from 'viem'
import type { GetCreateTieredEditionGasEstimateParams } from '../actions/public/getCreateTieredEditionGasEstimate'
import {
  getEditionContractInfo,
  type GetEditionContractInfoParams,
  type GetEditionContractInfoReturnType,
} from '../actions/public/getEditionContractInfo'
import {
  getExpectedEditionAddress,
  type GetExpectedEditionAddressParams,
  type GetExpectedEditionAddressReturnType,
} from '../actions/public/getExpectedEditionAddress'
import {
  getMintEligibility,
  type GetMintEligibilityParams,
  type GetMintEligibilityReturnType,
} from '../actions/public/getMintEligibility'
import {
  getMintingSchedules,
  type GetMintingSchedulesParams,
  type GetMintingSchedulesReturnType,
} from '../actions/public/getMintingSchedules'
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
  getMintEligibility: (args: GetMintEligibilityParams) => Promise<GetMintEligibilityReturnType>
  getCreateTieredEditionGasEstimate: (args: GetCreateTieredEditionGasEstimateParams) => Promise<bigint>
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
    getMintEligibility: (args) => getMintEligibility<TChain>(client, args),
    getCreateTieredEditionGasEstimate: (args) => getCreateTieredEditionGasEstimate(args),
  }
}
function getCreateTieredEditionGasEstimate(args: GetCreateTieredEditionGasEstimateParams): Promise<bigint> {
  throw new Error('Function not implemented.')
}

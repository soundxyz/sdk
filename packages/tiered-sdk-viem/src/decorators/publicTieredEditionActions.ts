import type { Chain, PublicClient, Transport } from 'viem'
import {
  estimateGasCreateTieredEdition,
  type EstimateGasCreateTieredEditionParams,
} from '../actions/public/estimateGasCreateTieredEdition'
import {
  estimateGasMintTieredEdition,
  type EstimateGasMintTieredEditionParams,
} from '../actions/public/estimateGasMintTieredEdition'
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
import {
  getTotalMintPriceAndFees,
  type GetTotalMintPriceAndFeesParams,
  type GetTotalMintPriceAndFeesReturnType,
} from '../actions/public/getTotalMintPriceAndFees'

export type PublicTieredEditionActions = {
  getEditionContractInfo: (args: GetEditionContractInfoParams) => Promise<GetEditionContractInfoReturnType>
  getMintingSchedules: (args: GetMintingSchedulesParams) => Promise<GetMintingSchedulesReturnType>
  getExpectedEditionAddress: (args: GetExpectedEditionAddressParams) => Promise<GetExpectedEditionAddressReturnType>
  getPlatformFees: (args: GetPlatformFeesParams) => Promise<GetPlatformFeesReturnType>
  getMintEligibility: (args: GetMintEligibilityParams) => Promise<GetMintEligibilityReturnType>
  estimateGasCreateTieredEdition: (args: EstimateGasCreateTieredEditionParams) => Promise<bigint>
  estimateGasMintTieredEdition: (args: EstimateGasMintTieredEditionParams) => Promise<bigint>
  getTotalMintPriceAndFees: (args: GetTotalMintPriceAndFeesParams) => Promise<GetTotalMintPriceAndFeesReturnType>
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
    estimateGasCreateTieredEdition: (args) => estimateGasCreateTieredEdition<TChain>(client, args),
    estimateGasMintTieredEdition: (args) => estimateGasMintTieredEdition<TChain>(client, args),
    getTotalMintPriceAndFees: (args) => getTotalMintPriceAndFees<TChain>(client, args),
  }
}

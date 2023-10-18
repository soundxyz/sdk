import type { PublicClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { getEditionInfo } from './info'
import {
  editionMintParameters,
  editionMintToParameters,
  eligibleQuantity,
  numberMinted,
  numberOfTokensOwned,
} from './mint'
import { isSoundV1_2_OrGreater } from './interface'
import {
  SamBuyParameters,
  SamContractAddress,
  SamEditionInfo,
  SamSellParameters,
  SamTotalBuyPrice,
  SamTotalSellPrice,
} from './sam'
import { editionMintSchedules, editionMintSchedulesFromIds, editionScheduleIds } from './schedules'

export function editionV1PublicActions<
  Client extends Pick<
    PublicClient,
    'readContract' | 'multicall' | 'estimateContractGas' | 'createEventFilter' | 'getFilterLogs'
  >,
>(client: Client) {
  return {
    editionV1: {
      getEditionInfo: curry(getEditionInfo)(client),

      mint: {
        numberOfTokensOwned: curry(numberOfTokensOwned)(client),
        numberMinted: curry(numberMinted)(client),
        eligibleQuantity: curry(eligibleQuantity)(client),
        mintParameters: curry(editionMintParameters)(client),
        mintToParameters: curry(editionMintToParameters)(client),
      },

      isSoundV1_2_OrGreater: curry(isSoundV1_2_OrGreater)(client),

      scheduleIds: curry(editionScheduleIds)(client),
      editionMintSchedules: curry(editionMintSchedules)(client),
      editionMintSchedulesFromIds: curry(editionMintSchedulesFromIds)(client),

      sam: {
        samAddress: curry(SamContractAddress)(client),

        info: curry(SamEditionInfo)(client),

        sell: {
          parameters: curry(SamSellParameters)(client),
          sellPrice: curry(SamTotalSellPrice)(client),
        },

        buy: {
          parameters: curry(SamBuyParameters)(client),
          buyPrice: curry(SamTotalBuyPrice)(client),
        },
      },
    },
  }
}

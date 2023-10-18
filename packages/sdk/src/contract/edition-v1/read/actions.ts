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
import type { MerkleProvider } from '../../../utils/types'

export function editionV1PublicActions<
  Client extends Pick<
    PublicClient,
    'readContract' | 'multicall' | 'estimateContractGas' | 'createEventFilter' | 'getFilterLogs'
  >,
>(client: Client) {
  return {
    editionV1: {
      getEditionInfo: curry(getEditionInfo)(client),

      mint({ merkleProvider }: { merkleProvider: MerkleProvider }) {
        return {
          numberOfTokensOwned: curry(numberOfTokensOwned)(client),
          numberMinted: curry(numberMinted)(client),

          eligibleQuantity: curry(eligibleQuantity)(client)({ merkleProvider }),

          mintParameters: curry(editionMintParameters)(client)({ merkleProvider }),
          mintToParameters: curry(editionMintToParameters)(client)({ merkleProvider }),
        }
      },

      isSoundV1_2_OrGreater: curry(isSoundV1_2_OrGreater)(client),

      scheduleIds: curry(editionScheduleIds)(client),
      editionMintSchedules: curry(editionMintSchedules)(client),
      editionMintSchedulesFromIds: curry(editionMintSchedulesFromIds)(client),

      sam: {
        samAddress: curry(SamContractAddress)(client),

        info: curry(SamEditionInfo)(client),

        sell: {
          sellParameters: curry(SamSellParameters)(client),
          sellPrice: curry(SamTotalSellPrice)(client),
        },

        buy: {
          buyParameters: curry(SamBuyParameters)(client),
          buyPrice: curry(SamTotalBuyPrice)(client),
        },
      },
    },
  }
}

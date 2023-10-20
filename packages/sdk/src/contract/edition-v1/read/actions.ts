import type { PublicClient } from 'viem'
import { curry } from '../../../utils/helpers'
import { editionContractInfo } from './info'
import {
  editionMintParameters,
  editionMintToParameters,
  eligibleQuantity,
  numberMinted,
  numberOfTokensOwned,
} from './mint'
import { isSoundV1, isSoundV1_2 } from './interface'
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
  > & { editionV1?: {}; merkleProvider: MerkleProvider },
>(client: Client) {
  return {
    editionV1: {
      ...client.editionV1,
      info: curry(editionContractInfo)(client),

      numberOfTokensOwned: curry(numberOfTokensOwned)(client),
      numberMinted: curry(numberMinted)(client),

      eligibleQuantity: curry(eligibleQuantity)(client)({ merkleProvider: client.merkleProvider }),

      mintParameters: curry(editionMintParameters)(client)({ merkleProvider: client.merkleProvider }),
      mintToParameters: curry(editionMintToParameters)(client)({ merkleProvider: client.merkleProvider }),

      isSoundV1: curry(isSoundV1)(client),
      isSoundV1_2: curry(isSoundV1_2)(client),

      scheduleIds: curry(editionScheduleIds)(client),

      mintSchedules: curry(editionMintSchedules)(client),
      mintSchedulesFromIds: curry(editionMintSchedulesFromIds)(client),

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

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

export function editionV1PublicActions<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'estimateContractGas'>,
>(client: Client) {
  return {
    editionV1: {
      getEditionInfo: curry(getEditionInfo)(client),
      numberOfTokensOwned: curry(numberOfTokensOwned)(client),
      numberMinted: curry(numberMinted)(client),
      eligibleQuantity: curry(eligibleQuantity)(client),
      editionMintParameters: curry(editionMintParameters)(client),
      editionMintToParameters: curry(editionMintToParameters)(client),

      isSoundV1_2_OrGreater: curry(isSoundV1_2_OrGreater)(client),

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

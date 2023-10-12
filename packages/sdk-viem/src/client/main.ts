import type { Address } from 'viem'
import type { SoundClientConfig } from '../types'
import { curry } from '../utils/helpers'
import { LazyPromise } from '../utils/promise'
import { createEdition, estimateCreateEdition, expectedEditionAddress } from './edition/create'
import { editionInfo } from './edition/info'
import { eligibleQuantity, estimateMint, mint, numberMinted, numberOfTokensOwned } from './edition/mint'
import { editionMinterMintIds, editionRegisteredMinters, editionScheduleIds, mintSchedules } from './edition/schedules'
import { SoundClientInstance } from './instance'
import { SamAvailableTokensToSell } from './sam/api'
import {
  SamBuy,
  SamContractAddress,
  SamEditionInfo,
  SamSell,
  SamTotalBuyPrice,
  SamTotalSellPrice,
} from './sam/contract'
import type { SamEditionAddress } from './sam/types'
import { isSoundEdition } from './validation'

export function SoundClient(config: SoundClientConfig) {
  const instance = SoundClientInstance(config)

  const client = instance

  return {
    instance,

    isSoundEdition: isSoundEdition.bind(instance),

    edition: {
      info: editionInfo.bind(client),

      mintSchedules: mintSchedules.bind(client),

      mint: mint.bind(client),
      estimateMint: estimateMint.bind(client),

      sam({ editionAddress }: SamEditionAddress) {
        return {
          contract: {
            address: LazyPromise(() => {
              return SamContractAddress.call(client, {
                editionAddress,
              })
            }),
            info: LazyPromise(() => {
              return SamEditionInfo.call(client, { editionAddress })
            }),

            totalBuyPrice: curry(SamTotalBuyPrice.bind(client))({ editionAddress }),
            totalSellPrice: curry(SamTotalSellPrice.bind(client))({ editionAddress }),

            buy: curry(SamBuy.bind(client))({ editionAddress }),
            sell: curry(SamSell.bind(client))({ editionAddress }),
          },
          api: {
            availableTokensToSell: curry(SamAvailableTokensToSell.bind(client))({ editionAddress }),
          },
        } as const
      },

      eligibleQuantity: eligibleQuantity.bind(client),
      numberOfTokensOwned: numberOfTokensOwned.bind(client),
      numberMinted: numberMinted.bind(client),

      scheduleIds: editionScheduleIds.bind(client),
      registeredMinters: editionRegisteredMinters.bind(client),
      minterMintIds: editionMinterMintIds.bind(client),
    },

    creation({ creatorAddress }: { creatorAddress: Address }) {
      return {
        createEdition: curry(createEdition.bind(client))({ creatorAddress }),
        estimateEdition: curry(estimateCreateEdition.bind(client))({ creatorAddress }),
        expectedEditionAddress: curry(expectedEditionAddress.bind(client))({ creatorAddress }),
      } as const
    },
  }
}

export type SoundClient = ReturnType<typeof SoundClient>

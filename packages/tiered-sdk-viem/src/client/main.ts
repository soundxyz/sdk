import type { SoundClientConfig } from '../types'
import { curry, validateAddress } from '../utils/helpers'
import { createEdition, estimateCreateEdition, expectedEditionAddress } from './edition/create'
// import { createEdition, estimateCreateEdition, expectedEditionAddress } from './edition/create'
import { editionInfo } from './edition/info'
import { mintSchedules } from './edition/schedules'
// import { eligibleQuantity, estimateMint, mint, numberMinted, numberOfTokensOwned } from './edition/mint'
// import { editionMinterMintIds, editionRegisteredMinters, editionScheduleIds, mintSchedules } from './edition/schedules'
import { SoundClientInstance } from './instance'

import { isSoundEdition, networkChainMatches } from './validation'

export function SoundClient(config: SoundClientConfig) {
  const instance = SoundClientInstance(config)

  const client = instance

  return {
    instance,

    isSoundEdition: isSoundEdition.bind(instance),
    networkChainMatches: networkChainMatches.bind(instance),

    edition: {
      info: editionInfo.bind(client),

      mintSchedules: mintSchedules.bind(client),

      // mint: mint.bind(client),
      // estimateMint: estimateMint.bind(client),

      // eligibleQuantity: eligibleQuantity.bind(client),
      // numberOfTokensOwned: numberOfTokensOwned.bind(client),
      // numberMinted: numberMinted.bind(client),

      // scheduleIds: editionScheduleIds.bind(client),
      // registeredMinters: editionRegisteredMinters.bind(client),
      // minterMintIds: editionMinterMintIds.bind(client),
    },

    creation({ creatorAddress }: { creatorAddress: string }) {
      validateAddress(creatorAddress, {
        type: 'CREATOR_ADDRESS',
        notNull: true,
      })

      return {
        createEdition: curry(createEdition.bind(client))({ creatorAddress }),
        estimateEdition: curry(estimateCreateEdition.bind(client))({ creatorAddress }),
        expectedEditionAddress: curry(expectedEditionAddress.bind(client))({ creatorAddress }),
      } as const
    },
  }
}

export type SoundClient = ReturnType<typeof SoundClient>

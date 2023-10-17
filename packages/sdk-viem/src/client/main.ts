import type { Address } from 'viem'
import type { EditionConfig, MintConfig, SoundClientConfig, TransactionGasOptions } from '../types'
import { curry } from '../utils/helpers'
import { LazyPromise } from '../utils/promise'
import {
  createEdition,
  estimateCreateEdition,
  expectedEditionAddress,
  type CreateEditionOptions,
} from './edition/create'
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
import type { SamBuyOptions, SamEditionAddress, SamSellOptions } from './sam/types'
import { isSoundEdition } from './validation'

export interface SoundClient {
  instance: SoundClientInstance
  isSoundEdition: typeof isSoundEdition

  edition: {
    info: typeof editionInfo
    mintSchedules: typeof mintSchedules
    mint: typeof mint
    estimateMint: typeof estimateMint
    sam: (args: SamEditionAddress) => {
      contract: {
        address: Promise<string | null>
        info: ReturnType<typeof SamEditionInfo>

        totalBuyPrice: (args: { offset: number; quantity: number }) => Promise<{
          total: bigint
          platformFee: bigint
          artistFee: bigint
          goldenEggFee: bigint
          affiliateFee: bigint
        } | null>
        totalSellPrice: (args: { offset: number; quantity: number }) => Promise<bigint | null>

        buy: (args: SamBuyOptions) => Promise<{
          transactionHash: Address
        }>

        sell: (args: SamSellOptions) => Promise<{
          transactionHash: Address
        }>
      }
      api: {
        availableTokensToSell: (args: { quantity: number; ownerPublicAddress: string }) => Promise<number[]>
      }
    }

    eligibleQuantity: typeof eligibleQuantity
    numberOfTokensOwned: typeof numberOfTokensOwned
    numberMinted: typeof numberMinted

    scheduleIds: typeof editionScheduleIds
    registeredMinters: typeof editionRegisteredMinters
    minterMintIds: typeof editionMinterMintIds
  }

  creation: ({ creatorAddress }: { creatorAddress: Address }) => {
    createEdition: (args: CreateEditionOptions) => Promise<Address>
    estimateEdition: (
      args: {
        editionConfig: EditionConfig
        mintConfigs: MintConfig[]
        salt?: string | number | undefined
      } & TransactionGasOptions,
    ) => ReturnType<typeof estimateCreateEdition>
    expectedEditionAddress: (args: { deployer: `0x${string}`; salt: string | number }) => Promise<{
      editionAddress: `0x${string}`
      exists: boolean
    }>
  }
}

export function SoundClient(config: SoundClientConfig): SoundClient {
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

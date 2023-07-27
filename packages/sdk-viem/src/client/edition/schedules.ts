import { interfaceIds } from '@soundxyz/sound-protocol'
import { IMinterModuleV2__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { UnsupportedMinterError } from '../../errors'
import {
  type BlockOrBlockHash,
  HANDLED_MINTER_INTERFACE_IDS,
  type MinterInterfaceId,
  type MintSchedule,
} from '../../types'
import { minterFactoryMap } from '../../utils/constants'
import { LazyPromise } from '../../utils/promise'
import { SoundClientInstance } from '../instance'
import { exhaustiveGuard, validateAddress } from '../../utils/helpers'
import { soundEditionV2Abi } from '../../abi/sound-edition-v2'
import { createEventFilter } from 'viem/dist/types/actions/public/createEventFilter'
import { parseAbiItem, type Address } from 'viem'
import { minterModuleV2_1Abi } from '../../abi/minter-module-v2_1'

export async function mintSchedules(
  this: SoundClientInstance,
  {
    editionAddress,
    scheduleIds: scheduleIdsArg,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: string
    scheduleIds?:
      | {
          minterAddress: string
          mintIds: number[]
        }[]
      | null
    timestamp?: number
  },
) {
  const scheduleIds =
    scheduleIdsArg ||
    (await editionScheduleIds.call(this, {
      editionAddress,
    }))

  const mintSchedulesLists = await Promise.all(
    scheduleIds.map(({ minterAddress, mintIds }) =>
      mintInfosFromMinter.call(this, { editionAddress, minterAddress, mintIds }),
    ),
  )

  const schedules = mintSchedulesLists.flat().sort((a, b) => {
    const startTimeDiff = a.startTime - b.startTime

    if (startTimeDiff !== 0) return startTimeDiff

    if (a.mintType === 'MerkleDrop' && b.mintType !== 'MerkleDrop') {
      return -1
    }

    if (b.mintType === 'MerkleDrop' && a.mintType !== 'MerkleDrop') {
      return 1
    }

    return 0
  })

  const activeSchedules = schedules.filter((mintSchedule) => {
    return mintSchedule.startTime <= timestamp && mintSchedule.endTime > timestamp && !isSchedulePaused(mintSchedule)
  })

  return {
    schedules,
    activeSchedules,
  }
}

export async function editionScheduleIds(
  this: SoundClientInstance,
  {
    editionAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    fromBlockOrBlockHash?: BlockOrBlockHash
  },
) {
  const minterAddresses = await editionRegisteredMinters.call(this, {
    editionAddress,
    fromBlockOrBlockHash,
  })

  return Promise.all(
    minterAddresses.map(async (minterAddress) => {
      return {
        minterAddress,
        mintIds: await editionMinterMintIds.call(this, {
          editionAddress,
          minterAddress,
          fromBlockOrBlockHash,
        }),
      }
    }),
  )
}

export function isSchedulePaused(schedule: MintSchedule) {
  return 'mintPaused' in schedule && schedule.mintPaused
}

export async function editionRegisteredMinters(
  this: SoundClientInstance,
  {
    editionAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    fromBlockOrBlockHash?: BlockOrBlockHash
  },
): Promise<string[]> {
  const {
    expectClient,
    instance: { onUnhandledError },
  } = this
  const client = await expectClient()

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  // const editionContract = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)

  // Get the addresses with MINTER_ROLE
  const minterRole = await client.readContract({
    abi: soundEditionV2Abi,
    address: editionAddress,
    functionName: 'MINTER_ROLE',
  })

  const rolesUpdatedFilter = await createEventFilter(client, {
    event: parseAbiItem('event RolesUpdated(address user,uint256 roles)'),
    fromBlock: fromBlockOrBlockHash != null ? BigInt(fromBlockOrBlockHash) : undefined,
    address: editionAddress,
    args: {
      roles: minterRole,
    },
  })

  const roleEvents = await client.getFilterLogs({
    filter: rolesUpdatedFilter,
  })

  const candidateMinters = Array.from(
    roleEvents.reduce((acc, event) => {
      if (event.args.user) acc.add(event.args.user)

      return acc
    }, new Set<Address>()),
  )

  // Check supportsInterface() to verify each address is a minter
  const minters = await Promise.all(
    candidateMinters.map(async (minterAddress) => {
      // const minterContract = IMinterModuleV2__factory.connect(minterAddress, providerOrSigner)

      try {
        const moduleInterfaceId = await client.readContract({
          abi: minterModuleV2_1Abi,
          address: minterAddress,
          functionName: 'moduleInterfaceId',
        })

        return HANDLED_MINTER_INTERFACE_IDS.indexOf(moduleInterfaceId as MinterInterfaceId) !== -1
          ? minterAddress
          : null
      } catch (err) {
        onUnhandledError(err)
        return null
      }
    }),
  )
  // This list may contain duplicates if MINTER_ROLE was granted multiple times
  const allMinters = minters.reduce((acc, minter) => {
    if (minter) acc.add(minter)
    return acc
  }, new Set<Address>())

  return Array.from(allMinters)
}

export async function editionMinterMintIds(
  this: SoundClientInstance,
  {
    editionAddress,
    minterAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    minterAddress: string
    fromBlockOrBlockHash?: BlockOrBlockHash
  },
) {
  const client = await this.expectClient()

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  validateAddress(minterAddress, {
    type: 'MINTER',
  })

  // Query MintConfigCreated event, for v1 and v2, this signature is the same

  const filter = await createEventFilter(client, {
    address: minterAddress,
    event: parseAbiItem(
      'event MintConfigCreated(address edition,address creator,uint128 mintId,uint32 startTime,uint32 endTime,uint16 affiliateFeeBPS)',
    ),
    fromBlock: fromBlockOrBlockHash != null ? BigInt(fromBlockOrBlockHash) : undefined,
    args: {
      edition: editionAddress,
    },
  })

  const mintScheduleConfigEvents = await client.getFilterLogs({
    filter,
  })

  return Array.from(
    mintScheduleConfigEvents.reduce((acc, event) => {
      if (event.args.mintId) acc.add(event.args.mintId)
      return acc
    }, new Set<bigint>()),
  )
}

/**
 * @private
 */
export async function mintInfosFromMinter(
  this: SoundClientInstance,
  {
    editionAddress,
    minterAddress,
    mintIds,
  }: {
    editionAddress: string
    minterAddress: string
    mintIds: number[]
  },
): Promise<MintSchedule[]> {
  const {
    expectClient,
    instance: { idempotentCachedCall },
  } = this

  validateAddress(editionAddress, {
    type: 'SOUND_EDITION',
  })

  validateAddress(minterAddress, {
    type: 'MINTER',
  })

  const clientPromise = LazyPromise(() => expectClient())

  const interfaceId = await idempotentCachedCall(`minter-interface-id-${minterAddress}`, async () => {
    const client = await clientPromise

    return client.readContract({
      abi: minterModuleV2_1Abi,
      address: minterAddress,
      functionName: 'moduleInterfaceId',
    })
  })

  return Promise.all(
    mintIds.map(async (mintId) => {
      if (HANDLED_MINTER_INTERFACE_IDS.findIndex((value) => value === interfaceId) === -1) {
        throw new UnsupportedMinterError({ interfaceId })
      }

      switch (interfaceId) {
        case interfaceIds.IRangeEditionMinter:
        case interfaceIds.IRangeEditionMinterV2:
        case interfaceIds.IRangeEditionMinterV2_1: {
          // const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, await signerOrProvider)

          const client = await clientPromise

          const minterAbi = minterFactoryMap[interfaceId]

          client.readContract({
            abi: minterAbi,
            address: minterAddress,
            functionName: '',
          })

          const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
          return {
            mintType: 'RangeEdition',
            interfaceId,
            mintId,
            editionAddress,
            minterAddress,
            startTime: mintSchedule.startTime,
            endTime: mintSchedule.endTime,
            mintPaused: mintSchedule.mintPaused,
            price: mintSchedule.price,
            maxMintableLower: mintSchedule.maxMintableLower,
            maxMintableUpper: mintSchedule.maxMintableUpper,
            cutoffTime: mintSchedule.cutoffTime,
            maxMintable: (unixTimestamp?: number) =>
              (unixTimestamp || Math.floor(Date.now() / 1000)) < mintSchedule.cutoffTime
                ? mintSchedule.maxMintableUpper
                : mintSchedule.maxMintableLower,
            maxMintablePerAccount: mintSchedule.maxMintablePerAccount,
            totalMinted: mintSchedule.totalMinted,
            affiliateFeeBPS: mintSchedule.affiliateFeeBPS,
            platformTransactionFee:
              'platformPerTxFlatFee' in mintSchedule ? mintSchedule.platformPerTxFlatFee : BigNumber.from(0),
          }
        }

        case interfaceIds.IMerkleDropMinter:
        case interfaceIds.IMerkleDropMinterV2:
        case interfaceIds.IMerkleDropMinterV2_1: {
          const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, await signerOrProvider)
          const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
          return {
            mintType: 'MerkleDrop',
            interfaceId,
            mintId,
            merkleRoot: mintSchedule.merkleRootHash,
            editionAddress,
            minterAddress,
            startTime: mintSchedule.startTime,
            endTime: mintSchedule.endTime,
            mintPaused: mintSchedule.mintPaused,
            price: mintSchedule.price,
            maxMintable: mintSchedule.maxMintable,
            maxMintablePerAccount: mintSchedule.maxMintablePerAccount,
            totalMinted: mintSchedule.totalMinted,
            affiliateFeeBPS: mintSchedule.affiliateFeeBPS,
            platformTransactionFee:
              'platformPerTxFlatFee' in mintSchedule ? mintSchedule.platformPerTxFlatFee : BigNumber.from(0),
          }
        }

        default: {
          exhaustiveGuard(interfaceId)
        }
      }
    }),
  )
}

import { type Address } from 'viem'

import { minterModuleV2_1Abi } from '../../abi/minter-module-v2_1'
import { soundEditionV1_2Abi } from '../../abi/sound-edition-v1_2'
import { UnsupportedMinterError } from '../../errors'
import {
  type BlockOrBlockTag,
  isHandledMinterInterfaceId,
  type MintSchedule,
  type RangeEditionV1Schedule,
  type RangeEditionV2Schedule,
  type RangeEditionV2_1Schedule,
  type MerkleDropV1Schedule,
  type MerkleDropV2Schedule,
  type MerkleDropV2_1Schedule,
} from '../../types'
import { minterAbiMap } from '../../utils/constants'
import { exhaustiveGuard } from '../../utils/helpers'
import { LazyPromise } from '../../utils/promise'
import { SoundClientInstance } from '../instance'
import { interfaceIds } from '../../constants'

export async function mintSchedules(
  this: SoundClientInstance,
  {
    editionAddress,
    scheduleIds: scheduleIdsArg,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: Address
    scheduleIds?:
      | {
          minterAddress: Address
          mintIds: (number | bigint)[]
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
    fromBlock,
  }: {
    editionAddress: Address
    fromBlock?: BlockOrBlockTag
  },
) {
  const minterAddresses = await editionRegisteredMinters.call(this, {
    editionAddress,
    fromBlock,
  })

  return Promise.all(
    minterAddresses.map(async (minterAddress) => {
      return {
        minterAddress,
        mintIds: await editionMinterMintIds.call(this, {
          editionAddress,
          minterAddress,
          fromBlock,
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
    fromBlock,
  }: {
    editionAddress: Address
    fromBlock?: BlockOrBlockTag
  },
): Promise<Address[]> {
  const {
    expectClient,
    instance: { onUnhandledError },
  } = this
  const client = await expectClient()

  // Get the addresses with MINTER_ROLE
  const minterRole = await client.readContract({
    abi: soundEditionV1_2Abi,
    address: editionAddress,
    functionName: 'MINTER_ROLE',
  })

  const rolesUpdatedFilter = await client.createEventFilter({
    event: {
      anonymous: false,
      inputs: [
        { indexed: true, internalType: 'address', name: 'user', type: 'address' },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'roles',
          type: 'uint256',
        },
      ],
      name: 'RolesUpdated',
      type: 'event',
    },
    fromBlock: fromBlock ?? 'earliest',
    address: editionAddress,
    args: {
      roles: minterRole,
    },
    strict: true,
  })

  const roleEvents = await client.getFilterLogs({
    filter: rolesUpdatedFilter,
  })

  const candidateMinters = Array.from(
    roleEvents.reduce((acc, event) => {
      if (event.args?.user) acc.add(event.args.user)

      return acc
    }, new Set<Address>()),
  )

  // Check supportsInterface() to verify each address is a minter
  const minters = await Promise.all(
    candidateMinters.map(async (minterAddress) => {
      try {
        const moduleInterfaceId = await client.readContract({
          abi: minterModuleV2_1Abi,
          address: minterAddress,
          functionName: 'moduleInterfaceId',
        })

        return isHandledMinterInterfaceId(moduleInterfaceId) ? minterAddress : null
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
    fromBlock,
  }: {
    editionAddress: Address
    minterAddress: Address
    fromBlock?: BlockOrBlockTag
  },
) {
  const client = await this.expectClient()

  // Query MintConfigCreated event, for v1 and v2, this signature is the same
  const filter = await client.createEventFilter({
    address: minterAddress,
    event: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'edition',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'creator',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint128',
          name: 'mintId',
          type: 'uint128',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'startTime',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'endTime',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint16',
          name: 'affiliateFeeBPS',
          type: 'uint16',
        },
      ],
      name: 'MintConfigCreated',
      type: 'event',
    },
    fromBlock: fromBlock ?? 'earliest',
    args: {
      edition: editionAddress,
    },
    strict: true,
  })

  const mintScheduleConfigEvents = await client.getFilterLogs({
    filter,
  })

  return Array.from(
    mintScheduleConfigEvents.reduce((acc, event) => {
      if (event.args?.mintId != null) acc.add(event.args.mintId)
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
    editionAddress: Address
    minterAddress: Address
    mintIds: (number | bigint)[]
  },
): Promise<MintSchedule[]> {
  const {
    expectClient,
    instance: { idempotentCachedCall },
  } = this

  const clientPromise = LazyPromise(() => expectClient())

  const interfaceId = await idempotentCachedCall(`minter-interface-id-${minterAddress}`, async () => {
    const client = await clientPromise

    return client.readContract({
      abi: minterModuleV2_1Abi,
      address: minterAddress,
      functionName: 'moduleInterfaceId',
    })
  })

  if (!isHandledMinterInterfaceId(interfaceId)) {
    throw new UnsupportedMinterError({ interfaceId })
  }

  const { readContract, multicall } = await clientPromise

  return Promise.all(
    mintIds.map(async (mintId): Promise<MintSchedule> => {
      switch (interfaceId) {
        case interfaceIds.IRangeEditionMinter: {
          const scheduleInfo = await readContract({
            abi: minterAbiMap[interfaceId],
            address: minterAddress,
            functionName: 'mintInfo',
            args: [editionAddress, BigInt(mintId)],
          })

          return {
            mintType: 'RangeEdition',
            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            cutoffTime: scheduleInfo.cutoffTime,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,
            maxMintable: (unixTimestamp?: number) =>
              (unixTimestamp || Math.floor(Date.now() / 1000)) < scheduleInfo.cutoffTime
                ? scheduleInfo.maxMintableUpper
                : scheduleInfo.maxMintableLower,
            maxMintableLower: scheduleInfo.maxMintableLower,
            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            maxMintableUpper: scheduleInfo.maxMintableUpper,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            platformPerTokenFee: 0n,
            platformPerTransactionFee: 0n,
          } satisfies RangeEditionV1Schedule
        }
        case interfaceIds.IRangeEditionMinterV2: {
          const [scheduleInfo, platformPerTokenFee] = await multicall({
            contracts: [
              {
                abi: minterAbiMap[interfaceId],
                address: minterAddress,
                functionName: 'mintInfo',
                args: [editionAddress, BigInt(mintId)],
              },
              {
                abi: minterAbiMap[interfaceId],
                address: minterAddress,
                functionName: 'platformFlatFee',
              },
            ],
            allowFailure: false,
          })

          return {
            mintType: 'RangeEdition',
            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            cutoffTime: scheduleInfo.cutoffTime,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,
            maxMintable: (unixTimestamp?: number) =>
              (unixTimestamp || Math.floor(Date.now() / 1000)) < scheduleInfo.cutoffTime
                ? scheduleInfo.maxMintableUpper
                : scheduleInfo.maxMintableLower,
            maxMintableLower: scheduleInfo.maxMintableLower,
            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            maxMintableUpper: scheduleInfo.maxMintableUpper,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            platformPerTokenFee,
            platformPerTransactionFee: 0n,
          } satisfies RangeEditionV2Schedule
        }

        case interfaceIds.IRangeEditionMinterV2_1: {
          const scheduleInfo = await readContract({
            abi: minterAbiMap[interfaceId],
            address: minterAddress,
            args: [editionAddress, BigInt(mintId)],
            functionName: 'mintInfo',
          })

          return {
            mintType: 'RangeEdition',
            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            cutoffTime: scheduleInfo.cutoffTime,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,
            maxMintable: (unixTimestamp?: number) =>
              (unixTimestamp || Math.floor(Date.now() / 1000)) < scheduleInfo.cutoffTime
                ? scheduleInfo.maxMintableUpper
                : scheduleInfo.maxMintableLower,
            maxMintableLower: scheduleInfo.maxMintableLower,
            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            maxMintableUpper: scheduleInfo.maxMintableUpper,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            platformPerTokenFee: scheduleInfo.platformFlatFee,
            platformPerTransactionFee: scheduleInfo.platformPerTxFlatFee,
          } satisfies RangeEditionV2_1Schedule
        }
        case interfaceIds.IMerkleDropMinter: {
          const scheduleInfo = await readContract({
            abi: minterAbiMap[interfaceId],
            address: minterAddress,
            functionName: 'mintInfo',
            args: [editionAddress, BigInt(mintId)],
          })

          return {
            mintType: 'MerkleDrop',

            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,

            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            maxMintable: scheduleInfo.maxMintable,

            merkleRoot: scheduleInfo.merkleRootHash,

            platformPerTokenFee: 0n,
            platformPerTransactionFee: 0n,
          } satisfies MerkleDropV1Schedule
        }
        case interfaceIds.IMerkleDropMinterV2: {
          const [scheduleInfo, platformPerTokenFee] = await multicall({
            contracts: [
              {
                abi: minterAbiMap[interfaceId],
                address: minterAddress,
                functionName: 'mintInfo',
                args: [editionAddress, BigInt(mintId)],
              },
              {
                abi: minterAbiMap[interfaceId],
                address: minterAddress,
                functionName: 'platformFlatFee',
              },
            ],
            allowFailure: false,
          })

          return {
            mintType: 'MerkleDrop',

            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,

            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            maxMintable: scheduleInfo.maxMintable,

            merkleRoot: scheduleInfo.merkleRootHash,

            platformPerTokenFee,
            platformPerTransactionFee: 0n,
          } satisfies MerkleDropV2Schedule
        }
        case interfaceIds.IMerkleDropMinterV2_1: {
          const scheduleInfo = await readContract({
            abi: minterAbiMap[interfaceId],
            address: minterAddress,
            args: [editionAddress, BigInt(mintId)],
            functionName: 'mintInfo',
          })

          return {
            mintType: 'MerkleDrop',

            affiliateFeeBPS: scheduleInfo.affiliateFeeBPS,
            editionAddress: editionAddress,
            endTime: scheduleInfo.endTime,
            interfaceId,

            maxMintablePerAccount: scheduleInfo.maxMintablePerAccount,
            minterAddress,
            mintId: BigInt(mintId),
            mintPaused: scheduleInfo.mintPaused,
            price: scheduleInfo.price,
            startTime: scheduleInfo.startTime,
            totalMinted: scheduleInfo.totalMinted,
            maxMintable: scheduleInfo.maxMintable,

            merkleRoot: scheduleInfo.merkleRootHash,

            platformPerTokenFee: scheduleInfo.platformFlatFee,
            platformPerTransactionFee: scheduleInfo.platformPerTxFlatFee,
          } satisfies MerkleDropV2_1Schedule
        }

        default: {
          exhaustiveGuard(interfaceId)
        }
      }
    }),
  )
}

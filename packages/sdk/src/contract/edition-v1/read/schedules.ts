import type { Address, Hex, PublicClient } from 'viem'
import { soundEditionV1_2Abi } from '../abi/sound-edition-v1_2'
import { minterModuleV2_1Abi } from '../abi/minter-module-v2_1'
import { interfaceIds } from '../interfaceIds'
import type { FromBlock } from '../../../utils/types'
import { UnsupportedMinterError } from '../../../utils/errors'
import { rangeEditionMinterV1Abi } from '../abi/range-edition-minter-v1'
import { rangeEditionMinterV2Abi } from '../abi/range-edition-minter-v2'
import { rangeEditionMinterV2_1Abi } from '../abi/range-edition-minter-v2_1'
import { merkleDropMinterV1Abi } from '../abi/merkle-drop-minter-v1'
import { merkleDropMinterV2Abi } from '../abi/merkle-drop-minter-v2'
import { merkleDropMinterV2_1Abi } from '../abi/merkle-drop-minter-v2_1'
import { exhaustiveGuard, nowUnixTimestamp } from '../../../utils/helpers'

const HANDLED_MINTER_INTERFACE_IDS = [
  interfaceIds.IMerkleDropMinter,
  interfaceIds.IMerkleDropMinterV2,
  interfaceIds.IMerkleDropMinterV2_1,
  interfaceIds.IRangeEditionMinter,
  interfaceIds.IRangeEditionMinterV2,
  interfaceIds.IRangeEditionMinterV2_1,
] as const
const HANDLED_MINTER_INTERFACE_IDS_SET: Set<string> = new Set(HANDLED_MINTER_INTERFACE_IDS)

type MinterInterfaceId = (typeof HANDLED_MINTER_INTERFACE_IDS)[number]
export function isHandledMinterInterfaceId(interfaceId: string): interfaceId is MinterInterfaceId {
  return HANDLED_MINTER_INTERFACE_IDS_SET.has(interfaceId)
}

export async function editionRegisteredMinters<
  Client extends Pick<PublicClient, 'readContract' | 'createEventFilter' | 'getFilterLogs'>,
>(
  client: Client,
  {
    editionAddress,
    fromBlock = 'earliest',
    onUnhandledError = console.error,
  }: {
    editionAddress: Address
    fromBlock?: FromBlock
    onUnhandledError?: (err: unknown) => void
  },
) {
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
    fromBlock,
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

export async function editionMinterMintIds<Client extends Pick<PublicClient, 'createEventFilter' | 'getFilterLogs'>>(
  client: Client,
  {
    editionAddress,
    minterAddress,
    fromBlock = 'earliest',
  }: {
    editionAddress: Address
    minterAddress: Address
    fromBlock?: FromBlock
  },
) {
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
    fromBlock,
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

export async function editionScheduleIds<
  Client extends Pick<PublicClient, 'createEventFilter' | 'getFilterLogs' | 'readContract'>,
>(
  client: Client,
  {
    editionAddress,
    fromBlock,
  }: {
    editionAddress: Address
    fromBlock?: FromBlock
  },
) {
  const minterAddresses = await editionRegisteredMinters(client, {
    editionAddress,
    fromBlock,
  })

  return await Promise.all(
    minterAddresses.map(async (minterAddress) => {
      return {
        minterAddress,
        mintIds: await editionMinterMintIds(client, {
          editionAddress,
          minterAddress,
          fromBlock,
        }),
      }
    }),
  )
}

export interface MintScheduleBase {
  editionAddress: Address
  minterAddress: Address
  mintId: bigint
  startTime: number
  endTime: number
  mintPaused: boolean
  price: bigint
  maxMintablePerAccount: number
  totalMinted: number
  affiliateFeeBPS: number
  platformPerTransactionFee: bigint
  platformPerTokenFee: bigint
}

export interface RangeEditionSchedule extends MintScheduleBase {
  mintType: 'RangeEdition'
  interfaceId:
    | typeof interfaceIds.IRangeEditionMinter
    | typeof interfaceIds.IRangeEditionMinterV2
    | typeof interfaceIds.IRangeEditionMinterV2_1
  maxMintableLower: number
  maxMintableUpper: number
  cutoffTime: number
  maxMintable: (unixTimestamp?: number) => number
}
export interface RangeEditionV1Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinter
}
export interface RangeEditionV2Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinterV2
}

export interface RangeEditionV2_1Schedule extends RangeEditionSchedule {
  interfaceId: typeof interfaceIds.IRangeEditionMinterV2_1
}

export interface MerkleDropSchedule extends MintScheduleBase {
  mintType: 'MerkleDrop'
  interfaceId:
    | typeof interfaceIds.IMerkleDropMinter
    | typeof interfaceIds.IMerkleDropMinterV2
    | typeof interfaceIds.IMerkleDropMinterV2_1
  maxMintable: number
  merkleRoot: Hex
}
export interface MerkleDropV1Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinter
}
export interface MerkleDropV2Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinterV2
}

export interface MerkleDropV2_1Schedule extends MerkleDropSchedule {
  interfaceId: typeof interfaceIds.IMerkleDropMinterV2_1
}

export type V1MintSchedule = RangeEditionV1Schedule | MerkleDropV1Schedule
export type V2MintSchedule = RangeEditionV2Schedule | MerkleDropV2Schedule
export type V2_1MintSchedule = RangeEditionV2_1Schedule | MerkleDropV2_1Schedule

export type MintSchedule = V1MintSchedule | V2MintSchedule | V2_1MintSchedule

export const minterAbiMap = {
  [interfaceIds.IRangeEditionMinter]: rangeEditionMinterV1Abi,
  [interfaceIds.IRangeEditionMinterV2]: rangeEditionMinterV2Abi,
  [interfaceIds.IRangeEditionMinterV2_1]: rangeEditionMinterV2_1Abi,
  [interfaceIds.IMerkleDropMinter]: merkleDropMinterV1Abi,
  [interfaceIds.IMerkleDropMinterV2]: merkleDropMinterV2Abi,
  [interfaceIds.IMerkleDropMinterV2_1]: merkleDropMinterV2_1Abi,
} as const

export async function mintInfosFromMinter<Client extends Pick<PublicClient, 'readContract' | 'multicall'>>(
  client: Client,
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
  const interfaceId = await client.readContract({
    abi: minterModuleV2_1Abi,
    address: minterAddress,
    functionName: 'moduleInterfaceId',
  })

  if (!isHandledMinterInterfaceId(interfaceId)) {
    throw new UnsupportedMinterError({ interfaceId })
  }

  return await Promise.all(
    mintIds.map(async (mintId): Promise<MintSchedule> => {
      switch (interfaceId) {
        case interfaceIds.IRangeEditionMinter: {
          const scheduleInfo = await client.readContract({
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
          const [scheduleInfo, platformPerTokenFee] = await client.multicall({
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
          const scheduleInfo = await client.readContract({
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
          const scheduleInfo = await client.readContract({
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
          const [scheduleInfo, platformPerTokenFee] = await client.multicall({
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
          const scheduleInfo = await client.readContract({
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

export async function editionMintSchedulesFromIds<Client extends Pick<PublicClient, 'readContract' | 'multicall'>>(
  client: Client,
  {
    editionAddress,
    scheduleIds,
    timestamp = nowUnixTimestamp(),
  }: {
    editionAddress: Address
    scheduleIds: {
      minterAddress: Address
      mintIds: (number | bigint)[]
    }[]

    timestamp?: number
  },
) {
  const mintSchedulesLists = await Promise.all(
    scheduleIds.map(({ minterAddress, mintIds }) =>
      mintInfosFromMinter(client, { editionAddress, minterAddress, mintIds }),
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
    return mintSchedule.startTime <= timestamp && mintSchedule.endTime > timestamp && !mintSchedule.mintPaused
  })

  return {
    schedules,
    activeSchedules,
  }
}

export async function editionMintSchedules<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'createEventFilter' | 'getFilterLogs'>,
>(
  client: Client,
  {
    editionAddress,

    fromBlock,

    timestamp = nowUnixTimestamp(),
  }: {
    editionAddress: Address

    fromBlock?: FromBlock

    timestamp?: number
  },
) {
  const scheduleIds = await editionScheduleIds(client, {
    editionAddress,

    fromBlock,
  })

  return await editionMintSchedulesFromIds(client, {
    editionAddress,
    scheduleIds,
    timestamp,
  })
}

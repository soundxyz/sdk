import { interfaceIds } from '@soundxyz/sound-protocol'
import { IMinterModule__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { UnsupportedMinterError } from '../../errors'
import { BlockOrBlockHash, MinterInterfaceId, MintSchedule } from '../../types'
import { minterFactoryMap } from '../../utils/constants'
import { SoundClientInstance } from '../instance'

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

  const schedules = mintSchedulesLists.flat().sort((a, b) => a.startTime - b.startTime)

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
    fromBlockOrBlockHash: BlockOrBlockHash | undefined
  },
): Promise<string[]> {
  const {
    expectSignerOrProvider,
    instance: { onUnhandledError },
  } = this
  const { signerOrProvider } = await expectSignerOrProvider()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, signerOrProvider)
  // Get the addresses with MINTER_ROLE
  const minterRole = await editionContract.MINTER_ROLE()
  const filter = editionContract.filters.RolesUpdated(undefined, minterRole)

  const roleEvents = await editionContract.queryFilter(filter, fromBlockOrBlockHash)
  const candidateMinters = roleEvents.map((event) => event.args.user)

  // Check supportsInterface() to verify each address is a minter
  const minters = await Promise.all(
    candidateMinters.map(async (minterAddress) => {
      const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)

      try {
        const isMinter = await minterContract.supportsInterface(interfaceIds.IMinterModule)

        return isMinter ? minterAddress : null
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
  }, new Set<string>())

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
    fromBlockOrBlockHash: BlockOrBlockHash | undefined
  },
) {
  const { signerOrProvider } = await this.expectSignerOrProvider()

  // Query MintConfigCreated event
  const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
  const filter = minterContract.filters.MintConfigCreated(editionAddress)
  const mintScheduleConfigEvents = await minterContract.queryFilter(filter, fromBlockOrBlockHash)
  return mintScheduleConfigEvents.map((event) => event.args.mintId.toNumber())
}

/**
 * @private
 */
async function mintInfosFromMinter(
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
  const { signerOrProvider } = await this.expectSignerOrProvider()

  return Promise.all(
    mintIds.map(async (mintId) => {
      const minterModule = IMinterModule__factory.connect(minterAddress, signerOrProvider)
      const interfaceId = (await minterModule.moduleInterfaceId()) as MinterInterfaceId

      switch (interfaceId) {
        case interfaceIds.IRangeEditionMinter: {
          const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
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
          }
        }
        case interfaceIds.IMerkleDropMinter: {
          const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
          const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
          return {
            mintType: 'MerkleDrop',
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
          }
        }
        default: {
          throw new UnsupportedMinterError({ interfaceId })
        }
      }
    }),
  )
}

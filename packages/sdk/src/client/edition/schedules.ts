import { interfaceIds } from '@soundxyz/sound-protocol'
import { IMinterModuleV2__factory, SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'

import { UnsupportedMinterError } from '../../errors'
import { BlockOrBlockHash, HANDLED_MINTER_INTERFACE_IDS, MinterInterfaceId, MintSchedule } from '../../types'
import { minterFactoryMap } from '../../utils/constants'
import { LazyPromise } from '../../utils/promise'
import { SoundClientInstance } from '../instance'
import { exhaustiveGuard } from '../../utils/helpers'
import { BigNumber } from '@ethersproject/bignumber'

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
    expectProviderOrSigner,
    instance: { onUnhandledError },
  } = this
  const { providerOrSigner } = await expectProviderOrSigner()

  const editionContract = SoundEditionV1_2__factory.connect(editionAddress, providerOrSigner)
  // Get the addresses with MINTER_ROLE
  const minterRole = await editionContract.MINTER_ROLE()
  const filter = editionContract.filters.RolesUpdated(undefined, minterRole)

  const roleEvents = await editionContract.queryFilter(filter, fromBlockOrBlockHash)
  const candidateMinters = roleEvents.map((event) => event.args.user)

  // Check supportsInterface() to verify each address is a minter
  const minters = await Promise.all(
    candidateMinters.map(async (minterAddress) => {
      const minterContract = IMinterModuleV2__factory.connect(minterAddress, providerOrSigner)

      try {
        const moduleInterfaceId = await minterContract.moduleInterfaceId()

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
    fromBlockOrBlockHash?: BlockOrBlockHash
  },
) {
  const { providerOrSigner } = await this.expectProviderOrSigner()

  // Query MintConfigCreated event, for v1 and v2, this signature is the same
  const minterContract = IMinterModuleV2__factory.connect(minterAddress, providerOrSigner)
  const filter = minterContract.filters.MintConfigCreated(editionAddress)
  const mintScheduleConfigEvents = await minterContract.queryFilter(filter, fromBlockOrBlockHash)
  return mintScheduleConfigEvents.map((event) => event.args.mintId.toNumber())
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
    expectProviderOrSigner,
    instance: { idempotentCachedCall },
  } = this

  const signerOrProvider = LazyPromise(() => expectProviderOrSigner().then((v) => v.providerOrSigner))

  const interfaceId = await idempotentCachedCall(`minter-interface-id-${minterAddress}`, async () => {
    const minterModule = IMinterModuleV2__factory.connect(minterAddress, await signerOrProvider)

    return (await minterModule.moduleInterfaceId()) as MinterInterfaceId
  })

  return Promise.all(
    mintIds.map(async (mintId) => {
      if (HANDLED_MINTER_INTERFACE_IDS.indexOf(interfaceId) === -1) {
        throw new UnsupportedMinterError({ interfaceId })
      }

      switch (interfaceId) {
        case interfaceIds.IRangeEditionMinter:
        case interfaceIds.IRangeEditionMinterV2:
        case interfaceIds.IRangeEditionMinterV2_1: {
          const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, await signerOrProvider)
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

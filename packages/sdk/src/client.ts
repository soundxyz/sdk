import { Provider } from '@ethersproject/abstract-provider'
import {
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundEditionV1__factory,
} from '@soundxyz/sound-protocol/typechain/index'

import { interfaceIds, minterFactoryMap } from './config'
import { MissingSignerError, MissingSignerOrProviderError, NotSoundEditionError } from './errors'
import { MintInfo, SignerOrProvider, SoundClientConfig } from './types'
import { validateAddress } from './utils/helpers'

import type { Signer } from '@ethersproject/abstract-signer'

export class SoundClient {
  private readonly _provider?: Provider
  private readonly _signer?: Signer
  private readonly _apiKey: string

  constructor({ signer, provider, apiKey }: SoundClientConfig) {
    this._signer = signer
    this._provider = provider
    this._apiKey = apiKey
  }

  // If the contract address is a SoundEdition contract
  async isSoundEdition({ editionAddress }: { editionAddress: string }): Promise<boolean> {
    validateAddress(editionAddress)
    const signerOrProvider = this._requireSignerOrProvider()

    const editionContract = SoundEditionV1__factory.connect(editionAddress, signerOrProvider)

    try {
      return await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
    } catch (err) {
      console.error(err)
      return false
    }
  }

  // All the minting schedules for a given edition, including past and future
  async allMintsForEdition({ editionAddress }: { editionAddress: string }): Promise<MintInfo[]> {
    validateAddress(editionAddress)
    this._requireValidSoundEdition({ editionAddress })

    return this._allMintInfos({ editionAddress })
  }

  // Active minter schedules for a given edition
  async activeMintsForEdition({
    editionAddress,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: string
    timestamp?: number
  }): Promise<MintInfo[]> {
    validateAddress(editionAddress)
    this._requireValidSoundEdition({ editionAddress })

    const mintInfos = await this._allMintInfos({ editionAddress })

    // Filter mints that are live during the given timestamp
    return mintInfos
      .filter((mintInfo) => {
        return mintInfo.startTime <= timestamp && mintInfo.endTime > timestamp && !mintInfo.mintPaused
      })
      .sort((a, b) => a.startTime - b.startTime)
  }

  async eligibleMintQuantity({
    mintInfo,
    timestamp = Math.floor(Date.now() / 1000),
    userAddress,
  }: {
    mintInfo: MintInfo
    timestamp?: number
    userAddress: string
  }): Promise<number> {
    // check valid mint time
    if (timestamp < mintInfo.startTime || timestamp > mintInfo.endTime || mintInfo.mintPaused) {
      return 0
    }

    // check max mintable for this schedule
    if (typeof mintInfo.maxMintable === 'object') {
      // handle range edition case
      const maxQty =
        timestamp < mintInfo.maxMintable.closingTime
          ? mintInfo.maxMintable.maxMintableUpper
          : mintInfo.maxMintable.maxMintableLower

      if (mintInfo.totalMinted >= maxQty) {
        return 0
      }
    } else if (mintInfo.totalMinted >= mintInfo.maxMintable) {
      return 0
    }

    const signerOrProvider = this._requireSignerOrProvider()
    // look up max mintable per account and user's already minted tally
    switch (mintInfo.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        const userBalanceBigNum = await RangeEditionMinter__factory.connect(
          mintInfo.minterAddress,
          signerOrProvider,
        ).mintedTallies(mintInfo.editionAddress, mintInfo.mintId, userAddress)

        const userMintedBalance = userBalanceBigNum.toNumber()
        return mintInfo.maxMintablePerAccount - userMintedBalance
      }

      case interfaceIds.IMerkleDropMinter: {
        const userBalanceBigNum = await MerkleDropMinter__factory.connect(
          mintInfo.minterAddress,
          signerOrProvider,
        ).mintedTallies(mintInfo.editionAddress, mintInfo.mintId, userAddress)

        const userMintedBalance = userBalanceBigNum.toNumber()
        return mintInfo.maxMintablePerAccount - userMintedBalance
      }

      default:
        throw new Error('Unimplemented')
    }
  }

  // Addresses with MINTER_ROLE for a given edition
  private async _registeredMinters({ editionAddress }: { editionAddress: string }): Promise<string[]> {
    const signerOrProvider = this._requireSignerOrProvider()

    const editionContract = SoundEditionV1__factory.connect(editionAddress, signerOrProvider)
    // Get the addresses with MINTER_ROLE
    const minterRole = await editionContract.MINTER_ROLE()
    const filter = editionContract.filters.RolesUpdated(undefined, minterRole)

    // TODO: set start block contract deploy block
    const roleEvents = await editionContract.queryFilter(filter)
    const candidateMinters = roleEvents.map((event) => event.args.user)

    // Check supportsInterface() to verify each address is a minter
    const minters = await Promise.all(
      candidateMinters.map(async (minterAddress) => {
        const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)

        try {
          const isMinter = await minterContract.supportsInterface(interfaceIds.IMinterModule)
          return isMinter ? minterAddress : null
        } catch (err) {
          console.error(err)
          return null
        }
      }),
    )

    return minters.filter((x): x is string => x !== null)
  }

  // Minting information from a minting contract for a given edition
  private async _mintInfosFromMinter({
    editionAddress,
    minterAddress,
  }: {
    editionAddress: string
    minterAddress: string
  }): Promise<MintInfo[]> {
    const signerOrProvider = this._requireSignerOrProvider()

    // Query MintConfigCreated event
    const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
    const filter = minterContract.filters.MintConfigCreated(editionAddress)
    const mintConfigEvents = await minterContract.queryFilter(filter)
    const mintIds = mintConfigEvents.map((event) => event.args.mintId)

    return Promise.all(
      mintIds.map(async (mintId) => {
        const minterModule = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const interfaceId = await minterModule.moduleInterfaceId()
        const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)

        const mintInfo = await minterContract.mintInfo(editionAddress, mintId)

        const maxMintable =
          'maxMintable' in mintInfo
            ? mintInfo.maxMintable
            : {
                maxMintableLower: mintInfo.maxMintableLower,
                maxMintableUpper: mintInfo.maxMintableUpper,
                closingTime: mintInfo.closingTime,
              }

        return {
          interfaceId,
          mintId: mintId.toNumber(),
          editionAddress,
          minterAddress,
          startTime: mintInfo.startTime,
          endTime: mintInfo.endTime,
          mintPaused: mintInfo.mintPaused,
          price: mintInfo.price,
          maxMintable,
          maxMintablePerAccount: mintInfo.maxMintablePerAccount,
          totalMinted: mintInfo.totalMinted,
        }
      }),
    )
  }

  private async _allMintInfos({ editionAddress }: { editionAddress: string }): Promise<MintInfo[]> {
    const registeredMinters = await this._registeredMinters({ editionAddress })

    const mintInfos = await Promise.all(
      registeredMinters.map(async (minterAddress) => this._mintInfosFromMinter({ editionAddress, minterAddress })),
    )

    return mintInfos.flat().sort((a, b) => a.startTime - b.startTime)
  }

  private _requireSigner(): Signer {
    if (this._signer) return this._signer

    throw new MissingSignerError()
  }

  private _requireSignerOrProvider(): SignerOrProvider {
    if (this._signer) return this._signer
    if (this._provider) return this._provider

    throw new MissingSignerOrProviderError()
  }

  private async _requireValidSoundEdition({ editionAddress }: { editionAddress: string }): Promise<void> {
    const isEdition = await this.isSoundEdition({ editionAddress })
    if (!isEdition) {
      throw new NotSoundEditionError()
    }
  }
}

import { Provider } from '@ethersproject/abstract-provider'
import {
  FixedPriceSignatureMinter__factory,
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundEditionV1__factory,
} from '@soundxyz/sound-protocol/typechain/index'

import { interfaceIds, minterFactoryMap, AddressZero } from './utils/constants'
import { MissingSignerError, MissingSignerOrProviderError, NotSoundEditionError, InvalidQuantityError } from './errors'
import { MinterInterfaceId, MintInfo, SignerOrProvider, SoundClientConfig } from './types'
import { getMerkleProof as _getMerkleProof, validateAddress } from './utils/helpers'

import type { Signer } from '@ethersproject/abstract-signer'
import { BigNumberish } from '@ethersproject/bignumber'
import { ContractTransaction } from '@ethersproject/contracts'

export function SoundClient({ signer, provider, apiKey: _apiKey }: SoundClientConfig) {
  // If the contract address is a SoundEdition contract
  async function isSoundEdition({ editionAddress }: { editionAddress: string }): Promise<boolean> {
    validateAddress(editionAddress)
    const signerOrProvider = _requireSignerOrProvider()

    const editionContract = SoundEditionV1__factory.connect(editionAddress, signerOrProvider)

    try {
      return await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
    } catch (err) {
      console.error(err)
      return false
    }
  }

  // All the minting schedules for a given edition, including past and future
  async function allMintsForEdition({ editionAddress }: { editionAddress: string }): Promise<MintInfo[]> {
    validateAddress(editionAddress)
    _requireValidSoundEdition({ editionAddress })

    return _allMintInfos({ editionAddress })
  }

  // Active minter schedules for a given edition
  async function activeMintsForEdition({
    editionAddress,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: string
    timestamp?: number
  }): Promise<MintInfo[]> {
    validateAddress(editionAddress)
    _requireValidSoundEdition({ editionAddress })

    const mintInfos = await _allMintInfos({ editionAddress })

    // Filter mints that are live during the given timestamp
    return mintInfos
      .filter((mintInfo) => {
        return mintInfo.startTime <= timestamp && mintInfo.endTime > timestamp && !mintInfo.mintPaused
      })
      .sort((a, b) => a.startTime - b.startTime)
  }

  async function eligibleMintQuantity({
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

    // Checks for child minter custom logic
    switch (mintInfo.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        // handle range edition case
        const maxQty = timestamp < mintInfo.closingTime ? mintInfo.maxMintableUpper : mintInfo.maxMintableLower

        if (mintInfo.totalMinted >= maxQty) {
          return 0
        }
        break
      }
      default: {
        if (mintInfo.totalMinted >= mintInfo.maxMintable) {
          return 0
        }
      }
    }

    const signerOrProvider = _requireSignerOrProvider()
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

  async function mint({
    mintInfo,
    quantity,
    affiliate = AddressZero,
    getMerkleProof = _getMerkleProof,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    mintInfo: MintInfo
    quantity: number
    affiliate?: string
    getMerkleProof?: (root: string, unhashedLeaf: string) => Promise<string[]>
    gasLimit?: BigNumberish
    maxFeePerGas?: BigNumberish
    maxPriorityFeePerGas?: BigNumberish
  }): Promise<ContractTransaction> {
    validateAddress(mintInfo.editionAddress)
    _requireValidSoundEdition({ editionAddress: mintInfo.editionAddress })
    if (quantity <= 0) throw new InvalidQuantityError()

    const signer = _requireSigner()
    const userAddress = await signer.getAddress()

    const eligibleMintQty = await eligibleMintQuantity({ mintInfo, userAddress })
    if (eligibleMintQty < quantity) throw new Error('Not eligible to mint')

    const txnOverrides = {
      value: mintInfo.price.mul(quantity),
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    }

    switch (mintInfo.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        return await RangeEditionMinter__factory.connect(mintInfo.minterAddress, signer).mint(
          mintInfo.editionAddress,
          mintInfo.mintId,
          quantity,
          affiliate,
          txnOverrides,
        )
      }

      case interfaceIds.IMerkleDropMinter: {
        const merkleDropMinter = MerkleDropMinter__factory.connect(mintInfo.minterAddress, signer)
        const { merkleRootHash } = await merkleDropMinter.mintInfo(mintInfo.editionAddress, mintInfo.mintId)

        const proof = await getMerkleProof(merkleRootHash, userAddress)
        return await merkleDropMinter.mint(
          mintInfo.editionAddress,
          mintInfo.mintId,
          quantity,
          proof,
          affiliate,
          txnOverrides,
        )
      }

      case interfaceIds.IFixedPriceSignatureMinter: {
        // TODO: get signature to mint
        const signature = ''
        return await FixedPriceSignatureMinter__factory.connect(mintInfo.minterAddress, signer).mint(
          mintInfo.editionAddress,
          mintInfo.mintId,
          quantity,
          signature,
          affiliate,
          txnOverrides,
        )
      }

      default:
        throw new Error('Unimplemented')
    }
  }

  // Addresses with MINTER_ROLE for a given edition
  async function _registeredMinters({ editionAddress }: { editionAddress: string }): Promise<string[]> {
    const signerOrProvider = _requireSignerOrProvider()

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
  async function _mintInfosFromMinter({
    editionAddress,
    minterAddress,
  }: {
    editionAddress: string
    minterAddress: string
  }): Promise<MintInfo[]> {
    const signerOrProvider = _requireSignerOrProvider()

    // Query MintConfigCreated event
    const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
    const filter = minterContract.filters.MintConfigCreated(editionAddress)
    const mintConfigEvents = await minterContract.queryFilter(filter)
    const mintIds = mintConfigEvents.map((event) => event.args.mintId)

    return Promise.all(
      mintIds.map(async (mintId) => {
        const minterModule = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const interfaceId = (await minterModule.moduleInterfaceId()) as MinterInterfaceId

        switch (interfaceId) {
          case interfaceIds.IRangeEditionMinter: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintInfo = await minterContract.mintInfo(editionAddress, mintId)
            return {
              interfaceId,
              mintId: mintId.toNumber(),
              editionAddress,
              minterAddress,
              startTime: mintInfo.startTime,
              endTime: mintInfo.endTime,
              mintPaused: mintInfo.mintPaused,
              price: mintInfo.price,
              maxMintableLower: mintInfo.maxMintableLower,
              maxMintableUpper: mintInfo.maxMintableUpper,
              closingTime: mintInfo.closingTime,
              maxMintablePerAccount: mintInfo.maxMintablePerAccount,
              totalMinted: mintInfo.totalMinted,
            }
          }
          default: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintInfo = await minterContract.mintInfo(editionAddress, mintId)
            return {
              interfaceId,
              mintId: mintId.toNumber(),
              editionAddress,
              minterAddress,
              startTime: mintInfo.startTime,
              endTime: mintInfo.endTime,
              mintPaused: mintInfo.mintPaused,
              price: mintInfo.price,
              maxMintable: mintInfo.maxMintable,
              maxMintablePerAccount: mintInfo.maxMintablePerAccount,
              totalMinted: mintInfo.totalMinted,
            }
          }
        }
      }),
    )
  }

  async function _allMintInfos({ editionAddress }: { editionAddress: string }): Promise<MintInfo[]> {
    const registeredMinters = await _registeredMinters({ editionAddress })

    const mintInfos = await Promise.all(
      registeredMinters.map(async (minterAddress) => _mintInfosFromMinter({ editionAddress, minterAddress })),
    )

    return mintInfos.flat().sort((a, b) => a.startTime - b.startTime)
  }

  function _requireSigner(): Signer {
    if (signer) return signer

    throw new MissingSignerError()
  }

  function _requireSignerOrProvider(): SignerOrProvider {
    if (signer) return signer
    if (provider) return provider

    throw new MissingSignerOrProviderError()
  }

  async function _requireValidSoundEdition({ editionAddress }: { editionAddress: string }): Promise<void> {
    const isEdition = await isSoundEdition({ editionAddress })
    if (!isEdition) {
      throw new NotSoundEditionError()
    }
  }

  return {
    isSoundEdition,
    allMintsForEdition,
    activeMintsForEdition,
    eligibleMintQuantity,
    mint,
  }
}

export type SoundClient = ReturnType<typeof SoundClient>

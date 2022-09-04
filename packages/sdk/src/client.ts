import { hexZeroPad, hexlify } from '@ethersproject/bytes'
import type { Signer } from '@ethersproject/abstract-signer'
import type { BigNumberish } from '@ethersproject/bignumber'
import type { ContractTransaction } from '@ethersproject/contracts'
import {
  FixedPriceSignatureMinter__factory,
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import {
  InvalidQuantityError,
  MissingSignerError,
  MissingSignerOrProviderError,
  NotSoundEditionError,
  SoundNotFoundError,
  UnsupportedNetworkError,
  UnsupportedMinterError,
  NotFoundError,
} from './errors'
import type {
  MinterInterfaceId,
  MintSchedule,
  SignerOrProvider,
  SoundClientConfig,
  EditionConfig,
  MintScheduleConfig,
  ChainId,
  ContractCall,
} from './types'
import {
  interfaceIds,
  minterFactoryMap,
  ADDRESS_ZERO,
  supportedNetworks,
  soundCreatorAddresses,
  supportedChainIds,
  minterNames,
  MINTER_ROLE,
} from './utils/constants'
import { validateAddress, getMerkleProof as _getMerkleProof } from './utils/helpers'
import type { ReleaseInfoQueryVariables } from './api/graphql/gql'
import { SoundAPI } from './api/soundApi'
import { LazyPromise } from './utils/promise'

export function SoundClient({
  signer,
  provider,
  apiKey,
  environment = 'production',
  soundCreatorAddress,
}: SoundClientConfig) {
  const soundApi = SoundAPI({
    apiKey,
    environment,
  })

  // If the contract address is a SoundEdition contract
  async function isSoundEdition({ editionAddress }: { editionAddress: string }): Promise<boolean> {
    validateAddress(editionAddress)
    const { signerOrProvider } = await _requireSignerOrProvider()

    const editionContract = SoundEditionV1__factory.connect(editionAddress, signerOrProvider)

    try {
      return await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
    } catch (err) {
      console.error(err)
      return false
    }
  }

  // All the minting schedules for a given edition, including past and future
  async function mintSchedulesForEdition({ editionAddress }: { editionAddress: string }): Promise<MintSchedule[]> {
    _requireValidSoundEdition({ editionAddress })

    return _allMintSchedules({ editionAddress })
  }

  // Active minter schedules for a given edition
  async function activeMintSchedulesForEdition({
    editionAddress,
    timestamp = Math.floor(Date.now() / 1000),
  }: {
    editionAddress: string
    timestamp?: number
  }): Promise<MintSchedule[]> {
    _requireValidSoundEdition({ editionAddress })

    const mintSchedules = await _allMintSchedules({ editionAddress })

    // Filter mints that are live during the given timestamp
    return mintSchedules
      .filter((mintSchedule) => {
        return mintSchedule.startTime <= timestamp && mintSchedule.endTime > timestamp && !mintSchedule.mintPaused
      })
      .sort((a, b) => a.startTime - b.startTime)
  }

  async function eligibleMintQuantity({
    mintSchedule,
    timestamp = Math.floor(Date.now() / 1000),
    userAddress,
  }: {
    mintSchedule: MintSchedule
    timestamp?: number
    userAddress: string
  }): Promise<number> {
    // check valid mint time
    if (timestamp < mintSchedule.startTime || timestamp > mintSchedule.endTime || mintSchedule.mintPaused) {
      return 0
    }

    // Checks for child minter custom logic
    switch (mintSchedule.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        // handle range edition case
        const maxQty =
          timestamp < mintSchedule.closingTime ? mintSchedule.maxMintableUpper : mintSchedule.maxMintableLower

        if (mintSchedule.totalMinted >= maxQty) {
          return 0
        }
        break
      }
      default: {
        if (mintSchedule.totalMinted >= mintSchedule.maxMintable) {
          return 0
        }
      }
    }

    const { signerOrProvider } = await _requireSignerOrProvider()
    // look up max mintable per account and user's already minted tally
    switch (mintSchedule.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        const userBalanceBigNum = await RangeEditionMinter__factory.connect(
          mintSchedule.minterAddress,
          signerOrProvider,
        ).mintedTallies(mintSchedule.editionAddress, mintSchedule.mintId, userAddress)

        const userMintedBalance = userBalanceBigNum.toNumber()
        return mintSchedule.maxMintablePerAccount - userMintedBalance
      }

      case interfaceIds.IMerkleDropMinter: {
        const userBalanceBigNum = await MerkleDropMinter__factory.connect(
          mintSchedule.minterAddress,
          signerOrProvider,
        ).mintedTallies(mintSchedule.editionAddress, mintSchedule.mintId, userAddress)

        const userMintedBalance = userBalanceBigNum.toNumber()
        return mintSchedule.maxMintablePerAccount - userMintedBalance
      }

      default:
        throw new Error('Unimplemented')
    }
  }

  async function mint({
    mintSchedule,
    quantity,
    affiliate = ADDRESS_ZERO,
    getMerkleProof = _getMerkleProof,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    mintSchedule: MintSchedule
    quantity: number
    affiliate?: string
    getMerkleProof?: (root: string, unhashedLeaf: string) => Promise<string[] | null>
    gasLimit?: BigNumberish
    maxFeePerGas?: BigNumberish
    maxPriorityFeePerGas?: BigNumberish
  }): Promise<ContractTransaction> {
    _requireValidSoundEdition({ editionAddress: mintSchedule.editionAddress })
    if (quantity <= 0) throw new InvalidQuantityError()

    const { signer, userAddress } = await _requireSigner()

    const eligibleMintQty = await eligibleMintQuantity({ mintSchedule, userAddress })
    if (eligibleMintQty < quantity)
      throw new Error(`Not eligible to mint ${quantity}. Eligible quantity: ${eligibleMintQty}`)

    const txnOverrides = {
      value: mintSchedule.price.mul(quantity),
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    }

    switch (mintSchedule.interfaceId) {
      case interfaceIds.IRangeEditionMinter: {
        return await RangeEditionMinter__factory.connect(mintSchedule.minterAddress, signer).mint(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
          quantity,
          affiliate,
          txnOverrides,
        )
      }

      case interfaceIds.IMerkleDropMinter: {
        const merkleDropMinter = MerkleDropMinter__factory.connect(mintSchedule.minterAddress, signer)
        const { merkleRootHash } = await merkleDropMinter.mintInfo(mintSchedule.editionAddress, mintSchedule.mintId)

        const proof = await getMerkleProof(merkleRootHash, userAddress.toLowerCase())
        if (!proof?.length) throw new NotFoundError('Unable to fetch merkle proof')

        return await merkleDropMinter.mint(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
          quantity,
          proof,
          affiliate,
          txnOverrides,
        )
      }

      default:
        throw new Error('Unimplemented')
    }
  }

  async function createEditionWithMintSchedules({
    editionConfig,
    mintScheduleConfigs,
    salt: customSalt,
  }: {
    editionConfig: EditionConfig
    mintScheduleConfigs: MintScheduleConfig[]
    salt?: string
  }) {
    const { signer, chainId, userAddress } = await _requireSigner()

    const randomInt = Math.floor(Math.random() * 1_000_000_000_000)
    const salt = customSalt || hexZeroPad(hexlify(randomInt), 32)

    const creatorAdddress = _getCreatorAddress(chainId)

    // Precompute the edition address.
    const editionAddress = await SoundCreatorV1__factory.connect(creatorAdddress, signer).soundEditionAddress(
      userAddress,
      salt,
    )

    const editionInterface = SoundEditionV1__factory.createInterface()

    /**
     * Encode all the bundled contract calls.
     */
    const contractCalls: ContractCall[] = []

    // Grant MINTER_ROLE for each minter.
    const mintersToGrantRole = Array.from(new Set(mintScheduleConfigs.map((m) => m.minterAddress)))
    for (const minterAddress of mintersToGrantRole) {
      contractCalls.push({
        contractAddress: editionAddress,
        calldata: editionInterface.encodeFunctionData('grantRoles', [minterAddress, MINTER_ROLE]),
      })
    }

    // Add the createEditionMint calls.
    for (const mintScheduleConfig of mintScheduleConfigs) {
      if (!(mintScheduleConfig.name in minterNames)) {
        throw new UnsupportedMinterError({ minterName: mintScheduleConfig.name })
      }

      /**
       * Set up the createEditionMint call for each mint config.
       */
      switch (mintScheduleConfig.name) {
        case 'RangeEditionMinter': {
          const minterInterface = RangeEditionMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintScheduleConfig.minterAddress,

            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintScheduleConfig.price,
              mintScheduleConfig.startTime,
              mintScheduleConfig.closingTime,
              mintScheduleConfig.endTime,
              mintScheduleConfig.affiliateFeeBPS,
              mintScheduleConfig.maxMintableLower,
              mintScheduleConfig.maxMintableUpper,
              mintScheduleConfig.maxMintablePerAccount,
            ]),
          })
          break
        }
        case 'FixedPriceSignatureMinter': {
          const minterInterface = FixedPriceSignatureMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintScheduleConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintScheduleConfig.price,
              mintScheduleConfig.signer,
              mintScheduleConfig.maxMintable,
              mintScheduleConfig.startTime,
              mintScheduleConfig.endTime,
              mintScheduleConfig.affiliateFeeBPS,
            ]),
          })
          break
        }
        case 'MerkleDropMinter': {
          const minterInterface = MerkleDropMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintScheduleConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintScheduleConfig.merkleRootHash,
              mintScheduleConfig.price,
              mintScheduleConfig.startTime,
              mintScheduleConfig.endTime,
              mintScheduleConfig.affiliateFeeBPS,
              mintScheduleConfig.maxMintable,
              mintScheduleConfig.maxMintablePerAccount,
            ]),
          })
          break
        }
      }
    }

    /**
     * Encode the SoundEdition.initialize call.
     */
    const editionInitData = editionInterface.encodeFunctionData('initialize', [
      editionConfig.name,
      editionConfig.symbol,
      editionConfig.metadataModule,
      editionConfig.baseURI,
      editionConfig.contractURI,
      editionConfig.fundingRecipient,
      editionConfig.royaltyBPS,
      editionConfig.editionMaxMintable,
      editionConfig.mintRandomnessTokenThreshold,
      editionConfig.mintRandomnessTimeThreshold,
    ])

    const creatorAddress = _getCreatorAddress(chainId)
    const soundCreatorContract = SoundCreatorV1__factory.connect(creatorAddress, signer)

    return await soundCreatorContract.createSoundAndMints(
      salt,
      editionInitData,
      contractCalls.map((d) => d.contractAddress),
      contractCalls.map((d) => d.calldata),
    )
  }

  /*********************************************************
                  INTERNAL FUNCTIONS
 ********************************************************/

  // Addresses with MINTER_ROLE for a given edition
  async function _registeredMinters({ editionAddress }: { editionAddress: string }): Promise<string[]> {
    const { signerOrProvider } = await _requireSignerOrProvider()

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
    // This list may contain duplicates if MINTER_ROLE was granted multiple times
    const allMinters = minters.filter((minter) => minter !== null) as string[]
    return [...new Set(allMinters)]
  }

  // Minting information from a minting contract for a given edition
  async function _mintInfosFromMinter({
    editionAddress,
    minterAddress,
  }: {
    editionAddress: string
    minterAddress: string
  }): Promise<MintSchedule[]> {
    const { signerOrProvider } = await _requireSignerOrProvider()

    // Query MintConfigCreated event
    const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
    const filter = minterContract.filters.MintConfigCreated(editionAddress)
    const mintScheduleConfigEvents = await minterContract.queryFilter(filter)
    const mintIds = mintScheduleConfigEvents.map((event) => event.args.mintId)

    return Promise.all(
      mintIds.map(async (mintId) => {
        const minterModule = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const interfaceId = (await minterModule.moduleInterfaceId()) as MinterInterfaceId

        switch (interfaceId) {
          case interfaceIds.IRangeEditionMinter: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
            return {
              interfaceId,
              mintId: mintId.toNumber(),
              editionAddress,
              minterAddress,
              startTime: mintSchedule.startTime,
              endTime: mintSchedule.endTime,
              mintPaused: mintSchedule.mintPaused,
              price: mintSchedule.price,
              maxMintableLower: mintSchedule.maxMintableLower,
              maxMintableUpper: mintSchedule.maxMintableUpper,
              closingTime: mintSchedule.closingTime,
              maxMintablePerAccount: mintSchedule.maxMintablePerAccount,
              totalMinted: mintSchedule.totalMinted,
            }
          }
          default: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
            return {
              interfaceId,
              mintId: mintId.toNumber(),
              editionAddress,
              minterAddress,
              startTime: mintSchedule.startTime,
              endTime: mintSchedule.endTime,
              mintPaused: mintSchedule.mintPaused,
              price: mintSchedule.price,
              maxMintable: mintSchedule.maxMintable,
              maxMintablePerAccount: mintSchedule.maxMintablePerAccount,
              totalMinted: mintSchedule.totalMinted,
            }
          }
        }
      }),
    )
  }

  async function _allMintSchedules({ editionAddress }: { editionAddress: string }): Promise<MintSchedule[]> {
    const registeredMinters = await _registeredMinters({ editionAddress })

    const mintSchedules = await Promise.all(
      registeredMinters.map(async (minterAddress) => _mintInfosFromMinter({ editionAddress, minterAddress })),
    )

    return mintSchedules.flat().sort((a, b) => a.startTime - b.startTime)
  }

  async function _requireSigner(): Promise<{ signer: Signer; chainId: ChainId; userAddress: string }> {
    if (signer) {
      const chainId = await signer?.getChainId()

      if (!_isSupportedChain(chainId)) throw new UnsupportedNetworkError({ chainId })

      const userAddress = await signer?.getAddress()

      return { signer, chainId: chainId as ChainId, userAddress }
    }

    throw new MissingSignerError()
  }

  async function _requireSignerOrProvider(): Promise<{ signerOrProvider: SignerOrProvider; chainId: ChainId }> {
    if (signer) {
      const chainId = await signer.getChainId()
      if (!_isSupportedChain(chainId)) throw new UnsupportedNetworkError({ chainId })
      return { signerOrProvider: signer, chainId: chainId as ChainId }
    }
    if (provider) {
      const chainId = await provider.getNetwork().then((network) => network.chainId)
      if (!_isSupportedChain(chainId)) throw new UnsupportedNetworkError({ chainId })
      return { signerOrProvider: provider, chainId: chainId as ChainId }
    }

    throw new MissingSignerOrProviderError()
  }

  async function _requireValidSoundEdition({ editionAddress }: { editionAddress: string }): Promise<void> {
    validateAddress(editionAddress)
    const isEdition = await isSoundEdition({ editionAddress })
    if (!isEdition) {
      throw new NotSoundEditionError()
    }
  }

  async function soundInfo(soundParams: ReleaseInfoQueryVariables) {
    const { data, errors } = await soundApi.releaseInfo(soundParams)

    const release = data?.release
    if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

    return {
      ...release,
      trackAudio: LazyPromise(() => soundApi.audioFromTrack({ trackId: release.track.id })),
    }
  }

  function _isSupportedChain(chainId: number) {
    return Object.values(supportedNetworks).includes(chainId as ChainId)
  }

  function _getCreatorAddress(chainId: number) {
    if (chainId === supportedChainIds.LOCAL || (chainId === supportedChainIds.LOCAL_ALT && !soundCreatorAddress)) {
      throw new Error('Must pass in soundCreatorAddress when using with a local network.')
    }
    return soundCreatorAddress || soundCreatorAddresses[chainId]
  }

  return {
    isSoundEdition,
    mintSchedulesForEdition,
    activeMintSchedulesForEdition,
    eligibleMintQuantity,
    mint,
    soundInfo,
    createEditionWithMintSchedules,
  }
}

export type SoundClient = ReturnType<typeof SoundClient>

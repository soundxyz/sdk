import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  FixedPriceSignatureMinter__factory,
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { contractAddresses } from '@soundxyz/sound-protocol'
import { SoundAPI } from './api/soundApi'
import {
  CreatorAddressMissingForLocalError,
  InvalidQuantityError,
  MissingSignerError,
  MissingSignerOrProviderError,
  NotEligibleMint,
  NotSoundEditionError,
  SoundNotFoundError,
  UnsupportedMinterError,
  UnsupportedNetworkError,
} from './errors'
import { ADDRESS_ZERO, MINTER_ROLE, minterFactoryMap, supportedChainIds, supportedNetworks } from './utils/constants'
import { getSaltAsBytes32, validateAddress } from './utils/helpers'
import { LazyPromise } from './utils/promise'

import type { ChainId, MinterInterfaceId, SignerOrProvider, SoundClientConfig } from './types'
import type { Signer } from '@ethersproject/abstract-signer'
import type { BigNumberish } from '@ethersproject/bignumber'
import type { ContractTransaction } from '@ethersproject/contracts'
import type { ReleaseInfoQueryVariables } from './api/graphql/gql'
import type { ContractCall, EditionConfig, MintConfig, MintSchedule } from './types'

export function SoundClient({
  signer,
  provider,
  apiKey,
  environment = 'production',
  soundCreatorAddress,
}: SoundClientConfig) {
  const client = {
    soundApi: SoundAPI({
      apiKey,
      environment,
    }),
    isSoundEdition,
    mintSchedules,
    activeMintSchedules,
    eligibleQuantity,
    mint,
    createEdition,
    editionInfo,
    expectedEditionAddress,
  }

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
  async function mintSchedules({ editionAddress }: { editionAddress: string }): Promise<MintSchedule[]> {
    _requireValidSoundEdition({ editionAddress })

    return _allMintSchedules({ editionAddress })
  }

  // Active minter schedules for a given edition
  async function activeMintSchedules({
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

  async function eligibleQuantity({
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
    switch (mintSchedule.mintType) {
      case 'RangeEdition': {
        // handle range edition case
        const maxQty =
          timestamp < mintSchedule.cutoffTime ? mintSchedule.maxMintableUpper : mintSchedule.maxMintableLower

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
    switch (mintSchedule.mintType) {
      case 'RangeEdition': {
        const userBalanceBigNum = await RangeEditionMinter__factory.connect(
          mintSchedule.minterAddress,
          signerOrProvider,
        ).mintedTallies(mintSchedule.editionAddress, mintSchedule.mintId, userAddress)

        const userMintedBalance = userBalanceBigNum.toNumber()
        return mintSchedule.maxMintablePerAccount - userMintedBalance
      }

      case 'MerkleDrop': {
        const merkleDropMinter = MerkleDropMinter__factory.connect(mintSchedule.minterAddress, signerOrProvider)
        const { merkleRootHash } = await merkleDropMinter.mintInfo(mintSchedule.editionAddress, mintSchedule.mintId)

        const proof = await getMerkleProof({ root: merkleRootHash, userAddress })

        if (!proof?.length) return 0

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

  const MerkleProofCache: Record<string, string[] | null> = {}
  const MerkleProofPromises: Record<string, Promise<string[] | null>> = {}

  async function getMerkleProof({ root, userAddress }: { root: string; userAddress: string }) {
    const key = root + userAddress

    const existingCacheValue = MerkleProofCache[key]

    if (existingCacheValue !== undefined) return existingCacheValue

    return (MerkleProofCache[key] = await (MerkleProofPromises[key] ||= client.soundApi
      .merkleProof({ root, userAddress })
      .finally(() => delete MerkleProofPromises[key])))
  }

  async function mint({
    mintSchedule,
    quantity,
    affiliate = ADDRESS_ZERO,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    mintSchedule: MintSchedule
    quantity: number
    affiliate?: string
    gasLimit?: BigNumberish
    maxFeePerGas?: BigNumberish
    maxPriorityFeePerGas?: BigNumberish
  }): Promise<ContractTransaction> {
    _requireValidSoundEdition({ editionAddress: mintSchedule.editionAddress })
    if (quantity <= 0) throw new InvalidQuantityError()

    const { signer, userAddress } = await _requireSigner()

    const eligibleMintQuantity = await eligibleQuantity({ mintSchedule, userAddress })
    if (eligibleMintQuantity < quantity) {
      throw new NotEligibleMint({
        eligibleMintQuantity,
        mintSchedule,
        userAddress,
      })
    }

    const txnOverrides = {
      value: mintSchedule.price.mul(quantity),
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    }

    switch (mintSchedule.mintType) {
      case 'RangeEdition': {
        return RangeEditionMinter__factory.connect(mintSchedule.minterAddress, signer).mint(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
          quantity,
          affiliate,
          txnOverrides,
        )
      }

      case 'MerkleDrop': {
        const merkleDropMinter = MerkleDropMinter__factory.connect(mintSchedule.minterAddress, signer)
        const { merkleRootHash } = await merkleDropMinter.mintInfo(mintSchedule.editionAddress, mintSchedule.mintId)

        const proof = await getMerkleProof({ root: merkleRootHash, userAddress })

        if (!proof?.length) {
          throw new NotEligibleMint({
            mintSchedule,
            userAddress,
            eligibleMintQuantity,
          })
        }

        return merkleDropMinter.mint(
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

  async function createEdition({
    editionConfig,
    mintConfigs,
    salt: customSalt,
  }: {
    editionConfig: EditionConfig
    mintConfigs: MintConfig[]
    salt?: string | number
  }) {
    const { signer, chainId, userAddress } = await _requireSigner()

    const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

    const creatorAddress = _getCreatorAddress({ chainId })

    // Precompute the edition address.
    const [editionAddress, _exists] = await SoundCreatorV1__factory.connect(creatorAddress, signer).soundEditionAddress(
      userAddress,
      formattedSalt,
    )

    const editionInterface = SoundEditionV1__factory.createInterface()

    /**
     * Encode all the bundled contract calls.
     */
    const contractCalls: ContractCall[] = []

    // Grant MINTER_ROLE for each minter.
    const mintersToGrantRole = Array.from(new Set(mintConfigs.map((m) => m.minterAddress)))
    for (const minterAddress of mintersToGrantRole) {
      contractCalls.push({
        contractAddress: editionAddress,
        calldata: editionInterface.encodeFunctionData('grantRoles', [minterAddress, MINTER_ROLE]),
      })
    }

    // Add the createEditionMint calls.
    for (const mintConfig of mintConfigs) {
      /**
       * Set up the createEditionMint call for each mint config.
       */
      switch (mintConfig.mintType) {
        case 'RangeEdition': {
          const minterInterface = RangeEditionMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,

            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintConfig.price,
              mintConfig.startTime,
              mintConfig.closingTime,
              mintConfig.endTime,
              mintConfig.affiliateFeeBPS,
              mintConfig.maxMintableLower,
              mintConfig.maxMintableUpper,
              mintConfig.maxMintablePerAccount,
            ]),
          })
          break
        }
        case 'FixedPriceSignature': {
          const minterInterface = FixedPriceSignatureMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintConfig.price,
              mintConfig.signer,
              mintConfig.maxMintable,
              mintConfig.startTime,
              mintConfig.endTime,
              mintConfig.affiliateFeeBPS,
            ]),
          })
          break
        }
        case 'MerkleDrop': {
          const minterInterface = MerkleDropMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintConfig.merkleRoot,
              mintConfig.price,
              mintConfig.startTime,
              mintConfig.endTime,
              mintConfig.affiliateFeeBPS,
              mintConfig.maxMintable,
              mintConfig.maxMintablePerAccount,
            ]),
          })
          break
        }
      }
    }

    let flags = 0
    if (editionConfig.metadataIsFrozen) flags |= 1
    if (editionConfig) flags |= 2

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
      editionConfig.editionMaxMintableLower,
      editionConfig.editionMaxMintableUpper,
      editionConfig.editionCutoffTime,
      flags,
    ])

    const soundCreatorContract = SoundCreatorV1__factory.connect(creatorAddress, signer)

    return soundCreatorContract.createSoundAndMints(
      formattedSalt,
      editionInitData,
      contractCalls.map((d) => d.contractAddress),
      contractCalls.map((d) => d.calldata),
    )
  }

  async function editionInfo(soundParams: ReleaseInfoQueryVariables) {
    const editionContract = SoundEditionV1__factory.connect(
      soundParams.contractAddress,
      (await _requireSignerOrProvider()).signerOrProvider,
    )

    const [{ data, errors }, totalMintedBigNum] = await Promise.all([
      client.soundApi.releaseInfo(soundParams),
      editionContract.totalMinted(),
    ])

    const release = data?.release
    if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

    return {
      ...release,
      totalMinted: totalMintedBigNum.toNumber(),
      trackAudio: LazyPromise(() => client.soundApi.audioFromTrack({ trackId: release.track.id })),
    }
  }

  async function expectedEditionAddress({ deployer, salt }: { deployer: string; salt: string | number }) {
    validateAddress(deployer)
    const { signerOrProvider, chainId } = await _requireSignerOrProvider()
    const soundCreatorAddress = _getCreatorAddress({ chainId })

    return SoundCreatorV1__factory.connect(soundCreatorAddress, signerOrProvider).soundEditionAddress(
      deployer,
      getSaltAsBytes32(salt),
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
              mintType: 'RangeEdition',
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
              cutoffTime: mintSchedule.cutoffTime,
              maxMintable: (unixTimestamp?: number) =>
                (unixTimestamp || Math.floor(Date.now() / 1000)) < mintSchedule.cutoffTime
                  ? mintSchedule.maxMintableUpper
                  : mintSchedule.maxMintableLower,
              maxMintablePerAccount: mintSchedule.maxMintablePerAccount,
              totalMinted: mintSchedule.totalMinted,
            }
          }
          case interfaceIds.IMerkleDropMinter: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
            return {
              mintType: 'MerkleDrop',
              mintId: mintId.toNumber(),
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
            }
          }
          case interfaceIds.IFixedPriceSignatureMinter: {
            const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
            const mintSchedule = await minterContract.mintInfo(editionAddress, mintId)
            return {
              mintType: 'FixedPriceSignature',
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
          default: {
            throw new UnsupportedMinterError(interfaceId)
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

  function _isSupportedChain(chainId: number) {
    return Object.values(supportedNetworks).includes(chainId as ChainId)
  }

  function _getCreatorAddress({ chainId }: { chainId: number }) {
    if ((chainId === supportedChainIds.LOCAL || chainId === supportedChainIds.LOCAL_ALT) && !soundCreatorAddress) {
      throw new CreatorAddressMissingForLocalError()
    }

    if (soundCreatorAddress) {
      return soundCreatorAddress
    }

    const key = chainId === 1 ? 'mainnet' : environment === 'staging' ? 'staging' : 'preview'

    // TODO: Remove this key type assertion when we add mainnet to contractAddresses
    return contractAddresses[key as 'preview' | 'staging'].soundCreatorV1
  }

  return client
}

export type SoundClient = ReturnType<typeof SoundClient>

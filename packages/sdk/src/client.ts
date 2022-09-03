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
} from './errors'
import type {
  MinterInterfaceId,
  MintInfo,
  SignerOrProvider,
  SoundClientConfig,
  EditionConfig,
  MintConfig,
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
import { Provider } from '@ethersproject/abstract-provider'

export function SoundClient({ signer, provider, apiKey, environment = 'production' }: SoundClientConfig) {
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
  async function allMintsForEdition({ editionAddress }: { editionAddress: string }): Promise<MintInfo[]> {
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

    const { signerOrProvider } = await _requireSignerOrProvider()
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
    affiliate = ADDRESS_ZERO,
    getMerkleProof = _getMerkleProof,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    mintInfo: MintInfo
    quantity: number
    affiliate?: string
    getMerkleProof?: (root: string, unhashedLeaf: string) => Promise<string[] | null>
    gasLimit?: BigNumberish
    maxFeePerGas?: BigNumberish
    maxPriorityFeePerGas?: BigNumberish
  }): Promise<ContractTransaction> {
    _requireValidSoundEdition({ editionAddress: mintInfo.editionAddress })
    if (quantity <= 0) throw new InvalidQuantityError()

    const { signer, userAddress } = await _requireSigner()

    const eligibleMintQty = await eligibleMintQuantity({ mintInfo, userAddress })
    if (eligibleMintQty < quantity)
      throw new Error(`Not eligible to mint ${quantity}. Eligible quantity: ${eligibleMintQty}`)

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
        if (!proof) throw new Error('Unable to fetch merkle proof')

        return await merkleDropMinter.mint(
          mintInfo.editionAddress,
          mintInfo.mintId,
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

  async function createSoundAndMints({
    editionConfig,
    mintConfigs,
    soundCreatorAddress,
    salt: customSalt,
  }: {
    editionConfig: EditionConfig
    mintConfigs: MintConfig[]
    soundCreatorAddress?: string
    salt?: string
  }) {
    const { signer, chainId, userAddress } = await _requireSigner()

    const randomInt = Math.floor(Math.random() * 1_000_000_000_000)
    const salt = customSalt || hexZeroPad(hexlify(randomInt), 32)

    let soundCreator: string
    if (chainId === supportedChainIds.HARDHAT || chainId === supportedChainIds.HARDHAT_ALT) {
      if (!soundCreatorAddress) throw new Error('soundCreatorAddress is required in development mode')
      soundCreator = soundCreatorAddress
    } else {
      soundCreator = soundCreatorAddresses[chainId]
    }

    // Precompute the edition address.
    const editionAddress = await SoundCreatorV1__factory.connect(soundCreator, signer).soundEditionAddress(
      userAddress,
      salt,
    )

    const editionInterface = SoundEditionV1__factory.createInterface()

    /**
     * Encode all the bundled contract calls.
     */
    const contractCalls: ContractCall[] = []
    for (const mintConfig of mintConfigs) {
      if (!(mintConfig.name in minterNames)) {
        throw new UnsupportedMinterError({ minterName: mintConfig.name })
      }

      /**
       * Set up the grantRoles call for each mint config.
       */
      contractCalls.push({
        contractAddress: editionAddress,
        calldata: editionInterface.encodeFunctionData('grantRoles', [mintConfig.minterAddress, MINTER_ROLE]),
      })

      /**
       * Set up the createEditionMint call for each mint config.
       */
      switch (mintConfig.name) {
        case 'RangeEditionMinter': {
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
        case 'FixedPriceSignatureMinter': {
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
        case 'MerkleDropMinter': {
          const minterInterface = MerkleDropMinter__factory.createInterface()
          contractCalls.push({
            contractAddress: mintConfig.minterAddress,
            calldata: minterInterface.encodeFunctionData('createEditionMint', [
              editionAddress,
              mintConfig.merkleRootHash,
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

    const soundCreatorContract = SoundCreatorV1__factory.connect(soundCreator, signer)

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
  }): Promise<MintInfo[]> {
    const { signerOrProvider } = await _requireSignerOrProvider()

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

  return {
    isSoundEdition,
    allMintsForEdition,
    activeMintsForEdition,
    eligibleMintQuantity,
    mint,
    soundInfo,
    createSoundAndMints,
  }
}

export type SoundClient = ReturnType<typeof SoundClient>

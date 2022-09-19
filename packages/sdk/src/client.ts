import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { SoundAPI } from './api/soundApi'
import {
  CreatorAddressMissing,
  InvalidQuantityError,
  MissingSignerError,
  MissingSignerOrProviderError,
  NotEligibleMint,
  NotSoundEditionError,
  SoundNotFoundError,
  UnexpectedApiResponse,
  UnsupportedMinterError,
} from './errors'
import { ADDRESS_ZERO, MINTER_ROLE, minterFactoryMap } from './utils/constants'
import { getSaltAsBytes32, validateAddress } from './utils/helpers'
import { LazyPromise } from './utils/promise'

import type { Expand, MinterInterfaceId, SignerOrProvider, SoundClientConfig } from './types'
import type { Signer } from '@ethersproject/abstract-signer'
import type { BigNumberish } from '@ethersproject/bignumber'
import type { ContractTransaction, Overrides, PayableOverrides } from '@ethersproject/contracts'
import type { ReleaseInfoQueryVariables } from './api/graphql/gql'
import type { ContractCall, EditionConfig, MintConfig, MintSchedule } from './types'
import type { EditionInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISoundEditionV1'

export function SoundClient({ signer, provider, apiKey, apiEndpoint, soundCreatorAddress }: SoundClientConfig) {
  const client = {
    soundApi: SoundAPI({
      apiKey,
      apiEndpoint,
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
    await _requireValidSoundEdition({ editionAddress })

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
    await _requireValidSoundEdition({ editionAddress })

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
    await _requireValidSoundEdition({ editionAddress: mintSchedule.editionAddress })
    if (quantity <= 0) throw new InvalidQuantityError({ quantity })

    const { signer, userAddress } = await _requireSigner()

    const eligibleMintQuantity = await eligibleQuantity({ mintSchedule, userAddress })
    if (eligibleMintQuantity < quantity) {
      throw new NotEligibleMint({
        eligibleMintQuantity,
        mintSchedule,
        userAddress,
      })
    }

    const txnOverrides: PayableOverrides = {
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
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    editionConfig: EditionConfig
    mintConfigs: MintConfig[]
    salt?: string | number
    gasLimit?: BigNumberish
    maxFeePerGas?: BigNumberish
    maxPriorityFeePerGas?: BigNumberish
  }) {
    const { signer, userAddress } = await _requireSigner()

    const txnOverrides: Overrides = {
      gasLimit,
      maxFeePerGas,
      maxPriorityFeePerGas,
    }

    const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

    const creatorAddress = _getCreatorAddress()

    // Precompute the edition address.
    const [editionAddress, _] = await SoundCreatorV1__factory.connect(creatorAddress, signer).soundEditionAddress(
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
              mintConfig.cutoffTime,
              mintConfig.endTime,
              mintConfig.affiliateFeeBPS,
              mintConfig.maxMintableLower,
              mintConfig.maxMintableUpper,
              mintConfig.maxMintablePerAccount,
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
    if (editionConfig.shouldFreezeMetadata) flags |= 1
    if (editionConfig.shouldEnableMintRandomness) flags |= 2

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
      txnOverrides,
    )
  }

  function editionInfo(soundParams: ReleaseInfoQueryVariables) {
    const contract = LazyPromise(async () => {
      await _requireValidSoundEdition({ editionAddress: soundParams.contractAddress })

      const editionContract = SoundEditionV1__factory.connect(
        soundParams.contractAddress,
        (await _requireSignerOrProvider()).signerOrProvider,
      )

      const info: Expand<Omit<EditionInfoStructOutput, keyof [] | number | `${number}`>> =
        await editionContract.editionInfo()

      return { ...info }
    })

    const api = LazyPromise(async () => {
      const { data, errors } = await client.soundApi.releaseInfo(soundParams)

      const release = data?.release
      if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

      return {
        ...release,
        trackAudio: LazyPromise(() =>
          client.soundApi.audioFromTrack({ trackId: release.track.id }).then((response) => {
            const data: Expand<typeof response.data> = response.data

            if (!data) throw new UnexpectedApiResponse(`GraphQL Errors found`, { graphqlErrors: response.errors })

            return data
          }),
        ),
      }
    })

    return {
      contract,
      api,
    }
  }

  async function expectedEditionAddress({ deployer, salt }: { deployer: string; salt: string | number }) {
    validateAddress(deployer)
    const { signerOrProvider } = await _requireSignerOrProvider()
    const soundCreatorAddress = _getCreatorAddress()

    const { addr: editionAddress, exists } = await SoundCreatorV1__factory.connect(
      soundCreatorAddress,
      signerOrProvider,
    ).soundEditionAddress(deployer, getSaltAsBytes32(salt))

    return {
      editionAddress,
      exists,
    }
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
          default: {
            throw new UnsupportedMinterError({ interfaceId })
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

  async function _requireSigner(): Promise<{ signer: Signer; userAddress: string }> {
    if (signer) {
      const userAddress = await signer?.getAddress()

      return { signer, userAddress }
    }

    throw new MissingSignerError()
  }

  async function _requireSignerOrProvider(): Promise<{ signerOrProvider: SignerOrProvider }> {
    if (signer) {
      return { signerOrProvider: signer }
    }
    if (provider) {
      return { signerOrProvider: provider }
    }

    throw new MissingSignerOrProviderError()
  }

  async function _requireValidSoundEdition({ editionAddress }: { editionAddress: string }): Promise<void> {
    validateAddress(editionAddress)
    const isEdition = await isSoundEdition({ editionAddress })
    if (!isEdition) {
      throw new NotSoundEditionError({ contractAddress: editionAddress })
    }
  }

  function _getCreatorAddress() {
    if (soundCreatorAddress) return soundCreatorAddress

    throw new CreatorAddressMissing()
  }

  return client
}

export type SoundClient = ReturnType<typeof SoundClient>

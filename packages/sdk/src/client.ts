import { interfaceIds } from '@soundxyz/sound-protocol'
import {
  IMinterModule__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1_1__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import {
  CreatorAddressMissing,
  InvalidQuantityError,
  MissingMerkleProvider,
  MissingSignerError,
  MissingSignerOrProviderError,
  MissingSoundAPI,
  NotEligibleMint,
  NotSoundEditionError,
  SoundNotFoundError,
  UnexpectedApiResponse,
  UnsupportedMinterError,
  InvalidFundingRecipientError,
  InvalidMaxMintableError,
  InvalidTimeValuesError,
  InvalidEditionMaxMintableRangeError,
  MaxMintablePerAccountError,
  InvalidMerkleRootError,
} from './errors'
import { NULL_ADDRESS, MINTER_ROLE, minterFactoryMap, editionInitFlags, NULL_BYTES32 } from './utils/constants'
import { getLazyOption, getSaltAsBytes32, validateAddress } from './utils/helpers'
import { LazyPromise } from './utils/promise'

import type {
  BlockOrBlockHash,
  Expand,
  MerkleProofParameters,
  MinterInterfaceId,
  MintOptions,
  SignerOrProvider,
  SoundClientConfig,
} from './types'
import type { Signer } from '@ethersproject/abstract-signer'
import type { BigNumberish } from '@ethersproject/bignumber'
import type { ContractTransaction, Overrides, PayableOverrides } from '@ethersproject/contracts'
import type { ReleaseInfoQueryVariables } from './api/graphql/gql'
import type { ContractCall, EditionConfig, MintConfig, MintSchedule } from './types'
import type { EditionInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISoundEditionV1_1'
import { isAddress } from '@ethersproject/address'

export function SoundClient({
  signer,
  provider,
  soundAPI,
  soundCreatorAddress,
  onError = console.error,
  merkleProvider,
}: SoundClientConfig) {
  const client = {
    soundAPI,
    signer,
    provider,
    merkleProvider,
    isSoundEdition,
    mintSchedules,
    activeMintSchedules,
    numberMinted,
    eligibleQuantity,
    mint,
    createEdition,
    editionInfo,
    expectedEditionAddress,
    networkChainMatches,
    numberOfTokensOwned,
    getMerkleProof,
    editionRegisteredMinters,
    editionMinterMintIds,
    editionScheduleIds,
    editionMintSchedules,
  }

  const IdempotentCache: Record<string, unknown> = {}
  const IdempotentCachePromises: Record<string, Promise<unknown>> = {}

  function IdempotentCachedCall<T>(key: string, cb: () => Promise<Awaited<T>>): Promise<Awaited<T>> | Awaited<T> {
    if (key in IdempotentCache) return IdempotentCache[key] as Awaited<T>

    return ((IdempotentCachePromises[key] as Promise<Awaited<T>> | undefined) ||= cb()
      .then((value) => {
        IdempotentCache[key] = value
        return value
      })
      .finally(() => {
        delete IdempotentCachePromises[key]
      }))
  }

  // If the contract address is a SoundEdition contract
  async function isSoundEdition({ editionAddress }: { editionAddress: string }): Promise<boolean> {
    return IdempotentCachedCall('is-sound-edition' + editionAddress, async function isSoundEdition() {
      validateAddress(editionAddress)
      const { signerOrProvider } = await _requireSignerOrProvider()

      const editionContract = SoundEditionV1_1__factory.connect(editionAddress, signerOrProvider)

      try {
        return await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
      } catch (err) {
        onError(err)
        let chainId: number | null = null
        try {
          chainId = await _getNetworkChainId()
        } catch (err) {
          onError(err)
        }
        onError(
          Error(
            `Error checking if ${editionAddress} is a SoundEdition contract (interfaceId: ${interfaceIds.ISoundEditionV1}). Network chain ID: ${chainId}`,
          ),
        )
        return false
      }
    })
  }

  // All the minting schedules for a given edition, including past and future
  async function mintSchedules({
    editionAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    fromBlockOrBlockHash?: BlockOrBlockHash
  }): Promise<MintSchedule[]> {
    await _requireValidSoundEdition({ editionAddress })

    const scheduleIds = await editionScheduleIds({
      editionAddress,
      fromBlockOrBlockHash,
    })

    return editionMintSchedules({ editionAddress, scheduleIds })
  }

  // Active minter schedules for a given edition
  async function activeMintSchedules({
    editionAddress,
    timestamp = Math.floor(Date.now() / 1000),
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    timestamp?: number
    fromBlockOrBlockHash?: BlockOrBlockHash
  }): Promise<MintSchedule[]> {
    await _requireValidSoundEdition({ editionAddress })

    const allMintSchedules = await mintSchedules({ editionAddress, fromBlockOrBlockHash })

    // Filter mints that are live during the given timestamp
    return allMintSchedules
      .filter((mintSchedule) => {
        return mintSchedule.startTime <= timestamp && mintSchedule.endTime > timestamp && !mintSchedule.mintPaused
      })
      .sort((a, b) => a.startTime - b.startTime)
  }

  // Number of tokens owned by user for a given edition
  async function numberOfTokensOwned({ editionAddress, userAddress }: { editionAddress: string; userAddress: string }) {
    await _requireValidSoundEdition({ editionAddress })

    const { signerOrProvider } = await _requireSignerOrProvider()

    const editionContract = SoundEditionV1_1__factory.connect(editionAddress, signerOrProvider)

    return (await editionContract.balanceOf(userAddress)).toNumber()
  }

  async function numberMinted({ editionAddress, userAddress }: { editionAddress: string; userAddress: string }) {
    await _requireValidSoundEdition({ editionAddress })

    const { signerOrProvider } = await _requireSignerOrProvider()

    const editionContract = SoundEditionV1_1__factory.connect(editionAddress, signerOrProvider)

    return (await editionContract.numberMinted(userAddress)).toNumber()
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
        const maxQty =
          timestamp < mintSchedule.cutoffTime ? mintSchedule.maxMintableUpper : mintSchedule.maxMintableLower

        if (mintSchedule.totalMinted >= maxQty) {
          return 0
        }
        break
      }
      case 'MerkleDrop': {
        // return 0 if the user is not in the allowlist
        const merkleRoot = mintSchedule.merkleRoot
        const proof = await client.getMerkleProof({
          merkleRoot,
          userAddress,
        })

        if (!proof?.length) {
          return 0
        }
        break
      }
    }

    const remaining =
      (typeof mintSchedule.maxMintable === 'function'
        ? mintSchedule.maxMintable(timestamp)
        : mintSchedule.maxMintable) - mintSchedule.totalMinted

    const alreadyMinted = await numberMinted({ editionAddress: mintSchedule.editionAddress, userAddress })
    return Math.min(remaining, mintSchedule.maxMintablePerAccount - alreadyMinted)
  }

  function getMerkleProof({ merkleRoot, userAddress }: MerkleProofParameters) {
    return IdempotentCachedCall('merkle-proof' + merkleRoot + userAddress, async function getMerkleProof() {
      return _requireMerkleProvider().merkleProof({ merkleRoot, userAddress })
    })
  }

  async function mint({
    mintSchedule,
    quantity,
    affiliate = NULL_ADDRESS,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: MintOptions): Promise<ContractTransaction> {
    await _requireValidSoundEdition({ editionAddress: mintSchedule.editionAddress })
    if (quantity <= 0 || Math.floor(quantity) !== quantity) throw new InvalidQuantityError({ quantity })

    const { signer, userAddress } = await _requireSigner()

    const eligibleMintQuantity = await client.eligibleQuantity({
      mintSchedule,
      userAddress,
    })
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
        const { merkleRootHash: merkleRoot } = await merkleDropMinter.mintInfo(
          mintSchedule.editionAddress,
          mintSchedule.mintId,
        )

        const proof = await client.getMerkleProof({
          merkleRoot,
          userAddress,
        })

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
    _validateEditionConfig(editionConfig)
    _validateMintConfigs(mintConfigs)

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

    const editionInterface = SoundEditionV1_1__factory.createInterface()

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
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.cutoffTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintableLower),
              Math.floor(mintConfig.maxMintableUpper),
              Math.floor(mintConfig.maxMintablePerAccount),
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
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintable),
              Math.floor(mintConfig.maxMintablePerAccount),
            ]),
          })
          break
        }
      }
    }

    let flags = 0
    if (editionConfig.shouldFreezeMetadata) flags |= editionInitFlags.METADATA_IS_FROZEN
    if (editionConfig.shouldEnableMintRandomness) flags |= editionInitFlags.MINT_RANDOMNESS_ENABLED
    if (editionConfig.enableOperatorFiltering) flags |= editionInitFlags.OPERATOR_FILTERING_ENABLED

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
      Math.floor(editionConfig.editionMaxMintableLower),
      Math.floor(editionConfig.editionMaxMintableUpper),
      Math.floor(editionConfig.editionCutoffTime),
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

      const editionContract = SoundEditionV1_1__factory.connect(
        soundParams.contractAddress,
        (await _requireSignerOrProvider()).signerOrProvider,
      )

      const info: Expand<Omit<EditionInfoStructOutput, keyof [] | number | `${number}`>> =
        await editionContract.editionInfo()

      return { ...info }
    })

    const api = LazyPromise(async () => {
      const soundAPI = client.soundAPI
      if (!soundAPI) throw new MissingSoundAPI()

      const { data, errors } = await soundAPI.releaseInfo(soundParams)

      const release = data?.release
      if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

      return {
        ...release,
        trackAudio: LazyPromise(() =>
          soundAPI.audioFromTrack({ trackId: release.track.id }).then((response) => {
            const data: Expand<typeof response.data> = response.data

            if (!data) {
              throw new UnexpectedApiResponse({
                message: response.errors ? 'GraphQL Errors found' : 'Track could not be found',
                graphqlErrors: response.errors,
              })
            }

            return data.audioFromTrack
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

  async function networkChainMatches({ chainId }: { chainId: number }) {
    const networkChain = await IdempotentCachedCall('network-chain', _getNetworkChainId)

    return networkChain === chainId
  }

  // Addresses with MINTER_ROLE for a given edition
  async function editionRegisteredMinters({
    editionAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    fromBlockOrBlockHash: BlockOrBlockHash | undefined
  }): Promise<string[]> {
    const { signerOrProvider } = await _requireSignerOrProvider()

    const editionContract = SoundEditionV1_1__factory.connect(editionAddress, signerOrProvider)
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
          onError(err)
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

  async function editionMinterMintIds({
    editionAddress,
    minterAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    minterAddress: string
    fromBlockOrBlockHash: BlockOrBlockHash | undefined
  }) {
    const { signerOrProvider } = await _requireSignerOrProvider()

    // Query MintConfigCreated event
    const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
    const filter = minterContract.filters.MintConfigCreated(editionAddress)
    const mintScheduleConfigEvents = await minterContract.queryFilter(filter, fromBlockOrBlockHash)
    return mintScheduleConfigEvents.map((event) => event.args.mintId.toNumber())
  }

  async function editionScheduleIds({
    editionAddress,
    fromBlockOrBlockHash,
  }: {
    editionAddress: string
    fromBlockOrBlockHash?: BlockOrBlockHash
  }) {
    const minterAddresses = await editionRegisteredMinters({
      editionAddress,
      fromBlockOrBlockHash,
    })

    return Promise.all(
      minterAddresses.map(async (minterAddress) => {
        return {
          minterAddress,
          mintIds: await editionMinterMintIds({
            editionAddress,
            minterAddress,
            fromBlockOrBlockHash,
          }),
        }
      }),
    )
  }

  async function editionMintSchedules({
    editionAddress,
    scheduleIds,
  }: {
    editionAddress: string
    scheduleIds: {
      minterAddress: string
      mintIds: number[]
    }[]
  }): Promise<MintSchedule[]> {
    const mintSchedules = await Promise.all(
      scheduleIds.map(({ minterAddress, mintIds }) => _mintInfosFromMinter({ editionAddress, minterAddress, mintIds })),
    )

    return mintSchedules.flat().sort((a, b) => a.startTime - b.startTime)
  }

  /*********************************************************
                  INTERNAL FUNCTIONS
 ********************************************************/

  // Minting information from a minting contract for a given edition
  async function _mintInfosFromMinter({
    editionAddress,
    minterAddress,
    mintIds,
  }: {
    editionAddress: string
    minterAddress: string
    mintIds: number[]
  }): Promise<MintSchedule[]> {
    const { signerOrProvider } = await _requireSignerOrProvider()

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
            }
          }
          default: {
            throw new UnsupportedMinterError({ interfaceId })
          }
        }
      }),
    )
  }

  async function _requireSigner(): Promise<{ signer: Signer; userAddress: string }> {
    if (client.signer) {
      const signer = await getLazyOption(client.signer)
      const userAddress = await signer.getAddress()

      return { signer, userAddress }
    }

    throw new MissingSignerError()
  }

  async function _requireSignerOrProvider(): Promise<{ signerOrProvider: SignerOrProvider }> {
    if (client.signer) {
      const signer = await getLazyOption(client.signer)
      return { signerOrProvider: signer }
    }
    if (client.provider) {
      const provider = await getLazyOption(client.provider)
      return { signerOrProvider: provider }
    }

    throw new MissingSignerOrProviderError()
  }

  async function _requireValidSoundEdition({ editionAddress }: { editionAddress: string }): Promise<void> {
    validateAddress(editionAddress)
    const isEdition = await client.isSoundEdition({ editionAddress })
    if (!isEdition) {
      throw new NotSoundEditionError({ contractAddress: editionAddress })
    }
  }

  function _getCreatorAddress() {
    if (soundCreatorAddress) return soundCreatorAddress

    throw new CreatorAddressMissing()
  }

  function _requireMerkleProvider() {
    if (client.merkleProvider) return client.merkleProvider

    throw new MissingMerkleProvider()
  }

  async function _getNetworkChainId() {
    const networkProvider =
      (client.signer && (await getLazyOption(client.signer)).provider) ??
      (client.provider && (await getLazyOption(client.provider)))

    if (!networkProvider) throw new MissingSignerOrProviderError()

    const network = await networkProvider.getNetwork()

    return network.chainId
  }

  function _validateEditionConfig(config: EditionConfig) {
    const { editionMaxMintableLower, editionMaxMintableUpper, fundingRecipient } = config

    if (!isAddress(fundingRecipient) || fundingRecipient === NULL_ADDRESS) {
      throw new InvalidFundingRecipientError({ fundingRecipient })
    }

    if (editionMaxMintableLower > editionMaxMintableUpper) {
      throw new InvalidEditionMaxMintableRangeError({
        editionMaxMintableLower,
        editionMaxMintableUpper,
      })
    }
  }

  function _validateMintConfigs(mintConfigs: MintConfig[]) {
    for (const mintConfig of mintConfigs) {
      const { maxMintablePerAccount } = mintConfig
      if (maxMintablePerAccount === 0) {
        throw new MaxMintablePerAccountError({ maxMintablePerAccount })
      }

      if (mintConfig.mintType === 'RangeEdition') {
        const { maxMintableLower, maxMintableUpper, startTime, cutoffTime, endTime } = mintConfig
        if (maxMintableLower > maxMintableUpper) {
          throw new InvalidMaxMintableError({ maxMintableLower, maxMintableUpper })
        }
        if (!(startTime < cutoffTime && cutoffTime < endTime)) {
          throw new InvalidTimeValuesError({ startTime, cutoffTime, endTime })
        }
      }

      if (mintConfig.mintType === 'MerkleDrop') {
        const { merkleRoot } = mintConfig
        if (merkleRoot === NULL_BYTES32 || merkleRoot.slice(0, 2) !== '0x' || merkleRoot.length !== 66) {
          throw new InvalidMerkleRootError({ merkleRoot })
        }
      }
    }
  }

  return client
}

export type SoundClient = ReturnType<typeof SoundClient>

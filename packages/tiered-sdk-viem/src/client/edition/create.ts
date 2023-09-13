import { type Address, type Chain } from 'viem'
import { encodeFunctionData } from 'viem/utils'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import {
  InvalidEditionMaxMintableError,
  InvalidMaxMintableError,
  InvalidMaxMintablePerAccountError,
  InvalidMerkleRootError,
  InvalidTimeValuesError,
} from '../../errors'
import type { ContractCall, EditionConfig, MintConfig, SuperMinterConfig, TransactionGasOptions } from '../../types'
import { editionInitFlags, MINTER_ROLE, NULL_BYTES32, UINT32_MAX } from '../../utils/constants'
import { getSaltAsBytes32, retry } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'
import { SoundEditionV2Config } from '../../abi/sound-edition-v2'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'

async function createEditionHelper(
  this: SoundClientInstance,
  { creatorAddress }: { creatorAddress: Address },
  {
    editionConfig,
    mintConfigs,
    salt: customSalt,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    editionConfig: EditionConfig
    mintConfigs: SuperMinterConfig[]

    salt?: string | number
  } & TransactionGasOptions,
) {
  validateEditionConfig(editionConfig)

  validateMintConfigs(mintConfigs)

  const [{ wallet, userAddress }, { readContract, estimateContractGas }] = await Promise.all([
    this.expectWallet(),
    this.expectClient(),
  ])

  const txnOverrides: TransactionGasOptions = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

  // Precompute the edition address.
  const [editionAddress, _] = await retry(
    () =>
      readContract({
        abi: soundCreatorV1Abi,
        address: creatorAddress,
        functionName: 'soundEditionAddress',
        args: [userAddress, formattedSalt],
      }),
    {
      attempts: 5,
      delay: 500,
    },
  )

  /**
   * Encode all the bundled contract calls.
   */
  const contractCalls: ContractCall[] = []

  // Grant MINTER_ROLE for each minter.
  const mintersToGrantRole = Array.from(new Set(mintConfigs.map((m) => m.minterAddress)))
  for (const minterAddress of mintersToGrantRole) {
    contractCalls.push({
      contractAddress: editionAddress,
      calldata: encodeFunctionData({
        abi: SoundEditionV2Config.abi,
        functionName: 'grantRoles',
        args: [minterAddress, MINTER_ROLE],
      }),
    })
  }

  // Add the createEditionMint calls.
  for (const mintConfig of mintConfigs) {
    contractCalls.push({
      contractAddress: mintConfig.minterAddress,

      calldata: encodeFunctionData({
        abi: SuperMinterV1Config.abi,
        functionName: 'createEditionMint',

        args: [
          {
            edition: editionAddress,
            price: mintConfig.price,
            startTime: Math.floor(mintConfig.startTime),
            endTime: Math.floor(mintConfig.endTime),
            maxMintablePerAccount: Math.floor(mintConfig.maxMintablePerAccount),
            maxMintable: Math.floor(mintConfig.maxMintable),
            affiliateFeeBPS: mintConfig.affiliateFeeBPS,
            affiliateMerkleRoot: mintConfig.affiliateMerkleRoot,
            tier: mintConfig.tier,
            platform: mintConfig.platform,
            // TODO: add better typesafety and comments here
            mode: mintConfig.mintType === 'RangeEdition' ? 0 : 1,
            signer: mintConfig.signer,
            merkleRoot: mintConfig.merkleRoot,
          },
        ],
      }),
    })
  }

  let flags = 0
  if (editionConfig.shouldFreezeMetadata) flags |= editionInitFlags.METADATA_IS_FROZEN
  if (editionConfig.shouldEnableMintRandomness) flags |= editionInitFlags.MINT_RANDOMNESS_ENABLED
  if (editionConfig.enableOperatorFiltering) flags |= editionInitFlags.OPERATOR_FILTERING_ENABLED

  /**
   * Encode the SoundEdition.initialize call.
   */
  const editionInitData = encodeFunctionData({
    abi: SoundEditionV2Config.abi,
    functionName: 'initialize',
    args: [
      {
        name: editionConfig.name,
        symbol: editionConfig.symbol,
        metadataModule: editionConfig.metadataModule,
        baseURI: editionConfig.baseURI,
        contractURI: editionConfig.contractURI,
        fundingRecipient: editionConfig.fundingRecipient,
        royaltyBPS: editionConfig.royaltyBPS,
        operatorFilteringEnabled: true,
        isCreateTierFrozen: false,
        isMetadataFrozen: false,
        tierCreations: [
          // todo: make this dynamic, fill in placeholder values
          {
            tier: 0,
            cutoffTime: UINT32_MAX,
            isFrozen: false,
            maxMintableLower: UINT32_MAX,
            maxMintableUpper: UINT32_MAX,
            mintRandomnessEnabled: false,
          },
          {
            tier: 1,
            cutoffTime: UINT32_MAX,
            isFrozen: false,
            maxMintableLower: UINT32_MAX,
            maxMintableUpper: UINT32_MAX,
            mintRandomnessEnabled: false,
          },
        ],
      },
    ],
  })

  return {
    soundCreatorContractAbi: soundCreatorV1Abi,
    wallet,
    formattedSalt,
    editionInitData,
    addresses: contractCalls.map((d) => d.contractAddress),
    calldata: contractCalls.map((d) => d.calldata),
    txnOverrides,
    userAddress,
    readContract,
    estimateContractGas,
  }
}

export async function estimateCreateEdition(
  this: SoundClientInstance,
  { creatorAddress }: { creatorAddress: Address },
  {
    editionConfig,
    mintConfigs,
    salt: customSalt,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: {
    editionConfig: EditionConfig
    mintConfigs: SuperMinterConfig[]

    salt?: string | number
  } & TransactionGasOptions,
) {
  const {
    soundCreatorContractAbi,
    userAddress,
    formattedSalt,
    editionInitData,
    addresses,
    calldata,
    txnOverrides,
    estimateContractGas,
  } = await createEditionHelper.call(
    this,
    { creatorAddress },
    { editionConfig, mintConfigs, salt: customSalt, gas, maxFeePerGas, maxPriorityFeePerGas },
  )

  return estimateContractGas({
    abi: soundCreatorContractAbi,
    account: userAddress,
    address: creatorAddress,
    functionName: 'createSoundAndMints',
    args: [formattedSalt, editionInitData, addresses, calldata],
    ...txnOverrides,
  })
}

export interface CreateEditionOptions extends TransactionGasOptions {
  editionConfig: EditionConfig
  mintConfigs: SuperMinterConfig[]

  chain: Chain

  salt?: string | number
}

export async function createEdition(
  this: SoundClientInstance,
  { creatorAddress }: { creatorAddress: Address },
  {
    editionConfig,
    mintConfigs,
    salt: customSalt,

    chain,

    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }: CreateEditionOptions,
) {
  const {
    formattedSalt,
    editionInitData,
    addresses,
    calldata,
    txnOverrides,

    wallet,

    soundCreatorContractAbi,
    userAddress,
  } = await createEditionHelper.call(
    this,
    { creatorAddress },
    { editionConfig, mintConfigs, salt: customSalt, gas, maxFeePerGas, maxPriorityFeePerGas },
  )

  return wallet.writeContract({
    abi: soundCreatorContractAbi,

    account: userAddress,
    address: creatorAddress,
    chain,
    functionName: 'createSoundAndMints',
    args: [formattedSalt, editionInitData, addresses, calldata],
    ...txnOverrides,
  })
}

export function validateEditionConfig(config: EditionConfig) {
  const { editionMaxMintableLower, editionMaxMintableUpper } = config

  if (editionMaxMintableLower > editionMaxMintableUpper) {
    throw new InvalidEditionMaxMintableError({
      editionMaxMintableLower,
      editionMaxMintableUpper,
    })
  }
}

export function validateMintConfigs(mintConfigs: MintConfig[]) {
  for (const mintConfig of mintConfigs) {
    const { maxMintablePerAccount } = mintConfig

    if (maxMintablePerAccount < 1) {
      throw new InvalidMaxMintablePerAccountError({ maxMintablePerAccount })
    }

    if (mintConfig.mintType === 'RangeEdition') {
      const { maxMintableLower, maxMintableUpper, startTime, cutoffTime, endTime } = mintConfig
      if (maxMintableLower > maxMintableUpper) {
        throw new InvalidMaxMintableError({ maxMintableLower, maxMintableUpper })
      }
      if (!(startTime < cutoffTime && cutoffTime < endTime)) {
        throw new InvalidTimeValuesError({ startTime, cutoffTime, endTime })
      }
    } else if (mintConfig.mintType === 'MerkleDrop') {
      const { merkleRoot } = mintConfig
      if (
        merkleRoot === NULL_BYTES32 ||
        merkleRoot.slice(0, 2) !== '0x' ||
        // Merkle root is 32 bytes, which is 64 hex characters + '0x'
        merkleRoot.length !== 66
      ) {
        throw new InvalidMerkleRootError({ merkleRoot })
      }
    }
  }
}

export async function expectedEditionAddress(
  this: SoundClientInstance,
  {
    creatorAddress,
  }: {
    creatorAddress: Address
  },
  { deployer, salt }: { deployer: Address; salt: string | number },
) {
  const { readContract } = await this.expectClient()

  const [editionAddress, exists] = await readContract({
    abi: soundCreatorV1Abi,
    address: creatorAddress,
    functionName: 'soundEditionAddress',
    args: [deployer, getSaltAsBytes32(salt)],
  })

  return {
    editionAddress,
    exists,
  }
}

import { type Address, type Chain } from 'viem'
import { encodeFunctionData, keccak256, toHex } from 'viem/utils'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import {
  InvalidEditionMaxMintableError,
  InvalidMaxMintableError,
  InvalidMaxMintablePerAccountError,
  InvalidMerkleRootError,
  InvalidTimeValuesError,
} from '../../errors'
import type { ContractCall, EditionConfig, MintConfig, TransactionGasOptions } from '../../types'
import { editionInitFlags, MINTER_ROLE, NULL_ADDRESS, NULL_BYTES32, UINT32_MAX } from '../../utils/constants'
import { retry } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'
import { soundEditionV1_2Abi } from '../../abi/sound-edition-v1_2'
import { rangeEditionMinterV2_1Abi } from '../../abi/range-edition-minter-v2_1'
import { merkleDropMinterV2_1Abi } from '../../abi/merkle-drop-minter-v2_1'
import { samV1_1Abi } from '../../abi/sam-v1_1'

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
    mintConfigs: MintConfig[]

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

  const formattedSalt = keccak256(toHex(customSalt || Math.floor(Math.random() * 1_000_000_000_000_000)))

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
        abi: soundEditionV1_2Abi,
        functionName: 'grantRoles',
        args: [minterAddress, MINTER_ROLE],
      }),
    })
  }

  // Add the createEditionMint calls.
  for (const mintConfig of mintConfigs) {
    /**
     * Set up the createEditionMint call for each mint config.
     */
    switch (mintConfig.mintType) {
      case 'RangeEdition': {
        contractCalls.push({
          contractAddress: mintConfig.minterAddress,

          calldata: encodeFunctionData({
            abi: rangeEditionMinterV2_1Abi,
            functionName: 'createEditionMint',
            args: [
              editionAddress,
              mintConfig.price,
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.cutoffTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintableLower),
              Math.floor(mintConfig.maxMintableUpper),
              Math.floor(mintConfig.maxMintablePerAccount),
            ],
          }),
        })
        break
      }
      case 'MerkleDrop': {
        contractCalls.push({
          contractAddress: mintConfig.minterAddress,
          calldata: encodeFunctionData({
            abi: merkleDropMinterV2_1Abi,
            functionName: 'createEditionMint',
            args: [
              editionAddress,
              mintConfig.merkleRoot,
              mintConfig.price,
              Math.floor(mintConfig.startTime),
              Math.floor(mintConfig.endTime),
              mintConfig.affiliateFeeBPS,
              Math.floor(mintConfig.maxMintable),
              Math.floor(mintConfig.maxMintablePerAccount),
            ],
          }),
        })
        break
      }
    }
  }

  if (editionConfig.setSAM && editionConfig.setSAM.contractAddress !== NULL_ADDRESS) {
    contractCalls.push({
      contractAddress: editionAddress,
      calldata: encodeFunctionData({
        abi: soundEditionV1_2Abi,
        functionName: 'setSAM',
        args: [editionConfig.setSAM.contractAddress],
      }),
    })

    contractCalls.push({
      contractAddress: editionConfig.setSAM.contractAddress,
      calldata: encodeFunctionData({
        abi: samV1_1Abi,
        functionName: 'create',
        args: [
          editionAddress,
          editionConfig.setSAM.basePrice,
          BigInt(editionConfig.setSAM.linearPriceSlope),
          BigInt(editionConfig.setSAM.inflectionPrice),
          editionConfig.setSAM.inflectionPoint,
          UINT32_MAX,
          UINT32_MAX,
          editionConfig.setSAM.artistFeeBPS,
          editionConfig.setSAM.goldenEggFeeBPS,
          editionConfig.setSAM.affiliateFeeBPS,
          userAddress,
          formattedSalt,
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
    abi: soundEditionV1_2Abi,
    functionName: 'initialize',
    args: [
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
    mintConfigs: MintConfig[]

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
  mintConfigs: MintConfig[]

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
  { deployer, salt: customSalt }: { deployer: Address; salt: string | number },
) {
  const { readContract } = await this.expectClient()
  const formattedSalt = keccak256(toHex(customSalt))

  const [editionAddress, exists] = await readContract({
    abi: soundCreatorV1Abi,
    address: creatorAddress,
    functionName: 'soundEditionAddress',
    args: [deployer, formattedSalt],
  })

  return {
    editionAddress,
    exists,
  }
}

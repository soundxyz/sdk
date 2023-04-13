import { BigNumberish } from '@ethersproject/bignumber'
import { Overrides } from '@ethersproject/contracts'
import {
  MerkleDropMinterV2__factory,
  RangeEditionMinterV2__factory,
  SAM__factory,
  SoundCreatorV1__factory,
  SoundEditionV1_2__factory,
} from '@soundxyz/sound-protocol-private/typechain'

import {
  InvalidEditionMaxMintableError,
  InvalidMaxMintableError,
  InvalidMaxMintablePerAccountError,
  InvalidMerkleRootError,
  InvalidTimeValuesError,
} from '../../errors'
import { ContractCall, EditionConfig, MintConfig } from '../../types'
import { editionInitFlags, MINTER_ROLE, NULL_ADDRESS, NULL_BYTES32, UINT32_MAX } from '../../utils/constants'
import { getSaltAsBytes32, validateAddress } from '../../utils/helpers'
import { SoundClientInstance } from '../instance'

export async function createEdition(
  this: SoundClientInstance,
  { creatorAddress }: { creatorAddress: string },
  {
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
  },
) {
  validateAddress({
    address: creatorAddress,
    type: 'CREATOR_ADDRESS',
    notNull: true,
  })

  await validateEditionConfig(editionConfig)

  validateMintConfigs(mintConfigs)

  const { signer, userAddress } = await this.expectSigner()

  const txnOverrides: Overrides = {
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  }

  const formattedSalt = getSaltAsBytes32(customSalt || Math.random() * 1_000_000_000_000_000)

  validateAddress({
    address: creatorAddress,
    type: 'CREATOR_ADDRESS',
    notNull: true,
  })

  // Precompute the edition address.
  const [editionAddress, _] = await SoundCreatorV1__factory.connect(creatorAddress, signer).soundEditionAddress(
    userAddress,
    formattedSalt,
  )

  const editionInterface = SoundEditionV1_2__factory.createInterface()

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
        const minterInterface = RangeEditionMinterV2__factory.createInterface()
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
        const minterInterface = MerkleDropMinterV2__factory.createInterface()
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

  if (editionConfig.setSAM && editionConfig.setSAM.contractAddress !== NULL_ADDRESS) {
    contractCalls.push({
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('setSAM', [editionConfig.setSAM.contractAddress]),
    })

    const samInterface = SAM__factory.createInterface()

    contractCalls.push({
      contractAddress: editionConfig.setSAM.contractAddress,
      calldata: samInterface.encodeFunctionData('create', [
        editionAddress,
        editionConfig.setSAM.basePrice,
        editionConfig.setSAM.linearPriceSlope,
        editionConfig.setSAM.inflectionPrice,
        editionConfig.setSAM.inflectionPoint,
        UINT32_MAX,
        UINT32_MAX,
        editionConfig.setSAM.artistFeeBPS,
        editionConfig.setSAM.goldenEggFeeBPS,
        editionConfig.setSAM.affiliateFeeBPS,
        userAddress,
        formattedSalt,
      ]),
    })
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

export async function validateEditionConfig(config: EditionConfig) {
  const { editionMaxMintableLower, editionMaxMintableUpper, fundingRecipient, metadataModule, setSAM } = config

  validateAddress({
    type: 'FUNDING_RECIPIENT',
    address: fundingRecipient,
    notNull: true,
  })

  validateAddress({
    type: 'METADATA_MODULE',
    address: metadataModule,
  })

  if (editionMaxMintableLower > editionMaxMintableUpper) {
    throw new InvalidEditionMaxMintableError({
      editionMaxMintableLower,
      editionMaxMintableUpper,
    })
  }

  if (setSAM != null) {
    validateAddress({
      type: 'SAM',
      address: setSAM.contractAddress,
    })
  }
}

export function validateMintConfigs(mintConfigs: MintConfig[]) {
  for (const mintConfig of mintConfigs) {
    const { maxMintablePerAccount, minterAddress } = mintConfig

    validateAddress({
      type: 'MINTER',
      address: minterAddress,
      notNull: true,
    })

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
    creatorAddress: string
  },
  { deployer, salt }: { deployer: string; salt: string | number },
) {
  validateAddress({ type: 'DEPLOYER', address: deployer })
  validateAddress({
    type: 'CREATOR_ADDRESS',
    address: creatorAddress,
  })
  const { signerOrProvider } = await this.expectSignerOrProvider()

  const { addr: editionAddress, exists } = await SoundCreatorV1__factory.connect(
    creatorAddress,
    signerOrProvider,
  ).soundEditionAddress(deployer, getSaltAsBytes32(salt))

  return {
    editionAddress,
    exists,
  }
}

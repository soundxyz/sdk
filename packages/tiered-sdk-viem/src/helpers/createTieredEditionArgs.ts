import { encodeFunctionData, pad, type Address, type Hex } from 'viem'
import { splitMainAbi } from '../abi/external/split-main'
import { SoundEditionV2Config } from '../abi/sound-edition-v2'
import { soundMetadataAbi } from '../abi/sound-metadata'
import { SuperMinterV1Config } from '../abi/super-minter-v1'
import type { ContractCall, MinterScheduleConfig, TierConfig, TieredEditionConfig } from '../types'
import { MINTER_ROLE, NULL_ADDRESS } from '../utils/constants'

export type CreateTieredEditionArgs = {
  formattedSalt: Hex
  precomputedEditionAddress: Address
  superMinterAddress: Address
  soundMetadataAddress: Address
  editionConfig: TieredEditionConfig
  tierConfigs: TierConfig[]
  mintConfigs: MinterScheduleConfig[]
  createSplit: {
    splitMainAddress: Address
    accountAllocations: {
      account: Address
      percentAllocation: number
    }[]
    distributorFee: number
    controller: Address
  } | null
}

export function createTieredEditionArgs({
  formattedSalt,
  precomputedEditionAddress,
  superMinterAddress,
  soundMetadataAddress,
  editionConfig,
  tierConfigs,
  mintConfigs,
  createSplit,
}: CreateTieredEditionArgs) {
  /**
   * Encode all the bundled contract calls.
   */
  const contractCalls: ContractCall[] = []

  // Grant MINTER_ROLE for super minter
  contractCalls.push({
    contractAddress: precomputedEditionAddress,
    calldata: encodeFunctionData({
      abi: SoundEditionV2Config.abi,
      functionName: 'grantRoles',
      args: [superMinterAddress, MINTER_ROLE],
    }),
  })

  // Set up tier schedules on super minter
  for (const mintConfig of mintConfigs) {
    contractCalls.push({
      contractAddress: superMinterAddress,
      calldata: encodeFunctionData({
        abi: SuperMinterV1Config.abi,
        functionName: 'createEditionMint',
        args: [
          {
            edition: precomputedEditionAddress,
            price: mintConfig.price,
            startTime: Math.floor(mintConfig.startTime),
            endTime: Math.floor(mintConfig.endTime),
            maxMintablePerAccount: Math.floor(mintConfig.maxMintablePerAccount),
            maxMintable: Math.floor(mintConfig.maxMintable),
            affiliateFeeBPS: mintConfig.affiliateFeeBPS,
            affiliateMerkleRoot: mintConfig.affiliateMerkleRoot,
            tier: mintConfig.tier,
            platform: mintConfig.platform,
            // TODO: add better typesafety here
            mode: mintConfig.mode === 'DEFAULT' ? 0 : mintConfig.mode === 'VERIFY_MERKLE' ? 1 : 2,
            merkleRoot: mintConfig.mode === 'VERIFY_MERKLE' ? mintConfig.merkleRoot : pad('0x69', { size: 32 }),
            signer: mintConfig.mode === 'VERIFY_SIGNATURE' ? mintConfig.signer : NULL_ADDRESS,
          },
        ],
      }),
    })
  }

  // set up tier metadata on sound metadata
  for (const tierConfig of tierConfigs) {
    // set tier metadata
    contractCalls.push({
      contractAddress: soundMetadataAddress,
      calldata: encodeFunctionData({
        abi: soundMetadataAbi,
        functionName: 'setBaseURI',
        args: [precomputedEditionAddress, tierConfig.tier, tierConfig.baseURI],
      }),
    })
  }

  if (createSplit) {
    const { splitMainAddress, accountAllocations, controller, distributorFee } = createSplit
    // accounts are expected to be ordered alphabetically
    accountAllocations.sort((a, b) => a.account.toLowerCase().localeCompare(b.account.toLowerCase()))
    const accounts = accountAllocations.map(({ account }) => account)
    const percentAllocations = accountAllocations.map(({ percentAllocation }) => percentAllocation)

    const splitCalldata = encodeFunctionData({
      abi: splitMainAbi,
      functionName: 'createSplit',
      args: [accounts, percentAllocations, distributorFee, controller],
    })

    contractCalls.push({
      contractAddress: precomputedEditionAddress,
      calldata: encodeFunctionData({
        abi: SoundEditionV2Config.abi,
        functionName: 'createSplit',
        args: [splitMainAddress, splitCalldata],
      }),
    })
  }

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
        isCreateTierFrozen: editionConfig.shouldFreezeTierCreation,
        isMetadataFrozen: editionConfig.shouldFreezeMetadata,
        tierCreations: tierConfigs.map((tierConfig) => ({
          tier: tierConfig.tier,
          cutoffTime: tierConfig.cutoffTime,
          isFrozen: tierConfig.isFrozen,
          maxMintableLower: tierConfig.maxMintableLower,
          maxMintableUpper: tierConfig.maxMintableUpper,
          mintRandomnessEnabled: tierConfig.mintRandomnessEnabled,
        })),
      },
    ],
  })

  const addresses = contractCalls.map((d) => d.contractAddress)
  const calldata = contractCalls.map((d) => d.calldata)

  return [formattedSalt, editionInitData, addresses, calldata] as const
}

import {
  type WalletClient,
  type Address,
  encodeFunctionData,
  type Hex,
  type Chain,
  type Account,
  type Transport,
  pad,
} from 'viem'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import type { ContractCall, MinterScheduleConfig, TieredEditionConfig, TierConfig } from '../../types'
import { SoundEditionV2Config } from '../../abi/sound-edition-v2'
import { MINTER_ROLE, NULL_ADDRESS } from '../../utils/constants'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'
import { splitMainAbi } from '../../abi/external/split-main'
import { soundMetadataAbi } from '../../abi/sound-metadata'

export type WriteCreateTieredEditionParameters = {
  creatorAddress: Address
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
  chain: Chain
}

const ABI = soundCreatorV1Abi
const FUNC = 'createSoundAndMints'

export async function writeCreateTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  {
    creatorAddress,
    formattedSalt,
    precomputedEditionAddress,
    superMinterAddress,
    soundMetadataAddress,
    editionConfig,
    tierConfigs,
    mintConfigs,
    createSplit,
    chain,
  }: WriteCreateTieredEditionParameters,
) {
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
            signer: mintConfig.mode === 'VERIFY_SIGNATURE' ? mintConfig.signer : NULL_ADDRESS,
            merkleRoot: mintConfig.mode === 'VERIFY_MERKLE' ? mintConfig.merkleRoot : pad('0x0', { size: 32 }),
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
      contractAddress: superMinterAddress,
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

  return client.writeContract({
    chain,
    abi: ABI,
    address: creatorAddress,
    functionName: FUNC,
    args: [formattedSalt, editionInitData, addresses, calldata],
    account: client.account.address,
  })
}

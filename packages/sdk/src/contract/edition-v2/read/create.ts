import {
  encodeFunctionData,
  type Address,
  type EncodeFunctionDataParameters,
  type Hex,
  type PublicClient,
  type Account,
} from 'viem'
import { SPLIT_MAIN_ABI, SPLIT_MAIN_ADDRESS } from '../abi/external/split-main'
import { SOUND_CREATOR_V2_ABI, SOUND_CREATOR_V2_ADDRESS } from '../abi/sound-creator-v2'
import { SOUND_EDITION_V2_ABI, SOUND_EDITION_V2_IMPLEMENTATION_ADDRESS } from '../abi/sound-edition-v2'
import { SOUND_METADATA_ABI, SOUND_METADATA_ADDRESS } from '../abi/sound-metadata'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../abi/super-minter'
import type { MinterScheduleConfig, TierConfig, TieredEditionConfig } from './info'
import type { ContractCall } from '../../types'
import { MINTER_ROLE } from './helpers'
import { EMPTY_BYTES32, MINT_GAS_LIMIT_MULTIPLIER, NULL_ADDRESS, scaleAmount } from '../../../utils/helpers'
import type { Prettify, TransactionGasOptions } from '../../../utils/types'

interface EditionV2EncodeArguments {
  readonly owner: Address | Account
  readonly formattedSalt: Hex
  readonly precomputedEdition: Address
  readonly editionConfig: TieredEditionConfig
  readonly tierConfigs: readonly TierConfig[]
  readonly mintConfigs: MinterScheduleConfig[]
  readonly createSplit: {
    readonly accountAllocations: readonly {
      readonly account: Address
      readonly percentAllocation: number
    }[]
    readonly distributorFee: number
    readonly controller: Address
  } | null
}

function createTieredEditionArgs({
  owner,
  formattedSalt,
  precomputedEdition,
  editionConfig,
  tierConfigs,
  mintConfigs,
  createSplit,
}: EditionV2EncodeArguments): EncodeFunctionDataParameters<typeof SOUND_CREATOR_V2_ABI, 'create'> {
  const contractCalls: ContractCall[] = []

  // Grant MINTER_ROLE for super minter
  contractCalls.push({
    contractAddress: precomputedEdition,
    calldata: encodeFunctionData({
      abi: SOUND_EDITION_V2_ABI,
      functionName: 'grantRoles',
      args: [SUPER_MINTER_ADDRESS, MINTER_ROLE],
    }),
  })

  // Set up tier schedules on super minter
  for (const mintConfig of mintConfigs) {
    contractCalls.push({
      contractAddress: SUPER_MINTER_ADDRESS,
      calldata: encodeFunctionData({
        abi: SUPER_MINTER_ABI,
        functionName: 'createEditionMint',
        args: [
          {
            edition: precomputedEdition,
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
            merkleRoot: mintConfig.mode === 'VERIFY_MERKLE' ? mintConfig.merkleRoot : EMPTY_BYTES32,
            signer: mintConfig.mode === 'VERIFY_SIGNATURE' ? mintConfig.signer : NULL_ADDRESS,
          },
        ],
      }),
    })
  }

  // Set up tier metadata on sound metadata
  for (const tierConfig of tierConfigs) {
    // set tier metadata
    contractCalls.push({
      contractAddress: SOUND_METADATA_ADDRESS,
      calldata: encodeFunctionData({
        abi: SOUND_METADATA_ABI,
        functionName: 'setBaseURI',
        args: [precomputedEdition, tierConfig.tier, tierConfig.baseURI],
      }),
    })
  }

  // Create split if supplied
  if (createSplit) {
    const { accountAllocations, controller, distributorFee } = createSplit

    // accounts are expected to be ordered alphabetically
    const sortedAccountAllocations = [...accountAllocations].sort((a, b) =>
      a.account.toLowerCase().localeCompare(b.account.toLowerCase()),
    )

    const accounts = sortedAccountAllocations.map(({ account }) => account)
    const percentAllocations = sortedAccountAllocations.map(({ percentAllocation }) => percentAllocation)

    const splitCalldata = encodeFunctionData({
      abi: SPLIT_MAIN_ABI,
      functionName: 'createSplit',
      args: [accounts, percentAllocations, distributorFee, controller],
    })

    contractCalls.push({
      contractAddress: precomputedEdition,
      calldata: encodeFunctionData({
        abi: SOUND_EDITION_V2_ABI,
        functionName: 'createSplit',
        args: [SPLIT_MAIN_ADDRESS, splitCalldata],
      }),
    })
  }

  // Encode the SoundEdition.initialize call.
  const editionInitData = encodeFunctionData({
    abi: SOUND_EDITION_V2_ABI,
    functionName: 'initialize',
    args: [
      {
        name: editionConfig.name,
        symbol: editionConfig.symbol,
        metadataModule: SOUND_METADATA_ADDRESS,
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

  return {
    abi: SOUND_CREATOR_V2_ABI,
    functionName: 'create',
    args: [
      {
        contracts: addresses,
        data: calldata,
        implementation: SOUND_EDITION_V2_IMPLEMENTATION_ADDRESS,
        initData: editionInitData,
        owner: typeof owner === 'string' ? owner : owner.address,
        salt: formattedSalt,
        // doesn't matter outside of signature
        nonce: 0n,
      },
    ],
  } as const
}

export interface CreateEditionArguments extends EditionV2EncodeArguments, TransactionGasOptions {}

export const FALLBACK_ESTIMATED_UPLOAD_GAS = 1_000_000n

export async function createEditionParameters<
  Client extends Pick<PublicClient, 'readContract' | 'multicall' | 'estimateContractGas'>,
>(client: Client, { gas, maxFeePerGas, maxPriorityFeePerGas, ...args }: Prettify<CreateEditionArguments>) {
  const txnOverrides = {
    gas,
    maxFeePerGas,
    maxPriorityFeePerGas,
  } satisfies TransactionGasOptions

  const input = {
    ...createTieredEditionArgs(args),
    functionName: 'create',
    address: SOUND_CREATOR_V2_ADDRESS,
    account: args.owner,
    ...txnOverrides,
  } as const

  let gasEstimate: bigint | null

  try {
    // Add a buffer to the gas estimate to account for node provider estimate variance.
    gasEstimate = txnOverrides.gas = scaleAmount({
      amount: await client.estimateContractGas(input),
      multiplier: MINT_GAS_LIMIT_MULTIPLIER,
    })
  } catch (err) {
    // If estimation fails, provide a hardcoded gas limit that is guaranteed to succeed.
    txnOverrides.gas = FALLBACK_ESTIMATED_UPLOAD_GAS

    gasEstimate = null
  }

  return {
    input: {
      ...input,
      ...txnOverrides,
    },
    gasEstimate,
  } as const
}

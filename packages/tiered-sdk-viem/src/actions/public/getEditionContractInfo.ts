import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SOUND_EDITION_V2_ABI } from '../../abi/sound-edition-v2'
import { getTierCurrentMaxMintable } from '../../helpers/tierCurrentMaxMintable'

export type GetEditionContractInfoParams = {
  edition: Address
}

export type GetEditionContractInfoReturnType = {
  baseURI: string
  contractURI: string
  name: string
  symbol: string
  fundingRecipient: Address
  metadataModule: Address
  isMetadataFrozen: boolean
  isCreateTierFrozen: boolean
  royaltyBPS: number
  nextTokenId: bigint
  totalBurned: bigint
  totalMinted: bigint
  totalSupply: bigint
  tierInfo: readonly {
    tier: number
    maxMintable: number | ((unixTimestamp?: number) => number)
    maxMintableLower: number
    maxMintableUpper: number
    cutoffTime: number
    minted: number
    mintRandomness: bigint
    mintConcluded: boolean
    mintRandomnessEnabled: boolean
    isFrozen: boolean
  }[]
}

export async function getEditionContractInfo<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { edition }: GetEditionContractInfoParams,
): Promise<GetEditionContractInfoReturnType> {
  const data = await client.readContract({
    abi: SOUND_EDITION_V2_ABI,
    address: edition,
    functionName: 'editionInfo',
  })

  return {
    ...data,
    tierInfo: data.tierInfo.map((tierInfo) => ({
      ...tierInfo,
      maxMintable:
        tierInfo.maxMintableLower === tierInfo.maxMintableUpper
          ? tierInfo.maxMintableLower
          : (unixTimestamp?: number) => getTierCurrentMaxMintable(tierInfo, unixTimestamp),
    })),
  }
}

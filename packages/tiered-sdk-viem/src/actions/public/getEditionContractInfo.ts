import type { Address, PublicClient } from 'viem'
import { SoundEditionV2Config } from '../../abi/sound-edition-v2'

export interface GetEditionContractInfoParams {
  editionAddress: Address
}

export interface GetEditionContractInfoReturnType {
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

export async function getEditionContractInfo(
  client: PublicClient,
  { editionAddress }: GetEditionContractInfoParams,
): Promise<GetEditionContractInfoReturnType> {
  const data = await client.readContract({
    abi: SoundEditionV2Config.abi,
    address: editionAddress,
    functionName: 'editionInfo',
  })

  return {
    ...data,
    tierInfo: data.tierInfo.map((tierInfo) => ({
      ...tierInfo,
      maxMintable:
        tierInfo.maxMintableLower === tierInfo.maxMintableUpper
          ? tierInfo.maxMintableLower
          : (unixTimestamp: number | undefined = Date.now() / 1000) =>
              // if before the cutoff time, use the upper limit, otherwise use the lower limit
              unixTimestamp < tierInfo.cutoffTime ? tierInfo.maxMintableUpper : tierInfo.maxMintableLower,
    })),
  }
}

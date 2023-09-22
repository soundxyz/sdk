import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'

export type GetPlatformFeesParams = {
  superMinterAddress: Address
  platform: Address
  tiers: number[]
}

export type GetPlatformFeesReturnType = {
  perTxFlat: bigint
  perMintFlat: bigint
  perMintBPS: number
  active: boolean
}[]

export async function getPlatformFees<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  { superMinterAddress, platform, tiers }: GetPlatformFeesParams,
): Promise<GetPlatformFeesReturnType> {
  return client.multicall({
    contracts: tiers.map((tier) => ({
      abi: SuperMinterV1Config.abi,
      address: superMinterAddress,
      functionName: 'platformFeeConfig',
      args: [platform, tier],
    })),
    allowFailure: false,
  })
}

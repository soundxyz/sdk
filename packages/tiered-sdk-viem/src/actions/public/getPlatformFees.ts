import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'

export type GetPlatformFeesParams = {
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
  { platform, tiers }: GetPlatformFeesParams,
): Promise<GetPlatformFeesReturnType> {
  return client.multicall({
    contracts: tiers.map((tier) => ({
      abi: SUPER_MINTER_ABI,
      address: SUPER_MINTER_ADDRESS,
      functionName: 'platformFeeConfig',
      args: [platform, tier],
    })),
    allowFailure: false,
  })
}

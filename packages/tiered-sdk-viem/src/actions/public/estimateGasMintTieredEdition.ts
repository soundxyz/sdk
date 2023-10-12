import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'
import { mintTieredEditionArgs, type MintTieredEditionArgs } from '../../helpers/mintTieredEditionArgs'

export type EstimateGasMintTieredEditionParams = MintTieredEditionArgs & {
  account: Address
  value: bigint
  bufferMultiplier?: number
}

export async function estimateGasMintTieredEdition<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: EstimateGasMintTieredEditionParams,
): Promise<bigint> {
  const { account, value, bufferMultiplier = 1.2 } = args

  const estimate = await client.estimateContractGas({
    address: SUPER_MINTER_ADDRESS,
    abi: SUPER_MINTER_ABI,
    functionName: 'mintTo',
    args: mintTieredEditionArgs(args),
    account,
    value,
  })

  const scaledBuffer = BigInt(Math.round(bufferMultiplier * 100))
  return (estimate * scaledBuffer) / 100n
}

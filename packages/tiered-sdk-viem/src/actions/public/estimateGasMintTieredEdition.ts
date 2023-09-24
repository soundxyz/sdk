import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'
import { mintTieredEditionArgs, type MintTieredEditionArgs } from '../../helpers/mintTieredEditionArgs'

export type EstimateGasMintTieredEditionParams = MintTieredEditionArgs & {
  account: Address
}

export async function estimateGasMintTieredEdition<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: EstimateGasMintTieredEditionParams,
): Promise<bigint> {
  const { account } = args

  return client.estimateContractGas({
    address: SUPER_MINTER_ADDRESS,
    abi: SUPER_MINTER_ABI,
    functionName: 'mintTo',
    args: mintTieredEditionArgs(args),
    account,
  })
}

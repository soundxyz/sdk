import type { Address, Chain, PublicClient, Transport } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'
import { mintTieredEditionArgs, type MintTieredEditionArgs } from '../../helpers/mintTieredEditionArgs'

export type EstimateGasMintTieredEditionParams = MintTieredEditionArgs & {
  superMinterAddress: Address
  account: Address
}

export async function estimateGasCreateTieredEdition<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: EstimateGasMintTieredEditionParams,
): Promise<bigint> {
  const { superMinterAddress, account } = args

  return client.estimateContractGas({
    address: superMinterAddress,
    abi: SuperMinterV1Config.abi,
    functionName: 'mintTo',
    args: mintTieredEditionArgs(args),
    account,
  })
}

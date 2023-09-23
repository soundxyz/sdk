import { type Account, type Address, type Chain, type Transport, type WalletClient } from 'viem'
import { SuperMinterV1Config } from '../../abi/super-minter-v1'
import { mintTieredEditionArgs, type MintTieredEditionArgs } from '../../helpers/mintTieredEditionArgs'

export type WriteMintTieredEditionParameters = MintTieredEditionArgs & {
  chain: Chain
  superMinterAddress: Address
  gasLimit?: bigint
  value: bigint
}

export async function writeMintTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  args: WriteMintTieredEditionParameters,
) {
  const { chain, superMinterAddress, gasLimit, value } = args

  return client.writeContract({
    chain,
    abi: SuperMinterV1Config.abi,
    address: superMinterAddress,
    functionName: 'mintTo',
    args: mintTieredEditionArgs(args),
    account: client.account.address,
    gas: gasLimit,
    value: value as any,
  })
}

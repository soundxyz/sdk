import { type Account, type Chain, type Transport, type WalletClient } from 'viem'
import { SUPER_MINTER_ABI, SUPER_MINTER_ADDRESS } from '../../abi/super-minter'
import { mintTieredEditionArgs, type MintTieredEditionArgs } from '../../helpers/mintTieredEditionArgs'

export type WriteMintTieredEditionParameters = MintTieredEditionArgs & {
  chain: Chain
  gasLimit?: bigint
  value: bigint
}

export async function writeMintTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  args: WriteMintTieredEditionParameters,
) {
  const { chain, gasLimit, value } = args

  return client.writeContract({
    chain,
    abi: SUPER_MINTER_ABI,
    address: SUPER_MINTER_ADDRESS,
    functionName: 'mintTo',
    args: mintTieredEditionArgs(args),
    account: client.account.address,
    gas: gasLimit,
    value: value as any,
  })
}

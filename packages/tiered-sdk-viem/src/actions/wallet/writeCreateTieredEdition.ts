import { type Account, type Chain, type Transport, type WalletClient } from 'viem'
import { SOUND_CREATOR_V2_ADDRESS } from '../../abi/sound-creator-v2'
import { createTieredEditionArgs, type CreateTieredEditionArgs } from '../../helpers/createTieredEditionArgs'

export type WriteCreateTieredEditionParameters = CreateTieredEditionArgs & {
  chain: Chain
  gasLimit?: bigint
}

export async function writeCreateTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  args: WriteCreateTieredEditionParameters,
) {
  const { chain, gasLimit } = args

  return client.writeContract({
    ...createTieredEditionArgs(args),
    address: SOUND_CREATOR_V2_ADDRESS,
    functionName: 'create',
    chain,
    account: client.account.address,
    gas: gasLimit,
  })
}

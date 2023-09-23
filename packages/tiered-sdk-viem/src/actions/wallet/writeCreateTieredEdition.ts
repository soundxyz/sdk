import { type Account, type Address, type Chain, type Transport, type WalletClient } from 'viem'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import { createTieredEditionArgs, type CreateTieredEditionArgs } from '../../helpers/createTieredEditionArgs'

export type WriteCreateTieredEditionParameters = CreateTieredEditionArgs & {
  chain: Chain
  creatorAddress: Address
  gasLimit?: bigint
}

export async function writeCreateTieredEdition<TChain extends Chain | undefined, TAccount extends Account>(
  client: WalletClient<Transport, TChain, TAccount>,
  args: WriteCreateTieredEditionParameters,
) {
  const { creatorAddress, chain, gasLimit } = args

  return client.writeContract({
    chain,
    abi: soundCreatorV1Abi,
    address: creatorAddress,
    functionName: 'createSoundAndMints',
    args: createTieredEditionArgs(args),
    account: client.account.address,
    gas: gasLimit,
  })
}

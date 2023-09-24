import type { Chain, PublicClient, Transport } from 'viem'
import { SOUND_CREATOR_V2_ADDRESS } from '../../abi/sound-creator-v2'
import { createTieredEditionArgs, type CreateTieredEditionArgs } from '../../helpers/createTieredEditionArgs'

export type EstimateGasCreateTieredEditionParams = CreateTieredEditionArgs

export async function estimateGasCreateTieredEdition<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: EstimateGasCreateTieredEditionParams,
): Promise<bigint> {
  const { owner } = args

  return client.estimateContractGas({
    ...createTieredEditionArgs(args),
    functionName: 'create',
    address: SOUND_CREATOR_V2_ADDRESS,
    account: owner,
  })
}

import type { Address, Chain, PublicClient, Transport } from 'viem'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import { createTieredEditionArgs, type CreateTieredEditionArgs } from '../../helpers/createTieredEditionArgs'

export type EstimateGasCreateTieredEditionParams = CreateTieredEditionArgs & {
  soundCreatorAddress: Address
  account: Address
}

export async function estimateGasCreateTieredEdition<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: EstimateGasCreateTieredEditionParams,
): Promise<bigint> {
  const { soundCreatorAddress, account } = args

  return client.estimateContractGas({
    address: soundCreatorAddress,
    abi: soundCreatorV1Abi,
    functionName: 'createSoundAndMints',
    args: createTieredEditionArgs(args),
    account,
  })
}

import type { Address, Chain, PublicClient, Transport } from 'viem'
import { soundCreatorV1Abi } from '../../abi/sound-creator-v1'
import { createTieredEditionArgs, type CreateTieredEditionArgs } from '../../helpers/createTieredEditionArgs'

export type GetCreateTieredEditionGasEstimateParams = CreateTieredEditionArgs & {
  soundCreatorAddress: Address
  deployerAddress: Address
}

export async function getCreateTieredEditionGasEstimate<TChain extends Chain | undefined>(
  client: PublicClient<Transport, TChain>,
  args: GetCreateTieredEditionGasEstimateParams,
): Promise<bigint> {
  const { soundCreatorAddress, deployerAddress } = args

  return client.estimateContractGas({
    address: soundCreatorAddress,
    abi: soundCreatorV1Abi,
    functionName: 'createSoundAndMints',
    args: createTieredEditionArgs(args),
    account: deployerAddress,
  })
}

import { encodeFunctionData, type WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import type { EditionMintContractInput } from '../read/mint'
import { cdCompress } from '../../../utils/calldata'

export function editionMint<Client extends Pick<WalletClient, 'writeContract' | 'sendTransaction'>>(
  client: Client,
  { input, disableCdCompress }: EditionMintContractInput & { disableCdCompress?: boolean },
) {
  const calldata = encodeFunctionData({ abi: input.abi, functionName: input.functionName, args: input.args })

  return client.sendTransaction({
    account: input.account,
    chain: input.chain,
    value: input.value,
    to: input.address,
    data: !!disableCdCompress ? calldata : cdCompress(calldata),
    gas: input.gas,
    maxFeePerGas: input.maxFeePerGas,
    maxPriorityFeePerGas: input.maxPriorityFeePerGas,
  })
}

export function editionV2WalletActionsMint<
  Client extends Pick<WalletClient, 'writeContract' | 'sendTransaction'> & { editionV2?: {} },
>(client: Client) {
  return {
    editionV2: {
      ...client.editionV2,
      mint: curry(editionMint)(client),
    },
  }
}

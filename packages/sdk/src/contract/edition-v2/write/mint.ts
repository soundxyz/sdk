import { encodeFunctionData, type WalletClient } from 'viem'
import { curry } from '../../../utils/helpers'
import type { EditionMintContractInput } from '../read/mint'
import { cdCompress } from '../../../utils/calldata'

export function editionMint<Client extends Pick<WalletClient, 'writeContract' | 'sendTransaction'>>(
  client: Client,
  { input }: EditionMintContractInput,
) {
  const calldata = encodeFunctionData({ abi: input.abi, functionName: input.functionName, args: input.args })
  const compressedCalldata = cdCompress(calldata)

  // destructuring the input object to remove the abi and functionName
  // since we don't need them for the sendTransaction call
  // not removing those causes an error, so it's important
  const { abi, functionName, ...rest } = input
  return client.sendTransaction({
    ...rest,
    data: compressedCalldata,
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

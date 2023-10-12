import assert from 'assert'
import { createTestClient, http, publicActions, walletActions, type Address, type Hash } from 'viem'
import { localhost, type Chain } from 'viem/chains'
import { localHttpUrl, localWsUrl } from './test-constants'

export const anvilChain = {
  ...localhost,
  id: 123,
  rpcUrls: {
    default: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
    },
    public: {
      http: [localHttpUrl],
      webSocket: [localWsUrl],
    },
  },
} as const satisfies Chain

export const testViemClient = createTestClient({
  chain: anvilChain,
  mode: 'anvil',
  transport: http(localHttpUrl),
})
  .extend(publicActions)
  .extend(walletActions)

export async function contractAddressFromTransaction({ hash }: { hash: Hash }): Promise<Address> {
  const { contractAddress } = await testViemClient.waitForTransactionReceipt({
    hash,
  })
  assert(contractAddress, 'contractAddress from transaction not found')
  return contractAddress
}

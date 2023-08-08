import { createTestClient, http, publicActions, walletActions } from 'viem'
import { localhost, mainnet, type Chain } from 'viem/chains'
import { localHttpUrl, localWsUrl, forkUrl } from './test-constants'

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

export const testClient = createTestClient({
  chain: anvilChain,
  mode: 'anvil',
  transport: http(localHttpUrl),
})
  .extend(publicActions)
  .extend(walletActions)

export async function setBlockNumber(blockNumber: bigint) {
  testClient.reset({
    blockNumber,
    jsonRpcUrl: forkUrl,
  })
}

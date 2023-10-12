import { createTestClient, http, publicActions, walletActions, type Hash, type Address } from 'viem'
import { localhost, type Chain } from 'viem/chains'
import { SoundClient } from '../src'
import { MerkleTestHelper } from './helpers'
import { MockAPI } from './helpers/api'
import { localHttpUrl, localWsUrl } from './test-constants'
import assert from 'assert'

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

const merkleTestHelper = MerkleTestHelper()
const merkleTree = merkleTestHelper.getMerkleTree()
export const testSoundClient = SoundClient({
  soundAPI: MockAPI(),
  client: testViemClient,
  account: testViemClient,
  merkleProvider: {
    merkleProof({ userAddress }) {
      return merkleTestHelper.getProof({ merkleTree, address: userAddress })
    },
  },
})

export async function contractAddressFromTransaction({ hash }: { hash: Hash }): Promise<Address> {
  const { contractAddress } = await testViemClient.waitForTransactionReceipt({
    hash,
  })
  assert(contractAddress, 'contractAddress from transaction not found')
  return contractAddress
}

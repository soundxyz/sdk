import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'

export type SoundClient = {
  signer?: Signer
  provider?: Provider
  connect: (signer: Signer) => void
}

const SUPPORTED_CHAIN_IDS = [
  1, // mainnet
  5, // goerli
  1337, // hardhat
  31337, // hardhat
] as const

type ChainId = typeof SUPPORTED_CHAIN_IDS[number]

export function createClient(signerOrProvider: Signer | Provider): SoundClient {
  if (!signerOrProvider) {
    throw new Error('Must provide signer or provider')
  }

  let signer = Signer.isSigner(signerOrProvider) ? signerOrProvider : undefined
  const provider = !Signer.isSigner(signerOrProvider) ? signerOrProvider : undefined

  return {
    signer,
    provider,
    connect: (_signer: Signer) => {
      signer = _signer
    },
  }
}

export async function isSoundEdition(client: SoundClient, params: { address: string }) {
  await validateClient(client)
  validateAddress(params.address)
  // TODO
}

export async function isUserEligibleToMint(client: SoundClient, params: { address: string; time?: number }) {
  await validateClient(client)
  validateAddress(params.address)
  // TODO
}

export async function mint(client: SoundClient, params: { address: string }) {
  await validateClient(client)
  validateAddress(params.address)
  // TODO
}

/**
 * HELPER FUNCTIONS
 */

// TODO: add tests for this
async function validateClient(client: SoundClient) {
  const network = await client.provider?.getNetwork()
  const chainId = network?.chainId || (await client.signer?.getChainId())

  // Using type cast for chainId here because we know signer or provider exists,
  // therefore chainId will be defined.
  const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId as ChainId)

  if (!isSupported) {
    throw new Error('Invalid chain ID')
  }
}

function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new Error('Invalid contract address')
  }
}

import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'

type SoundClient = {
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

export async function isSoundEdition(client: SoundClient, contractAddress: string) {
  validateAddress(contractAddress)
  // TODO
}

export async function isUserEligibleToMint(client: SoundClient, contractAddress: string, time = Date.now()) {
  validateAddress(contractAddress)
  // TODO
}

export async function mint(client: SoundClient, contractAddress: string) {
  validateAddress(contractAddress)
  // TODO
}

/**
 * HELPER FUNCTIONS
 */

function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new Error('Invalid contract address')
  }
}

function validateChainId(chainId: ChainId) {
  if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
    throw new Error('Invalid chain id')
  }
}

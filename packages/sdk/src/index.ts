import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'

export type SoundClient = {
  signer: Signer | null
  provider: Provider | null
  chainId: ChainId | null
  connect: (signer: Signer) => void
}

const SUPPORTED_CHAIN_IDS = [
  1, // mainnet
  5, // goerli
  1337, // hardhat
  31337, // hardhat
] as const

type ChainId = typeof SUPPORTED_CHAIN_IDS[number]

// TODO: add tests for this
export async function createClient(signerOrProvider: Signer | Provider): Promise<SoundClient> {
  if (!signerOrProvider) {
    throw new Error('Must provide signer or provider')
  }

  let signer = Signer.isSigner(signerOrProvider) ? signerOrProvider : null
  const provider = !Signer.isSigner(signerOrProvider) ? signerOrProvider : null

  const network = await provider?.getNetwork()
  const chainId = network?.chainId || (await signer?.getChainId())

  const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId as ChainId)

  if (!isSupported) {
    throw new Error('Invalid chain ID')
  }

  return {
    signer,
    provider,
    chainId,
    connect: (_signer: Signer) => {
      signer = _signer
    },
  }
}

export async function isSoundEdition(client: SoundClient, params: { address: string }) {
  validateAddress(params.address)
  // TODO
}

export async function isUserEligibleToMint(client: SoundClient, params: { address: string; time?: number }) {
  validateAddress(params.address)
  // TODO
}

export async function mint(client: SoundClient, params: { address: string }) {
  validateAddress(params.address)
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

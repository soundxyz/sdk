import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'

import { SoundCreatorV1__factory, SoundCreatorV1 } from '@soundxyz/sound-protocol'
import { SoundEditionCreatedEvent } from '@soundxyz/sound-protocol/SoundCreatorV1'

import { chainIdToInfo } from './config'

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
export function createClient(signerOrProvider: Signer | Provider) {
  if (!signerOrProvider) {
    throw new Error('Must provide signer or provider')
  }

  let signer = Signer.isSigner(signerOrProvider) ? signerOrProvider : null
  const provider = !Signer.isSigner(signerOrProvider) ? signerOrProvider : null

  return {
    signer,
    provider,
    chainId: null,
    connect: (_signer: Signer) => {
      signer = _signer
    },
  }
}

export async function isSoundEdition(client: SoundClient, params: { address: string }) {
  await connectClient(client)
  validateAddress(params.address)

  const { chainId, signer, provider } = client
  if (chainId === null) throw new Error('Must provide chainId')

  const signerOrProvider = signer === null ? provider : signer
  if (signerOrProvider === null) throw new Error('Must provide signer or provider')

  var _isSoundEdition = false

  const soundCreator = SoundCreatorV1__factory.connect(chainIdToInfo[chainId].SoundCreatorV1.address, signerOrProvider)

  const events = (await soundCreator.queryFilter(
    soundCreator.filters.SoundEditionCreated(),
    chainIdToInfo[chainId].SoundCreatorV1.deployedAtBlock,
  )) as SoundEditionCreatedEvent[]

  for (const event of events) {
    if (event.args.soundEdition === params.address) {
      _isSoundEdition = true
      break
    }
  }

  return _isSoundEdition
}

export async function isUserEligibleToMint(client: SoundClient, params: { address: string; time?: number }) {
  await connectClient(client)
  validateAddress(params.address)
  // TODO
}

export async function mint(client: SoundClient, params: { address: string }) {
  await connectClient(client)
  validateAddress(params.address)
  // TODO
}

/*******************
  HELPER FUNCTIONS
 ******************/

// TODO: add tests for this
async function connectClient(client: SoundClient) {
  const network = await client.provider?.getNetwork()
  const chainId = network?.chainId || (await client.signer?.getChainId())

  // Using type cast for chainId here because we know signer or provider exists,
  // therefore chainId will be defined.
  const isSupported = SUPPORTED_CHAIN_IDS.includes(chainId as ChainId)

  if (!isSupported) {
    throw new Error('Invalid chain ID')
  }

  client.chainId = chainId as ChainId
}

function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new Error('Invalid contract address')
  }
}

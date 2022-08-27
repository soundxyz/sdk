import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { minterFactoryMap, interfaceIds, idToInterfaceName, MinterFactoryType } from './config'
import {
  SoundEditionV1__factory,
  RangeEditionMinter__factory,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
  IMinterModule__factory,
} from '@soundxyz/sound-protocol'

export type SoundClient = {
  signer: Signer | null
  provider: Provider | null
  chainId: ChainId | null
  connect: (signer: Signer) => void
}

type MintInfo = {
  name: string
  address: string
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintable: number
  totalMinted: number
}

const SUPPORTED_CHAIN_IDS = [
  1, // mainnet
  5, // goerli
  1337, // hardhat
  31337, // hardhat
] as const

type ChainId = typeof SUPPORTED_CHAIN_IDS[number]

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

  let _isSoundEdition = false

  const editionContract = SoundEditionV1__factory.connect(params.address, signerOrProvider)

  try {
    _isSoundEdition = await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
  } catch (e) {
    console.error(
      'Call to supportsInterface failed. This is likely because the provided contract address is incorrect.',
    )
    _isSoundEdition = false
  }

  return _isSoundEdition
}

export async function isUserEligibleToMint(client: SoundClient, params: { address: string; time?: number }) {
  const editionAddress = params.address
  await connectClient(client)
  validateAddress(editionAddress)

  const { chainId, signer, provider } = client
  if (chainId === null) throw new Error('Must provide chainId')

  const signerOrProvider = signer === null ? provider : signer
  if (signerOrProvider === null) throw new Error('Must provide signer or provider')

  const isEdition = await isSoundEdition(client, params)
  if (!isEdition) {
    throw new Error('Not a Sound Edition')
  }

  const editionContract = SoundEditionV1__factory.connect(editionAddress, signerOrProvider)

  // Get the addresses with MINTER_ROLE
  const minterRole = await editionContract.MINTER_ROLE()
  const filter = editionContract.filters.RolesUpdated(undefined, minterRole)
  const roleEvents = await editionContract.queryFilter(filter)
  const minterCandidateAddresses = roleEvents.map((event) => event.args.user)

  // Check supportsInterface() to verify each address is a minter
  const minterAddresses: string[] = []
  ;(
    await Promise.allSettled(
      minterCandidateAddresses.map(async (minterAddress) => {
        const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const isMinter = await minterContract.supportsInterface(interfaceIds.IMinterModule)

        if (isMinter) {
          minterAddresses.push(minterAddress)
        }
      }),
    )
  ).forEach(handleRejections)

  // Get mintIds for each edition
  const mintIdsMap: { [key: string]: BigNumber[] } = {}
  ;(
    await Promise.allSettled(
      minterAddresses.map(async (minterAddress) => {
        // Query MintConfigCreated event
        const minterContract = await IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const filter = minterContract.filters.MintConfigCreated(editionAddress)
        const mintConfigEvents = await minterContract.queryFilter(filter)
        const mintIds = mintConfigEvents.map((event) => event.args.mintId)
        return (mintIdsMap[minterAddress] = mintIds)
      }),
    )
  ).forEach(handleRejections)

  const mintInfos: MintInfo[] = []

  const mintInfoPromises = minterAddresses
    .map((minterAddress) =>
      mintIdsMap[minterAddress].map(async (mintId) => {
        // TODO: handle network errors
        const minterModule = await IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const interfaceId = await minterModule.moduleInterfaceId()
        const factory = await minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
        const mintInfo = await factory.mintInfo(editionAddress, mintId)

        // TODO: need special handling for RangeEditionMinter's maxMintableUpper & maxMintableLower to resolve to maxMintable

        mintInfos.push({
          name: idToInterfaceName[interfaceId],
          address: minterAddress,
          startTime: mintInfo.startTime,
          endTime: mintInfo.endTime,
          mintPaused: mintInfo.mintPaused,
          price: mintInfo.price,
          maxMintable: mintInfo.maxMintablePerAccount,
          totalMinted: mintInfo.totalMinted,
        })
      }),
    )
    .flat()

  ;(await Promise.allSettled(mintInfoPromises)).forEach(handleRejections)

  /**
    4. clientside filter all minters that are live (startTime ≤ now && endTime > now)asicMinter, IMerkleMinter
  */

  /**
    5. check eligibility (iterate through list if more than one active minter)
        - `maxAllowedPerWallet`
        - If user is below max, check eligibility of specific address to mint:
            - see if it implements IRangeEditionMinter
                - use RangeEdtionMinter abi
                - Eligibility: true
            - see if it implements IMerkleDropMinter
                - use MerkleDropMinter abi
                - Get proof: Hit sound api using address and merkle root (fall back as lanyard) to confirm if they are in the allowlist and get proof
  */

  /**
      6. set up mint transaction
          1. for ones with supported interface: RangeEdtionMinter or MerkleDropMinter
              1. IBasicMinter, IMerkleMinter
   */
}

export async function mint(client: SoundClient, params: { address: string }) {
  await connectClient(client)
  validateAddress(params.address)
  // TODO
}

/*******************
  HELPER FUNCTIONS
 ******************/

export async function connectClient(client: SoundClient) {
  let chainId: number | undefined
  if (client.signer) {
    try {
      chainId = await client.signer.getChainId()
    } catch (e: any) {
      if (e?.message.includes('missing provider')) {
        throw new Error('Signer must be connected to a provider: https://docs.ethers.io/v5/api/signer/#Signer-connect')
      } else {
        throw e
      }
    }
  } else {
    const network = await client.provider!.getNetwork()
    chainId = network.chainId
  }

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

const handleRejections = (p: PromiseSettledResult<unknown>) => {
  if (p.status == 'rejected') {
    console.error(p.reason)
  }
}

import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { minterFactoryMap, interfaceIds, UINT32_MAX } from './config'
import {
  SoundEditionV1__factory,
  IMinterModule__factory,
  RangeEditionMinter,
  MerkleDropMinter,
} from '@soundxyz/sound-protocol/typechain/index'
import { MintInfoStructOutput as StandardMintInfo } from '@soundxyz/sound-protocol/typechain/contracts/modules/FixedPriceSignatureMinter'
import { MintInfoStructOutput as RangeEditionMintInfo } from '@soundxyz/sound-protocol/typechain/contracts/modules/RangeEditionMinter'

export type SoundClient = {
  signer: Signer | null
  provider: Provider | null
  chainId: ChainId | null
  connect: (signer: Signer) => void
}

type MintInfo = {
  interfaceId: string
  address: string
  mintId: number
  startTime: number
  endTime: number
  mintPaused: boolean
  price: BigNumber
  maxMintable: number
  maxMintablePerAccount: number
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

export async function isSoundEdition(client: SoundClient, params: { editionAddress: string }) {
  await connectClient(client)
  validateAddress(params.editionAddress)

  const { chainId, signer, provider } = client
  if (chainId === null) throw new Error('Must provide chainId')

  const signerOrProvider = signer === null ? provider : signer
  if (signerOrProvider === null) throw new Error('Must provide signer or provider')

  let _isSoundEdition = false

  const editionContract = SoundEditionV1__factory.connect(params.editionAddress, signerOrProvider)

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

export async function getEligibleMintQuantity(
  client: SoundClient,
  params: { editionAddress: string; userAddress?: string; timestamp?: number },
) {
  const timestamp = params.timestamp || Math.floor(Date.now() / 1000)
  const editionAddress = params.editionAddress
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

  if (!params.userAddress && !signer) {
    throw new Error('Must provide userAddress or a connected signer')
  }

  const userAddress = (params.userAddress || (await signer?.getAddress())) as string

  const mintInfos: MintInfo[] = await getMintInfo({ editionAddress, timestamp, signerOrProvider })

  // Filter mints that are live during the given timestamp
  const eligibleMints = mintInfos
    .filter((mintInfo) => {
      return mintInfo.startTime <= timestamp && mintInfo.endTime > timestamp && !mintInfo.mintPaused
    })
    .sort((a, b) => a.startTime - b.startTime)
    .sort((a, b) => {
      // If start times are equal, sort by address
      if (a.startTime === b.startTime) {
        return a.address.localeCompare(b.address)
      }
      return 0
    })

  let eligibleMintQuantity = 0
  for (const mintInfo of eligibleMints) {
    const minterModule = await minterFactoryMap[mintInfo.interfaceId].connect(mintInfo.address, signerOrProvider)

    // If this minter is sold out, skip it
    if (mintInfo.totalMinted >= mintInfo.maxMintable) {
      eligibleMintQuantity = 0
      continue
    }

    // For any minter that tracks mintedTallies, get the tally for this user
    if (
      mintInfo.interfaceId == interfaceIds.IRangeEditionMinter ||
      mintInfo.interfaceId == interfaceIds.IMerkleDropMinter
    ) {
      const userBalanceBigNum = await (minterModule as RangeEditionMinter | MerkleDropMinter).mintedTallies(
        editionAddress,
        mintInfo.mintId,
        userAddress,
      )

      const userMintedBalance = userBalanceBigNum.toNumber()
      eligibleMintQuantity = mintInfo.maxMintablePerAccount - userMintedBalance

      // If any eligible quantity found, break out of loop
      if (eligibleMintQuantity > 0) {
        break
      }
    } else {
      // If no mintedTallies, assume user can mint the uint32 max
      eligibleMintQuantity = UINT32_MAX
    }
  }

  return eligibleMintQuantity
}

export async function mint(client: SoundClient, params: { address: string }) {
  await connectClient(client)
  validateAddress(params.address)
  // TODO
}

/*************************************************************************************
                              HELPER FUNCTIONS
 ************************************************************************************/

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

function handleRejections(p: PromiseSettledResult<unknown>) {
  if (p.status == 'rejected') {
    console.error('Error:', p.reason)
  }
}

async function getMintInfo({
  editionAddress,
  signerOrProvider,
  timestamp,
}: {
  editionAddress: string
  signerOrProvider: Signer | Provider
  timestamp: number
}) {
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
        const minterContract = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const filter = minterContract.filters.MintConfigCreated(editionAddress)
        const mintConfigEvents = await minterContract.queryFilter(filter)
        const mintIds = mintConfigEvents.map((event) => event.args.mintId)
        mintIdsMap[minterAddress] = mintIds
      }),
    )
  ).forEach(handleRejections)

  // Retrieve all the mint info for each minter-mintId pair
  const mintInfos: MintInfo[] = []
  const mintInfoPromises = minterAddresses
    .map((minterAddress) =>
      mintIdsMap[minterAddress].map(async (mintId) => {
        const minterModule = IMinterModule__factory.connect(minterAddress, signerOrProvider)
        const interfaceId = await minterModule.moduleInterfaceId()
        const minterContract = minterFactoryMap[interfaceId].connect(minterAddress, signerOrProvider)
        const mintInfo = await minterContract.mintInfo(editionAddress, mintId)

        // Get maxMintable
        let maxMintable = 0
        // RangeEditionMinter maxMintable is time-dependent
        if (interfaceId === interfaceIds.IRangeEditionMinter) {
          const closingTime = (mintInfo as RangeEditionMintInfo).closingTime
          maxMintable =
            closingTime > timestamp
              ? (mintInfo as RangeEditionMintInfo).maxMintableUpper
              : (mintInfo as RangeEditionMintInfo).maxMintableLower
        } else {
          maxMintable = (mintInfo as StandardMintInfo).maxMintable
        }

        mintInfos.push({
          interfaceId,
          mintId: mintId.toNumber(),
          address: minterAddress,
          startTime: mintInfo.startTime,
          endTime: mintInfo.endTime,
          mintPaused: mintInfo.mintPaused,
          price: mintInfo.price,
          maxMintable,
          maxMintablePerAccount: mintInfo.maxMintablePerAccount,
          totalMinted: mintInfo.totalMinted,
        })
      }),
    )
    .flat()

  ;(await Promise.allSettled(mintInfoPromises)).forEach(handleRejections)

  return mintInfos
}

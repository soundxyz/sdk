import type { Provider } from '@ethersproject/abstract-provider'
import { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import type { ContractTransaction } from '@ethersproject/contracts'

import {
  SoundCreatorV1__factory,
  SoundEditionV1__factory,
  BaseMinter__factory,
  RangeEditionMinter__factory,
  MerkleDropMinter__factory,
  FixedPriceSignatureMinter__factory,
  BaseMinter,
  RangeEditionMinter,
  MerkleDropMinter,
  FixedPriceSignatureMinter,
} from '@soundxyz/sound-protocol'
import { SoundEditionCreatedEvent } from '@soundxyz/sound-protocol/SoundCreatorV1'

import { chainIdToInfo, interfaceIds } from './config'

export type SoundClient = {
  signer: Signer | null
  provider: Provider | null
  chainId: ChainId | null
  connect: (signer: Signer) => void
}

export type Minter = RangeEditionMinter | MerkleDropMinter | FixedPriceSignatureMinter
export type MinterType = 'RangeEdition' | 'MerkleDrop' | 'FixedPriceSignatureMinter'

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
  await connectClient(client)
  validateAddress(params.address)
  // TODO
}

export async function mint(client: SoundClient, params: { address: string }): Promise<ContractTransaction> {
  await connectClient(client)
  validateAddress(params.address)

  const { chainId, signer } = client
  if (chainId === null) throw new Error('Must provide chainId')

  if (signer === null) throw new Error('Must provide signer')

  // check if address is sound edition
  if (!(await isSoundEdition(client, params))) {
    throw new Error('Address is not a Sound Edition')
  }

  const edition = SoundEditionV1__factory.connect(params.address, signer)

  const signerAddress = await signer.getAddress()

  // get array of minters for this edition
  const MINTER_ROLE = await edition.MINTER_ROLE()
  const minters = await edition.getMembersOfRole(MINTER_ROLE)

  // filter minters that extend baseMinter
  let baseMinterSupported: (BaseMinter | Minter)[] = []
  for (const minter of minters) {
    try {
      const minterContract = BaseMinter__factory.connect(minter, signer)
      const isBaseMinter = await minterContract.supportsInterface(interfaceIds.IMinterModule)
      if (isBaseMinter) {
        baseMinterSupported.push(minterContract)
      }
    } catch {
      continue
    }
  }

  // filter minters where the signer can mint at this moment
  let eligibleMinters: {
    minter: Minter
    minterType: MinterType
    mintId: number
    price: BigNumber
    availableToMint: number
  }[] = []
  for (let minter of baseMinterSupported) {
    const nextMintId = (await minter.nextMintId(edition.address)).toNumber()

    let minterType: MinterType

    // query minter type
    if (await minter.supportsInterface(interfaceIds.IRangeEditionMinter)) {
      minterType = 'RangeEdition'
    } else if (await minter.supportsInterface(interfaceIds.IMerkleDropMinter)) {
      minterType = 'MerkleDrop'
    } else {
      minterType = 'FixedPriceSignatureMinter'
    }

    if (nextMintId > 0) {
      // go through all mintIds for this minter
      for (var mintId = 0; mintId < nextMintId; mintId++) {
        const baseMintData = await minter.baseMintData(edition.address, mintId)
        const startTime = baseMintData.startTime
        const endTime = baseMintData.endTime
        const now = Math.floor(Date.now() / 1000)

        // proceed if mint is active at this time
        if (now >= startTime && now < endTime) {
          let _price: BigNumber
          let availableToMint = 0

          var isEligibleForMint = false
          if (minterType === 'RangeEdition') {
            minter = RangeEditionMinter__factory.connect(minter.address, signer)
            const { totalMinted, price, maxMintable, maxMintablePerAccount } = await minter.mintInfo(
              edition.address,
              mintId,
            )
            _price = price

            if (totalMinted < maxMintable) {
              const mintedBySigner = (await minter.mintedTallies(edition.address, mintId, signerAddress)).toNumber()
              if (mintedBySigner < maxMintablePerAccount) {
                isEligibleForMint = true
                availableToMint = Math.min(maxMintablePerAccount - mintedBySigner, maxMintable - totalMinted)
              }
            }
          } else if (minterType === 'MerkleDrop') {
            minter = MerkleDropMinter__factory.connect(minter.address, signer)
            const { totalMinted, price, maxMintable, maxMintablePerAccount } = await minter.mintInfo(
              edition.address,
              mintId,
            )
            _price = price

            if (totalMinted < maxMintable) {
              const mintedBySigner = (await minter.getClaimed(edition.address, mintId, signerAddress)).toNumber()
              if (mintedBySigner < maxMintablePerAccount) {
                // TODO: query sound API to verify if signer is in the allowlist
                isEligibleForMint = true
                availableToMint = Math.min(maxMintablePerAccount - mintedBySigner, maxMintable - totalMinted)
              }
            }
          } else {
            minter = FixedPriceSignatureMinter__factory.connect(minter.address, signer)
            const { totalMinted, price, maxMintable } = await minter.editionMintData(edition.address, mintId)
            _price = price

            if (totalMinted < maxMintable) {
              isEligibleForMint = true
              availableToMint = maxMintable - totalMinted
            }
          }

          if (isEligibleForMint) {
            eligibleMinters.push({
              minter,
              minterType,
              mintId,
              price: _price,
              availableToMint,
            })
          }
        }
      }
    }
  }

  if (eligibleMinters.length > 0) {
    var eligibleMinter = eligibleMinters[0]
    var minPrice = eligibleMinter.price

    // if more than one eligibleMinters, mint via the minter with minimum price
    for (const eMinter of eligibleMinters) {
      if (eMinter.price.lt(minPrice)) {
        eligibleMinter = eMinter
        minPrice = eligibleMinter.price
      }
    }

    // TODO: get quantity
    const quantity = 1
    const affiliate = AddressZero
    if (eligibleMinter.minterType === 'RangeEdition') {
      return await (eligibleMinter.minter as RangeEditionMinter).mint(
        edition.address,
        eligibleMinter.mintId,
        quantity,
        affiliate,
      )
    } else if (eligibleMinter.minterType === 'MerkleDrop') {
      // TODO: get merkle proof from sound API
      const proof = ['']
      return await (eligibleMinter.minter as MerkleDropMinter).mint(
        edition.address,
        eligibleMinter.mintId,
        quantity,
        proof,
        affiliate,
      )
    } else {
      // TODO: get signature to mint from sound API
      const signature = ''
      return await (eligibleMinter.minter as FixedPriceSignatureMinter).mint(
        edition.address,
        eligibleMinter.mintId,
        quantity,
        signature,
        affiliate,
      )
    }
  } else {
    throw new Error('Minting not available')
  }
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

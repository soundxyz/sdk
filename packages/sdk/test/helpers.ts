import { Signer } from '@ethersproject/abstract-signer'
import { BigNumber } from '@ethersproject/bignumber'
import { MerkleDropMinter__factory, RangeEditionMinter__factory } from '@soundxyz/sound-protocol/typechain/index'

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
export const ONE_HOUR = 3600
export const PRICE = 420420420
export const SOUND_FEE = 0

/*******************
    TEST HELPERS
 ******************/

export function now() {
  return Math.floor(Date.now() / 1000)
}

export async function createRangeMint({
  artistWallet,
  minterAddress,
  editionAddress,
  startTime,
  closingTime,
  endTime,
  maxMintableLower,
  maxMintableUpper,
  maxMintablePerAccount,
}: {
  artistWallet: Signer
  minterAddress: string
  editionAddress: string
  startTime: number
  closingTime: number
  endTime: number
  maxMintableLower: number
  maxMintableUpper: number
  maxMintablePerAccount: number
}) {
  const minter = RangeEditionMinter__factory.connect(minterAddress, artistWallet)
  await minter.createEditionMint(
    editionAddress,
    BigNumber.from(PRICE),
    startTime,
    closingTime,
    endTime,
    maxMintableLower,
    maxMintableUpper,
    maxMintablePerAccount,
  )

  // get all mint ids for this edition & return the latest
  const filter = minter.filters.MintConfigCreated(editionAddress)
  const roleEvents = await minter.queryFilter(filter)
  const mintId = roleEvents[roleEvents.length - 1].args.mintId
  if (!roleEvents[roleEvents.length - 1].args.mintId) {
    throw new Error('No mintId found')
  }
  return { mintId }
}

export async function createMerkleMint({
  artistWallet,
  minterAddress,
  editionAddress,
  merkleRootHash,
  startTime,
  endTime,
  maxMintable,
  maxMintablePerAccount,
}: {
  artistWallet: Signer
  minterAddress: string
  editionAddress: string
  merkleRootHash: string
  startTime: number
  endTime: number
  maxMintable: number
  maxMintablePerAccount: number
}) {
  const minter = MerkleDropMinter__factory.connect(minterAddress, artistWallet)
  await minter.createEditionMint(
    editionAddress,
    merkleRootHash,
    BigNumber.from(PRICE),
    startTime,
    endTime,
    maxMintable,
    maxMintablePerAccount,
  )
}

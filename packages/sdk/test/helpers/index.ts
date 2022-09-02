import type { Signer } from '@ethersproject/abstract-signer'
import { BigNumber } from '@ethersproject/bignumber'
import { RangeEditionMinter__factory } from '@soundxyz/sound-protocol/typechain/index'
import { MerkleHelper } from './merkle'

const PRICE = 420420420

export function now() {
  return Math.floor(Date.now() / 1000)
}

export async function createRangeMint({
  signer,
  minterAddress,
  editionAddress,
  startTime,
  closingTime,
  endTime,
  affiliateFeeBPS,
  maxMintableLower,
  maxMintableUpper,
  maxMintablePerAccount,
}: {
  signer: Signer
  minterAddress: string
  editionAddress: string
  startTime: number
  closingTime: number
  endTime: number
  affiliateFeeBPS: number
  maxMintableLower: number
  maxMintableUpper: number
  maxMintablePerAccount: number
}) {
  const minter = RangeEditionMinter__factory.connect(minterAddress, signer)
  await minter.createEditionMint(
    editionAddress,
    BigNumber.from(PRICE),
    startTime,
    closingTime,
    endTime,
    affiliateFeeBPS,
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

export { MerkleHelper }

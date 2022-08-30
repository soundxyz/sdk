import { isAddress } from '@ethersproject/address'
import { dummyMerkleDrop } from '../../test/dummyData'
import { InvalidAddressError } from '../errors'
const IS_TESTING_SDK = !!process.env.IS_TESTING_SDK

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

async function fetchMerkle({
  minterAddress,
  mintId,
  userAddress,
}: {
  minterAddress: string
  mintId: number
  userAddress: string
}) {
  console.error('TODO: fetchMerkelTree - Make API call to get merkle tree')
  // TODO: move this into a stubbed version of the function
  const merkleDrop = IS_TESTING_SDK
    ? dummyMerkleDrop
    : // Placeholder to satisfy typescript
      {
        root: '0x',
        tree: {
          getRoot() {
            return '0x'
          },
          getProof() {
            return []
          },
          verify() {
            return false
          },
        },
      }

  return merkleDrop
}

import { isAddress } from '@ethersproject/address'

import { InvalidAddressError } from '../errors'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

export async function getMerkleProof(root: string, userAddress: string): Promise<string[]> {
  // TODO: get merkle proof
  return ['']
}

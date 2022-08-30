import { isAddress } from '@ethersproject/address'

import { InvalidAddressError } from '../errors'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

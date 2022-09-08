import { isAddress } from '@ethersproject/address'
import { InvalidAddressError } from '../errors'
import keccak256 from 'keccak256'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

export function getSaltAsBytes32(salt: string | number) {
  return '0x' + keccak256(salt).toString('hex')
}

import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import uuidToHex from 'uuid-to-hex'
import { hexZeroPad } from '@ethersproject/bytes'
import uuidValidate from 'uuid-validate'
import { InvalidAddressError } from '../errors'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

export function uuidToBytes32(uuid: string) {
  if (!uuidValidate(uuid)) throw new Error('Salt must be a valid UUID')

  const uuidAsBigNum = BigNumber.from(uuidToHex(uuid, true))

  return hexZeroPad(uuidAsBigNum.toHexString(), 32)
}

import { isAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import uuidToHex from 'uuid-to-hex'
import { hexZeroPad } from '@ethersproject/bytes'
import { InvalidAddressError } from '../errors'

export function validateAddress(contractAddress: string) {
  if (!isAddress(contractAddress)) {
    throw new InvalidAddressError(`Invalid address: ${contractAddress}`)
  }
}

export function uuidToBytes32(uuid: string) {
  const uuidAsBigNum = BigNumber.from(uuidToHex(uuid, true))

  return hexZeroPad(uuidAsBigNum.toHexString(), 32)
}

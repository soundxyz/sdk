import { isAddress } from '@ethersproject/address'
import { InvalidAddressError } from '../errors'
import keccak256 from 'keccak256'
import type { BigNumber } from '@ethersproject/bignumber'
import type { AddressInputType } from '../types'
import { NULL_ADDRESS } from './constants'

export function validateAddress({
  type,
  address,
  notNull,
}: {
  type: AddressInputType
  address: string
  notNull?: boolean
}) {
  if (notNull && address === NULL_ADDRESS) {
    throw new InvalidAddressError({ type, address, message: 'Address cannot be null address' })
  }

  if (!isAddress(address)) {
    throw new InvalidAddressError({ type, address })
  }
}

export function getSaltAsBytes32(salt: string | number) {
  return '0x' + keccak256(salt.toString()).toString('hex')
}

export function getLazyOption<T extends object>(option: T | (() => T | Promise<T>)) {
  return typeof option === 'function' ? option() : option
}

export function scaleAmount({ amount, multiplier }: { amount: BigNumber; multiplier: number }) {
  return amount.mul(multiplier * 100).div(100)
}

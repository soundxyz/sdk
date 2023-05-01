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
  notNull?: true
}) {
  if (notNull) {
    if (address === NULL_ADDRESS) {
      throw new InvalidAddressError({ type, address, message: 'Address cannot be null address' })
    }
  }
  // We can skip the isAddress check on null address
  else if (address === NULL_ADDRESS) return

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

export function parseTokenIdNumber(str: string): number | null {
  const parsedInt = parseInt(str, 10)
  return isNaN(parsedInt) ? null : parsedInt
}

type Curry<T extends (...args: any[]) => any> = T extends (args: infer A, ...rest: infer Rest) => infer R
  ? Rest extends []
    ? (args: A) => R
    : (args: A) => Curry<(...args: Rest) => R>
  : T

export function curry<T extends (...args: any[]) => any>(fn: T): Curry<T> {
  const curried = (...args: any[]): any => {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return curry((...args2: any[]) => fn(...args, ...args2))
  }
  return curried as Curry<T>
}

export function exhaustiveGuard(_value: never): never {
  throw new Error(`Exhaustive guard reached with value ${_value}`)
}

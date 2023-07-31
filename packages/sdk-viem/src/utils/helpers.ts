import { isAddress, type Address, isHex, type Hex } from 'viem'
import { InvalidAddressError, InvalidHexaError } from '../errors'
import keccak256 from 'keccak256'
import type { AddressInputType } from '../types'
import { NULL_ADDRESS } from './constants'

const addressCheckSet = new Set()

export function assertAddress(
  address: string,
  {
    type = 'GENERIC',
  }: {
    type?: AddressInputType
  } = {},
): asserts address is Address {
  if (addressCheckSet.has(address)) return

  if (isAddress(address)) {
    addressCheckSet.add(address)
    return
  }

  throw new InvalidAddressError({ address, type })
}

export function assertIsHex(value: string): asserts value is Hex {
  if (!isHex(value, { strict: false })) throw new InvalidHexaError({ value })
}

export function validateAddress(
  address: string,
  {
    type,
    notNull,
  }: {
    type: AddressInputType

    notNull?: true
  },
): asserts address is Address {
  if (notNull) {
    if (address === NULL_ADDRESS) {
      throw new InvalidAddressError({ type, address, message: 'Address cannot be null address' })
    }
  }
  // We can skip the isAddress check on null address
  else if (address === NULL_ADDRESS) return

  assertAddress(address, { type })
}

export function getSaltAsBytes32(salt: string | number) {
  return `0x${keccak256(salt.toString()).toString('hex')}` as const
}

export function getLazyOption<T extends object>(option: T | (() => T | Promise<T>)) {
  return typeof option === 'function' ? option() : option
}

export function scaleAmount({ amount, multiplier }: { amount: bigint; multiplier: number }) {
  return (amount * BigInt(multiplier * 100)) / 100n
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

export async function retry<T>(
  fn: () => Promise<T>,
  {
    attempts,
    delay,
  }: {
    attempts: number
    delay: number
  },
): Promise<T> {
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i < attempts - 1) {
        await new Promise<void>((resolve) => setTimeout(resolve, delay))
      } else {
        throw error
      }
    }
  }

  return fn()
}

export function isMerkleProof(proof: readonly string[]): proof is Hex[] {
  return proof.every((value) => isHex(value, { strict: false }))
}
type NonEmptyArray<T> = [T, ...T[]]

export function BigIntMin(...[firstValue, ...values]: NonEmptyArray<bigint>): bigint {
  let value: bigint = firstValue

  for (const currentValue of values) {
    if (currentValue < value) value = currentValue
  }

  return value
}

export function BigIntMax(...[firstValue, ...values]: NonEmptyArray<bigint>): bigint {
  let value: bigint = firstValue

  for (const currentValue of values) {
    if (currentValue > value) value = currentValue
  }

  return value
}

import { isHex, type Hex } from 'viem'

export function isHexList(list: string[]): list is Hex[] {
  return list.every((value) => isHex(value))
}

export function exhaustiveGuard(_value: never): never {
  throw new Error(`Exhaustive guard reached with value ${_value}`)
}

export function nowUnixTimestamp() {
  return Math.floor(Date.now() / 1000)
}

export type NonEmptyArray<T> = [T, ...T[]]

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

export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'

export const MINT_FALLBACK_GAS_LIMIT = 200_000n

export function scaleAmount({ amount, multiplier }: { amount: bigint; multiplier: number }) {
  return (amount * BigInt(multiplier * 100)) / 100n
}

export const MINT_GAS_LIMIT_MULTIPLIER = 1.2

export const UINT32_MAX = 4294967295

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

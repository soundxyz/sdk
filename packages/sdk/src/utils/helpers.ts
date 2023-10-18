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

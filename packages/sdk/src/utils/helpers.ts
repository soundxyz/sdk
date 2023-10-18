import { isHex, type Hex } from 'viem'

export function isHexList(list: string[]): list is Hex[] {
  return list.every((value) => isHex(value))
}

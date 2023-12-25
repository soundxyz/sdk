/* eslint-disable no-bitwise */

import type { Hex } from 'viem'

/**
 *  typescript adaptations of cdCompress and cdDecompress from
 *  https://github.com/Vectorized/solady/blob/main/js/solady.js
 *
 * these are custom calldata compression and decompression functions
 * that are supported by Sound contracts (sound creator v2, sound edition v2, and super minter)
 * and can reduce calldata size (biggest influence on L2 gas costs) when there are lots of zeros or lots of 0xffs
 */
export function cdCompress(original: Hex): Hex {
  const data = hexString(original)
  let output: Hex = '0x'
  let zeroCount: number = 0
  let ffCount: number = 0

  const pushByte = (b: number): void => {
    output += byteToString((+(output.length < 4 * 2 + 2) * 0xff) ^ b)
  }

  const rle = (value: number, distance: number): void => {
    pushByte(0x00)
    pushByte(distance - 1 + value * 0x80)
  }

  for (let i = 0; i < data.length; i += 2) {
    const currentByte: number = parseByte(data, i)
    if (currentByte === 0) {
      if (ffCount) {
        rle(1, ffCount)
        ffCount = 0
      }
      if (++zeroCount === 0x80) {
        rle(0, 0x80)
        zeroCount = 0
      }
      continue
    }
    if (currentByte === 0xff) {
      if (zeroCount) {
        rle(0, zeroCount)
        zeroCount = 0
      }
      if (++ffCount === 0x20) {
        rle(1, 0x20)
        ffCount = 0
      }
      continue
    }
    if (ffCount) {
      rle(1, ffCount)
      ffCount = 0
    }
    if (zeroCount) {
      rle(0, zeroCount)
      zeroCount = 0
    }
    pushByte(currentByte)
  }
  if (ffCount) {
    rle(1, ffCount)
  }
  if (zeroCount) {
    rle(0, zeroCount)
  }
  return output
}

export function cdDecompress(compressed: Hex): Hex {
  const data = hexString(compressed)
  let output: Hex = '0x'

  for (let i = 0; i < data.length; ) {
    let c: number = (+(i < 4 * 2) * 0xff) ^ parseByte(data, i)
    i += 2
    if (!c) {
      c = (+(i < 4 * 2) * 0xff) ^ parseByte(data, i)
      const size: number = (c & 0x7f) + 1
      i += 2
      for (let j = 0; j < size; ++j) {
        output += byteToString((c >> 7 !== 0 && j < 32 ? 1 : 0) * 0xff)
      }
      continue
    }
    output += byteToString(c)
  }
  return output
}

function hexString(data: Hex): string {
  const match = data.trim().match(/^(0x)?([0-9A-Fa-f]*)$/)
  if (match && match[2] && match[2].length % 2 === 0) {
    return match[2]
  }
  throw new Error('Data must be a valid hex string with even length.')
}

function byteToString(b: number): string {
  return (b | 0x100).toString(16).substr(1)
}

function parseByte(data: string, i: number): number {
  return parseInt(data.substr(i, 2), 16)
}

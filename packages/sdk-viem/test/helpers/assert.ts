import assert from 'assert'
import { isHex, type Hex, isAddress } from 'viem'

import { assertIsHex } from '../../src/utils/helpers'

export function assertGetHexValue(value: string): Hex {
  assertIsHex(value)
  return value
}

export function assertMinterCalls(
  minterCalls: Array<{ contractAddress: string; calldata: string }>,
): asserts minterCalls is Array<{ contractAddress: Hex; calldata: Hex }> {
  assert(
    minterCalls.every((value) => isAddress(value.contractAddress) && isHex(value.calldata, { strict: false })),
    'Unexpected minter calls',
  )
}

import { randomBytes } from 'crypto'
import { Wallet } from 'ethers'

import { MerkleTestHelper } from './merkle'

export function now() {
  return Math.floor(Date.now() / 1000)
}

export { MerkleTestHelper }

export function getRandomAddress() {
  return new Wallet(`0x${randomBytes(32).toString('hex')}`).address.toLowerCase()
}

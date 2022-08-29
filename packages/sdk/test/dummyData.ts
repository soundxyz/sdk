import { MerkleTree } from 'merkletreejs'
import { sha256 } from '@ethersproject/sha2'

// First 3 addresses of mnemonic: 'test test test ...'
const recipients = [
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
]

const tree = new MerkleTree(recipients, sha256)
const root = '0x' + tree.getRoot().toString('hex')

export const dummyMerkleDrop = {
  recipients,
  tree,
  root,
}

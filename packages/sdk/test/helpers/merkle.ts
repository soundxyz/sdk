import { MerkleTree } from 'merkletreejs'
import keccak256 from 'keccak256'
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'

// default addresses generated for 'test test ...' mnemonic
const snapshot = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
]

const getNodeLeaf = (address: string) => {
  return Buffer.from(solidityKeccak256(['address'], [address]).slice(2), 'hex')
}

export const MerkleHelper = () => {
  function getMerkleTree(): MerkleTree {
    const merkleTree = new MerkleTree(
      snapshot.map((address) => getNodeLeaf(address)),
      keccak256,
      { sortPairs: true },
    )

    return merkleTree
  }

  function getMerkleRoot(merkleTree: MerkleTree): string {
    return merkleTree.getHexRoot()
  }

  function getProof({ merkleTree, address }: { merkleTree: MerkleTree; address: string }) {
    return merkleTree.getHexProof(getNodeLeaf(address))
  }

  return {
    getMerkleTree,
    getMerkleRoot,
    getProof,
  }
}

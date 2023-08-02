import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'
import keccak256 from 'keccak256'
import { MerkleTree } from 'merkletreejs'
import { assertIsHexList } from '../../src/utils/helpers'

// default addresses generated for 'test test ...' mnemonic
const snapshot = [
  '0xb0a36b3cedf210f37a5e7bc28d4b8e91d4e3c412',
  '0x6fc4792b1bbe0df6b0d80e9cc7bd61d872bf2768',
  '0xe34056ad5a4dbe825ea93cfb5b62ab5f2548c294',
  '0x1372c547e54733ea35f28ef3ab00d4816a488208',
  '0xde8cdc32a83854e55928ad0f881664e08ec4465a',
]

const getNodeLeaf = (address: string) => {
  return Buffer.from(solidityKeccak256(['address'], [address]).slice(2), 'hex')
}

export const MerkleTestHelper = () => {
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
    const proof = merkleTree.getHexProof(getNodeLeaf(address))

    assertIsHexList(proof)

    return proof
  }

  const emptyMerkleTree = new MerkleTree([], keccak256, { sortPairs: true })

  return {
    getMerkleTree,
    getMerkleRoot,
    getProof,
    emptyMerkleTree,
  }
}

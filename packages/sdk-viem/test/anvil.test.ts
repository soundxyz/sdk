import { testClient } from './test-utils'
import { SoundEditionV1_2Config } from '../src/abi/sound-edition-v1_2'
import { test, expect, assert, beforeAll, describe } from 'vitest'
import { ALICE, DEFAULT_SALT, EDITION_MAX, forkBlockNumber } from './test-constants'
import { SoundCreatorV1Config } from '../src/abi/sound-creator-v1'
import { MockAPI } from './helpers/api'
import { SoundClient } from '../src'
import { MerkleTestHelper, didntThrowExpectedError } from './helpers'
import { InvalidAddressError } from '../src/errors'
import { encodeFunctionData, type Address, type Hex, type Hash } from 'viem'
import { MINTER_ROLE, NON_NULL_ADDRESS, NULL_ADDRESS, UINT32_MAX } from '../src/utils/constants'
import { RangeEditionMinterV1Config } from '../src/abi/range-edition-minter-v1'
import { RangeEditionMinterV2Config } from '../src/abi/range-edition-minter-v2'
import { RangeEditionMinterV2_1Config } from '../src/abi/range-edition-minter-v2_1'
import { MerkleDropMinterV1Config } from '../src/abi/merkle-drop-minter-v1'
import { MerkleDropMinterV2Config } from '../src/abi/merkle-drop-minter-v2'
import { MerkleDropMinterV2_1Config } from '../src/abi/merkle-drop-minter-v2_1'

const BAD_ADDRESS = 'not an address'

const merkleTestHelper = MerkleTestHelper()
const merkleTree = merkleTestHelper.getMerkleTree()

const client = SoundClient({
  soundAPI: MockAPI(),
  client: testClient,
  account: testClient,
  merkleProvider: {
    merkleProof({ userAddress }) {
      return merkleTestHelper.getProof({ merkleTree, address: userAddress })
    },
  },
})

async function contractAddressFromTransaction({ hash }: { hash: Hash }): Promise<Address> {
  const { contractAddress } = await testClient.waitForTransactionReceipt({
    hash,
  })
  assert(contractAddress)
  return contractAddress
}

let creatorAddress: Address
let rangeEditionV1Address: Address
let rangeEditionV2Address: Address
let rangeEditionV2_1Address: Address
let merkleDropV1Address: Address
let merkleDropV2Address: Address
let merkleDropV2_1Address: Address

beforeAll(async () => {
  await expect(testClient.getBlockNumber()).resolves.toBe(forkBlockNumber)

  const editionImplementationTxHash = await testClient.deployContract({
    ...SoundEditionV1_2Config,
    account: ALICE,
  })
  const editionImplementationAddress = await contractAddressFromTransaction({
    hash: editionImplementationTxHash,
  })

  const creatorHash = await testClient.deployContract({
    ...SoundCreatorV1Config,
    args: [editionImplementationAddress],
    account: ALICE,
  })

  const _creatorAddress = await contractAddressFromTransaction({ hash: creatorHash })

  // TODO replace null address with fee registry
  const rangeEditionV1Hash = await testClient.deployContract({
    ...RangeEditionMinterV1Config,
    args: [NULL_ADDRESS],
    account: ALICE,
  })
  const rangeEditionV2Hash = await testClient.deployContract({
    ...RangeEditionMinterV2Config,
    account: ALICE,
  })
  const rangeEditionV2_1Hash = await testClient.deployContract({
    ...RangeEditionMinterV2_1Config,
    account: ALICE,
  })
  const merkleDropV1Hash = await testClient.deployContract({
    ...MerkleDropMinterV1Config,
    args: [NULL_ADDRESS],
    account: ALICE,
  })
  const merkleDropV2Hash = await testClient.deployContract({
    ...MerkleDropMinterV2Config,
    account: ALICE,
  })
  const merkleDropV2_1Hash = await testClient.deployContract({
    ...MerkleDropMinterV2_1Config,
    account: ALICE,
  })

  const [
    _rangeEditionV1Address,
    _rangeEditionV2Address,
    _rangeEditionV2_1Address,

    _merkleDropV1Address,
    _merkleDropV2Address,
    _merkleDropV2_1Address,
  ] = await Promise.all([
    contractAddressFromTransaction({ hash: rangeEditionV1Hash }),
    contractAddressFromTransaction({ hash: rangeEditionV2Hash }),
    contractAddressFromTransaction({ hash: rangeEditionV2_1Hash }),

    contractAddressFromTransaction({ hash: merkleDropV1Hash }),
    contractAddressFromTransaction({ hash: merkleDropV2Hash }),
    contractAddressFromTransaction({ hash: merkleDropV2_1Hash }),
  ])

  creatorAddress = _creatorAddress

  rangeEditionV1Address = _rangeEditionV1Address
  rangeEditionV2Address = _rangeEditionV2Address
  rangeEditionV2_1Address = _rangeEditionV2_1Address

  merkleDropV1Address = _merkleDropV1Address
  merkleDropV2Address = _merkleDropV2Address
  merkleDropV2_1Address = _merkleDropV2_1Address
}, 30_000)

/**
 * Sets up an edition and mint schedules.
 */
export async function setupTest({ minterCalls = [] }: { minterCalls?: { contractAddress: Address; calldata: Hex }[] }) {
  const editionInitData = encodeFunctionData({
    abi: SoundEditionV1_2Config.abi,
    functionName: 'initialize',
    args: [
      'Song Name',
      'SYMBOL',
      NULL_ADDRESS,
      'https://baseURI.com',
      'https://contractURI.com',
      NON_NULL_ADDRESS,
      0, //royaltyBPS,
      EDITION_MAX, // maxMintableLower
      EDITION_MAX, // maxMintableUpper
      UINT32_MAX, // cutoffTime
      2,
    ],
  })
  const [editionAddress, _] = await testClient.readContract({
    address: creatorAddress,
    abi: SoundCreatorV1Config.abi,
    functionName: 'soundEditionAddress',
    args: [ALICE, DEFAULT_SALT],
  })

  const grantRolesCalls = [
    {
      contractAddress: editionAddress,
      calldata: encodeFunctionData({
        abi: SoundCreatorV1Config.abi,
        functionName: 'grantRoles',
        args: [rangeEditionV2_1Address, MINTER_ROLE],
      }),
    },
  ]

  const allContractCalls = [...grantRolesCalls, ...minterCalls]

  await testClient.writeContract({
    abi: SoundCreatorV1Config.abi,
    address: creatorAddress,
    functionName: 'createSoundAndMints',
    args: [
      DEFAULT_SALT,
      editionInitData,
      allContractCalls.map((d) => d.contractAddress),
      allContractCalls.map((d) => d.calldata),
    ],
    account: ALICE,
  })
}

describe('isSoundEdition', () => {
  test("Should throw error if the address isn't valid", async () => {
    const err1 = await client
      .isSoundEdition({ editionAddress: BAD_ADDRESS })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error.message).to.equal('Invalid address')
        expect(error.type).equal('SOUND_EDITION')
        expect(error.address).equal(BAD_ADDRESS)

        return error
      })

    const err2 = await client
      .isSoundEdition({ editionAddress: BAD_ADDRESS })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).to.be.instanceOf(InvalidAddressError)
        expect(error.message).to.equal('Invalid address')
        expect(error.type).equal('SOUND_EDITION')
        expect(error.address).equal(BAD_ADDRESS)

        return error
      })

    expect(err1).instanceOf(Error)
    expect(err2).instanceOf(Error)

    expect(err1).not.equal(err2)
  })

  test.skip('Correctly identifies SoundEdition addresses', async () => {
    let isEdition = await client.isSoundEdition({ editionAddress: ALICE })
    expect(isEdition).to.be.false

    console.log('creator', creatorAddress)

    const [editionAddress] = await testClient.readContract({
      abi: SoundCreatorV1Config.abi,
      address: creatorAddress,
      functionName: 'soundEditionAddress',
      args: [ALICE, DEFAULT_SALT],
    })
    isEdition = await client.isSoundEdition({ editionAddress })
    expect(isEdition).to.be.true
  })
})

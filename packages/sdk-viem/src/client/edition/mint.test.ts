import type { Address, Hash } from 'viem'
import { encodeFunctionData } from 'viem/utils'
import { assert, beforeAll, describe, expect, test } from 'vitest'
import {
  ACCOUNTS,
  ALICE,
  BOB,
  DEFAULT_SALT,
  EDITION_MAX,
  ONE_HOUR,
  PRICE,
  forkBlockNumber,
} from '../../../test/test-constants'
import { testSoundClient, testViemClient } from '../../../test/test-utils'
import { SoundCreatorV1Config } from '../../abi/sound-creator-v1'
import { SoundEditionV1_2Config } from '../../abi/sound-edition-v1_2'

import { MINTER_ROLE, NON_NULL_ADDRESS, NULL_ADDRESS, UINT32_MAX } from '../../utils/constants'
import { RangeEditionMinterV1Config } from '../../abi/range-edition-minter-v1'
import { RangeEditionMinterV2Config } from '../../abi/range-edition-minter-v2'
import { RangeEditionMinterV2_1Config } from '../../abi/range-edition-minter-v2_1'
import { MerkleTestHelper } from '../../../test/helpers'
import type { MintSchedule } from '../../types'
import { MerkleDropMinterV1Config } from '../../abi/merkle-drop-minter-v1'
import { assertIsHex } from '../../utils/helpers'
import { MerkleDropMinterV2Config } from '../../abi/merkle-drop-minter-v2'
import { MerkleDropMinterV2_1Config } from '../../abi/merkle-drop-minter-v2_1'

async function contractAddressFromTransaction({ hash }: { hash: Hash }): Promise<Address> {
  const { contractAddress } = await testViemClient.waitForTransactionReceipt({
    hash,
  })
  assert(contractAddress)
  return contractAddress
}

// blocktime
let startTime: number
// creator
let creatorAddress: Address
// minters
let rangeEditionV1Address: Address
let rangeEditionV2Address: Address
let rangeEditionV2_1Address: Address
let merkleDropV1Address: Address
let merkleDropV2Address: Address
let merkleDropV2_1Address: Address
// expected address for first Alice contract
let precomputedEditionAddress: Address

let setupSnapshot: Hash

beforeAll(async () => {
  const block = await testViemClient.getBlock()
  startTime = Number(block.timestamp)
  expect(block.number).toEqual(forkBlockNumber)

  // deploy implementation soundEdition, and set up creator
  const editionImplementationTxHash = await testViemClient.deployContract({
    ...SoundEditionV1_2Config,
    account: ALICE,
  })
  const editionImplementationAddress = await contractAddressFromTransaction({
    hash: editionImplementationTxHash,
  })
  const creatorHash = await testViemClient.deployContract({
    ...SoundCreatorV1Config,
    args: [editionImplementationAddress],
    account: ALICE,
  })

  // deploy minters
  const [
    rangeEditionV1Hash,
    rangeEditionV2Hash,
    rangeEditionV2_1Hash,
    merkleDropV1Hash,
    merkleDropV2Hash,
    merkleDropV2_1Hash,
  ] = await Promise.all([
    testViemClient.deployContract({
      ...RangeEditionMinterV1Config,
      args: [NULL_ADDRESS],
      account: ACCOUNTS[0],
    }),
    testViemClient.deployContract({
      ...RangeEditionMinterV2Config,
      account: ACCOUNTS[1],
    }),
    testViemClient.deployContract({
      ...RangeEditionMinterV2_1Config,
      account: ACCOUNTS[2],
    }),
    testViemClient.deployContract({
      ...MerkleDropMinterV1Config,
      args: [NULL_ADDRESS],
      account: ACCOUNTS[3],
    }),
    testViemClient.deployContract({
      ...MerkleDropMinterV2Config,
      account: ACCOUNTS[4],
    }),
    testViemClient.deployContract({
      ...MerkleDropMinterV2_1Config,
      account: ACCOUNTS[5],
    }),
  ])

  // retrieve and set addresses for tests
  const [
    _creatorAddress,
    _rangeEditionV1Address,
    _rangeEditionV2Address,
    _rangeEditionV2_1Address,
    _merkleDropV1Address,
    _merkleDropV2Address,
    _merkleDropV2_1Address,
  ] = await Promise.all([
    contractAddressFromTransaction({ hash: creatorHash }),
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

  // compute the edition address
  const [_precomputedEditionAddress] = await testViemClient.readContract({
    abi: SoundCreatorV1Config.abi,
    address: creatorAddress,
    functionName: 'soundEditionAddress',
    args: [ALICE, DEFAULT_SALT],
  })
  precomputedEditionAddress = _precomputedEditionAddress
  setupSnapshot = await testViemClient.snapshot()
})

describe('numberMinted', () => {
  test('returns the number of tokens minted', async () => {
    const MINT_ID = 0n

    // deploy the sound edition and setup the minters
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
    const minterCalls = [
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [rangeEditionV1Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: rangeEditionV1Address,
        calldata: encodeFunctionData({
          abi: RangeEditionMinterV1Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            PRICE,
            startTime,
            startTime + ONE_HOUR, // cutoffTime
            startTime + ONE_HOUR * 2, // endTime
            0, // affiliateFeeBPS,
            4, // maxMintableLower,
            5, // maxMintableUpper,
            2, // maxMintablePerAccount
          ],
        }),
      },
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [rangeEditionV2Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: rangeEditionV2Address,
        calldata: encodeFunctionData({
          abi: RangeEditionMinterV2Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            PRICE,
            startTime,
            startTime + ONE_HOUR, // cutoffTime
            startTime + ONE_HOUR * 2, // endTime
            0, // affiliateFeeBPS,
            4, // maxMintableLower,
            5, // maxMintableUpper,
            2, // maxMintablePerAccount
          ],
        }),
      },
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [rangeEditionV2_1Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: rangeEditionV2_1Address,
        calldata: encodeFunctionData({
          abi: RangeEditionMinterV2_1Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            PRICE,
            startTime,
            startTime + ONE_HOUR, // cutoffTime
            startTime + ONE_HOUR * 2, // endTime
            0, // affiliateFeeBPS,
            4, // maxMintableLower,
            5, // maxMintableUpper,
            2, // maxMintablePerAccount
          ],
        }),
      },
    ]

    // create edition
    await testViemClient
      .writeContract({
        abi: SoundCreatorV1Config.abi,
        address: creatorAddress,
        functionName: 'createSoundAndMints',
        args: [
          DEFAULT_SALT,
          editionInitData,
          minterCalls.map((d) => d.contractAddress),
          minterCalls.map((d) => d.calldata),
        ],
        account: ALICE,
      })
      .then((hash) => testViemClient.waitForTransactionReceipt({ hash }))

    // numberMintedBefore shows 0
    const numberMintedBefore = await testSoundClient.edition.numberMinted({
      editionAddress: precomputedEditionAddress,
      userAddress: ALICE,
    })
    expect(numberMintedBefore).toEqual(0n)

    // Alice mints one
    await testViemClient
      .writeContract({
        abi: RangeEditionMinterV1Config.abi,
        address: rangeEditionV1Address,
        functionName: 'mint',
        args: [precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS],
        account: ALICE,
        value: PRICE,
        gas: 150_000n,
      })
      .then((hash) => testViemClient.waitForTransactionReceipt({ hash }))

    // numberMintedAfter for Alice shows 1
    const numberMintedAfterOne = await testSoundClient.edition.numberMinted({
      editionAddress: precomputedEditionAddress,
      userAddress: ALICE,
    })
    expect(numberMintedAfterOne).toEqual(1n)

    // Alice mints second and Bob mints third
    await Promise.all([
      testViemClient
        .writeContract({
          account: ALICE,
          abi: RangeEditionMinterV1Config.abi,
          address: rangeEditionV2Address,
          functionName: 'mint',
          args: [precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS],
          value: PRICE,
          gas: 150_000n,
        })
        .then((hash) => testViemClient.waitForTransactionReceipt({ hash })),
      testViemClient
        .writeContract({
          account: BOB,
          abi: RangeEditionMinterV1Config.abi,
          address: rangeEditionV2_1Address,
          functionName: 'mint',
          args: [precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS],
          value: PRICE,
          gas: 150_000n,
        })
        .then((hash) => testViemClient.waitForTransactionReceipt({ hash })),
    ])

    // numberMintedAfter shows 2 for Alice, and 1 for Bob
    const [aliceMinted, bobMinted] = await Promise.all([
      testSoundClient.edition.numberMinted({
        editionAddress: precomputedEditionAddress,
        userAddress: ALICE,
      }),
      testSoundClient.edition.numberMinted({
        editionAddress: precomputedEditionAddress,
        userAddress: BOB,
      }),
    ])
    expect(aliceMinted).toEqual(2n)
    expect(bobMinted).toEqual(1n)
  })
})

describe('eligibleQuantity: merkleDrop', () => {
  const merkleTestHelper = MerkleTestHelper()
  const merkleTree = merkleTestHelper.getMerkleTree([ALICE, BOB])
  const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)
  assertIsHex(merkleRoot)
  // override merkleProvider for tests
  testSoundClient.instance.instance.merkleProvider = {
    merkleProof({ userAddress }) {
      return merkleTestHelper.getProof({ merkleTree, address: userAddress })
    },
  }

  let mintSchedules: MintSchedule[] = []

  beforeAll(async () => {
    await testViemClient.revert({ id: setupSnapshot })

    const minterCalls = [
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [merkleDropV1Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: merkleDropV1Address,
        calldata: encodeFunctionData({
          abi: MerkleDropMinterV1Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            startTime,
            startTime + ONE_HOUR,
            0, // affiliateFeeBPS
            5, // maxMintable,
            1, // maxMintablePerAccount
          ],
        }),
      },
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [merkleDropV2Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: merkleDropV2Address,
        calldata: encodeFunctionData({
          abi: MerkleDropMinterV2Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            startTime,
            startTime + ONE_HOUR,
            0, // affiliateFeeBPS
            5, // maxMintable,
            2, // maxMintablePerAccount
          ],
        }),
      },
      {
        contractAddress: precomputedEditionAddress,
        calldata: encodeFunctionData({
          abi: SoundEditionV1_2Config.abi,
          functionName: 'grantRoles',
          args: [merkleDropV2_1Address, MINTER_ROLE],
        }),
      },
      {
        contractAddress: merkleDropV2_1Address,
        calldata: encodeFunctionData({
          abi: MerkleDropMinterV2_1Config.abi,
          functionName: 'createEditionMint',
          args: [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            startTime,
            startTime + ONE_HOUR,
            0, // affiliateFeeBPS
            5, // maxMintable,
            3, // maxMintablePerAccount
          ],
        }),
      },
    ]

    // deploy the sound edition and setup the minters
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

    // create edition
    await testViemClient
      .writeContract({
        abi: SoundCreatorV1Config.abi,
        address: creatorAddress,
        functionName: 'createSoundAndMints',
        args: [
          DEFAULT_SALT,
          editionInitData,
          minterCalls.map((d) => d.contractAddress),
          minterCalls.map((d) => d.calldata),
        ],
        account: ALICE,
      })
      .then((hash) => testViemClient.waitForTransactionReceipt({ hash }))

    mintSchedules = (
      await testSoundClient.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
        scheduleIds: [
          { minterAddress: merkleDropV1Address, mintIds: [0] },
          { minterAddress: merkleDropV2Address, mintIds: [0] },
          { minterAddress: merkleDropV2_1Address, mintIds: [0] },
        ],
        timestamp: startTime,
      })
    ).activeSchedules

    expect(mintSchedules[0].mintType).to.eq('MerkleDrop')
    expect(mintSchedules[1].mintType).to.eq('MerkleDrop')
    expect(mintSchedules[2].mintType).to.eq('MerkleDrop')
  })

  test('returns eligible quantity if the user is in the allowlist', async () => {
    const [v1EligibleQuantity, v2EligibleQuantity, v2_1EligibleQuantity] = await Promise.all([
      testSoundClient.edition.eligibleQuantity({
        userAddress: ALICE,
        mintSchedule: mintSchedules[0],
        timestamp: startTime,
      }),
      testSoundClient.edition.eligibleQuantity({
        userAddress: ALICE,
        mintSchedule: mintSchedules[1],
        timestamp: startTime,
      }),
      testSoundClient.edition.eligibleQuantity({
        userAddress: ALICE,
        mintSchedule: mintSchedules[2],
        timestamp: startTime,
      }),
    ])

    expect(v1EligibleQuantity).to.equal(1n)
    expect(v2EligibleQuantity).to.equal(2n)
    expect(v2_1EligibleQuantity).to.equal(3n)
  })

  test('returns 0 if the user is not in the allowlist', async () => {
    const [v1EligibleQuantity, v2EligibleQuantity, v2_1EligibleQuantity] = await Promise.all([
      testSoundClient.edition.eligibleQuantity({
        userAddress: '0x52D52188D89f912538fe5933F1d2307Bc8076D05',
        mintSchedule: mintSchedules[0],
        timestamp: startTime,
      }),
      testSoundClient.edition.eligibleQuantity({
        userAddress: '0x52D52188D89f912538fe5933F1d2307Bc8076D05',
        mintSchedule: mintSchedules[1],
        timestamp: startTime,
      }),
      testSoundClient.edition.eligibleQuantity({
        userAddress: '0x52D52188D89f912538fe5933F1d2307Bc8076D05',
        mintSchedule: mintSchedules[2],
        timestamp: startTime,
      }),
    ])

    expect(v1EligibleQuantity).to.equal(0n)
    expect(v2EligibleQuantity).to.equal(0n)
    expect(v2_1EligibleQuantity).to.equal(0n)
  })
})

// describe('eligibleQuantity: single RangeEditionMinter instance', () => {
//   it(`Eligible quantity is user specific and changes with mint`, async () => {
//     const startTime = now()
//     const MINT_ID = 0

//     assertAddress(rangeEditionMinter.address)
//     assertAddress(rangeEditionMinterV2.address)

//     const minterCalls = [
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: RangeEditionMinter__factory.createInterface().encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           startTime + ONE_HOUR, // cutoffTime
//           startTime + ONE_HOUR * 2, // endTime
//           0, // affiliateFeeBPS,
//           4, // maxMintableLower,
//           5, // maxMintableUpper,
//           2, // maxMintablePerAccount
//         ]),
//       },
//       {
//         contractAddress: rangeEditionMinterV2.address,
//         calldata: RangeEditionMinterV2__factory.createInterface().encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           startTime + ONE_HOUR, // cutoffTime
//           startTime + ONE_HOUR * 2, // endTime
//           0, // affiliateFeeBPS,
//           4, // maxMintableLower,
//           5, // maxMintableUpper,
//           2, // maxMintablePerAccount
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     // shows active mints
//     const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules

//     expect(mints.length).to.equal(2)

//     // eligible for 2
//     const eligibleQuantity = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//     })
//     expect(eligibleQuantity).to.equal(2)

//     // Test balances decreases after minting
//     await RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet).mint(
//       precomputedEditionAddress,
//       MINT_ID,
//       1,
//       NULL_ADDRESS,
//       {
//         value: PRICE,
//       },
//     )

//     // only eligible for 1 now
//     const newEligibleQuantity = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//     })
//     expect(newEligibleQuantity).to.equal(1)

//     // minting to another person does not affect the minters limit
//     await RangeEditionMinterV2__factory.connect(rangeEditionMinterV2.address, buyerWallet).mintTo(
//       precomputedEditionAddress,
//       MINT_ID,
//       buyer2Wallet.address,
//       1,
//       NULL_ADDRESS,
//       [],
//       0,
//       {
//         value: PRICE,
//       },
//     )

//     // still eligible for 1 now
//     const eligibleAfterMintToSeparate = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//     })
//     expect(eligibleAfterMintToSeparate).to.equal(1)

//     // mint on v2 range minter
//     await RangeEditionMinterV2__factory.connect(rangeEditionMinter.address, buyerWallet).mint(
//       precomputedEditionAddress,
//       MINT_ID,
//       1,
//       NULL_ADDRESS,
//       {
//         value: PRICE,
//       },
//     )

//     // another user is still eligible for 2
//     const eligibleQuantityForOther = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: artistWallet.address,
//     })
//     expect(eligibleQuantityForOther).to.equal(2)

//     const editionInfo = await client.edition.info({ contractAddress: precomputedEditionAddress }).contract.info

//     expect(editionInfo.totalMinted).to.equal(3)

//     expect(editionInfo.editionMaxMintable).to.equal(EDITION_MAX)
//   })

//   it(`Eligible quantity is zero outside of minting time`, async () => {
//     const startTime = now()
//     const cutoffTime = startTime + ONE_HOUR
//     const endTime = cutoffTime + ONE_HOUR
//     const maxMintablePerAccount = 5

//     const minterCalls = [
//       {
//         contractAddress: rangeEditionMinterV2.address,
//         calldata: RangeEditionMinterV2__factory.createInterface().encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           cutoffTime,
//           endTime,
//           0, // affiliateFeeBPS
//           10, // maxMintableLower
//           10, // maxMintableUpper
//           maxMintablePerAccount,
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules
//     expect(mints.length).to.equal(1)

//     const eligibleQuantityBeforeStart = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//       timestamp: startTime - 1,
//     })
//     expect(eligibleQuantityBeforeStart).to.equal(0)

//     const eligibleQuantityAtStart = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//       timestamp: startTime,
//     })
//     expect(eligibleQuantityAtStart).to.equal(maxMintablePerAccount)

//     const eligibleQuantityAtEnd = await client.edition.eligibleQuantity({
//       mintSchedule: mints[0],
//       userAddress: buyerWallet.address,
//       timestamp: endTime + 1,
//     })
//     expect(eligibleQuantityAtEnd).to.equal(0)

//     const editionInfo = await client.edition.info({ contractAddress: precomputedEditionAddress }).contract.info

//     expect(editionInfo.totalMinted).to.equal(0)

//     expect(editionInfo.editionMaxMintable).to.equal(EDITION_MAX)
//   })

//   it(`Eligible quantity becomes zero for every user if range edition mint instance is sold out before cutoffTime`, async () => {
//     const maxMintableUpper = 8
//     const startTime = now()
//     const MINT_ID = 0

//     const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
//     const minterCalls = [
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: minter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           startTime + ONE_HOUR, // cutoffTime,
//           startTime + ONE_HOUR * 2, // endTime,
//           0, // affiliateFeeBPS
//           4, // maxMintableLower
//           maxMintableUpper, // maxMintableUpper
//           1, // maxMintablePerAccount,
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     // Mint upper range limit
//     for (let i = 0; i < maxMintableUpper; i++) {
//       const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
//       await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
//     }

//     // Check that all users have zero eligible balance
//     await Promise.all(
//       Array.from({
//         length: 10,
//       }).map(async () => {
//         const randomSigner = Wallet.createRandom()
//         randomSigner.connect(ethers.provider)

//         const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
//           .activeSchedules
//         expect(mints.length).to.equal(1)

//         const eligibleQuantity = await client.edition.eligibleQuantity({
//           mintSchedule: mints[0],
//           userAddress: randomSigner.address,
//         })
//         expect(eligibleQuantity).to.equal(0)
//       }),
//     )
//   })

//   it(`Eligible balance switches to zero after closing time if maxMintableLower has been surpassed`, async () => {
//     const maxMintableLower = 5
//     const maxMintablePerAccount = 1
//     const signers = await ethers.getSigners()
//     const startTime = now()
//     const cutoffTime = startTime + ONE_HOUR
//     const MINT_ID = 0

//     const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
//     const minterCalls = [
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: minter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           cutoffTime,
//           startTime + ONE_HOUR * 2, // endTime,
//           0, // affiliateFeeBPS
//           maxMintableLower,
//           10, // maxMintableUpper,
//           maxMintablePerAccount,
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     // Mint lower range limit
//     for (let i = 0; i < maxMintableLower; i++) {
//       const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
//       await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
//     }

//     const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules
//     expect(mints.length).to.equal(1)

//     // Check that random users still have an eligible quantity at current time
//     for (let i = 0; i < 1; i++) {
//       const randomSigner = Wallet.createRandom()
//       randomSigner.connect(ethers.provider)

//       const eligibleQuantity = await client.edition.eligibleQuantity({
//         mintSchedule: mints[0],
//         userAddress: randomSigner.address,
//         timestamp: now(),
//       })
//       expect(eligibleQuantity).to.equal(maxMintablePerAccount)
//     }

//     // Check that random users have no eligible quantity at closing time
//     for (let i = 0; i < 1; i++) {
//       const randomSigner = Wallet.createRandom()
//       randomSigner.connect(ethers.provider)

//       const eligibleQuantity = await client.edition.eligibleQuantity({
//         mintSchedule: mints[0],
//         userAddress: randomSigner.address,
//         timestamp: cutoffTime,
//       })
//       expect(eligibleQuantity).to.equal(0)
//     }
//   })

//   it(`Eligible quantity changes if querying between multiple mints with different start times and max mintable quantities.`, async () => {
//     const mint1StartTime = now()
//     const mint1EndTime = mint1StartTime + ONE_HOUR
//     const mint2StartTime = mint1EndTime

//     const mint1MaxMintablePerAccount = 40
//     const mint2MaxMintablePerAccount = 42

//     const minter = RangeEditionMinterV2__factory.connect(rangeEditionMinter.address, artistWallet)
//     const minterCalls = [
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: minter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           mint1StartTime,
//           mint1EndTime - 1, // cutoffTime,
//           mint1EndTime,
//           0, // affiliateFeeBPS
//           50, // maxMintableLower,
//           60, // maxMintableUpper,
//           mint1MaxMintablePerAccount,
//         ]),
//       },
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: minter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           mint2StartTime,
//           mint2StartTime + ONE_HOUR, // cutoffTime,
//           mint2StartTime + ONE_HOUR + 1, // endTime
//           0, // affiliateFeeBPS
//           99, // maxMintableLower,
//           100, // maxMintableUpper,
//           mint2MaxMintablePerAccount,
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     // 1 active mint
//     const activeMints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
//       .activeSchedules
//     expect(activeMints.length).to.equal(1)
//     // 2 total mints (1 in the future)
//     const allMints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).schedules
//     expect(allMints.length).to.equal(2)

//     const eligibleQuantity1 = await client.edition.eligibleQuantity({
//       mintSchedule: allMints[0],
//       userAddress: buyerWallet.address,
//     })

//     const eligibleQuantity2 = await client.edition.eligibleQuantity({
//       mintSchedule: allMints[1],
//       userAddress: buyerWallet.address,
//       timestamp: mint2StartTime,
//     })

//     expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
//     expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)

//     const testClient = createTestClient({
//       chain: hardhatChain,
//       mode: 'hardhat',
//       transport: http(),
//       account: buyer2WalletAccount,
//     })
//       .extend(walletActions)
//       .extend(publicActions)

//     client.instance.instance.wallet = testClient

//     await client.edition.mint({
//       mintSchedule: allMints[0],
//       quantity: mint1MaxMintablePerAccount,
//       chain,
//     })

//     const mintSchedule = (
//       await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })
//     ).schedules.shift()!

//     expect(mintSchedule).exist

//     const remainingQuantityBuyer1 = await client.edition.eligibleQuantity({
//       mintSchedule,
//       userAddress: buyerWallet.address,
//     })

//     assert('maxMintable' in mintSchedule)

//     // Eligible quantity should take in account the remaining supply
//     expect(remainingQuantityBuyer1).to.equal(
//       (typeof mintSchedule.maxMintable === 'function' ? mintSchedule.maxMintable() : mintSchedule.maxMintable) -
//         mint1MaxMintablePerAccount,
//     )
//   })

//   it('eligibleQuantity respects the available quantity on the edition over the eligible quantity on mint schedules', async () => {
//     const merkleTestHelper = MerkleTestHelper()
//     const endTimeForBoth = UINT32_MAX
//     const maxMintable = EDITION_MAX
//     const maxMintablePerAccount = EDITION_MAX

//     const merkleMinter = MerkleDropMinter__factory.connect(merkleDropMinterV2.address, artistWallet)
//     const rangeMinter = RangeEditionMinterV2__factory.connect(rangeEditionMinter.address, artistWallet)

//     const merkleTree = merkleTestHelper.getMerkleTree()
//     const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)

//     const minterCalls = [
//       {
//         contractAddress: merkleDropMinter.address,
//         calldata: merkleMinter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           merkleRoot,
//           PRICE,
//           startTime,
//           endTimeForBoth,
//           0, // affiliateFeeBPS
//           maxMintable,
//           maxMintablePerAccount,
//         ]),
//       },
//       {
//         contractAddress: rangeEditionMinter.address,
//         calldata: rangeMinter.interface.encodeFunctionData('createEditionMint', [
//           precomputedEditionAddress,
//           PRICE,
//           startTime,
//           startTime + ONE_HOUR, // cutoffTime,
//           startTime + ONE_HOUR + 1, // endTime
//           0, // affiliateFeeBPS
//           maxMintable - 1, // maxMintableLower,
//           maxMintable, // maxMintableUpper,
//           maxMintablePerAccount,
//         ]),
//       },
//     ]

//     await setupTest({ minterCalls })

//     const mintSchedules = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
//       .activeSchedules

//     expect(mintSchedules.length).to.equal(2)

//     // Mint entire supply from first mint schedule
//     await client.edition.mint({
//       mintSchedule: mintSchedules[0],
//       quantity: EDITION_MAX,
//       chain,
//     })

//     // Check that the eligible quantity for the next mint schedule is zero for both buyers
//     const eligibleQuantityBuyer1 = await client.edition.eligibleQuantity({
//       mintSchedule: mintSchedules[1],
//       userAddress: buyerWallet.address,
//     })

//     const eligibleQuantityBuyer2 = await client.edition.eligibleQuantity({
//       mintSchedule: mintSchedules[1],
//       userAddress: buyer2Wallet.address,
//     })

//     expect(eligibleQuantityBuyer1).to.equal(0)
//     expect(eligibleQuantityBuyer2).to.equal(0)
//   })
// })

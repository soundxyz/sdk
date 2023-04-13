import assert from 'assert'
import { expect } from 'chai'
import { randomUUID } from 'crypto'
import { ethers } from 'hardhat'

import { BigNumber } from '@ethersproject/bignumber'
import { Wallet } from '@ethersproject/wallet'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { SoundEditionV1__factory } from '@soundxyz/sound-protocol-v1-0/typechain/index'
import { SoundEditionV1_1__factory } from '@soundxyz/sound-protocol-v1-1/typechain/index'
import {
  MerkleDropMinter,
  MerkleDropMinter__factory,
  RangeEditionMinter,
  RangeEditionMinter__factory,
  SAM,
  SAM__factory,
  SoundCreatorV1,
  SoundCreatorV1__factory,
  SoundEditionV1_2__factory,
  SoundFeeRegistry__factory,
} from '@soundxyz/sound-protocol-private/typechain/index'

import { mintInfosFromMinter } from '../src/client/edition/schedules'
import { SoundClient } from '../src/client/main'
import {
  InvalidAddressError,
  InvalidEditionMaxMintableError,
  InvalidMaxMintableError,
  InvalidMaxMintablePerAccountError,
  InvalidMerkleRootError,
  InvalidQuantityError,
  InvalidTimeValuesError,
  MissingMerkleProvider,
  MissingSoundAPI,
  NotEligibleMint,
  SoundNotFoundError,
} from '../src/errors'
import {
  ContractErrorName,
  MINT_GAS_LIMIT_MULTIPLIER,
  MINTER_ROLE,
  NON_NULL_ADDRESS,
  NULL_ADDRESS,
  NULL_BYTES32,
  UINT32_MAX,
} from '../src/utils/constants'
import { getSaltAsBytes32, scaleAmount } from '../src/utils/helpers'
import {
  didntThrowExpectedError,
  getGenericEditionConfig,
  getGenericMerkleMintConfig,
  getGenericRangeMintConfig,
  MerkleTestHelper,
  mineBlock,
  now,
  setAutoMine,
} from './helpers'
import { MockAPI } from './helpers/api'
import { BAD_ADDRESS, DEFAULT_SALT, EDITION_MAX, ONE_HOUR, PRICE, SOUND_FEE } from './test-constants'

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type MerkleTree from 'merkletreejs'

import type { ContractCall, MintConfig, MintSchedule } from '../src/types'
const SoundCreatorV1 = new SoundCreatorV1__factory()
const SoundFeeRegistry = new SoundFeeRegistry__factory()
const RangeEditionMinter = new RangeEditionMinter__factory()
const MerkleDropMinter = new MerkleDropMinter__factory()
const SamMinter = new SAM__factory()

let client: SoundClient
let soundCreator: SoundCreatorV1
let precomputedEditionAddress: string
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
let samMinter: SAM
let signers: SignerWithAddress[]
let soundWallet: SignerWithAddress
let artistWallet: SignerWithAddress
let buyerWallet: SignerWithAddress
let buyer2Wallet: SignerWithAddress

/*********************************************************
                        SETUP
 ********************************************************/

async function deployProtocol() {
  // NOTE: DO NOT CHANGE THE ORDER OF THESE DEPLOYMENTS - it will make the tests fail because
  // the addresses are deterministically generated based on the order of deployment

  // Deploy edition implmementation
  const SoundEditionV1_2 = new SoundEditionV1_2__factory()
  const soundEditionV1_2Imp = await SoundEditionV1_2.connect(soundWallet).deploy()

  const SoundEditionV1_1 = new SoundEditionV1_1__factory()
  const soundEditionV1_1Imp = await SoundEditionV1_1.connect(soundWallet).deploy()
  const soundCreatorV1_1 = await SoundCreatorV1.connect(soundWallet).deploy(soundEditionV1_1Imp.address)

  const SoundEditionV1_0 = new SoundEditionV1__factory()
  const soundEditionV1_0Imp = await SoundEditionV1_0.connect(soundWallet).deploy()
  const soundCreatorV1_0 = await SoundCreatorV1.connect(soundWallet).deploy(soundEditionV1_0Imp.address)

  // Deploy & initialize creator

  const soundCreator = await SoundCreatorV1.connect(soundWallet).deploy(soundEditionV1_2Imp.address)
  const feeRegistry = await SoundFeeRegistry.connect(soundWallet).deploy(NON_NULL_ADDRESS, SOUND_FEE)

  // Deploy minters
  const merkleDropMinter = await MerkleDropMinter.connect(soundWallet).deploy(feeRegistry.address)
  const rangeEditionMinter = await RangeEditionMinter.connect(soundWallet).deploy(feeRegistry.address)

  // SAM minter
  const samMinter = await SamMinter.connect(soundWallet).deploy()

  await samMinter.setApprovedEditionFactories([soundCreator.address])

  expect(await samMinter.approvedEditionFactories()).includes(soundCreator.address)

  // Get precomputed edition address using default salt
  const [precomputedEditionAddress, _] = await soundCreator.soundEditionAddress(artistWallet.address, DEFAULT_SALT)

  return {
    soundCreator,
    precomputedEditionAddress,
    merkleDropMinter,
    rangeEditionMinter,
    samMinter,
    SoundEditionV1_2,
    soundEditionV1_2Imp,
    SoundEditionV1_1,
    soundEditionV1_1Imp,
    soundCreatorV1_1,
    SoundEditionV1_0,
    soundEditionV1_0Imp,
    soundCreatorV1_0,
  }
}

beforeEach(async () => {
  signers = await ethers.getSigners()
  soundWallet = signers[0]
  artistWallet = signers[1]
  buyerWallet = signers[2]
  buyer2Wallet = signers[3]

  const fixture = await loadFixture(deployProtocol)

  soundCreator = fixture.soundCreator
  precomputedEditionAddress = fixture.precomputedEditionAddress
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter
  samMinter = fixture.samMinter

  client = SoundClient({
    provider: ethers.provider,
    soundAPI: MockAPI(),
  })
})

/**
 * Sets up an edition and mint schedules.
 */
export async function setupTest({ minterCalls = [] }: { minterCalls?: ContractCall[] }) {
  const editionInterface = new ethers.utils.Interface(SoundEditionV1_1__factory.abi)
  const editionInitData = editionInterface.encodeFunctionData('initialize', [
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
  ])
  const [editionAddress, _] = await soundCreator.soundEditionAddress(artistWallet.address, DEFAULT_SALT)

  const grantRolesCalls = [
    {
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('grantRoles', [merkleDropMinter.address, MINTER_ROLE]),
    },
    {
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('grantRoles', [rangeEditionMinter.address, MINTER_ROLE]),
    },
  ]

  const allContractCalls = [...grantRolesCalls, ...minterCalls]

  await soundCreator.connect(artistWallet).createSoundAndMints(
    DEFAULT_SALT,
    editionInitData,
    allContractCalls.map((d) => d.contractAddress),
    allContractCalls.map((d) => d.calldata),
  )
}

/*********************************************************
                        TESTS
 ********************************************************/

describe('isSoundEdition', () => {
  it("Should throw error if the address isn't valid", async () => {
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

  it('Correctly identifies SoundEdition addresses', async () => {
    await setupTest({})

    const wallet = Wallet.createRandom()
    let isEdition = await client.isSoundEdition({ editionAddress: wallet.address })
    expect(isEdition).to.be.false

    isEdition = await client.isSoundEdition({ editionAddress: precomputedEditionAddress })
    expect(isEdition).to.be.true
  })
})

describe('numberMinted', () => {
  it('returns the number of tokens minted', async () => {
    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const startTime = now()
    const MINT_ID = 0
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]
    await setupTest({ minterCalls })

    // numberMintedBefore shows 0
    const numberMintedBefore = await client.edition.numberMinted({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberMintedBefore).to.equal(0)

    // mint one
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
    })

    // numberMintedAfter shows 1
    const numberMintedAfter = await client.edition.numberMinted({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberMintedAfter).to.equal(1)
  })
})

describe('eligibleQuantity: merkleDrop', () => {
  const merkleTestHelper = MerkleTestHelper()
  let merkleTree: MerkleTree
  let mintSchedules: MintSchedule[] = []

  beforeEach(async () => {
    merkleTree = merkleTestHelper.getMerkleTree()
    const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)

    const minter = MerkleDropMinter__factory.connect(merkleDropMinter.address, artistWallet)
    const startTime = now()

    const minterCalls = [
      {
        contractAddress: merkleDropMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          merkleRoot,
          PRICE,
          startTime,
          startTime + ONE_HOUR,
          0, // affiliateFeeBPS
          5, // maxMintable,
          1, // maxMintablePerAccount
        ]),
      },
    ]

    await setupTest({ minterCalls })

    // provide signer to the sdk
    client = SoundClient({
      provider: ethers.provider,
      signer: buyerWallet,
      merkleProvider: {
        merkleProof({ userAddress }) {
          return merkleTestHelper.getProof({ merkleTree, address: userAddress })
        },
      },
    })
    mintSchedules = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules
    expect(mintSchedules[0].mintType).to.eq('MerkleDrop')
  })

  it('returns eligible quantity if the user is in the allowlist', async () => {
    const eligibleQuantity = await client.edition.eligibleQuantity({
      userAddress: buyerWallet.address,
      mintSchedule: mintSchedules[0],
    })
    expect(eligibleQuantity).to.equal(1)
  })

  it('returns 0 if the user is not in the allowlist', async () => {
    const eligibleQuantity = await client.edition.eligibleQuantity({
      userAddress: '0x52D52188D89f912538fe5933F1d2307Bc8076D05',
      mintSchedule: mintSchedules[0],
    })
    expect(eligibleQuantity).to.equal(0)
  })
})

describe('eligibleQuantity: single RangeEditionMinter instance', () => {
  it(`Eligible quantity is user specific and changes with mint`, async () => {
    const startTime = now()
    const MINT_ID = 0

    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)

    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]

    await setupTest({ minterCalls })

    // shows single active mint
    const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules

    expect(mints.length).to.equal(1)

    // eligible for 2
    const eligibleQuantity = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
    })
    expect(eligibleQuantity).to.equal(2)

    // Test balances decreases after minting
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
    })

    // only eligible for 1 now
    const newEligibleQuantity = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
    })
    expect(newEligibleQuantity).to.equal(1)

    // another user is still eligible for 2
    const eligibleQuantityForOther = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: artistWallet.address,
    })
    expect(eligibleQuantityForOther).to.equal(2)

    const editionInfo = await client.edition.info({ contractAddress: precomputedEditionAddress }).contract.info

    expect(editionInfo.totalMinted).to.equal(1)

    expect(editionInfo.editionMaxMintable).to.equal(EDITION_MAX)
  })

  it(`Eligible quantity is zero outside of minting time`, async () => {
    const startTime = now()
    const cutoffTime = startTime + ONE_HOUR
    const endTime = cutoffTime + ONE_HOUR
    const maxMintablePerAccount = 5

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          cutoffTime,
          endTime,
          0, // affiliateFeeBPS
          10, // maxMintableLower
          10, // maxMintableUpper
          maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules
    expect(mints.length).to.equal(1)

    const eligibleQuantityBeforeStart = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime - 1,
    })
    expect(eligibleQuantityBeforeStart).to.equal(0)

    const eligibleQuantityAtStart = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime,
    })
    expect(eligibleQuantityAtStart).to.equal(maxMintablePerAccount)

    const eligibleQuantityAtEnd = await client.edition.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: endTime + 1,
    })
    expect(eligibleQuantityAtEnd).to.equal(0)

    const editionInfo = await client.edition.info({ contractAddress: precomputedEditionAddress }).contract.info

    expect(editionInfo.totalMinted).to.equal(0)

    expect(editionInfo.editionMaxMintable).to.equal(EDITION_MAX)
  })

  it(`Eligible quantity becomes zero for every user if range edition mint instance is sold out before cutoffTime`, async () => {
    const maxMintableUpper = 8
    const startTime = now()
    const MINT_ID = 0

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime,
          startTime + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          4, // maxMintableLower
          maxMintableUpper, // maxMintableUpper
          1, // maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    // Mint upper range limit
    for (let i = 0; i < maxMintableUpper; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    // Check that all users have zero eligible balance
    await Promise.all(
      Array.from({
        length: 10,
      }).map(async () => {
        const randomSigner = Wallet.createRandom()
        randomSigner.connect(ethers.provider)

        const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
          .activeSchedules
        expect(mints.length).to.equal(1)

        const eligibleQuantity = await client.edition.eligibleQuantity({
          mintSchedule: mints[0],
          userAddress: randomSigner.address,
        })
        expect(eligibleQuantity).to.equal(0)
      }),
    )
  })

  it(`Eligible balance switches to zero after closing time if maxMintableLower has been surpassed`, async () => {
    const maxMintableLower = 5
    const maxMintablePerAccount = 1
    const signers = await ethers.getSigners()
    const startTime = now()
    const cutoffTime = startTime + ONE_HOUR
    const MINT_ID = 0

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          cutoffTime,
          startTime + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          maxMintableLower,
          10, // maxMintableUpper,
          maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    // Mint lower range limit
    for (let i = 0; i < maxMintableLower; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    const mints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).activeSchedules
    expect(mints.length).to.equal(1)

    // Check that random users still have an eligible quantity at current time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.edition.eligibleQuantity({
        mintSchedule: mints[0],
        userAddress: randomSigner.address,
        timestamp: now(),
      })
      expect(eligibleQuantity).to.equal(maxMintablePerAccount)
    }

    // Check that random users have no eligible quantity at closing time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.edition.eligibleQuantity({
        mintSchedule: mints[0],
        userAddress: randomSigner.address,
        timestamp: cutoffTime,
      })
      expect(eligibleQuantity).to.equal(0)
    }
  })

  it(`Eligible quantity changes if querying between multiple mints with different start times and max mintable quantities.`, async () => {
    const mint1StartTime = now()
    const mint1EndTime = mint1StartTime + ONE_HOUR
    const mint2StartTime = mint1EndTime

    const mint1MaxMintablePerAccount = 40
    const mint2MaxMintablePerAccount = 42

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint1StartTime,
          mint1EndTime - 1, // cutoffTime,
          mint1EndTime,
          0, // affiliateFeeBPS
          50, // maxMintableLower,
          60, // maxMintableUpper,
          mint1MaxMintablePerAccount,
        ]),
      },
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint2StartTime,
          mint2StartTime + ONE_HOUR, // cutoffTime,
          mint2StartTime + ONE_HOUR + 1, // endTime
          0, // affiliateFeeBPS
          99, // maxMintableLower,
          100, // maxMintableUpper,
          mint2MaxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    // 1 active mint
    const activeMints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
      .activeSchedules
    expect(activeMints.length).to.equal(1)
    // 2 total mints (1 in the future)
    const allMints = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).schedules
    expect(allMints.length).to.equal(2)

    const eligibleQuantity1 = await client.edition.eligibleQuantity({
      mintSchedule: allMints[0],
      userAddress: buyerWallet.address,
    })

    const eligibleQuantity2 = await client.edition.eligibleQuantity({
      mintSchedule: allMints[1],
      userAddress: buyerWallet.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)

    client.client.instance.signer = buyer2Wallet

    await client.edition.mint({
      mintSchedule: allMints[0],
      quantity: mint1MaxMintablePerAccount,
    })

    const mintSchedule = (
      await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })
    ).schedules.shift()!

    expect(mintSchedule).exist

    const remainingQuantityBuyer1 = await client.edition.eligibleQuantity({
      mintSchedule,
      userAddress: buyerWallet.address,
    })

    assert('maxMintable' in mintSchedule)

    // Eligible quantity should take in account the remaining supply
    expect(remainingQuantityBuyer1).to.equal(
      (typeof mintSchedule.maxMintable === 'function' ? mintSchedule.maxMintable() : mintSchedule.maxMintable) -
        mint1MaxMintablePerAccount,
    )
  })

  it('eligibleQuantity respects the available quantity on the edition over the eligible quantity on mint schedules', async () => {
    const client = SoundClient({
      provider: ethers.provider,
      signer: buyerWallet,
      merkleProvider: {
        merkleProof({ userAddress }) {
          return merkleTestHelper.getProof({ merkleTree, address: userAddress })
        },
      },
    })

    const merkleTestHelper = MerkleTestHelper()
    const startTimeForBoth = now()
    const endTimeForBoth = UINT32_MAX
    const maxMintable = EDITION_MAX
    const maxMintablePerAccount = EDITION_MAX

    const merkleMinter = MerkleDropMinter__factory.connect(merkleDropMinter.address, artistWallet)
    const rangeMinter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)

    const merkleTree = merkleTestHelper.getMerkleTree()
    const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)

    const minterCalls = [
      {
        contractAddress: merkleDropMinter.address,
        calldata: merkleMinter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          merkleRoot,
          PRICE,
          startTimeForBoth,
          endTimeForBoth,
          0, // affiliateFeeBPS
          maxMintable,
          maxMintablePerAccount,
        ]),
      },
      {
        contractAddress: rangeEditionMinter.address,
        calldata: rangeMinter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTimeForBoth,
          startTimeForBoth + ONE_HOUR, // cutoffTime,
          startTimeForBoth + ONE_HOUR + 1, // endTime
          0, // affiliateFeeBPS
          maxMintable - 1, // maxMintableLower,
          maxMintable, // maxMintableUpper,
          maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    const mintSchedules = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
      .activeSchedules

    expect(mintSchedules.length).to.equal(2)

    // Mint entire supply from first mint schedule
    await client.edition.mint({
      mintSchedule: mintSchedules[0],
      quantity: EDITION_MAX,
    })

    // Check that the eligible quantity for the next mint schedule is zero for both buyers
    const eligibleQuantityBuyer1 = await client.edition.eligibleQuantity({
      mintSchedule: mintSchedules[1],
      userAddress: buyerWallet.address,
    })

    const eligibleQuantityBuyer2 = await client.edition.eligibleQuantity({
      mintSchedule: mintSchedules[1],
      userAddress: buyer2Wallet.address,
    })

    expect(eligibleQuantityBuyer1).to.equal(0)
    expect(eligibleQuantityBuyer2).to.equal(0)
  })
})

describe('numberOfTokensOwned', () => {
  it('should buy a token and transfer it out', async () => {
    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const startTime = now()
    const MINT_ID = 0
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]
    await setupTest({ minterCalls })

    // numberMintedBefore shows 0
    const numberOfTokensOwnedBefore = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBefore).to.equal(0)

    // mint one
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
    })

    // Burn token
    const songContract = SoundEditionV1_2__factory.connect(precomputedEditionAddress, buyerWallet)
    const numberOfTokensOwnedBeforeBurn = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBeforeBurn).to.equal(1)
    await songContract.burn(1)

    // numberMintedAfter shows 0
    const numberOfTokensOwnedAfter = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedAfter).to.equal(0)
  })

  it('should buy tokens', async () => {
    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const startTime = now()
    const MINT_ID = 0
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]
    await setupTest({ minterCalls })

    // numberMintedBefore shows 0
    const numberOfTokensOwnedBefore = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBefore).to.equal(0)

    // mint one
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
    })

    // numberMintedAfter shows 1
    const numberOfTokensOwnedAfter = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedAfter).to.equal(1)
  })

  it('should transfer in tokens', async () => {
    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const startTime = now()
    const MINT_ID = 0
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]
    await setupTest({ minterCalls })

    // mint one
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyerWallet)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
    })

    const numberOfTokensOwnedBeforeBuyer1 = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBeforeBuyer1).to.equal(1)

    const numberOfTokensOwnedBeforeBuyer2 = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyer2Wallet.address,
    })
    expect(numberOfTokensOwnedBeforeBuyer2).to.equal(0)

    // Transfer out the song
    const songContract = SoundEditionV1_2__factory.connect(precomputedEditionAddress, buyerWallet)
    await songContract.transferFrom(buyerWallet.address, buyer2Wallet.address, 1)

    const numberOfTokensOwnedAfterBuyer1 = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedAfterBuyer1).to.equal(0)

    const numberOfTokensOwnedAfterBuyer2 = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyer2Wallet.address,
    })
    expect(numberOfTokensOwnedAfterBuyer2).to.equal(1)
  })

  it('should have no tokens owned', async () => {
    let minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const startTime = now()
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime
          startTime + ONE_HOUR * 2, // endTime
          0, // affiliateFeeBPS,
          4, // maxMintableLower,
          5, // maxMintableUpper,
          2, // maxMintablePerAccount
        ]),
      },
    ]
    await setupTest({ minterCalls })

    // numberMintedBefore shows 0
    const numberOfTokensOwnedBefore = await client.edition.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBefore).to.equal(0)
  })
})

describe('mint', () => {
  describe('RangeEditionMinter', () => {
    let mintSchedules: MintSchedule[] = []
    beforeEach(async () => {
      const startTime = now()

      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
      const minterCalls = [
        {
          contractAddress: rangeEditionMinter.address,
          calldata: minter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            PRICE,
            startTime,
            startTime + ONE_HOUR, // cutoffTime,
            startTime + ONE_HOUR * 2, // endTime,
            0, // affiliateFeeBPS
            4, // maxMintableLower,
            5, // maxMintableUpper,
            2, // maxMintablePerAccount,
          ]),
        },
      ]

      await setupTest({ minterCalls })

      // provide signer to the sdk
      client = SoundClient({
        provider: ethers.provider,
        signer: buyerWallet,
      })
      mintSchedules = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress })).schedules
      expect(mintSchedules[0].mintType).to.eq('RangeEdition')
    })

    it(`Successfully mints via RangeEditionMinter`, async () => {
      const quantity = 2
      const initialBalance = await SoundEditionV1_2__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.edition.mint({ mintSchedule: mintSchedules[0], quantity })

      const finalBalance = await SoundEditionV1_2__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it(`Scales gasLimit by ${MINT_GAS_LIMIT_MULTIPLIER * 100}% if gasLimit not provided`, async () => {
      const gasEstimate = await RangeEditionMinter__factory.connect(
        rangeEditionMinter.address,
        buyerWallet,
      ).estimateGas.mint(precomputedEditionAddress, 0, 1, NULL_ADDRESS, {
        value: PRICE,
      })

      const expectedGasLimit = scaleAmount({ amount: gasEstimate, multiplier: MINT_GAS_LIMIT_MULTIPLIER })

      const clientMintCall = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      expect(clientMintCall.gasLimit).to.equal(expectedGasLimit)
    })

    it(`Doesn't scale gasLimit if custom gasLimit not provided`, async () => {
      const gasLimit = 12345678

      const clientMintCall = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1, gasLimit })

      expect(clientMintCall.gasLimit).to.equal(gasLimit)
    })

    it(`Should throw error if invalid quantity requested`, async () => {
      const quantity = 0
      await client.edition
        .mint({ mintSchedule: mintSchedules[0], quantity })
        .then(didntThrowExpectedError)
        .catch((error) => {
          expect(error).instanceOf(InvalidQuantityError)
        })
    })

    it(`Should throw error if more than eligibleQuantity requested`, async () => {
      const quantity = 5
      const eligibleQuantity = await client.edition.eligibleQuantity({
        mintSchedule: mintSchedules[0],
        userAddress: buyerWallet.address,
      })
      await client.edition
        .mint({ mintSchedule: mintSchedules[0], quantity })
        .then(didntThrowExpectedError)
        .catch((error) => {
          expect(error).instanceOf(NotEligibleMint)

          assert(error instanceof NotEligibleMint)

          expect(error.eligibleMintQuantity).equal(eligibleQuantity)
        })
    })
  })

  describe('MerkleDropMinter', () => {
    const merkleTestHelper = MerkleTestHelper()
    let merkleTree: MerkleTree
    let mintSchedules: MintSchedule[] = []

    beforeEach(async () => {
      merkleTree = merkleTestHelper.getMerkleTree()
      const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)

      const minter = MerkleDropMinter__factory.connect(merkleDropMinter.address, artistWallet)
      const startTime = now()

      const minterCalls = [
        {
          contractAddress: merkleDropMinter.address,
          calldata: minter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            startTime,
            startTime + ONE_HOUR,
            0, // affiliateFeeBPS
            5, // maxMintable,
            1, // maxMintablePerAccount
          ]),
        },
      ]

      await setupTest({ minterCalls })

      // provide signer to the sdk
      client = SoundClient({
        provider: ethers.provider,
        signer: buyerWallet,
        merkleProvider: {
          merkleProof({ userAddress }) {
            return merkleTestHelper.getProof({ merkleTree, address: userAddress })
          },
        },
      })
      mintSchedules = (await client.edition.mintSchedules({ editionAddress: precomputedEditionAddress }))
        .activeSchedules
      expect(mintSchedules[0].mintType).to.eq('MerkleDrop')
    })

    it(`Successfully mints via MerkleDropMinter`, async () => {
      const quantity = 1
      const initialBalance = await SoundEditionV1_2__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.edition.mint({
        mintSchedule: mintSchedules[0],
        quantity,
      })

      const finalBalance = await SoundEditionV1_2__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it('Should throw error if merkle proof is null', async () => {
      client.client.instance.merkleProvider!.merkleProof = () => null

      // Test client throws expected error
      await client.edition
        .mint({
          mintSchedule: mintSchedules[0],
          quantity: 1,
        })
        .then(didntThrowExpectedError)
        .catch((error) => {
          expect(error).instanceOf(NotEligibleMint)
        })
    })

    it('Missing merkle provider', async () => {
      client.client.instance.merkleProvider = null

      const expectedError = await client.edition
        .mint({
          mintSchedule: mintSchedules[0],
          quantity: 1,
        })
        .catch((err) => err)

      expect(expectedError).to.instanceOf(MissingMerkleProvider)
    })
  })
})

describe('createEdition', () => {
  const SALT = 'hello'

  beforeEach(() => {
    client = SoundClient({ signer: artistWallet })
  })

  it('Creates a sound edition and mint schedules', async () => {
    const editionConfig = getGenericEditionConfig()

    const mint1StartTime = now()
    const mint1CutoffTime = mint1StartTime + ONE_HOUR / 2
    const mint2StartTime = mint1StartTime + ONE_HOUR
    const mint3StartTime = mint1StartTime + ONE_HOUR * 2
    const mint1MaxMintablePerAccount = 2
    const mint3MaxMintablePerAccount = 3
    const merkleTestHelper = MerkleTestHelper()
    const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTestHelper.getMerkleTree())

    const mintConfigs: MintConfig[] = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime: mint1StartTime,
        cutoffTime: mint1CutoffTime,
        endTime: mint2StartTime,
        maxMintableLower: 5,
        maxMintableUpper: 10,
        maxMintablePerAccount: mint1MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
      {
        mintType: 'MerkleDrop' as const,
        minterAddress: merkleDropMinter.address,
        price: PRICE,
        merkleRoot,
        startTime: mint3StartTime,
        endTime: mint3StartTime + ONE_HOUR,
        maxMintable: 9,
        maxMintablePerAccount: mint3MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
    ]

    const [precomputedEditionAddress, _] = await SoundCreatorV1__factory.connect(
      soundCreator.address,
      ethers.provider,
    ).soundEditionAddress(artistWallet.address, getSaltAsBytes32(SALT))

    /**
     * Create sound edition and mint schedules.
     */
    await client.creation({ creatorAddress: soundCreator.address }).createEdition({
      editionConfig,
      mintConfigs,
      salt: SALT,
    })

    const editionContract = SoundEditionV1_2__factory.connect(precomputedEditionAddress, ethers.provider)

    const [
      editionBaseURI,
      editionMaxMintableLower,
      editionMaxMintableUpper,
      editionCutoffTime,
      fundingRecipient,
      mintRandomnessEnabled,
      operatorFilteringEnabled,
    ] = await Promise.all([
      editionContract.baseURI(),
      editionContract.editionMaxMintableLower(),
      editionContract.editionMaxMintableUpper(),
      editionContract.editionCutoffTime(),
      editionContract.fundingRecipient(),
      editionContract.mintRandomnessEnabled(),
      editionContract.operatorFilteringEnabled(),
    ])

    expect(editionBaseURI).to.eq(editionConfig.baseURI)
    expect(editionMaxMintableLower).to.eq(editionConfig.editionMaxMintableLower)
    expect(editionMaxMintableUpper).to.eq(editionConfig.editionMaxMintableLower)
    expect(editionCutoffTime).to.eq(editionConfig.editionCutoffTime)
    expect(fundingRecipient).to.eq(editionConfig.fundingRecipient)
    expect(mintRandomnessEnabled).to.eq(editionConfig.shouldEnableMintRandomness)
    expect(operatorFilteringEnabled).to.eq(editionConfig.enableOperatorFiltering)

    const MINT_ID = 0

    // Verify mint configs exist
    for (const mintConfig of mintConfigs) {
      switch (mintConfig.mintType) {
        case 'RangeEdition': {
          const minter = RangeEditionMinter__factory.connect(mintConfig.minterAddress, ethers.provider)
          const mintSchedule = await minter.mintInfo(precomputedEditionAddress, MINT_ID)
          expect(mintSchedule.startTime).to.equal(mint1StartTime)
          expect(mintSchedule.cutoffTime).to.equal(mint1CutoffTime)
          expect(mintSchedule.endTime).to.equal(mint2StartTime)
          expect(mintSchedule.maxMintableLower).to.equal(mintConfig.maxMintableLower)
          expect(mintSchedule.maxMintableUpper).to.equal(mintConfig.maxMintableUpper)
          expect(mintSchedule.maxMintablePerAccount).to.equal(mint1MaxMintablePerAccount)
          break
        }
        case 'MerkleDrop': {
          const minter = MerkleDropMinter__factory.connect(mintConfig.minterAddress, ethers.provider)
          const mintSchedule = await minter.mintInfo(precomputedEditionAddress, MINT_ID)
          expect(mintSchedule.startTime).to.equal(mint3StartTime)
          expect(mintSchedule.endTime).to.equal(mint3StartTime + ONE_HOUR)
          expect(mintSchedule.merkleRootHash).to.equal(merkleRoot)
          expect(mintSchedule.maxMintablePerAccount).to.equal(mint3MaxMintablePerAccount)
          break
        }
      }
    }
  })

  it('mint schedules tie-breaker on merkle first, contract merkle first', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintStartTime = now()
    const mint1CutoffTime = mintStartTime + ONE_HOUR / 2
    const mint1MaxMintablePerAccount = 2
    const mint3MaxMintablePerAccount = 3
    const merkleTestHelper = MerkleTestHelper()
    const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTestHelper.getMerkleTree())

    const mintConfigs: MintConfig[] = [
      {
        mintType: 'MerkleDrop' as const,
        minterAddress: merkleDropMinter.address,
        price: PRICE,
        merkleRoot,
        startTime: mintStartTime,
        endTime: mintStartTime + ONE_HOUR,
        maxMintable: 9,
        maxMintablePerAccount: mint3MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime: mintStartTime,
        cutoffTime: mint1CutoffTime,
        endTime: mintStartTime + ONE_HOUR,
        maxMintableLower: 5,
        maxMintableUpper: 10,
        maxMintablePerAccount: mint1MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
    ]

    const [precomputedEditionAddress, _] = await SoundCreatorV1__factory.connect(
      soundCreator.address,
      ethers.provider,
    ).soundEditionAddress(artistWallet.address, getSaltAsBytes32(SALT))

    /**
     * Create sound edition and mint schedules.
     */
    await client.creation({ creatorAddress: soundCreator.address }).createEdition({
      editionConfig,
      mintConfigs,
      salt: SALT,
    })

    const { schedules } = await client.edition.mintSchedules({
      editionAddress: precomputedEditionAddress,
    })

    expect(new Set(schedules.map((v) => v.startTime))).deep.equal(new Set([mintStartTime]))

    expect(schedules.map((v) => v.mintType)).deep.equal([
      'MerkleDrop',
      'RangeEdition',
    ] satisfies MintConfig['mintType'][])

    const scheduleIds = await client.edition.scheduleIds({
      editionAddress: precomputedEditionAddress,
    })

    const mintSchedulesLists = await Promise.all(
      scheduleIds.map(({ minterAddress, mintIds }) =>
        mintInfosFromMinter.call(client.client, { editionAddress: precomputedEditionAddress, minterAddress, mintIds }),
      ),
    )

    expect(mintSchedulesLists.flat().map((v) => v.mintType)).deep.equal([
      'MerkleDrop',
      'RangeEdition',
    ] satisfies MintConfig['mintType'][])
  })

  it('mint schedules tie-breaker on merkle first, contract range first', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintStartTime = now()
    const mint1CutoffTime = mintStartTime + ONE_HOUR / 2
    const mint1MaxMintablePerAccount = 2
    const mint3MaxMintablePerAccount = 3
    const merkleTestHelper = MerkleTestHelper()
    const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTestHelper.getMerkleTree())

    const mintConfigs: MintConfig[] = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime: mintStartTime,
        cutoffTime: mint1CutoffTime,
        endTime: mintStartTime + ONE_HOUR,
        maxMintableLower: 5,
        maxMintableUpper: 10,
        maxMintablePerAccount: mint1MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
      {
        mintType: 'MerkleDrop' as const,
        minterAddress: merkleDropMinter.address,
        price: PRICE,
        merkleRoot,
        startTime: mintStartTime,
        endTime: mintStartTime + ONE_HOUR,
        maxMintable: 9,
        maxMintablePerAccount: mint3MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
    ]

    const [precomputedEditionAddress, _] = await SoundCreatorV1__factory.connect(
      soundCreator.address,
      ethers.provider,
    ).soundEditionAddress(artistWallet.address, getSaltAsBytes32(SALT))

    /**
     * Create sound edition and mint schedules.
     */
    await client.creation({ creatorAddress: soundCreator.address }).createEdition({
      editionConfig,
      mintConfigs,
      salt: SALT,
    })

    const { schedules } = await client.edition.mintSchedules({
      editionAddress: precomputedEditionAddress,
    })

    expect(new Set(schedules.map((v) => v.startTime))).deep.equal(new Set([mintStartTime]))

    expect(schedules.map((v) => v.mintType)).deep.equal([
      'MerkleDrop',
      'RangeEdition',
    ] satisfies MintConfig['mintType'][])

    const scheduleIds = await client.edition.scheduleIds({
      editionAddress: precomputedEditionAddress,
    })

    const mintSchedulesLists = await Promise.all(
      scheduleIds.map(({ minterAddress, mintIds }) =>
        mintInfosFromMinter.call(client.client, { editionAddress: precomputedEditionAddress, minterAddress, mintIds }),
      ),
    )

    expect(mintSchedulesLists.flat().map((v) => v.mintType)).deep.equal([
      'RangeEdition',
      'MerkleDrop',
    ] satisfies MintConfig['mintType'][])
  })

  it('throws if fundingRecipient is a null address', async () => {
    const editionConfig = getGenericEditionConfig()
    editionConfig.fundingRecipient = NULL_ADDRESS

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidAddressError)
        expect(error.type).equal('FUNDING_RECIPIENT')
        expect(error.message).equal('Address cannot be null address')
        expect(error.address).equal(NULL_ADDRESS)
      })
  })

  it(`throws if fundingRecipient isn't an address`, async () => {
    const editionConfig = getGenericEditionConfig()
    editionConfig.fundingRecipient = BAD_ADDRESS

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidAddressError)
        expect(error.type).equal('FUNDING_RECIPIENT')
        expect(error.message).equal('Invalid address')
        expect(error.address).equal(BAD_ADDRESS)
      })
  })

  it(`throws if minterAddress isn't an address`, async () => {
    const editionConfig = getGenericEditionConfig()

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [getGenericRangeMintConfig({ minterAddress: BAD_ADDRESS })],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidAddressError)
        expect(error.type).equal('MINTER')
        expect(error.message).equal('Invalid address')
        expect(error.address).equal(BAD_ADDRESS)
      })
  })

  it(`throws if metadataModule isn't an address`, async () => {
    const editionConfig = getGenericEditionConfig()
    editionConfig.metadataModule = BAD_ADDRESS

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidAddressError)
        expect(error.type).equal('METADATA_MODULE')
        expect(error.message).equal('Invalid address')
        expect(error.address).equal(BAD_ADDRESS)
      })
  })

  it('throws if editionMaxMintableLower > editionMaxMintableUpper', async () => {
    const editionConfig = getGenericEditionConfig()
    editionConfig.editionMaxMintableLower = 2
    editionConfig.editionMaxMintableUpper = 1

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidEditionMaxMintableError)
      })
  })

  it('throws if maxMintablePerAccount is zero', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    mintConfig.maxMintablePerAccount = 0

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidMaxMintablePerAccountError)
      })
  })

  it('throws if range mint maxMintableLower exceeds maxMintableUpper', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    mintConfig.maxMintableLower = 2
    mintConfig.maxMintableUpper = 1

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidMaxMintableError)
      })
  })

  it('throws if range mint startTime == cutoffTime', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    mintConfig.startTime = mintConfig.cutoffTime

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidTimeValuesError)
      })
  })

  it('throws if range mint cutoffTime === endTime', async () => {
    const editionConfig = getGenericEditionConfig()

    const mintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    mintConfig.cutoffTime = mintConfig.endTime

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidTimeValuesError)
      })
  })

  it('throws if merkle mint merkleRoot is invalid', async () => {
    const editionConfig = getGenericEditionConfig()

    const startTime = now()
    const endTime = startTime + 1

    const mintConfig = {
      mintType: 'MerkleDrop' as const,
      minterAddress: merkleDropMinter.address,
      price: PRICE,
      merkleRoot: NULL_BYTES32,
      startTime,
      endTime,
      maxMintable: 9,
      maxMintablePerAccount: 1,
      affiliateFeeBPS: 0,
    }

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidMerkleRootError)
      })

    mintConfig.merkleRoot = '1x0000000000000000000000000000000000000000000000000000000000000000'

    await client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidMerkleRootError)
      })

    mintConfig.merkleRoot = ''

    client
      .creation({ creatorAddress: soundCreator.address })
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidMerkleRootError)
      })
  })
})

describe('expectedEditionAddress', () => {
  it('throws if provided deployerAddress is invalid', async () => {
    await client
      .creation({ creatorAddress: soundCreator.address })
      .expectedEditionAddress({ deployer: '0x0', salt: '123' })
      .then(didntThrowExpectedError)
      .catch((error) => {
        expect(error).instanceOf(InvalidAddressError)
      })
  })

  it('returns expected address', async () => {
    const deployer = artistWallet.address
    const salt1 = Math.random()
    const salt2 = Math.random()

    const [expectedAddress1, _0] = await SoundCreatorV1__factory.connect(
      soundCreator.address,
      ethers.provider,
    ).soundEditionAddress(deployer, getSaltAsBytes32(salt1))

    const [expectedAddress2, _1] = await SoundCreatorV1__factory.connect(
      soundCreator.address,
      ethers.provider,
    ).soundEditionAddress(deployer, getSaltAsBytes32(salt2))

    const { editionAddress: address1 } = await client
      .creation({ creatorAddress: soundCreator.address })
      .expectedEditionAddress({ deployer, salt: salt1 })
    const { editionAddress: address2 } = await client
      .creation({ creatorAddress: soundCreator.address })
      .expectedEditionAddress({ deployer, salt: salt2 })

    expect(address1).to.eq(expectedAddress1)
    expect(address2).to.eq(expectedAddress2)
    expect(address1).not.to.eq(address2)
  })
})

describe('networkChainMatches', () => {
  it('provider', async () => {
    client = SoundClient({
      provider: ethers.provider,
    })

    const mismatch = await client.networkChainMatches({ chainId: 1 })

    expect(mismatch).eq(false)

    const testNet = await client.networkChainMatches({
      chainId: 31337,
    })

    expect(testNet).eq(true)
  })

  it('signer', async () => {
    client = SoundClient({
      signer: artistWallet,
    })

    const mismatch = await client.networkChainMatches({ chainId: 1 })

    expect(mismatch).eq(false)

    const testNet = await client.networkChainMatches({
      chainId: 31337,
    })

    expect(testNet).eq(true)
  })
})

describe('editionInfo', () => {
  let editionAddress: string
  let salt: string

  beforeEach(async () => {
    client = SoundClient({
      signer: artistWallet,
      merkleProvider: MockAPI(),
      soundAPI: MockAPI(),
    })

    salt = randomUUID()
    editionAddress = await client
      .creation({ creatorAddress: soundCreator.address })
      .expectedEditionAddress({
        deployer: artistWallet.address,
        salt,
      })
      .then((v) => v.editionAddress)

    const mint1StartTime = now()
    const mint1CutoffTime = mint1StartTime + ONE_HOUR / 2
    const mint2StartTime = mint1StartTime + ONE_HOUR
    const mint1MaxMintablePerAccount = 2

    await client.creation({ creatorAddress: soundCreator.address }).createEdition({
      editionConfig: {
        name: 'Test',
        symbol: 'TEST',
        metadataModule: NULL_ADDRESS,
        baseURI: 'https://test.com',
        contractURI: 'https://test.com',
        fundingRecipient: NON_NULL_ADDRESS,
        royaltyBPS: 0,
        editionMaxMintableLower: 10,
        editionMaxMintableUpper: 10,
        editionCutoffTime: 999999,
        shouldEnableMintRandomness: true,
        shouldFreezeMetadata: false,
        enableOperatorFiltering: true,

        setSAM: null,
      },
      mintConfigs: [
        {
          mintType: 'RangeEdition' as const,
          minterAddress: rangeEditionMinter.address,
          price: PRICE,
          startTime: mint1StartTime,
          cutoffTime: mint1CutoffTime,
          endTime: mint2StartTime,
          maxMintableLower: 5,
          maxMintableUpper: 10,
          maxMintablePerAccount: mint1MaxMintablePerAccount,
          affiliateFeeBPS: 0,
        },
      ],
    })
  })

  it('throws if no soundAPI', async () => {
    client.client.instance.soundAPI = null
    const expectedError = await client.edition
      .info({
        contractAddress: editionAddress,
      })
      .api.catch((err) => err)

    expect(expectedError).instanceOf(MissingSoundAPI)
  })

  it('throws on non-existent editionInfo', async () => {
    const expectedError = await client.edition
      .info({
        contractAddress: editionAddress,
      })
      .api.catch((err) => err)

    expect(expectedError).instanceOf(SoundNotFoundError)

    assert(expectedError instanceof SoundNotFoundError)

    expect(expectedError.contractAddress).equal(editionAddress)
    expect(expectedError.editionId).equal(null)
    expect(expectedError.graphqlErrors).equal(undefined)
  })
})

describe('editionRegisteredMinters', () => {
  it('returns registered minter addresses', async () => {
    await setupTest({})

    let registeredMinters = await client.edition.registeredMinters({
      editionAddress: precomputedEditionAddress,
      fromBlockOrBlockHash: 0,
    })

    expect(registeredMinters).deep.eq([merkleDropMinter.address, rangeEditionMinter.address])

    // Deploy a new minter and grant it minter role
    const newMinter = await RangeEditionMinter.connect(soundWallet).deploy('0x0000000000000000000000000000000000000001')
    const soundEdition = SoundEditionV1_2__factory.connect(precomputedEditionAddress, artistWallet)

    await soundEdition.grantRoles(newMinter.address, MINTER_ROLE)

    registeredMinters = await client.edition.registeredMinters({
      editionAddress: precomputedEditionAddress,
      fromBlockOrBlockHash: 0,
    })

    expect(registeredMinters).deep.eq([merkleDropMinter.address, rangeEditionMinter.address, newMinter.address])
  })
})

describe('editionMinterMintIds', () => {
  it('returns mint ids', async () => {
    await setupTest({})
    const MINT_SCHEDULE_COUNT = 10

    const mintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })

    // Make  mint schedules
    for (let i = 0; i < MINT_SCHEDULE_COUNT; i++) {
      await rangeEditionMinter
        .connect(artistWallet)
        .createEditionMint(
          precomputedEditionAddress,
          mintConfig.price,
          mintConfig.startTime,
          mintConfig.cutoffTime,
          mintConfig.endTime,
          mintConfig.affiliateFeeBPS,
          mintConfig.maxMintableLower,
          mintConfig.maxMintableUpper,
          mintConfig.maxMintablePerAccount,
        )
    }

    let mintIds = await client.edition.minterMintIds({
      editionAddress: precomputedEditionAddress,
      minterAddress: rangeEditionMinter.address,
      fromBlockOrBlockHash: 0,
    })

    expect(mintIds).deep.eq(Array.from({ length: MINT_SCHEDULE_COUNT }, (_, i) => i))
  })
})

describe('editionScheduleIds', () => {
  it('returns edition schedule ids', async () => {
    await setupTest({})

    const rangeMintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    const merkleMintConfig = getGenericMerkleMintConfig({ minterAddress: merkleDropMinter.address })

    let scheduleIds = await client.edition.scheduleIds({
      editionAddress: precomputedEditionAddress,
      fromBlockOrBlockHash: 0,
    })

    // Make  1 mint schedule per minter
    await rangeEditionMinter
      .connect(artistWallet)
      .createEditionMint(
        precomputedEditionAddress,
        rangeMintConfig.price,
        rangeMintConfig.startTime,
        rangeMintConfig.cutoffTime,
        rangeMintConfig.endTime,
        rangeMintConfig.affiliateFeeBPS,
        rangeMintConfig.maxMintableLower,
        rangeMintConfig.maxMintableUpper,
        rangeMintConfig.maxMintablePerAccount,
      )

    await merkleDropMinter
      .connect(artistWallet)
      .createEditionMint(
        precomputedEditionAddress,
        merkleMintConfig.merkleRoot,
        merkleMintConfig.price,
        merkleMintConfig.startTime,
        merkleMintConfig.endTime,
        merkleMintConfig.affiliateFeeBPS,
        merkleMintConfig.maxMintable,
        merkleMintConfig.maxMintablePerAccount,
      )

    scheduleIds = await client.edition.scheduleIds({
      editionAddress: precomputedEditionAddress,
      fromBlockOrBlockHash: 0,
    })

    expect(scheduleIds).deep.eq([
      { minterAddress: merkleDropMinter.address, mintIds: [0] },
      { minterAddress: rangeEditionMinter.address, mintIds: [0] },
    ])
  })
})

describe('editionMintSchedules', () => {
  it('returns mint schedules for given ids', async () => {
    await setupTest({})
    const MINT_SCHEDULE_COUNT = 10

    const rangeMintConfig = getGenericRangeMintConfig({ minterAddress: rangeEditionMinter.address })
    const merkleMintConfig = getGenericMerkleMintConfig({ minterAddress: merkleDropMinter.address })

    // Make  mint schedules
    for (let i = 0; i < MINT_SCHEDULE_COUNT; i++) {
      await rangeEditionMinter.connect(artistWallet).createEditionMint(
        precomputedEditionAddress,
        rangeMintConfig.price,
        i, // Using startTime to make unique
        rangeMintConfig.cutoffTime,
        rangeMintConfig.endTime,
        rangeMintConfig.affiliateFeeBPS,
        rangeMintConfig.maxMintableLower,
        rangeMintConfig.maxMintableUpper,
        rangeMintConfig.maxMintablePerAccount,
      )

      await merkleDropMinter.connect(artistWallet).createEditionMint(
        precomputedEditionAddress,
        merkleMintConfig.merkleRoot,
        merkleMintConfig.price,
        merkleMintConfig.startTime,
        merkleMintConfig.endTime,
        merkleMintConfig.affiliateFeeBPS,
        i, // Using maxMintable to make unique
        merkleMintConfig.maxMintablePerAccount,
      )
    }

    const rangeMintIds = [0, 3, 5, 7, 9]
    const merkleMintIds = [0, 2, 4, 6, 8]

    let schedules = (
      await client.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
        scheduleIds: [
          { minterAddress: rangeEditionMinter.address, mintIds: rangeMintIds },
          { minterAddress: merkleDropMinter.address, mintIds: merkleMintIds },
        ],
      })
    ).schedules

    expect(schedules.length).to.equal(rangeMintIds.length + merkleMintIds.length)

    const rangeSchedules = schedules.filter(
      (s) => 'minterAddress' in s && s.minterAddress === rangeEditionMinter.address,
    )
    const merkleSchedules = schedules.filter(
      (s) => 'minterAddress' in s && s.minterAddress === merkleDropMinter.address,
    )

    rangeSchedules.forEach((schedule, i) => {
      const id = rangeMintIds[i]
      expect(schedule.mintType).to.equal('RangeEdition')
      expect(schedule.startTime).to.equal(id)
    })

    merkleSchedules.forEach((schedule, i) => {
      const id = merkleMintIds[i]
      expect(schedule.mintType).to.equal('MerkleDrop')
      assert('maxMintable' in schedule)
      expect(schedule.maxMintable).to.equal(id)
    })
  })
})

describe('mintSchedules', () => {
  beforeEach(async () => {
    const mint1StartTime = now()
    const mint1EndTime = mint1StartTime + ONE_HOUR
    const mint2StartTime = mint1EndTime

    const mint1MaxMintablePerAccount = 40
    const mint2MaxMintablePerAccount = 42

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint1StartTime,
          mint1EndTime - 1, // cutoffTime,
          mint1EndTime,
          0, // affiliateFeeBPS
          50, // maxMintableLower,
          60, // maxMintableUpper,
          mint1MaxMintablePerAccount,
        ]),
      },
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint2StartTime,
          mint2StartTime + ONE_HOUR, // cutoffTime,
          mint2StartTime + ONE_HOUR + 1, // endTime
          0, // affiliateFeeBPS
          99, // maxMintableLower,
          100, // maxMintableUpper,
          mint2MaxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })
  })

  it('activeMintSchedules matches and accepts scheduleIds', async () => {
    const [dataRaw, scheduleIds] = await Promise.all([
      client.edition
        .mintSchedules({
          editionAddress: precomputedEditionAddress,
        })
        .then((v) => v.schedules),
      client.edition.scheduleIds({
        editionAddress: precomputedEditionAddress,
      }),
    ])

    expect(dataRaw.length).to.equal(2)

    const [first, second] = dataRaw

    assert(first && second && 'mintId' in first && 'mintId' in second)

    expect(first.mintId).not.equal(second.mintId)

    const [dataWithScheduleIds, dataNoScheduleIds] = await Promise.all([
      client.edition
        .mintSchedules({
          editionAddress: precomputedEditionAddress,
          scheduleIds,
        })
        .then((v) => v.activeSchedules),
      client.edition
        .mintSchedules({
          editionAddress: precomputedEditionAddress,
        })
        .then((v) => v.activeSchedules),
    ])

    expect(dataNoScheduleIds.length).to.equal(1)
    expect(dataWithScheduleIds.length).to.equal(1)

    assert('mintId' in dataWithScheduleIds[0] && 'mintId' in dataNoScheduleIds[0])

    expect(dataWithScheduleIds[0].mintId).equal(dataNoScheduleIds[0].mintId)

    expect(dataNoScheduleIds[0].mintId).to.equal(first.mintId)
  })
})

describe('getContractError returns expected error', () => {
  let client: SoundClient
  const START_TIME = now()
  const MAX_QUANTITY = 10
  const merkleTestHelper = MerkleTestHelper()
  const merkleTree = merkleTestHelper.getMerkleTree()

  beforeEach(async () => {
    client = SoundClient({
      provider: ethers.provider,
      signer: buyerWallet,
      merkleProvider: {
        merkleProof({ userAddress }) {
          return merkleTestHelper.getProof({ merkleTree, address: userAddress })
        },
      },
    })
  })

  afterEach(async () => {
    await setAutoMine(true)
  })

  it('mint attempt on a sold-out edition', async () => {
    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          START_TIME,
          START_TIME + ONE_HOUR, // cutoffTime,
          START_TIME + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          EDITION_MAX * 2 - 1, // maxMintableLower
          EDITION_MAX * 2, // maxMintableUpper
          EDITION_MAX * 2, // maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    const { schedules: mintSchedules } = await client.edition.mintSchedules({
      editionAddress: precomputedEditionAddress,
    })

    await setAutoMine(false)

    // Mint full quantity
    await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: EDITION_MAX })

    // Attempt to mint again
    const tx = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

    await mineBlock()

    const customError = await client.getContractError(tx.hash)

    expect(customError).to.equal(ContractErrorName.ExceedsEditionAvailableSupply)
  })

  context('RangeMinter', () => {
    it('mint attempt on a sold-out schedule', async () => {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
      const minterCalls = [
        {
          contractAddress: rangeEditionMinter.address,
          calldata: minter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            PRICE,
            START_TIME,
            START_TIME + ONE_HOUR, // cutoffTime,
            START_TIME + ONE_HOUR * 2, // endTime,
            0, // affiliateFeeBPS
            MAX_QUANTITY - 1, // maxMintableLower
            MAX_QUANTITY, // maxMintableUpper
            MAX_QUANTITY, // maxMintablePerAccount,
          ]),
        },
      ]

      await setupTest({ minterCalls })

      const { schedules: mintSchedules } = await client.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
      })

      await setAutoMine(false)

      // Mint full quantity
      client.edition.mint({ mintSchedule: mintSchedules[0], quantity: MAX_QUANTITY })

      // Attempt to mint again
      const tx = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      await mineBlock()

      const customError = await client.getContractError(tx.hash)

      expect(customError).to.equal(ContractErrorName.ExceedsAvailableSupply)
    })

    it('mint attempt when user has already hit their max', async () => {
      const MAX_MINTABLE_PER_ACCOUNT = 1
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
      const minterCalls = [
        {
          contractAddress: rangeEditionMinter.address,
          calldata: minter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            PRICE,
            START_TIME,
            START_TIME + ONE_HOUR, // cutoffTime,
            START_TIME + ONE_HOUR * 2, // endTime,
            0, // affiliateFeeBPS
            MAX_QUANTITY - 1, // maxMintableLower
            MAX_QUANTITY, // maxMintableUpper
            MAX_MINTABLE_PER_ACCOUNT, // maxMintablePerAccount,
          ]),
        },
      ]

      await setupTest({ minterCalls })

      const { schedules: mintSchedules } = await client.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
      })

      await setAutoMine(false)

      await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: MAX_MINTABLE_PER_ACCOUNT })

      // Attempt to mint again
      const tx = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      await mineBlock()

      const customError = await client.getContractError(tx.hash)

      expect(customError).to.equal(ContractErrorName.ExceedsMaxPerAccount)
    })
  })

  context('MerkleDropMinter', () => {
    it('mint attempt on a sold-out schedule', async () => {
      const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)
      const minterCalls = [
        {
          contractAddress: merkleDropMinter.address,
          calldata: merkleDropMinter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            START_TIME,
            START_TIME + ONE_HOUR,
            0, // affiliateFeeBPS
            MAX_QUANTITY, // maxMintable,
            MAX_QUANTITY, // maxMintablePerAccount
          ]),
        },
      ]

      await setupTest({ minterCalls })

      const { schedules: mintSchedules } = await client.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
      })

      await setAutoMine(false)

      // Mint full quantity
      await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: MAX_QUANTITY })

      // Attempt to mint again
      const tx = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      await mineBlock()

      const customError = await client.getContractError(tx.hash)

      expect(customError).to.equal(ContractErrorName.ExceedsAvailableSupply)
    })

    it('mint attempt when user has already hit their max', async () => {
      const MAX_MINTABLE_PER_ACCOUNT = 1
      const merkleRoot = merkleTestHelper.getMerkleRoot(merkleTree)
      const minterCalls = [
        {
          contractAddress: merkleDropMinter.address,
          calldata: merkleDropMinter.interface.encodeFunctionData('createEditionMint', [
            precomputedEditionAddress,
            merkleRoot,
            PRICE,
            START_TIME,
            START_TIME + ONE_HOUR,
            0, // affiliateFeeBPS
            EDITION_MAX, // maxMintable,
            MAX_MINTABLE_PER_ACCOUNT, // maxMintablePerAccount
          ]),
        },
      ]

      await setupTest({ minterCalls })

      const { schedules: mintSchedules } = await client.edition.mintSchedules({
        editionAddress: precomputedEditionAddress,
      })

      await setAutoMine(false)

      await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: MAX_MINTABLE_PER_ACCOUNT })

      // Attempt to mint again
      const tx = await client.edition.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      await mineBlock()

      const customError = await client.getContractError(tx.hash)

      expect(customError).to.equal(ContractErrorName.ExceedsMaxPerAccount)
    })
  })
})

describe('SAM', () => {
  let client: SoundClient
  const START_TIME = now()

  beforeEach(async () => {
    signers = await ethers.getSigners()
    soundWallet = signers[0]
    artistWallet = signers[1]
    buyerWallet = signers[2]
    buyer2Wallet = signers[3]

    const fixture = await loadFixture(deployProtocol)

    soundCreator = fixture.soundCreator
    precomputedEditionAddress = fixture.precomputedEditionAddress
    merkleDropMinter = fixture.merkleDropMinter
    rangeEditionMinter = fixture.rangeEditionMinter
    samMinter = fixture.samMinter

    client = SoundClient({
      provider: ethers.provider,
      signer: soundWallet,
    })
  })

  it('create sam and basic info', async () => {
    expect(samMinter).ok

    const editionCreator = client.creation({
      creatorAddress: soundCreator.address,
    })

    const salt = randomUUID()

    const { editionAddress } = await editionCreator.expectedEditionAddress({
      deployer: soundWallet.address,
      salt,
    })

    await editionCreator.createEdition({
      salt,
      editionConfig: {
        name: 'Test',
        symbol: 'TEST',
        metadataModule: NULL_ADDRESS,
        baseURI: 'https://test.com',
        contractURI: 'https://test.com',
        fundingRecipient: NON_NULL_ADDRESS,
        royaltyBPS: 0,
        editionMaxMintableLower: 10,
        editionMaxMintableUpper: 10,
        editionCutoffTime: 999999,
        shouldEnableMintRandomness: true,
        shouldFreezeMetadata: false,
        enableOperatorFiltering: true,
        setSAM: {
          affiliateFeeBPS: 0,
          artistFeeBPS: 0,
          basePrice: PRICE,
          contractAddress: samMinter.address,
          goldenEggFeeBPS: 0,
          inflectionPoint: 1500,
          inflectionPrice: 20000,
          linearPriceSlope: '0',
        },
      },
      mintConfigs: [
        {
          mintType: 'RangeEdition',
          minterAddress: rangeEditionMinter.address,
          price: PRICE,
          startTime: START_TIME,
          cutoffTime: START_TIME + 2,
          endTime: START_TIME + 3,
          maxMintableLower: 5,
          maxMintableUpper: 10,
          maxMintablePerAccount: 1,
          affiliateFeeBPS: 0,
        },
      ],
    })

    const samAddress = await client.edition.sam({
      editionAddress,
    }).contract.address

    expect(samAddress).to.eq(samMinter.address)

    const samInfo = await client.edition.sam({
      editionAddress,
    }).contract.info

    assert(samInfo)

    const {
      affiliateFeeBPS,
      affiliateMerkleRoot,
      artistFeeBPS,
      balance,
      basePrice,
      buyFreezeTime,
      goldenEggFeeBPS,
      goldenEggFeesAccrued,
      inflectionPoint,
      inflectionPrice,
      linearPriceSlope,
      maxSupply,
      supply,
    } = samInfo

    expect({
      affiliateFeeBPS,
      affiliateMerkleRoot,
      artistFeeBPS,
      balance,
      basePrice,
      buyFreezeTime,
      goldenEggFeeBPS,
      goldenEggFeesAccrued,
      inflectionPoint,
      inflectionPrice,
      linearPriceSlope,
      maxSupply,
      supply,
    }).to.deep.eq({
      affiliateFeeBPS: 0,
      affiliateMerkleRoot,
      artistFeeBPS: 0,
      balance: BigNumber.from(0),
      basePrice: BigNumber.from(PRICE),
      buyFreezeTime: UINT32_MAX,
      goldenEggFeeBPS: 0,
      goldenEggFeesAccrued: BigNumber.from(0),
      inflectionPoint: 1500,
      inflectionPrice: BigNumber.from(20000),
      linearPriceSlope: BigNumber.from(0),
      maxSupply: UINT32_MAX,
      supply: 0,
    } satisfies typeof samInfo)
  })

  it('create sam buy and sell', async () => {
    expect(samMinter).ok

    const editionCreator = client.creation({
      creatorAddress: soundCreator.address,
    })

    const salt = randomUUID()

    const { editionAddress } = await editionCreator.expectedEditionAddress({
      deployer: soundWallet.address,
      salt,
    })

    await editionCreator.createEdition({
      salt,
      editionConfig: {
        name: 'Test',
        symbol: 'TEST',
        metadataModule: NULL_ADDRESS,
        baseURI: 'https://test.com',
        contractURI: 'https://test.com',
        fundingRecipient: NON_NULL_ADDRESS,
        royaltyBPS: 0,
        editionMaxMintableLower: 10,
        editionMaxMintableUpper: 10,
        editionCutoffTime: 999999,
        shouldEnableMintRandomness: true,
        shouldFreezeMetadata: false,
        enableOperatorFiltering: true,
        setSAM: {
          affiliateFeeBPS: 0,
          artistFeeBPS: 0,
          basePrice: PRICE,
          contractAddress: samMinter.address,
          goldenEggFeeBPS: 0,
          inflectionPoint: 1500,
          inflectionPrice: 20000,
          linearPriceSlope: '0',
        },
      },
      mintConfigs: [
        {
          mintType: 'RangeEdition',
          minterAddress: rangeEditionMinter.address,
          price: PRICE,
          startTime: START_TIME,
          cutoffTime: START_TIME + 1000,
          endTime: START_TIME + 2000,
          maxMintableLower: 5,
          maxMintableUpper: 10,
          maxMintablePerAccount: 999,
          affiliateFeeBPS: 0,
        },
      ],
    })

    const samAddress = await client.edition.sam({
      editionAddress,
    }).contract.address

    expect(samAddress).to.eq(samMinter.address)

    expect(
      await client.edition.info({
        contractAddress: editionAddress,
      }).contract.isVersionAtLeastV1_2,
    ).eq(true)

    const {
      activeSchedules: [mintSchedule],
    } = await client.edition.mintSchedules({
      editionAddress,
    })

    assert(mintSchedule)

    await client.edition.mint({
      mintSchedule: mintSchedule,
      quantity: 10,
    })

    expect(
      await client.edition
        .info({
          contractAddress: editionAddress,
        })
        .contract.info.then((v) => v.totalMinted.toNumber()),
    ).eq(10)

    const sam = client.edition.sam({
      editionAddress,
    })

    const totalBuyPrice = await sam.contract.totalBuyPrice({
      quantity: 10,
      offset: 0,
    })

    assert(totalBuyPrice)

    await sam.contract.buy({
      price: totalBuyPrice.total,
      quantity: 10,
    })

    expect(
      await client.edition
        .info({
          contractAddress: editionAddress,
        })
        .contract.info.then((v) => v.totalMinted.toNumber()),
    ).eq(20)

    const totalSellPrice = await sam.contract.totalSellPrice({
      quantity: 5,
      offset: 0,
    })

    assert(totalSellPrice)

    await sam.contract.sell({
      minimumPayout: totalSellPrice,
      tokenIds: [1, 2, 3, 4, 5],
    })

    expect(
      await client.edition
        .info({
          contractAddress: editionAddress,
        })
        .contract.info.then((v) => v.totalMinted.toNumber()),
    ).eq(20)

    expect(
      await client.edition
        .info({
          contractAddress: editionAddress,
        })
        .contract.info.then((v) => v.totalBurned.toNumber()),
    ).eq(5)
  })
})

describe('Legacy protocol versions', () => {
  it('Sound v1.1', async () => {
    const { soundCreatorV1_1 } = await loadFixture(deployProtocol)

    const startTime = now()

    const salt = randomUUID()
    const saltBytes = getSaltAsBytes32(salt)

    const { addr: expectedEditionAddress } = await soundCreatorV1_1
      .connect(soundCreatorV1_1.address)
      .soundEditionAddress(artistWallet.address, saltBytes)

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          expectedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime,
          startTime + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          4, // maxMintableLower
          4, // maxMintableUpper
          1, // maxMintablePerAccount,
        ]),
      },
    ]

    const editionInterface = new ethers.utils.Interface(SoundEditionV1_1__factory.abi)
    const editionInitData = editionInterface.encodeFunctionData('initialize', [
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
    ])

    const grantRolesCalls = [
      {
        contractAddress: expectedEditionAddress,
        calldata: editionInterface.encodeFunctionData('grantRoles', [rangeEditionMinter.address, MINTER_ROLE]),
      },
    ]

    const allContractCalls = [...grantRolesCalls, ...minterCalls]

    await soundCreatorV1_1.connect(artistWallet).createSoundAndMints(
      getSaltAsBytes32(salt),
      editionInitData,
      allContractCalls.map((d) => d.contractAddress),
      allContractCalls.map((d) => d.calldata),
    )

    const client = SoundClient({
      signer: artistWallet,
    })

    expect(await client.isSoundEdition({ editionAddress: expectedEditionAddress })).eq(true)

    expect(
      await client.edition.info({
        contractAddress: expectedEditionAddress,
      }).contract.isVersionAtLeastV1_2,
    ).eq(false)

    expect(await client.edition.sam({ editionAddress: expectedEditionAddress }).contract.address).eq(null)

    const { name, symbol } = await client.edition.info({
      contractAddress: expectedEditionAddress,
    }).contract.info

    expect({ name, symbol }).deep.eq({
      name: 'Song Name',
      symbol: 'SYMBOL',
    })

    const { schedules } = await client.edition.mintSchedules({
      editionAddress: expectedEditionAddress,
    })

    expect(schedules.length).eq(1)

    expect(schedules[0].startTime).eq(startTime)
  })

  it('Sound v1.0', async () => {
    const { soundCreatorV1_0 } = await loadFixture(deployProtocol)

    const startTime = now()

    const salt = randomUUID()
    const saltBytes = getSaltAsBytes32(salt)

    const { addr: expectedEditionAddress } = await soundCreatorV1_0
      .connect(soundCreatorV1_0.address)
      .soundEditionAddress(artistWallet.address, saltBytes)

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          expectedEditionAddress,
          PRICE,
          startTime,
          startTime + ONE_HOUR, // cutoffTime,
          startTime + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          4, // maxMintableLower
          4, // maxMintableUpper
          1, // maxMintablePerAccount,
        ]),
      },
    ]

    const editionInterface = new ethers.utils.Interface(SoundEditionV1__factory.abi)
    const editionInitData = editionInterface.encodeFunctionData('initialize', [
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
    ])

    const grantRolesCalls = [
      {
        contractAddress: expectedEditionAddress,
        calldata: editionInterface.encodeFunctionData('grantRoles', [rangeEditionMinter.address, MINTER_ROLE]),
      },
    ]

    const allContractCalls = [...grantRolesCalls, ...minterCalls]

    await soundCreatorV1_0.connect(artistWallet).createSoundAndMints(
      getSaltAsBytes32(salt),
      editionInitData,
      allContractCalls.map((d) => d.contractAddress),
      allContractCalls.map((d) => d.calldata),
    )

    const client = SoundClient({
      signer: artistWallet,
    })

    expect(await client.isSoundEdition({ editionAddress: expectedEditionAddress })).eq(true)

    expect(
      await client.edition.info({
        contractAddress: expectedEditionAddress,
      }).contract.isVersionAtLeastV1_2,
    ).eq(false)

    expect(await client.edition.sam({ editionAddress: expectedEditionAddress }).contract.address).eq(null)

    const { name, symbol } = await client.edition.info({
      contractAddress: expectedEditionAddress,
    }).contract.info

    expect({ name, symbol }).deep.eq({
      name: 'Song Name',
      symbol: 'SYMBOL',
    })

    const { schedules } = await client.edition.mintSchedules({
      editionAddress: expectedEditionAddress,
    })

    expect(schedules.length).eq(1)

    expect(schedules[0].startTime).eq(startTime)
  })
})

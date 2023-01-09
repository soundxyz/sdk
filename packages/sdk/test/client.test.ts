import { Wallet } from '@ethersproject/wallet'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import {
  MerkleDropMinter,
  MerkleDropMinter__factory,
  RangeEditionMinter,
  RangeEditionMinter__factory,
  SoundCreatorV1,
  SoundCreatorV1__factory,
  SoundEditionV1_1__factory,
  SoundFeeRegistry__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import assert from 'assert'
import { expect } from 'chai'
import { ethers } from 'hardhat'

import { SoundClient } from '../src/client'
import {
  InvalidAddressError,
  InvalidEditionMaxMintableError,
  InvalidQuantityError,
  InvalidTimeValuesError,
  MissingMerkleProvider,
  InvalidMerkleRootError,
  MissingSoundAPI,
  NotEligibleMint,
  SoundNotFoundError,
  InvalidMaxMintablePerAccountError,
  InvalidMaxMintableError,
} from '../src/errors'
import { DEFAULT_SALT, SOUND_FEE, ONE_HOUR, PRICE, BAD_ADDRESS, EDITION_MAX } from './test-constants'
import {
  MINTER_ROLE,
  NULL_ADDRESS,
  NON_NULL_ADDRESS,
  UINT32_MAX,
  NULL_BYTES32,
  MINT_GAS_LIMIT_MULTIPLIER,
  ContractErrorName,
} from '../src/utils/constants'
import { getSaltAsBytes32, scaleAmount } from '../src/utils/helpers'
import {
  MerkleTestHelper,
  now,
  getGenericEditionConfig,
  getGenericRangeMintConfig,
  getGenericMerkleMintConfig,
  didntThrowExpectedError,
  mineBlock,
  setAutoMine,
} from './helpers'

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type MerkleTree from 'merkletreejs'

import type { ContractCall, MintConfig, MintSchedule } from '../src/types'
import { MockAPI } from './helpers/api'
import { randomUUID } from 'crypto'

const SoundCreatorV1 = new SoundCreatorV1__factory()
const SoundFeeRegistry = new SoundFeeRegistry__factory()
const RangeEditionMinter = new RangeEditionMinter__factory()
const MerkleDropMinter = new MerkleDropMinter__factory()

let client: SoundClient
let soundCreator: SoundCreatorV1
let precomputedEditionAddress: string
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
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
  const SoundEditionV1 = new SoundEditionV1_1__factory()
  const soundEditionImp = await SoundEditionV1.connect(soundWallet).deploy()

  // Deploy & initialize creator

  const soundCreator = await SoundCreatorV1.connect(soundWallet).deploy(soundEditionImp.address)
  const feeRegistry = await SoundFeeRegistry.connect(soundWallet).deploy(NON_NULL_ADDRESS, SOUND_FEE)

  // Deploy minters
  const merkleDropMinter = await MerkleDropMinter.connect(soundWallet).deploy(feeRegistry.address)
  const rangeEditionMinter = await RangeEditionMinter.connect(soundWallet).deploy(feeRegistry.address)

  // Get precomputed edition address using default salt
  const [precomputedEditionAddress, _] = await soundCreator.soundEditionAddress(artistWallet.address, DEFAULT_SALT)

  return { soundCreator, precomputedEditionAddress, merkleDropMinter, rangeEditionMinter }
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

  client = SoundClient({
    provider: ethers.provider,
    soundCreatorAddress: soundCreator.address,
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

  it.only('Correctly identifies SoundEdition addresses', async () => {
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
    const numberMintedBefore = await client.numberMinted({
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
    const numberMintedAfter = await client.numberMinted({
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
    mintSchedules = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
    expect(mintSchedules[0].mintType).to.eq('MerkleDrop')
  })

  it('returns eligible quantity if the user is in the allowlist', async () => {
    const eligibleQuantity = await client.eligibleQuantity({
      userAddress: buyerWallet.address,
      mintSchedule: mintSchedules[0],
    })
    expect(eligibleQuantity).to.equal(1)
  })

  it('returns 0 if the user is not in the allowlist', async () => {
    const eligibleQuantity = await client.eligibleQuantity({
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
    const mints = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })

    expect(mints.length).to.equal(1)

    // eligible for 2
    const eligibleQuantity = await client.eligibleQuantity({
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
    const newEligibleQuantity = await client.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
    })
    expect(newEligibleQuantity).to.equal(1)

    // another user is still eligible for 2
    const eligibleQuantityForOther = await client.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: artistWallet.address,
    })
    expect(eligibleQuantityForOther).to.equal(2)

    const editionInfo = await client.editionInfo({ contractAddress: precomputedEditionAddress }).contract

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

    const mints = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
    expect(mints.length).to.equal(1)

    const eligibleQuantityBeforeStart = await client.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime - 1,
    })
    expect(eligibleQuantityBeforeStart).to.equal(0)

    const eligibleQuantityAtStart = await client.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime,
    })
    expect(eligibleQuantityAtStart).to.equal(maxMintablePerAccount)

    const eligibleQuantityAtEnd = await client.eligibleQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: endTime + 1,
    })
    expect(eligibleQuantityAtEnd).to.equal(0)

    const editionInfo = await client.editionInfo({ contractAddress: precomputedEditionAddress }).contract

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

        const mints = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
        expect(mints.length).to.equal(1)

        const eligibleQuantity = await client.eligibleQuantity({
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

    const mints = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
    expect(mints.length).to.equal(1)

    // Check that random users still have an eligible quantity at current time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.eligibleQuantity({
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

      const eligibleQuantity = await client.eligibleQuantity({
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
    const activeMints = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
    expect(activeMints.length).to.equal(1)
    // 2 total mints (1 in the future)
    const allMints = await client.mintSchedules({ editionAddress: precomputedEditionAddress })
    expect(allMints.length).to.equal(2)

    const eligibleQuantity1 = await client.eligibleQuantity({
      mintSchedule: allMints[0],
      userAddress: buyerWallet.address,
    })

    const eligibleQuantity2 = await client.eligibleQuantity({
      mintSchedule: allMints[1],
      userAddress: buyerWallet.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)

    client.signer = buyer2Wallet

    await client.mint({
      mintSchedule: allMints[0],
      quantity: mint1MaxMintablePerAccount,
    })

    const mintSchedule = await client
      .activeMintSchedules({ editionAddress: precomputedEditionAddress })
      .then((v) => v.shift()!)

    expect(mintSchedule).exist

    const remainingQuantityBuyer1 = await client.eligibleQuantity({
      mintSchedule,
      userAddress: buyerWallet.address,
    })

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

    const mintSchedules = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })

    expect(mintSchedules.length).to.equal(2)

    // Mint entire supply from first mint schedule
    await client.mint({
      mintSchedule: mintSchedules[0],
      quantity: EDITION_MAX,
    })

    // Check that the eligible quantity for the next mint schedule is zero for both buyers
    const eligibleQuantityBuyer1 = await client.eligibleQuantity({
      mintSchedule: mintSchedules[1],
      userAddress: buyerWallet.address,
    })

    const eligibleQuantityBuyer2 = await client.eligibleQuantity({
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
    const numberOfTokensOwnedBefore = await client.numberOfTokensOwned({
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
    const songContract = SoundEditionV1_1__factory.connect(precomputedEditionAddress, buyerWallet)
    const numberOfTokensOwnedBeforeBurn = await client.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBeforeBurn).to.equal(1)
    await songContract.burn(1)

    // numberMintedAfter shows 0
    const numberOfTokensOwnedAfter = await client.numberOfTokensOwned({
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
    const numberOfTokensOwnedBefore = await client.numberOfTokensOwned({
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
    const numberOfTokensOwnedAfter = await client.numberOfTokensOwned({
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

    const numberOfTokensOwnedBeforeBuyer1 = await client.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedBeforeBuyer1).to.equal(1)

    const numberOfTokensOwnedBeforeBuyer2 = await client.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyer2Wallet.address,
    })
    expect(numberOfTokensOwnedBeforeBuyer2).to.equal(0)

    // Transfer out the song
    const songContract = SoundEditionV1_1__factory.connect(precomputedEditionAddress, buyerWallet)
    await songContract.transferFrom(buyerWallet.address, buyer2Wallet.address, 1)

    const numberOfTokensOwnedAfterBuyer1 = await client.numberOfTokensOwned({
      editionAddress: precomputedEditionAddress,
      userAddress: buyerWallet.address,
    })
    expect(numberOfTokensOwnedAfterBuyer1).to.equal(0)

    const numberOfTokensOwnedAfterBuyer2 = await client.numberOfTokensOwned({
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
    const numberOfTokensOwnedBefore = await client.numberOfTokensOwned({
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
        soundCreatorAddress: soundCreator.address,
      })
      mintSchedules = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
      expect(mintSchedules[0].mintType).to.eq('RangeEdition')
    })

    it(`Successfully mints via RangeEditionMinter`, async () => {
      const quantity = 2
      const initialBalance = await SoundEditionV1_1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.mint({ mintSchedule: mintSchedules[0], quantity })

      const finalBalance = await SoundEditionV1_1__factory.connect(
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

      const clientMintCall = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      expect(clientMintCall.gasLimit).to.equal(expectedGasLimit)
    })

    it(`Doesn't scale gasLimit if custom gasLimit not provided`, async () => {
      const gasLimit = 12345678

      const clientMintCall = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1, gasLimit })

      expect(clientMintCall.gasLimit).to.equal(gasLimit)
    })

    it(`Should throw error if invalid quantity requested`, async () => {
      const quantity = 0
      await client
        .mint({ mintSchedule: mintSchedules[0], quantity })
        .then(didntThrowExpectedError)
        .catch((error) => {
          expect(error).instanceOf(InvalidQuantityError)
        })
    })

    it(`Should throw error if more than eligibleQuantity requested`, async () => {
      const quantity = 5
      const eligibleQuantity = await client.eligibleQuantity({
        mintSchedule: mintSchedules[0],
        userAddress: buyerWallet.address,
      })
      await client
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
      mintSchedules = await client.activeMintSchedules({ editionAddress: precomputedEditionAddress })
      expect(mintSchedules[0].mintType).to.eq('MerkleDrop')
    })

    it(`Successfully mints via MerkleDropMinter`, async () => {
      const quantity = 1
      const initialBalance = await SoundEditionV1_1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.mint({
        mintSchedule: mintSchedules[0],
        quantity,
      })

      const finalBalance = await SoundEditionV1_1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it('Should throw error if merkle proof is null', async () => {
      client.merkleProvider!.merkleProof = () => null

      // Test client throws expected error
      await client
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
      client.merkleProvider = undefined

      const expectedError = await client
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
    client = SoundClient({ signer: artistWallet, soundCreatorAddress: soundCreator.address })
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
    await client.createEdition({
      editionConfig,
      mintConfigs,
      salt: SALT,
    })

    const editionContract = SoundEditionV1_1__factory.connect(precomputedEditionAddress, ethers.provider)

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

  it('throws if fundingRecipient is a null address', async () => {
    const editionConfig = getGenericEditionConfig()
    editionConfig.fundingRecipient = NULL_ADDRESS

    await client
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

    const { editionAddress: address1 } = await client.expectedEditionAddress({ deployer, salt: salt1 })
    const { editionAddress: address2 } = await client.expectedEditionAddress({ deployer, salt: salt2 })

    expect(address1).to.eq(expectedAddress1)
    expect(address2).to.eq(expectedAddress2)
    expect(address1).not.to.eq(address2)
  })
})

describe('networkChainMatches', () => {
  it('provider', async () => {
    client = SoundClient({
      provider: ethers.provider,
      soundCreatorAddress: soundCreator.address,
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
      soundCreatorAddress: soundCreator.address,
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
      soundCreatorAddress: soundCreator.address,
    })

    salt = randomUUID()
    editionAddress = await client
      .expectedEditionAddress({
        deployer: artistWallet.address,
        salt,
      })
      .then((v) => v.editionAddress)

    const mint1StartTime = now()
    const mint1CutoffTime = mint1StartTime + ONE_HOUR / 2
    const mint2StartTime = mint1StartTime + ONE_HOUR
    const mint1MaxMintablePerAccount = 2

    await client.createEdition({
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
    client.soundAPI = undefined
    const expectedError = await client
      .editionInfo({
        contractAddress: editionAddress,
      })
      .api.catch((err) => err)

    expect(expectedError).instanceOf(MissingSoundAPI)
  })

  it('throws on non-existent editionInfo', async () => {
    const expectedError = await client
      .editionInfo({
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

    let registeredMinters = await client.editionRegisteredMinters({
      editionAddress: precomputedEditionAddress,
      fromBlockOrBlockHash: 0,
    })

    expect(registeredMinters).deep.eq([merkleDropMinter.address, rangeEditionMinter.address])

    // Deploy a new minter and grant it minter role
    const newMinter = await RangeEditionMinter.connect(soundWallet).deploy('0x0000000000000000000000000000000000000001')
    const soundEdition = SoundEditionV1_1__factory.connect(precomputedEditionAddress, artistWallet)

    await soundEdition.grantRoles(newMinter.address, MINTER_ROLE)

    registeredMinters = await client.editionRegisteredMinters({
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

    let mintIds = await client.editionMinterMintIds({
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

    let scheduleIds = await client.editionScheduleIds({
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

    scheduleIds = await client.editionScheduleIds({
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

    let schedules = await client.editionMintSchedules({
      editionAddress: precomputedEditionAddress,
      scheduleIds: [
        { minterAddress: rangeEditionMinter.address, mintIds: rangeMintIds },
        { minterAddress: merkleDropMinter.address, mintIds: merkleMintIds },
      ],
    })

    expect(schedules.length).to.equal(rangeMintIds.length + merkleMintIds.length)

    const rangeSchedules = schedules.filter((s) => s.minterAddress === rangeEditionMinter.address)
    const merkleSchedules = schedules.filter((s) => s.minterAddress === merkleDropMinter.address)

    rangeSchedules.forEach((schedule, i) => {
      const id = rangeMintIds[i]
      expect(schedule.mintType).to.equal('RangeEdition')
      expect(schedule.startTime).to.equal(id)
    })

    merkleSchedules.forEach((schedule, i) => {
      const id = merkleMintIds[i]
      expect(schedule.mintType).to.equal('MerkleDrop')
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
      client.mintSchedules({
        editionAddress: precomputedEditionAddress,
      }),
      client.editionScheduleIds({
        editionAddress: precomputedEditionAddress,
      }),
    ])

    expect(dataRaw.length).to.equal(2)

    const [first, second] = dataRaw

    assert(first && second)

    expect(first.mintId).not.equal(second.mintId)

    const [dataWithScheduleIds, dataNoScheduleIds] = await Promise.all([
      client.activeMintSchedules({
        editionAddress: precomputedEditionAddress,
        scheduleIds,
      }),
      client.activeMintSchedules({
        editionAddress: precomputedEditionAddress,
      }),
    ])

    expect(dataNoScheduleIds.length).to.equal(1)
    expect(dataWithScheduleIds.length).to.equal(1)

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

    const mintSchedules = await client.mintSchedules({ editionAddress: precomputedEditionAddress })

    await setAutoMine(false)

    // Mint full quantity
    client.mint({ mintSchedule: mintSchedules[0], quantity: EDITION_MAX })

    // Attempt to mint again
    const tx = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

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

      const mintSchedules = await client.mintSchedules({ editionAddress: precomputedEditionAddress })

      await setAutoMine(false)

      // Mint full quantity
      client.mint({ mintSchedule: mintSchedules[0], quantity: MAX_QUANTITY })

      // Attempt to mint again
      const tx = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

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

      const mintSchedules = await client.mintSchedules({ editionAddress: precomputedEditionAddress })

      await setAutoMine(false)

      client.mint({ mintSchedule: mintSchedules[0], quantity: MAX_MINTABLE_PER_ACCOUNT })

      // Attempt to mint again
      const tx = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

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

      const mintSchedules = await client.mintSchedules({ editionAddress: precomputedEditionAddress })

      await setAutoMine(false)

      // Mint full quantity
      client.mint({ mintSchedule: mintSchedules[0], quantity: MAX_QUANTITY })

      // Attempt to mint again
      const tx = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

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

      const mintSchedules = await client.mintSchedules({ editionAddress: precomputedEditionAddress })

      await setAutoMine(false)

      client.mint({ mintSchedule: mintSchedules[0], quantity: MAX_MINTABLE_PER_ACCOUNT })

      // Attempt to mint again
      const tx = await client.mint({ mintSchedule: mintSchedules[0], quantity: 1 })

      await mineBlock()

      const customError = await client.getContractError(tx.hash)

      expect(customError).to.equal(ContractErrorName.ExceedsMaxPerAccount)
    })
  })
})

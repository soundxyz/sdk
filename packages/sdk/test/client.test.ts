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
  MissingMerkleProvider,
  MissingSignerOrProviderError,
  MissingSoundAPI,
  NotEligibleMint,
  SoundNotFoundError,
} from '../src/errors'
import { MINTER_ROLE } from '../src/utils/constants'
import { getSaltAsBytes32 } from '../src/utils/helpers'
import { MerkleTestHelper, now } from './helpers'

import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import type MerkleTree from 'merkletreejs'

import type { ContractCall, EditionConfig, MintConfig, MintSchedule } from '../src/types'
import { MockAPI } from './helpers/api'
import { randomUUID } from 'crypto'

const UINT32_MAX = 4294967295
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const SOUND_FEE = 0
const ONE_HOUR = 3600
const PRICE = 420420420
const DEFAULT_SALT = getSaltAsBytes32(Math.random())

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
    100, // maxMintableLower
    100, // maxMintableUpper
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
    const err1 = await client.isSoundEdition({ editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid address: "0x123"')

      return error
    })

    const err2 = await client.isSoundEdition({ editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid address: "0x123"')

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

    expect(editionInfo.editionMaxMintable).to.equal(100)
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

    expect(editionInfo.editionMaxMintable).to.equal(100)
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

    it(`Should throw error if invalid quantity requested`, async () => {
      const quantity = 0
      await client.mint({ mintSchedule: mintSchedules[0], quantity }).catch((error) => {
        expect(error.message).to.equal('Must provide valid quantity')
      })
    })

    it(`Should throw error if more than eligibleQuantity requested`, async () => {
      const quantity = 5
      const eligibleQuantity = await client.eligibleQuantity({
        mintSchedule: mintSchedules[0],
        userAddress: buyerWallet.address,
      })
      await client.mint({ mintSchedule: mintSchedules[0], quantity }).catch((error) => {
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
      // Test client throws expected error
      await client
        .mint({
          mintSchedule: mintSchedules[0],
          quantity: 1,
        })
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
  const getGenericConfig = () => ({
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
  })

  const startTime = now()
  const cutoffTime = startTime + ONE_HOUR / 2
  const endTime = cutoffTime + ONE_HOUR

  let genericMintConfigs: MintConfig[]

  beforeEach(() => {
    client = SoundClient({ signer: artistWallet, soundCreatorAddress: soundCreator.address })
    genericMintConfigs = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime,
        cutoffTime,
        endTime,
        maxMintableLower: 3,
        maxMintableUpper: 4,
        maxMintablePerAccount: 1,
        affiliateFeeBPS: 0,
      },
    ]
  })

  it('Creates a sound edition and mint schedules', async () => {
    const editionConfig = getGenericConfig()

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
    const editionConfig = getGenericConfig()
    editionConfig.fundingRecipient = '0x0000000000000000000000000000000000000000'

    await client
      .createEdition({
        editionConfig,
        mintConfigs: genericMintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('fundingRecipient must be a valid address')
      })
  })

  it('throws if editionMaxMintableLower > editionMaxMintableUpper', async () => {
    const editionConfig = getGenericConfig()
    editionConfig.editionMaxMintableLower = 2
    editionConfig.editionMaxMintableUpper = 1

    await client
      .createEdition({
        editionConfig,
        mintConfigs: genericMintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('editionMaxMintableLower cannot be greater than editionMaxMintableUpper')
      })
  })

  it('throws if maxMintablePerAccount is zero', async () => {
    const editionConfig = getGenericConfig()

    const startTime = now()
    const cutoffTime = startTime + ONE_HOUR / 2
    const endTime = cutoffTime + ONE_HOUR

    const mintConfigs = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime,
        cutoffTime,
        endTime,
        maxMintableLower: 1,
        maxMintableUpper: 2,
        maxMintablePerAccount: 0,
        affiliateFeeBPS: 0,
      },
    ]

    await client
      .createEdition({
        editionConfig,
        mintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        console.log(error.message)
        expect(error.message).to.equal('maxMintablePerAccount must be greater than 0')
      })
  })

  it('throws if range mint maxMintableLower exceeds maxMintableUpper', async () => {
    const editionConfig = getGenericConfig()

    const startTime = now()
    const cutoffTime = startTime + ONE_HOUR / 2
    const endTime = cutoffTime + ONE_HOUR

    const mintConfigs = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime,
        cutoffTime,
        endTime,
        maxMintableLower: 5,
        maxMintableUpper: 4,
        maxMintablePerAccount: 1,
        affiliateFeeBPS: 0,
      },
    ]

    client
      .createEdition({
        editionConfig,
        mintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('maxMintableLower cannot be greater than maxMintableUpper')
      })
  })

  it('throws if range mint startTime == cutoffTime', async () => {
    const editionConfig = getGenericConfig()

    const startTime = now()
    const cutoffTime = startTime
    const endTime = cutoffTime + ONE_HOUR

    const mintConfigs = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime,
        cutoffTime,
        endTime,
        maxMintableLower: 5,
        maxMintableUpper: 4,
        maxMintablePerAccount: 1,
        affiliateFeeBPS: 0,
      },
    ]

    client
      .createEdition({
        editionConfig,
        mintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal(
          'startTime must be earlier than cutoffTime and cutoffTime must be earlier than endTime',
        )
      })
  })

  it('throws if range mint cutoffTime === endTime', async () => {
    const editionConfig = getGenericConfig()

    const startTime = now()
    const cutoffTime = startTime + 1
    const endTime = cutoffTime

    const mintConfigs = [
      {
        mintType: 'RangeEdition' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime,
        cutoffTime,
        endTime,
        maxMintableLower: 5,
        maxMintableUpper: 4,
        maxMintablePerAccount: 1,
        affiliateFeeBPS: 0,
      },
    ]

    client
      .createEdition({
        editionConfig,
        mintConfigs,
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal(
          'startTime must be earlier than cutoffTime and cutoffTime must be earlier than endTime',
        )
      })
  })

  it('throws if merkle mint merkleRoot is invalid', async () => {
    const editionConfig = getGenericConfig()

    const startTime = now()
    const endTime = startTime + 1

    const mintConfig = {
      mintType: 'MerkleDrop' as const,
      minterAddress: merkleDropMinter.address,
      price: PRICE,
      merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
      startTime,
      endTime,
      maxMintable: 9,
      maxMintablePerAccount: 1,
      affiliateFeeBPS: 0,
    }

    client
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('merkleRoot must be a valid bytes32 hash')
      })

    mintConfig.merkleRoot = '1x0000000000000000000000000000000000000000000000000000000000000000'

    client
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('merkleRoot must be a valid bytes32 hash')
      })

    mintConfig.merkleRoot = ''

    client
      .createEdition({
        editionConfig,
        mintConfigs: [mintConfig],
        salt: SALT,
      })
      .catch((error) => {
        expect(error.message).to.equal('merkleRoot must be a valid bytes32 hash')
      })
  })
})

describe('expectedEditionAddress', () => {
  it('throws if provided deployerAddress is invalid', () => {
    client.expectedEditionAddress({ deployer: '0x0', salt: '123' }).catch((error) => {
      expect(error).instanceOf(InvalidAddressError)
    })
  })

  it('throws if provider not connected', () => {
    client = SoundClient({ provider: new ethers.providers.JsonRpcProvider() })

    client
      .expectedEditionAddress({ deployer: '0xbf9a1fad0cbd61cc8158ccb6e1e8e111707088bb', salt: '123' })
      .catch((error) => {
        expect(error).instanceOf(MissingSignerOrProviderError)
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

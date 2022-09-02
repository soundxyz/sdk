import { BigNumber } from '@ethersproject/bignumber'
import { Wallet } from '@ethersproject/wallet'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import type { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import {
  FixedPriceSignatureMinter,
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter,
  MerkleDropMinter__factory,
  RangeEditionMinter,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1,
  SoundEditionV1__factory,
  SoundFeeRegistry__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import type MerkleTree from 'merkletreejs'

import { SoundClient } from '../src/client'
import type { MintInfo } from '../src/types'
import { interfaceIds, MINTER_ROLE } from '../src/utils/constants'
import { createRangeMint, now, MerkleHelper } from './helpers'

/*******************
        SETUP
 ******************/

const UINT32_MAX = 4294967295
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const SOUND_FEE = 0
const ONE_HOUR = 3600
const PRICE = 420420420

async function deployProtocol() {
  const [signer1] = await ethers.getSigners()

  const SoundFeeRegistry = new SoundFeeRegistry__factory()
  const feeRegistry = await SoundFeeRegistry.connect(signer1).deploy(NON_NULL_ADDRESS, SOUND_FEE)

  // Deploy edition implmementation
  const SoundEditionV1 = new SoundEditionV1__factory()
  const soundEditionImp = await SoundEditionV1.connect(signer1).deploy()

  // Deploy & initialize creator
  const SoundCreatorV1 = new SoundCreatorV1__factory()
  const soundCreator = await SoundCreatorV1.connect(signer1).deploy()
  await soundCreator.initialize(soundEditionImp.address)

  // Deploy minters
  const FixedPriceSignatureMinter = new FixedPriceSignatureMinter__factory()
  const fixedPriceSignatureMinter = await FixedPriceSignatureMinter.connect(signer1).deploy(feeRegistry.address)
  const MerkleDropMinter = new MerkleDropMinter__factory()
  const merkleDropMinter = await MerkleDropMinter.connect(signer1).deploy(feeRegistry.address)
  const RangeEditionMinter = new RangeEditionMinter__factory()
  const rangeEditionMinter = await RangeEditionMinter.connect(signer1).deploy(feeRegistry.address)

  const abiCoder = ethers.utils.defaultAbiCoder

  // Create salt used for precalculating edition addresses
  const randomInt = Math.floor(Math.random() * 1000000)
  const salt = ethers.utils.hexZeroPad(ethers.utils.hexlify(randomInt), 32)

  const initArgs = [
    'Song Name',
    'SYMBOL',
    NULL_ADDRESS,
    'https://baseURI.com',
    'https://contractURI.com',
    NON_NULL_ADDRESS,
    0, //royaltyBPS,
    UINT32_MAX, // editionMaxMintable
    100, // mintRandomnessTokenThreshold
    100, // mintRandomnessTimeThreshold
  ]
  const editionInterface = new ethers.utils.Interface(SoundEditionV1__factory.abi)
  const editionInitData = editionInterface.encodeFunctionData('initialize', initArgs)
  const editionAddress = await soundCreator.soundEditionAddress(salt)

  const contractCalls = [
    {
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('grantRoles', [fixedPriceSignatureMinter.address, MINTER_ROLE]),
    },
    {
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('grantRoles', [merkleDropMinter.address, MINTER_ROLE]),
    },
    {
      contractAddress: editionAddress,
      calldata: editionInterface.encodeFunctionData('grantRoles', [rangeEditionMinter.address, MINTER_ROLE]),
    },
  ]

  await soundCreator.createSoundAndMints(
    salt,
    editionInitData,
    contractCalls.map((d) => d.contractAddress),
    contractCalls.map((d) => d.calldata),
  )

  // Get edition address
  const filter = soundCreator.filters.SoundEditionCreated(undefined, signer1.address)
  const roleEvents = await soundCreator.queryFilter(filter)

  if (!roleEvents[0].args.soundEdition) {
    throw new Error('No sound edition created')
  }

  return { editionAddress, fixedPriceSignatureMinter, merkleDropMinter, rangeEditionMinter }
}

/*******************
        TESTS
 ******************/

let client: SoundClient
let editionAddress: string
let fixedPriceSignatureMinter: FixedPriceSignatureMinter
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
let signers: SignerWithAddress[]
let artistWallet: SignerWithAddress
let buyer: SignerWithAddress

beforeEach(async () => {
  signers = await ethers.getSigners()
  artistWallet = signers[0]
  buyer = signers[1]

  client = SoundClient({ provider: ethers.provider, apiKey: '123' })
  const fixture = await loadFixture(deployProtocol)

  editionAddress = fixture.editionAddress
  fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter

  console.log({ editionAddress })
})

describe('isSoundEdition', () => {
  it("Should throw error if the address isn't valid", async () => {
    await client.isSoundEdition({ editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid address: 0x123')
    })
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    // for (let i = 0; i < 10; i++) {
    //   const wallet = Wallet.createRandom()
    //   const isEdition = await client.isSoundEdition({ editionAddress: wallet.address })
    //   expect(isEdition).to.be.false
    // }

    const isEdition = await client.isSoundEdition({ editionAddress })
    expect(isEdition).to.be.true
  })
})

describe('getEligibleMintQuantity: single RangeEditionMinter instance', () => {
  it(`Eligible quantity is user specific and changes with mint`, async () => {
    const startTime = now()

    const { mintId } = await createRangeMint({
      startTime,
      closingTime: startTime + ONE_HOUR,
      endTime: startTime + ONE_HOUR * 2,
      affiliateFeeBPS: 0,
      maxMintablePerAccount: 2,
      maxMintableLower: 4,
      maxMintableUpper: 5,
      signer: artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    // shows single active mint
    const mints = await client.activeMintsForEdition({ editionAddress })

    console.log({ mints })
    expect(mints.length).to.equal(1)

    // eligible for 2
    const eligibleQuantity = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
    })
    expect(eligibleQuantity).to.equal(2)

    // Test balances decreases after minting
    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyer)
    await minter.mint(editionAddress, mintId, 1, NULL_ADDRESS, {
      value: BigNumber.from(PRICE),
    })

    // only eligible for 1 now
    const newEligibleQuantity = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
    })
    expect(newEligibleQuantity).to.equal(1)

    // another user is still eligible for 2
    const eligibleQuantityForOther = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: artistWallet.address,
    })
    expect(eligibleQuantityForOther).to.equal(2)
  })

  it(`Eligible quantity is zero outside of minting time`, async () => {
    const startTime = now()
    const closingTime = startTime + ONE_HOUR
    const endTime = closingTime + ONE_HOUR

    await createRangeMint({
      startTime,
      closingTime,
      endTime,
      affiliateFeeBPS: 0,
      maxMintablePerAccount: 100,
      maxMintableLower: 100,
      maxMintableUpper: 101,
      signer: artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    const mints = await client.activeMintsForEdition({ editionAddress })
    expect(mints.length).to.equal(1)

    const eligibleQuantityBeforeStart = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
      timestamp: startTime - 1,
    })
    expect(eligibleQuantityBeforeStart).to.equal(0)

    const eligibleQuantityAtStart = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
      timestamp: startTime,
    })
    expect(eligibleQuantityAtStart).to.equal(100)

    const eligibleQuantityAtEnd = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
      timestamp: endTime + 1,
    })
    expect(eligibleQuantityAtEnd).to.equal(0)
  })

  it(`Eligible quantity becomes zero for every user if range edition mint instance is sold out before closingTime`, async () => {
    const maxMintableUpper = 8
    const startTime = now()

    const { mintId } = await createRangeMint({
      startTime,
      closingTime: startTime + ONE_HOUR,
      endTime: startTime + ONE_HOUR * 2,
      affiliateFeeBPS: 0,
      maxMintablePerAccount: 1,
      maxMintableLower: 4,
      maxMintableUpper,
      signer: artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    for (let i = 0; i < maxMintableUpper; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(editionAddress, mintId, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
    }

    // Check that all users have zero eligible balance
    for (let i = 0; i < 10; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const mints = await client.activeMintsForEdition({ editionAddress })
      expect(mints.length).to.equal(1)

      const eligibleQuantity = await client.eligibleMintQuantity({
        mintInfo: mints[0],
        userAddress: randomSigner.address,
      })
      expect(eligibleQuantity).to.equal(0)
    }
  })

  it(`Eligible balance switches to zero after closing time if maxMintableLower has been surpassed`, async () => {
    const maxMintableLower = 5
    const maxMintablePerAccount = 1
    const signers = await ethers.getSigners()
    const startTime = now()
    const closingTime = startTime + ONE_HOUR

    const { mintId } = await createRangeMint({
      startTime,
      closingTime,
      endTime: startTime + ONE_HOUR * 2,
      affiliateFeeBPS: 0,
      maxMintablePerAccount,
      maxMintableLower,
      maxMintableUpper: 10,
      signer: signers[0],
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    // Mint lower range limit
    for (let i = 0; i < maxMintableLower; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(editionAddress, mintId, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
    }

    const mints = await client.activeMintsForEdition({ editionAddress })
    expect(mints.length).to.equal(1)

    // Check that random users still have an eligible quantity at current time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.eligibleMintQuantity({
        mintInfo: mints[0],
        userAddress: randomSigner.address,
        timestamp: now(),
      })
      expect(eligibleQuantity).to.equal(maxMintablePerAccount)
    }

    // Check that random users have no eligible quantity at closing time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.eligibleMintQuantity({
        mintInfo: mints[0],
        userAddress: randomSigner.address,
        timestamp: closingTime,
      })
      expect(eligibleQuantity).to.equal(0)
    }
  })

  it(`Eligible quantity changes if querying between multiple mints with different start times and max mintable quantities.`, async () => {
    const mint1StartTime = now()
    const mint1EndTime = mint1StartTime + ONE_HOUR
    const mint2StartTime = mint1EndTime

    const mint1MaxMintablePerAccount = 1
    const mint2MaxMintablePerAccount = 42

    await createRangeMint({
      startTime: mint1StartTime,
      closingTime: mint1EndTime - 1,
      endTime: mint1EndTime,
      affiliateFeeBPS: 0,
      maxMintablePerAccount: mint1MaxMintablePerAccount,
      maxMintableLower: 99,
      maxMintableUpper: 100,
      signer: artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    await createRangeMint({
      startTime: mint2StartTime,
      closingTime: mint2StartTime + ONE_HOUR,
      endTime: mint2StartTime + ONE_HOUR + 1,
      affiliateFeeBPS: 0,
      maxMintablePerAccount: mint2MaxMintablePerAccount,
      maxMintableLower: 99,
      maxMintableUpper: 100,
      signer: artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress,
    })

    // 1 active mint
    const activeMints = await client.activeMintsForEdition({ editionAddress })
    expect(activeMints.length).to.equal(1)
    // 2 total mints (1 in the future)
    const allMints = await client.allMintsForEdition({ editionAddress })
    expect(allMints.length).to.equal(2)

    const eligibleQuantity1 = await client.eligibleMintQuantity({
      mintInfo: allMints[0],
      userAddress: buyer.address,
    })

    const eligibleQuantity2 = await client.eligibleMintQuantity({
      mintInfo: allMints[1],
      userAddress: buyer.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)
  })
})

describe('mint', () => {
  describe('RangeEditionMinter', () => {
    let mintInfos: MintInfo[] = []
    beforeEach(async () => {
      const startTime = now()
      await createRangeMint({
        startTime,
        closingTime: startTime + ONE_HOUR,
        endTime: startTime + ONE_HOUR * 2,
        affiliateFeeBPS: 0,
        maxMintablePerAccount: 2,
        maxMintableLower: 4,
        maxMintableUpper: 5,
        signer: artistWallet,
        minterAddress: rangeEditionMinter.address,
        editionAddress,
      })

      // provide signer to the sdk
      client = SoundClient({ provider: ethers.provider, signer: buyer, apiKey: '123' })
      mintInfos = await client.activeMintsForEdition({ editionAddress })
      expect(mintInfos[0].interfaceId).to.eq(interfaceIds.IRangeEditionMinter)
    })

    it(`Successfully mints via RangeEditionMinter`, async () => {
      const quantity = 2
      const initialBalance = await SoundEditionV1__factory.connect(editionAddress, ethers.provider).balanceOf(
        buyer.address,
      )

      await client.mint({ mintInfo: mintInfos[0], quantity })

      const finalBalance = await SoundEditionV1__factory.connect(editionAddress, ethers.provider).balanceOf(
        buyer.address,
      )
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it(`Should throw error if invalid quantity requested`, async () => {
      const quantity = 0
      await client.mint({ mintInfo: mintInfos[0], quantity }).catch((error) => {
        expect(error.message).to.equal('Must provide valid quantity')
      })
    })

    it(`Should throw error if more than EligibleMintQuantity requested`, async () => {
      const quantity = 5
      const eligibleMintQuantity = await client.eligibleMintQuantity({
        mintInfo: mintInfos[0],
        userAddress: buyer.address,
      })
      await client.mint({ mintInfo: mintInfos[0], quantity }).catch((error) => {
        expect(error.message).to.equal(`Not eligible to mint ${quantity}. Eligible quantity: ${eligibleMintQuantity}`)
      })
    })
  })

  describe('MerkleDropMinter', () => {
    const merkleHelper = MerkleHelper()
    let merkleTree: MerkleTree
    let mintInfos: MintInfo[] = []

    beforeEach(async () => {
      merkleTree = merkleHelper.getMerkleTree()
      const merkleRoot = merkleHelper.getMerkleRoot(merkleTree)

      const minter = MerkleDropMinter__factory.connect(merkleDropMinter.address, artistWallet)
      const startTime = now()
      await minter.createEditionMint(editionAddress, merkleRoot, PRICE, startTime, startTime + ONE_HOUR, 0, 5, 1)
      // provide signer to the sdk
      client = SoundClient({ provider: ethers.provider, signer: buyer, apiKey: '123' })
      mintInfos = await client.activeMintsForEdition({ editionAddress })
      expect(mintInfos[0].interfaceId).to.eq(interfaceIds.IMerkleDropMinter)
    })

    it(`Successfully mints via MerkleDropMinter`, async () => {
      const quantity = 1
      const initialBalance = await SoundEditionV1__factory.connect(editionAddress, ethers.provider).balanceOf(
        buyer.address,
      )

      await client.mint({
        mintInfo: mintInfos[0],
        quantity,
        getMerkleProof: async (root, unhashedLeaf) => merkleHelper.getProof({ merkleTree, address: unhashedLeaf }),
      })

      const finalBalance = await SoundEditionV1__factory.connect(editionAddress, ethers.provider).balanceOf(
        buyer.address,
      )
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it('Should throw error if merkle proof is null', async () => {
      await client
        .mint({
          mintInfo: mintInfos[0],
          quantity: 1,
          getMerkleProof: async (root, unhashedLeaf) => null,
        })
        .catch((error) => {
          expect(error.message).to.equal('Unable to fetch merkle proof')
        })
    })
  })
})

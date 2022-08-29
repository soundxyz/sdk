import { expect } from 'chai'
import { createClient, connectClient, SoundClient, isSoundEdition, getEligibleMintQuantity } from '../src/index'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber } from '@ethersproject/bignumber'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { sha256 } from '@ethersproject/sha2'
import {
  FixedPriceSignatureMinter__factory,
  MerkleDropMinter__factory,
  RangeEditionMinter__factory,
  SoundCreatorV1__factory,
  SoundEditionV1__factory,
  SoundEditionV1,
  FixedPriceSignatureMinter,
  MerkleDropMinter,
  RangeEditionMinter,
  SoundFeeRegistry__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import hre from 'hardhat'
import { UINT32_MAX } from '../src/config'
import { Signer } from '@ethersproject/abstract-signer'
import { MerkleTree } from 'merkletreejs'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const ONE_HOUR = 3600
const PRICE = 420420420
const SOUND_FEE = 0
const NUM_OF_MERKLE_RECIPIENTS = 5

/*******************
        SETUP
 ******************/

async function deployProtocol() {
  const [signer1] = await hre.ethers.getSigners()

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

  // Deploy edition proxy
  await soundCreator.createSound(
    'SDK Test',
    'SDK',
    NULL_ADDRESS, // golden egg module
    'baseURI',
    'contractURI',
    NON_NULL_ADDRESS, // fundingRecipient
    0, // royaltyBPS
    UINT32_MAX, // editionMaxMintable
    100, // mintRandomnessTokenThreshold
    100, // mintRandomnessTimeThreshold
  )

  // Get edition address
  const filter = soundCreator.filters.SoundEditionCreated(undefined, signer1.address)
  const roleEvents = await soundCreator.queryFilter(filter)

  if (!roleEvents[0].args.soundEdition) {
    throw new Error('No sound edition created')
  }
  const soundEdition = SoundEditionV1__factory.connect(roleEvents[0].args.soundEdition, signer1)

  // Grant minter roles
  const minterRole = await soundEdition.MINTER_ROLE()
  await soundEdition.grantRoles(fixedPriceSignatureMinter.address, minterRole.toNumber())
  await soundEdition.grantRoles(merkleDropMinter.address, minterRole.toNumber())
  await soundEdition.grantRoles(rangeEditionMinter.address, minterRole.toNumber())

  return { soundEdition, fixedPriceSignatureMinter, merkleDropMinter, rangeEditionMinter }
}

/*******************
        TESTS
 ******************/

describe('createClient', () => {
  it('Should create SoundClient', async () => {
    const client = createClient(hre.ethers.provider)

    expect(client.signer).to.be.null
    expect(client.provider).to.not.be.undefined
    expect(client.connect).to.not.be.undefined
  })
})

describe('connectClient', () => {
  it('Should throw error if the signer is not connected to a provider', async () => {
    const [signer] = await hre.ethers.getSigners()
    const client = createClient(signer)

    connectClient(client).catch((error) => {
      expect(error.message).to.equal(
        'Signer must be connected to a provider: https://docs.ethers.io/v5/api/signer/#Signer-connect',
      )
    })
  })
})

let client: SoundClient
let soundEdition: SoundEditionV1
let fixedPriceSignatureMinter: FixedPriceSignatureMinter
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
let signers: SignerWithAddress[]
let firstSigner: SignerWithAddress

beforeEach(async () => {
  signers = await hre.ethers.getSigners()
  firstSigner = signers[0]

  client = createClient(hre.ethers.provider)
  const fixture = await loadFixture(deployProtocol)

  soundEdition = fixture.soundEdition
  fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter
})

describe('isSoundEdition', () => {
  it("Should throw error if the address isn't valid", async () => {
    isSoundEdition(client, { editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid edition address')
    })
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const isEdition = await isSoundEdition(client, { editionAddress: wallet.address })
      expect(isEdition).to.be.false
    }

    const isEdition = await isSoundEdition(client, { editionAddress: soundEdition.address })
    expect(isEdition).to.be.true
  })
})

describe('getEligibleMintQuantity: single RangeEditionMinter instance', () => {
  it(`Eligible quantity is correct`, async () => {
    const startTime = now()

    const { mintId } = await createRangeMint({
      startTime,
      closingTime: startTime + ONE_HOUR,
      endTime: startTime + ONE_HOUR * 2,
      maxMintablePerAccount: 2,
      maxMintableLower: 4,
      maxMintableUpper: 5,
      signer: firstSigner,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: firstSigner.address,
    })

    expect(eligibleQuantity).to.equal(2)

    // Test balances decreases after minting
    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, firstSigner)
    await minter.mint(soundEdition.address, mintId, 1, NULL_ADDRESS, {
      value: BigNumber.from(PRICE),
    })

    const newEligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: firstSigner.address,
    })

    expect(newEligibleQuantity).to.equal(1)
  })

  it(`Eligible quantity is zero after mint end time`, async () => {
    const startTime = now()
    const closingTime = startTime + ONE_HOUR
    const endTime = closingTime + ONE_HOUR

    await createRangeMint({
      startTime,
      closingTime,
      endTime,
      maxMintablePerAccount: 100,
      maxMintableLower: 100,
      maxMintableUpper: 101,
      signer: firstSigner,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: firstSigner.address,
      timestamp: endTime,
    })

    expect(eligibleQuantity).to.equal(0)
  })

  it(`Eligible quantity becomes zero for every user if range edition mint instance is sold out before closingTime`, async () => {
    const maxMintableUpper = 8
    const startTime = now()

    const { mintId } = await createRangeMint({
      startTime,
      closingTime: startTime + ONE_HOUR,
      endTime: startTime + ONE_HOUR * 2,
      maxMintablePerAccount: 1,
      maxMintableLower: 4,
      maxMintableUpper,
      signer: firstSigner,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    for (let i = 0; i < maxMintableUpper; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(soundEdition.address, mintId, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
    }

    // Check that all users have zero eligible balance
    for (let i = 0; i < 10; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(hre.ethers.provider)
      const eligibleQuantity = await getEligibleMintQuantity(client, {
        editionAddress: soundEdition.address,
        userAddress: randomSigner.address,
      })
      expect(eligibleQuantity).to.equal(0)
    }
  })

  it(`Eligible balance switches to zero after closing time if maxMintableLower has been surpassed`, async () => {
    const maxMintableLower = 5
    const maxMintablePerAccount = 1
    const signers = await hre.ethers.getSigners()
    const startTime = now()
    const closingTime = startTime + ONE_HOUR

    const { mintId } = await createRangeMint({
      startTime,
      closingTime,
      endTime: startTime + ONE_HOUR * 2,
      maxMintablePerAccount,
      maxMintableLower,
      maxMintableUpper: 10,
      signer: signers[0],
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    // Mint lower range limit
    for (let i = 0; i < maxMintableLower; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(soundEdition.address, mintId, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
    }

    // Check that random users still have an eligible quantity at current time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(hre.ethers.provider)
      const eligibleQuantity = await getEligibleMintQuantity(client, {
        editionAddress: soundEdition.address,
        userAddress: randomSigner.address,
        timestamp: now(),
      })
      expect(eligibleQuantity).to.equal(maxMintablePerAccount)
    }

    // Check that random users have no eligible quantity at closing time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(hre.ethers.provider)
      const eligibleQuantity = await getEligibleMintQuantity(client, {
        editionAddress: soundEdition.address,
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
      maxMintablePerAccount: mint1MaxMintablePerAccount,
      maxMintableLower: 99,
      maxMintableUpper: 100,
      signer: firstSigner,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    await createRangeMint({
      startTime: mint2StartTime,
      closingTime: mint2StartTime + ONE_HOUR,
      endTime: mint2StartTime + ONE_HOUR + 1,
      maxMintablePerAccount: mint2MaxMintablePerAccount,
      maxMintableLower: 99,
      maxMintableUpper: 100,
      signer: firstSigner,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity1 = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: firstSigner.address,
    })

    const eligibleQuantity2 = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: firstSigner.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)
  })
})

/*******************
    TEST HELPERS
 ******************/

function now() {
  return Math.floor(Date.now() / 1000)
}

async function createRangeMint({
  signer,
  minterAddress,
  editionAddress,
  startTime,
  closingTime,
  endTime,
  maxMintableLower,
  maxMintableUpper,
  maxMintablePerAccount,
}: {
  signer: Signer
  minterAddress: string
  editionAddress: string
  startTime: number
  closingTime: number
  endTime: number
  maxMintableLower: number
  maxMintableUpper: number
  maxMintablePerAccount: number
}) {
  const minter = RangeEditionMinter__factory.connect(minterAddress, signer)
  await minter.createEditionMint(
    editionAddress,
    BigNumber.from(PRICE),
    startTime,
    closingTime,
    endTime,
    maxMintableLower,
    maxMintableUpper,
    maxMintablePerAccount,
  )

  // get all mint ids for this edition & return the latest
  const filter = minter.filters.MintConfigCreated(editionAddress)
  const roleEvents = await minter.queryFilter(filter)
  const mintId = roleEvents[roleEvents.length - 1].args.mintId
  if (!roleEvents[roleEvents.length - 1].args.mintId) {
    throw new Error('No mintId found')
  }
  return { mintId }
}

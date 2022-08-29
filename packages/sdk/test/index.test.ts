import { expect } from 'chai'
import { createClient, connectClient, SoundClient, isSoundEdition, getEligibleMintQuantity } from '../src/index'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber } from '@ethersproject/bignumber'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
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
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { dummyMerkleDrop } from './dummyData'
import {
  NULL_ADDRESS,
  NON_NULL_ADDRESS,
  ONE_HOUR,
  PRICE,
  SOUND_FEE,
  now,
  createMerkleMint,
  createRangeMint,
} from './helpers'

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
let artistWallet: SignerWithAddress
let buyer: SignerWithAddress

beforeEach(async () => {
  signers = await hre.ethers.getSigners()
  artistWallet = signers[0]
  buyer = signers[1]

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

describe('getEligibleMintQuantity: RangeEditionMinter', () => {
  it(`Eligible quantity is correct`, async () => {
    const startTime = now()

    const { mintId } = await createRangeMint({
      startTime,
      closingTime: startTime + ONE_HOUR,
      endTime: startTime + ONE_HOUR * 2,
      maxMintablePerAccount: 2,
      maxMintableLower: 4,
      maxMintableUpper: 5,
      artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: buyer.address,
    })

    expect(eligibleQuantity).to.equal(2)

    // Test balances decreases after minting
    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyer)
    await minter.mint(soundEdition.address, mintId, 1, NULL_ADDRESS, {
      value: BigNumber.from(PRICE),
    })

    const newEligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: buyer.address,
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
      artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: buyer.address,
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
      artistWallet,
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
    const startTime = now()
    const closingTime = startTime + ONE_HOUR

    const { mintId } = await createRangeMint({
      startTime,
      closingTime,
      endTime: startTime + ONE_HOUR * 2,
      maxMintablePerAccount,
      maxMintableLower,
      maxMintableUpper: 10,
      artistWallet,
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
      artistWallet,
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
      artistWallet,
      minterAddress: rangeEditionMinter.address,
      editionAddress: soundEdition.address,
    })

    const eligibleQuantity1 = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: buyer.address,
    })

    const eligibleQuantity2 = await getEligibleMintQuantity(client, {
      editionAddress: soundEdition.address,
      userAddress: buyer.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)
  })

  it(`Returns correct quantity from merkle minter.`, async () => {
    const signers = await hre.ethers.getSigners()
    const startTime = now()
    const endTime = now() + ONE_HOUR + ONE_HOUR
    const maxMintablePerAccount = 3
    const maxMintable = 10

    await createMerkleMint({
      startTime,
      endTime,
      maxMintable,
      maxMintablePerAccount,
      signer: signers[0],
      minterAddress: merkleDropMinter.address,
      editionAddress: soundEdition.address,
    })

    // for (let i = 0; i < signers.length; i++) {
    //   const eligibleQuantity = await getEligibleMintQuantity(client, {
    //     editionAddress: soundEdition.address,
    //     userAddress: signers[i].address,
    //     timestamp: startTime,
    //   })
    //   await expect(eligibleQuantity).to.equal(2)
    // }

    // for (let i = 0; i < signers.length; i++) {
    //   const eligibleQuantity = await getEligibleMintQuantity(client, {
    //     editionAddress: soundEdition.address,
    //     userAddress: signers[i].address,
    //     timestamp: endTime,
    //   })
    //   await expect(eligibleQuantity).to.equal(0)
    // }
  })
})

describe('getEligibleMintQuantity: MerkleDropMinter', () => {
  it(`Returns eligible quantity for merkle drop recipients.`, async () => {
    const signers = await hre.ethers.getSigners()
    const startTime = now()
    const endTime = now() + ONE_HOUR
    const maxMintablePerAccount = 2
    const maxMintable = 10

    await createMerkleMint({
      editionAddress: soundEdition.address,
      merkleRootHash: dummyMerkleDrop.root,
      startTime,
      endTime,
      maxMintable,
      maxMintablePerAccount,
      artistWallet,
      minterAddress: merkleDropMinter.address,
    })

    for (let i = 0; i < 20; i++) {
      const expectedQuantity = i < dummyMerkleDrop.recipients.length ? maxMintablePerAccount : 0
      const eligibleQuantity = await getEligibleMintQuantity(client, {
        editionAddress: soundEdition.address,
        userAddress: signers[i].address,
        timestamp: startTime,
      })
      await expect(eligibleQuantity).to.equal(expectedQuantity)
    }

<<<<<<< HEAD
    // No eligibility for anyone after end time
    for (let i = 0; i < 20; i++) {
      const eligibleQuantity = await getEligibleMintQuantity(client, {
        editionAddress: soundEdition.address,
        userAddress: signers[i].address,
        timestamp: endTime,
      })
      await expect(eligibleQuantity).to.equal(0)
    }
  })
})

describe('getEligibleMintQuantity: multiple MerkleDropMinter & RangeEditionMinter instances', async () => {
  const buyer = signers[1]
  const maxMintable = 100

  const mint1StartTime = now()
  const mint2StartTime = mint1StartTime + ONE_HOUR
  const mint3StartTime = mint2StartTime + ONE_HOUR
  const mint4StartTime = mint3StartTime + ONE_HOUR

  const mint1MaxMintablePerAccount = 1
  const mint2MaxMintablePerAccount = 2
  const mint3MaxMintablePerAccount = 3
  const mint4MaxMintablePerAccount = 4

  await createMerkleMint({
    editionAddress: soundEdition.address,
    merkleRootHash: dummyMerkleDrop.root,
    startTime: mint1StartTime,
    endTime: mint2StartTime,
    maxMintable,
    maxMintablePerAccount: mint1MaxMintablePerAccount,
    artistWallet,
    minterAddress: merkleDropMinter.address,
  })

  await createMerkleMint({
    editionAddress: soundEdition.address,
    merkleRootHash: dummyMerkleDrop.root,
    startTime: mint2StartTime,
    endTime: mint3StartTime,
    maxMintable,
    maxMintablePerAccount: mint2MaxMintablePerAccount,
    artistWallet,
    minterAddress: merkleDropMinter.address,
  })

  await createRangeMint({
    editionAddress: soundEdition.address,
    startTime: mint3StartTime,
    closingTime: mint3StartTime + 1,
    endTime: mint4StartTime,
    maxMintableLower: maxMintable - 1,
    maxMintableUpper: maxMintable,
    maxMintablePerAccount: mint3MaxMintablePerAccount,
    artistWallet,
    minterAddress: merkleDropMinter.address,
  })

  await createRangeMint({
    editionAddress: soundEdition.address,
    startTime: mint4StartTime,
    closingTime: mint4StartTime + 1,
    endTime: mint4StartTime + ONE_HOUR,
    maxMintableLower: maxMintable - 1,
    maxMintableUpper: maxMintable,
    maxMintablePerAccount: mint4MaxMintablePerAccount,
    artistWallet,
    minterAddress: merkleDropMinter.address,
  })

  // Check eligibility

  const eligibleQuantity1 = await getEligibleMintQuantity(client, {
    editionAddress: soundEdition.address,
    userAddress: buyer.address,
    timestamp: mint1StartTime,
  })

  const eligibleQuantity2 = await getEligibleMintQuantity(client, {
    editionAddress: soundEdition.address,
    userAddress: buyer.address,
    timestamp: mint2StartTime,
  })

  const eligibleQuantity3 = await getEligibleMintQuantity(client, {
    editionAddress: soundEdition.address,
    userAddress: buyer.address,
    timestamp: mint3StartTime,
  })

  const eligibleQuantity4 = await getEligibleMintQuantity(client, {
    editionAddress: soundEdition.address,
    userAddress: buyer.address,
    timestamp: mint4StartTime,
  })

  expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
  expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)
  expect(eligibleQuantity3).to.equal(mint3MaxMintablePerAccount)
  expect(eligibleQuantity4).to.equal(mint4MaxMintablePerAccount)
})
=======
  // get all mint ids for this edition & return the latest
  const filter = minter.filters.MintConfigCreated(editionAddress)
  const roleEvents = await minter.queryFilter(filter)
  const mintId = roleEvents[roleEvents.length - 1].args.mintId
  if (!roleEvents[roleEvents.length - 1].args.mintId) {
    throw new Error('No mintId found')
  }
  return { mintId }
}

async function createMerkleMint({
  signer,
  minterAddress,
  editionAddress,
  startTime,
  endTime,
  maxMintable,
  maxMintablePerAccount,
}: {
  signer: Signer
  minterAddress: string
  editionAddress: string
  startTime: number
  endTime: number
  maxMintable: number
  maxMintablePerAccount: number
}) {
  const signers = await hre.ethers.getSigners()
  const leaves = signers.slice(0, NUM_OF_MERKLE_RECIPIENTS).map((s) => s.address)
  // .map((x) => sha256(x))
  const tree = new MerkleTree(leaves, sha256)
  const root = tree.getRoot().toString('hex')
  const leaf = signers[2].address
  const proof = tree.getProof(leaf)
  console.log('validProof?', tree.verify(proof, leaf, root)) // true
  const badLeaf = signers[5].address
  const badProof = tree.getProof(badLeaf)
  console.log('validProof?', tree.verify(badProof, badLeaf, root)) // false

  // const minter = MerkleDropMinter__factory.connect(minterAddress, signer)
  // await minter.createEditionMint(
  //   editionAddress,
  //   merkleRoot,
  //   BigNumber.from(PRICE),
  //   startTime,
  //   endTime,
  //   maxMintable,
  //   maxMintablePerAccount,
  // )

  // console.log({ merkleRoot })

  // // get all mint ids for this edition & return the latest
  // const filter = minter.filters.MintConfigCreated(editionAddress)
  // const roleEvents = await minter.queryFilter(filter)
  // const mintId = roleEvents[roleEvents.length - 1].args.mintId
  // if (!roleEvents[roleEvents.length - 1].args.mintId) {
  //   throw new Error('No mintId found')
  // }
  // return { mintId, merkleRoot }
}
>>>>>>> createMerkleMint

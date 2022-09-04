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
  SoundCreatorV1,
  SoundEditionV1__factory,
  SoundFeeRegistry__factory,
} from '@soundxyz/sound-protocol/typechain/index'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import type MerkleTree from 'merkletreejs'

import { SoundClient } from '../src/client'
import type { MintSchedule, ContractCall, MintScheduleConfig } from '../src/types'
import { interfaceIds, MINTER_ROLE } from '../src/utils/constants'
import { now, MerkleHelper } from './helpers'

const UINT32_MAX = 4294967295
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const SOUND_FEE = 0
const ONE_HOUR = 3600
const PRICE = 420420420
const randomInt = Math.floor(Math.random() * 1_000_000_000_000)
const DEFAULT_SALT = ethers.utils.hexZeroPad(ethers.utils.hexlify(randomInt), 32)

let client: SoundClient
let soundCreator: SoundCreatorV1
let precomputedEditionAddress: string
let fixedPriceSignatureMinter: FixedPriceSignatureMinter
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
let signers: SignerWithAddress[]
let soundWallet: SignerWithAddress
let artistWallet: SignerWithAddress
let buyerWallet: SignerWithAddress

/*********************************************************
                        SETUP
 ********************************************************/

async function deployProtocol() {
  // NOTE: DO NOT CHANGE THE ORDER OF THESE DEPLOYMENTS - it will make the tests fail because
  // the addresses are deterministically generated based on the order of deployment

  // Deploy edition implmementation
  const SoundEditionV1 = new SoundEditionV1__factory()
  const soundEditionImp = await SoundEditionV1.connect(soundWallet).deploy()

  // Deploy & initialize creator
  const SoundCreatorV1 = new SoundCreatorV1__factory()
  const soundCreator = await SoundCreatorV1.connect(soundWallet).deploy(soundEditionImp.address)

  const SoundFeeRegistry = new SoundFeeRegistry__factory()
  const feeRegistry = await SoundFeeRegistry.connect(soundWallet).deploy(NON_NULL_ADDRESS, SOUND_FEE)

  // Deploy minters
  const FixedPriceSignatureMinter = new FixedPriceSignatureMinter__factory()
  const fixedPriceSignatureMinter = await FixedPriceSignatureMinter.connect(soundWallet).deploy(feeRegistry.address)
  const MerkleDropMinter = new MerkleDropMinter__factory()
  const merkleDropMinter = await MerkleDropMinter.connect(soundWallet).deploy(feeRegistry.address)
  const RangeEditionMinter = new RangeEditionMinter__factory()
  const rangeEditionMinter = await RangeEditionMinter.connect(soundWallet).deploy(feeRegistry.address)

  // Get precomputed edition address using default salt
  const precomputedEditionAddress = await soundCreator.soundEditionAddress(artistWallet.address, DEFAULT_SALT)

  return { soundCreator, precomputedEditionAddress, fixedPriceSignatureMinter, merkleDropMinter, rangeEditionMinter }
}

beforeEach(async () => {
  signers = await ethers.getSigners()
  soundWallet = signers[0]
  artistWallet = signers[1]
  buyerWallet = signers[2]

  client = SoundClient({ provider: ethers.provider, apiKey: '123' })
  const fixture = await loadFixture(deployProtocol)

  soundCreator = fixture.soundCreator
  precomputedEditionAddress = fixture.precomputedEditionAddress
  fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter
})

/**
 * Sets up an edition and mint schedules.
 */
export async function setupTest({
  customSalt,
  minterCalls = [],
}: {
  customSalt?: string
  minterCalls?: ContractCall[]
}) {
  const salt = customSalt || DEFAULT_SALT
  const editionInitArgs = [
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
  const editionInitData = editionInterface.encodeFunctionData('initialize', editionInitArgs)
  const editionAddress = await soundCreator.soundEditionAddress(artistWallet.address, salt)

  const grantRolesCalls = [
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

  const allContractCalls = [...grantRolesCalls, ...minterCalls]

  await soundCreator.connect(artistWallet).createSoundAndMints(
    salt,
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
    await client.isSoundEdition({ editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid address: 0x123')
    })
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    await setupTest({})
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const isEdition = await client.isSoundEdition({ editionAddress: wallet.address })
      expect(isEdition).to.be.false
    }

    const isEdition = await client.isSoundEdition({ editionAddress: precomputedEditionAddress })
    expect(isEdition).to.be.true
  })
})

describe('getEligibleMintQuantity: single RangeEditionMinter instance', () => {
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
          startTime + ONE_HOUR, // closingTime
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
    const mints = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })

    expect(mints.length).to.equal(1)

    // eligible for 2
    const eligibleQuantity = await client.eligibleMintQuantity({
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
    const newEligibleQuantity = await client.eligibleMintQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
    })
    expect(newEligibleQuantity).to.equal(1)

    // another user is still eligible for 2
    const eligibleQuantityForOther = await client.eligibleMintQuantity({
      mintSchedule: mints[0],
      userAddress: artistWallet.address,
    })
    expect(eligibleQuantityForOther).to.equal(2)
  })

  it(`Eligible quantity is zero outside of minting time`, async () => {
    const startTime = now()
    const closingTime = startTime + ONE_HOUR
    const endTime = closingTime + ONE_HOUR
    const maxMintablePerAccount = 5

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          closingTime,
          endTime,
          0, // affiliateFeeBPS
          10, // maxMintableLower
          10, // maxMintableUpper
          maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    const mints = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
    expect(mints.length).to.equal(1)

    const eligibleQuantityBeforeStart = await client.eligibleMintQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime - 1,
    })
    expect(eligibleQuantityBeforeStart).to.equal(0)

    const eligibleQuantityAtStart = await client.eligibleMintQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: startTime,
    })
    expect(eligibleQuantityAtStart).to.equal(maxMintablePerAccount)

    const eligibleQuantityAtEnd = await client.eligibleMintQuantity({
      mintSchedule: mints[0],
      userAddress: buyerWallet.address,
      timestamp: endTime + 1,
    })
    expect(eligibleQuantityAtEnd).to.equal(0)
  })

  it(`Eligible quantity becomes zero for every user if range edition mint instance is sold out before closingTime`, async () => {
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
          startTime + ONE_HOUR, // closingTime,
          startTime + ONE_HOUR * 2, // endTime,
          0, // affiliateFeeBPS
          4, // maxMintableLower
          maxMintableUpper, // maxMintableUpper
          1, // maxMintablePerAccount,
        ]),
      },
    ]

    await setupTest({ minterCalls })

    for (let i = 0; i < maxMintableUpper; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    // Check that all users have zero eligible balance
    for (let i = 0; i < 10; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const mints = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
      expect(mints.length).to.equal(1)

      const eligibleQuantity = await client.eligibleMintQuantity({
        mintSchedule: mints[0],
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
    const MINT_ID = 0

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          startTime,
          closingTime,
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
      minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    const mints = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
    expect(mints.length).to.equal(1)

    // Check that random users still have an eligible quantity at current time
    for (let i = 0; i < 1; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const eligibleQuantity = await client.eligibleMintQuantity({
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

      const eligibleQuantity = await client.eligibleMintQuantity({
        mintSchedule: mints[0],
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

    const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, artistWallet)
    const minterCalls = [
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint1StartTime,
          mint1EndTime - 1, // closingTime,
          mint1EndTime,
          0, // affiliateFeeBPS
          99, // maxMintableLower,
          100, // maxMintableUpper,
          mint1MaxMintablePerAccount,
        ]),
      },
      {
        contractAddress: rangeEditionMinter.address,
        calldata: minter.interface.encodeFunctionData('createEditionMint', [
          precomputedEditionAddress,
          PRICE,
          mint2StartTime,
          mint2StartTime + ONE_HOUR, // closingTime,
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
    const activeMints = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
    expect(activeMints.length).to.equal(1)
    // 2 total mints (1 in the future)
    const allMints = await client.mintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
    expect(allMints.length).to.equal(2)

    const eligibleQuantity1 = await client.eligibleMintQuantity({
      mintSchedule: allMints[0],
      userAddress: buyerWallet.address,
    })

    const eligibleQuantity2 = await client.eligibleMintQuantity({
      mintSchedule: allMints[1],
      userAddress: buyerWallet.address,
      timestamp: mint2StartTime,
    })

    expect(eligibleQuantity1).to.equal(mint1MaxMintablePerAccount)
    expect(eligibleQuantity2).to.equal(mint2MaxMintablePerAccount)
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
            startTime + ONE_HOUR, // closingTime,
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
        apiKey: '123',
        soundCreatorAddress: soundCreator.address,
      })
      mintSchedules = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
      expect(mintSchedules[0].interfaceId).to.eq(interfaceIds.IRangeEditionMinter)
    })

    it(`Successfully mints via RangeEditionMinter`, async () => {
      const quantity = 2
      const initialBalance = await SoundEditionV1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.mint({ mintSchedule: mintSchedules[0], quantity })

      const finalBalance = await SoundEditionV1__factory.connect(precomputedEditionAddress, ethers.provider).balanceOf(
        buyerWallet.address,
      )
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it(`Should throw error if invalid quantity requested`, async () => {
      const quantity = 0
      await client.mint({ mintSchedule: mintSchedules[0], quantity }).catch((error) => {
        expect(error.message).to.equal('Must provide valid quantity')
      })
    })

    it(`Should throw error if more than EligibleMintQuantity requested`, async () => {
      const quantity = 5
      const eligibleMintQuantity = await client.eligibleMintQuantity({
        mintSchedule: mintSchedules[0],
        userAddress: buyerWallet.address,
      })
      await client.mint({ mintSchedule: mintSchedules[0], quantity }).catch((error) => {
        expect(error.message).to.equal(`Not eligible to mint ${quantity}. Eligible quantity: ${eligibleMintQuantity}`)
      })
    })
  })

  describe('MerkleDropMinter', () => {
    const merkleHelper = MerkleHelper()
    let merkleTree: MerkleTree
    let mintSchedules: MintSchedule[] = []

    beforeEach(async () => {
      merkleTree = merkleHelper.getMerkleTree()
      const merkleRoot = merkleHelper.getMerkleRoot(merkleTree)

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
      client = SoundClient({ provider: ethers.provider, signer: buyerWallet, apiKey: '123' })
      mintSchedules = await client.activeMintSchedulesForEdition({ editionAddress: precomputedEditionAddress })
      expect(mintSchedules[0].interfaceId).to.eq(interfaceIds.IMerkleDropMinter)
    })

    it(`Successfully mints via MerkleDropMinter`, async () => {
      const quantity = 1
      const initialBalance = await SoundEditionV1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyerWallet.address)

      await client.mint({
        mintSchedule: mintSchedules[0],
        quantity,
        getMerkleProof: async (_root, unhashedLeaf) => merkleHelper.getProof({ merkleTree, address: unhashedLeaf }),
      })

      const finalBalance = await SoundEditionV1__factory.connect(precomputedEditionAddress, ethers.provider).balanceOf(
        buyerWallet.address,
      )
      expect(finalBalance.sub(initialBalance)).to.eq(quantity)
    })

    it('Should throw error if merkle proof is null', async () => {
      await client
        .mint({
          mintSchedule: mintSchedules[0],
          quantity: 1,
          getMerkleProof: async (_root, _unhashedLeaf) => null,
        })
        .catch((error) => {
          expect(error.message).to.equal('Unable to fetch merkle proof')
        })
    })
  })
})

describe('createEditionWithMintSchedules', () => {
  beforeEach(() => {
    client = SoundClient({ signer: artistWallet, apiKey: '123', soundCreatorAddress: soundCreator.address })
  })

  it('Creates a sound edition and mint schedules', async () => {
    const editionConfig = {
      name: 'Test',
      symbol: 'TEST',
      metadataModule: NULL_ADDRESS,
      baseURI: 'https://test.com',
      contractURI: 'https://test.com',
      fundingRecipient: NON_NULL_ADDRESS,
      royaltyBPS: 0,
      editionMaxMintable: 10,
      mintRandomnessTokenThreshold: 10,
      mintRandomnessTimeThreshold: 999999,
    }

    const mint1StartTime = now()
    const mint1ClosingTime = mint1StartTime + ONE_HOUR / 2
    const mint2StartTime = mint1StartTime + ONE_HOUR
    const mint3StartTime = mint1StartTime + ONE_HOUR * 2
    const mint1MaxMintablePerAccount = 2
    const mint3MaxMintablePerAccount = 3
    const merkleHelper = MerkleHelper()
    const merkleRootHash = merkleHelper.getMerkleRoot(merkleHelper.getMerkleTree())

    const mintScheduleConfigs: MintScheduleConfig[] = [
      {
        name: 'RangeEditionMinter' as const,
        minterAddress: rangeEditionMinter.address,
        price: PRICE,
        startTime: mint1StartTime,
        closingTime: mint1ClosingTime,
        endTime: mint2StartTime,
        maxMintableLower: 5,
        maxMintableUpper: 10,
        maxMintablePerAccount: mint1MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
      {
        name: 'FixedPriceSignatureMinter' as const,
        minterAddress: fixedPriceSignatureMinter.address,
        price: PRICE,
        startTime: mint2StartTime,
        endTime: mint3StartTime,
        signer: NON_NULL_ADDRESS,
        maxMintable: 13,
        affiliateFeeBPS: 0,
      },
      {
        name: 'MerkleDropMinter' as const,
        minterAddress: merkleDropMinter.address,
        price: PRICE,
        merkleRootHash,
        startTime: mint3StartTime,
        endTime: mint3StartTime + ONE_HOUR,
        maxMintable: 9,
        maxMintablePerAccount: mint3MaxMintablePerAccount,
        affiliateFeeBPS: 0,
      },
    ]

    /**
     * Create sound edition and mint schedules.
     */
    await client.createEditionWithMintSchedules({
      editionConfig,
      mintScheduleConfigs,
      salt: DEFAULT_SALT,
    })

    const editionContract = SoundEditionV1__factory.connect(precomputedEditionAddress, ethers.provider)
    const editionBaseURI = await editionContract.baseURI()
    const mintRandomnessTimeThreshold = await editionContract.mintRandomnessTimeThreshold()
    const fundingRecipient = await editionContract.fundingRecipient()
    const editionMaxMintable = await editionContract.editionMaxMintable()

    expect(editionBaseURI).to.eq(editionConfig.baseURI)
    expect(mintRandomnessTimeThreshold).to.eq(editionConfig.mintRandomnessTimeThreshold)
    expect(fundingRecipient).to.eq(editionConfig.fundingRecipient)
    expect(editionMaxMintable).to.eq(editionConfig.editionMaxMintable)

    const MINT_ID = 0

    // Verify mint configs exist
    for (const mintScheduleConfig of mintScheduleConfigs) {
      switch (mintScheduleConfig.name) {
        case 'RangeEditionMinter': {
          const minter = RangeEditionMinter__factory.connect(mintScheduleConfig.minterAddress, ethers.provider)
          const mintSchedule = await minter.mintInfo(precomputedEditionAddress, MINT_ID)
          expect(mintSchedule.startTime).to.equal(mint1StartTime)
          expect(mintSchedule.closingTime).to.equal(mint1ClosingTime)
          expect(mintSchedule.endTime).to.equal(mint2StartTime)
          expect(mintSchedule.maxMintableLower).to.equal(mintScheduleConfig.maxMintableLower)
          expect(mintSchedule.maxMintableUpper).to.equal(mintScheduleConfig.maxMintableUpper)
          expect(mintSchedule.maxMintablePerAccount).to.equal(mint1MaxMintablePerAccount)
          break
        }
        case 'FixedPriceSignatureMinter': {
          const minter = FixedPriceSignatureMinter__factory.connect(mintScheduleConfig.minterAddress, ethers.provider)
          const mintSchedule = await minter.mintInfo(precomputedEditionAddress, MINT_ID)
          expect(mintSchedule.startTime).to.equal(mint2StartTime)
          expect(mintSchedule.endTime).to.equal(mint3StartTime)
          expect(mintSchedule.signer).to.equal(NON_NULL_ADDRESS)
          break
        }
        case 'MerkleDropMinter': {
          const minter = MerkleDropMinter__factory.connect(mintScheduleConfig.minterAddress, ethers.provider)
          const mintSchedule = await minter.mintInfo(precomputedEditionAddress, MINT_ID)
          expect(mintSchedule.startTime).to.equal(mint3StartTime)
          expect(mintSchedule.endTime).to.equal(mint3StartTime + ONE_HOUR)
          expect(mintSchedule.merkleRootHash).to.equal(merkleRootHash)
          expect(mintSchedule.maxMintablePerAccount).to.equal(mint3MaxMintablePerAccount)
          break
        }
      }
    }
  })
})

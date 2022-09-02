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
import type { MintInfo } from '../src/types'
import { interfaceIds, MINTER_ROLE } from '../src/utils/constants'
import { createRangeMint, now, MerkleHelper } from './helpers'

const UINT32_MAX = 4294967295
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const SOUND_FEE = 0
const ONE_HOUR = 3600
const PRICE = 420420420
const randomInt = Math.floor(Math.random() * 1000000)
const DEFAULT_SALT = ethers.utils.hexZeroPad(ethers.utils.hexlify(randomInt), 32)

let client: SoundClient
let soundCreator: SoundCreatorV1
let precomputedEditionAddress: string
let fixedPriceSignatureMinter: FixedPriceSignatureMinter
let merkleDropMinter: MerkleDropMinter
let rangeEditionMinter: RangeEditionMinter
let signers: SignerWithAddress[]
let artistWallet: SignerWithAddress
let buyer: SignerWithAddress

/*********************************************************
                        SETUP
 ********************************************************/

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

  // Get precomputed edition address using default salt
  const precomputedEditionAddress = await soundCreator.soundEditionAddress(DEFAULT_SALT)

  return { soundCreator, precomputedEditionAddress, fixedPriceSignatureMinter, merkleDropMinter, rangeEditionMinter }
}

beforeEach(async () => {
  signers = await ethers.getSigners()
  artistWallet = signers[0]
  buyer = signers[1]

  client = SoundClient({ provider: ethers.provider, apiKey: '123' })
  const fixture = await loadFixture(deployProtocol)

  soundCreator = fixture.soundCreator
  precomputedEditionAddress = fixture.precomputedEditionAddress
  fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter
})

export async function createSoundAndMints({
  customSalt,
  minterCalls = [],
}: {
  customSalt?: string
  minterCalls?: { contractAddress: string; calldata: string }[]
}) {
  const salt = customSalt || DEFAULT_SALT
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

  const grantRoleCalls = [
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

  const allContractCalls = [...grantRoleCalls, ...minterCalls]

  await soundCreator.createSoundAndMints(
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
    await createSoundAndMints({})
    // for (let i = 0; i < 10; i++) {
    //   const wallet = Wallet.createRandom()
    //   const isEdition = await client.isSoundEdition({ editionAddress: wallet.address })
    //   expect(isEdition).to.be.false
    // }

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

    await createSoundAndMints({ minterCalls })

    // shows single active mint
    const mints = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })

    expect(mints.length).to.equal(1)

    // eligible for 2
    const eligibleQuantity = await client.eligibleMintQuantity({
      mintInfo: mints[0],
      userAddress: buyer.address,
    })
    expect(eligibleQuantity).to.equal(2)

    // Test balances decreases after minting
    minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, buyer)
    await minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, {
      value: PRICE,
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

    await createSoundAndMints({ minterCalls })

    const mints = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
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
    expect(eligibleQuantityAtStart).to.equal(maxMintablePerAccount)

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

    await createSoundAndMints({ minterCalls })

    for (let i = 0; i < maxMintableUpper; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    // Check that all users have zero eligible balance
    for (let i = 0; i < 10; i++) {
      const randomSigner = Wallet.createRandom()
      randomSigner.connect(ethers.provider)

      const mints = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
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

    await createSoundAndMints({ minterCalls })

    // Mint lower range limit
    for (let i = 0; i < maxMintableLower; i++) {
      const minter = RangeEditionMinter__factory.connect(rangeEditionMinter.address, signers[i])
      minter.mint(precomputedEditionAddress, MINT_ID, 1, NULL_ADDRESS, { value: PRICE })
    }

    const mints = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
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

    await createSoundAndMints({ minterCalls })

    // 1 active mint
    const activeMints = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
    expect(activeMints.length).to.equal(1)
    // 2 total mints (1 in the future)
    const allMints = await client.allMintsForEdition({ editionAddress: precomputedEditionAddress })
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

      await createSoundAndMints({ minterCalls })

      // provide signer to the sdk
      client = SoundClient({ provider: ethers.provider, signer: buyer, apiKey: '123' })
      mintInfos = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
      expect(mintInfos[0].interfaceId).to.eq(interfaceIds.IRangeEditionMinter)
    })

    it(`Successfully mints via RangeEditionMinter`, async () => {
      const quantity = 2
      const initialBalance = await SoundEditionV1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyer.address)

      await client.mint({ mintInfo: mintInfos[0], quantity })

      const finalBalance = await SoundEditionV1__factory.connect(precomputedEditionAddress, ethers.provider).balanceOf(
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

      await createSoundAndMints({ minterCalls })

      // provide signer to the sdk
      client = SoundClient({ provider: ethers.provider, signer: buyer, apiKey: '123' })
      mintInfos = await client.activeMintsForEdition({ editionAddress: precomputedEditionAddress })
      expect(mintInfos[0].interfaceId).to.eq(interfaceIds.IMerkleDropMinter)
    })

    it(`Successfully mints via MerkleDropMinter`, async () => {
      const quantity = 1
      const initialBalance = await SoundEditionV1__factory.connect(
        precomputedEditionAddress,
        ethers.provider,
      ).balanceOf(buyer.address)

      await client.mint({
        mintInfo: mintInfos[0],
        quantity,
        getMerkleProof: async (root, unhashedLeaf) => merkleHelper.getProof({ merkleTree, address: unhashedLeaf }),
      })

      const finalBalance = await SoundEditionV1__factory.connect(precomputedEditionAddress, ethers.provider).balanceOf(
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

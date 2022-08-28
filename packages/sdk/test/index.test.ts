import 'dotenv/config'
import { expect } from 'chai'
import { createClient, connectClient, SoundClient, isSoundEdition, getEligibleMintQuantity } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'
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
} from '@soundxyz/sound-protocol/typechain/index'
import hre from 'hardhat'
import { UINT32_MAX } from '../src/config'

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const ONE_HOUR = 3600

/*******************
        SETUP
 ******************/

async function deployProtocol() {
  const [signer1] = await hre.ethers.getSigners()

  // Deploy edition implmementation
  const SoundEditionV1 = new SoundEditionV1__factory()
  const soundEditionImp = await SoundEditionV1.connect(signer1).deploy()

  // Deploy & initialize creator
  const SoundCreatorV1 = new SoundCreatorV1__factory()
  const soundCreator = await SoundCreatorV1.connect(signer1).deploy()
  await soundCreator.initialize(soundEditionImp.address)

  // Deploy minters
  const FixedPriceSignatureMinter = new FixedPriceSignatureMinter__factory()
  const fixedPriceSignatureMinter = await FixedPriceSignatureMinter.connect(signer1).deploy(NON_NULL_ADDRESS)
  const MerkleDropMinter = new MerkleDropMinter__factory()
  const merkleDropMinter = await MerkleDropMinter.connect(signer1).deploy(NON_NULL_ADDRESS)
  const RangeEditionMinter = new RangeEditionMinter__factory()
  const rangeEditionMinter = await RangeEditionMinter.connect(signer1).deploy(NON_NULL_ADDRESS)

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

describe('isSoundEdition', () => {
  let client: SoundClient
  let soundEdition: SoundEditionV1
  let fixedPriceSignatureMinter: FixedPriceSignatureMinter
  let merkleDropMinter: MerkleDropMinter
  let rangeEditionMinter: RangeEditionMinter

  beforeEach(async () => {
    client = createClient(hre.ethers.provider)
    const fixture = await loadFixture(deployProtocol)

    soundEdition = fixture.soundEdition
    fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
    merkleDropMinter = fixture.merkleDropMinter
    rangeEditionMinter = fixture.rangeEditionMinter
  })

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

// describe('getEligibleMintQuantity', () => {
//   let client: SoundClient

//   beforeEach(() => {
//     const signer = new Wallet(TEST_PRIVATE_KEYS[0], provider)
//     client = createClient(signer)
//   })

//   it(`User is eligible for ${MAX_PER_ACCOUNT - USER1_INITIAL_BALANCE} tokens at mint1 start time`, async () => {
//     const eligibleAmount = await getEligibleMintQuantity(client, {
//       editionAddress: EDITION_ADDRESS,
//       userAddress: USER_ADDRESS,
//     })
//     await expect(eligibleAmount).toBe(1)
//   })

//   it(`User's eligible balance decreases after minting.`, async () => {
//     let eligibleAmount = await getEligibleMintQuantity(client, {
//       editionAddress: EDITION_ADDRESS,
//       userAddress: USER_ADDRESS,
//     })
//     await expect(eligibleAmount).toBe(1)

//     // Mint 1 token
//     const minter = RangeEditionMinter__factory.connect(RANGE_MINTER_ADDRESS, client.signer!)
//     await minter.mint(EDITION_ADDRESS, RANGE_MINT_ID1, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })

//     eligibleAmount = await getEligibleMintQuantity(client, {
//       editionAddress: EDITION_ADDRESS,
//       userAddress: USER_ADDRESS,
//     })

//     await expect(eligibleAmount).toBe(0)
//   })

//   it(`Eligible balance becomes zero for every user if range edition mint instance is sold out before closingTime`, async () => {
//     // Range edition uses maxMintableUpper prior to closingTime
//     for (let i = 0; i < MAX_MINTABLE_UPPER - USER1_INITIAL_BALANCE; i++) {
//       const signer = new Wallet(TEST_PRIVATE_KEYS[i % TEST_PRIVATE_KEYS.length], provider)
//       const minter = RangeEditionMinter__factory.connect(RANGE_MINTER_ADDRESS, signer)
//       await minter.mint(EDITION_ADDRESS, RANGE_MINT_ID1, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
//     }

//     for (let i = 0; i < 10; i++) {
//       const signer = Wallet.createRandom()
//       signer.connect(provider)
//       const eligibleAmount = await getEligibleMintQuantity(client, {
//         editionAddress: EDITION_ADDRESS,
//         userAddress: signer.address,
//       })
//       await expect(eligibleAmount).toBe(0)
//     }
//   })

//   it(`Eligible balance becomes zero for every user if range edition mint instance is sold out after closingTime`, async () => {})

//   it(`Random users are eligible for ${MAX_PER_ACCOUNT} tokens each.`, async () => {
//     for (let i = 0; i < 10; i++) {
//       const wallet = Wallet.createRandom()
//       const eligibleAmount = await getEligibleMintQuantity(client, {
//         editionAddress: EDITION_ADDRESS,
//         userAddress: wallet.address,
//       })
//       await expect(eligibleAmount).toBe(2)
//     }
//   })
// })

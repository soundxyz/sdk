import { Wallet } from '@ethersproject/wallet'
import { loadFixture } from '@nomicfoundation/hardhat-network-helpers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
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

import { SoundClient } from '../src/client'

/*******************
        SETUP
 ******************/

const UINT32_MAX = 4294967295
const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const NON_NULL_ADDRESS = '0x0000000000000000000000000000000000000001'
const SOUND_FEE = 0

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
  await soundEdition.grantRoles(fixedPriceSignatureMinter.address, minterRole)
  await soundEdition.grantRoles(merkleDropMinter.address, minterRole)
  await soundEdition.grantRoles(rangeEditionMinter.address, minterRole)

  return { soundEdition, fixedPriceSignatureMinter, merkleDropMinter, rangeEditionMinter }
}

/*******************
        TESTS
 ******************/

let client: SoundClient
let soundEdition: SoundEditionV1
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

  client = new SoundClient({ provider: ethers.provider, apiKey: '123' })
  const fixture = await loadFixture(deployProtocol)

  soundEdition = fixture.soundEdition
  fixedPriceSignatureMinter = fixture.fixedPriceSignatureMinter
  merkleDropMinter = fixture.merkleDropMinter
  rangeEditionMinter = fixture.rangeEditionMinter
})

describe('isSoundEdition', () => {
  it("Should throw error if the address isn't valid", async () => {
    await client.isSoundEdition({ editionAddress: '0x123' }).catch((error) => {
      expect(error.message).to.equal('Invalid address: 0x123')
    })
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const isEdition = await client.isSoundEdition({ editionAddress: wallet.address })
      expect(isEdition).to.be.false
    }

    const isEdition = await client.isSoundEdition({ editionAddress: soundEdition.address })
    expect(isEdition).to.be.true
  })
})

import 'dotenv/config'
import { beforeEach, describe, expect, it } from 'vitest'
import { createClient, connectClient, SoundClient, isSoundEdition, getEligibleMintQuantity } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { BigNumber } from '@ethersproject/bignumber'
import testConfig from './testConfig.json'
import { RangeEditionMinter__factory } from '@soundxyz/sound-protocol'

// First private key from 'test test test...' mnemonic
const TEST_PRIVATE_KEYS = [
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
  '0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6',
  '0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a',
  '0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba',
  '0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e',
  '0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356',
  '0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97',
  '0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6',
]
const PROVIDER_URL = 'http://localhost:8545'

const provider = new JsonRpcProvider({ url: PROVIDER_URL })

const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
const EDITION_ADDRESS = '0x9bd03768a7DCc129555dE410FF8E85528A4F88b5'
const RANGE_MINTER_ADDRESS = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9'
const RANGE_MINT_ID1 = 0
const USER_ADDRESS = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const ONE_HOUR = 3600

const { PRICE, MAX_MINTABLE_LOWER, MAX_MINTABLE_UPPER, MAX_PER_ACCOUNT, USER1_INITIAL_BALANCE } = testConfig

const MINT1_START_TIME = Math.floor(Date.now() / 1000)
const MINT1_CLOSING_TIME = MINT1_START_TIME + ONE_HOUR
const MINT1_END_TIME = MINT1_CLOSING_TIME + ONE_HOUR

// 2nd mint starts halfway through 1st mint
const MINT2_START_TIME = MINT1_CLOSING_TIME
// ...but its closing time is one hour after the end time of the 1st mint
const MINT2_CLOSING_TIME = MINT1_END_TIME + ONE_HOUR
const MINT2_END_TIME = MINT2_CLOSING_TIME + ONE_HOUR

console.log(`Waiting for network to be ready (if you're testing locally, make sure you have a local node running).`)
await provider.ready

describe('createClient', () => {
  it('Should create SoundClient', async () => {
    const client = createClient(provider)

    expect(client.signer).toBeNull()
    expect(client.provider).toBeDefined()
    expect(client.connect).toBeDefined()
  })
})

describe('connectClient', () => {
  it('Should throw error if the signer is not connected to a provider', async () => {
    const signer = new Wallet(TEST_PRIVATE_KEYS[0])
    const client = createClient(signer)

    await expect(() => connectClient(client)).rejects.toThrowError(
      'Signer must be connected to a provider: https://docs.ethers.io/v5/api/signer/#Signer-connect',
    )
  })
})

describe('isSoundEdition', () => {
  let client: SoundClient

  beforeEach(() => {
    client = createClient(provider)
  })

  it("Should throw error if the address isn't valid", async () => {
    await expect(() => isSoundEdition(client, { editionAddress: '0x123' })).rejects.toThrowError(
      'Invalid contract address',
    )
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const isEdition = await isSoundEdition(client, { editionAddress: wallet.address })
      expect(isEdition).toBe(false)
    }

    const isEdition = await isSoundEdition(client, { editionAddress: EDITION_ADDRESS })
    expect(isEdition).toBe(true)
  })
})

describe('getEligibleMintQuantity', () => {
  let client: SoundClient

  beforeEach(() => {
    const signer = new Wallet(TEST_PRIVATE_KEYS[0], provider)
    client = createClient(signer)
  })

  it(`User is eligible for ${MAX_PER_ACCOUNT - USER1_INITIAL_BALANCE} tokens at mint1 start time`, async () => {
    const eligibleAmount = await getEligibleMintQuantity(client, {
      editionAddress: EDITION_ADDRESS,
      userAddress: USER_ADDRESS,
    })
    await expect(eligibleAmount).toBe(1)
  })

  it(`User's eligible balance decreases after minting.`, async () => {
    let eligibleAmount = await getEligibleMintQuantity(client, {
      editionAddress: EDITION_ADDRESS,
      userAddress: USER_ADDRESS,
    })
    await expect(eligibleAmount).toBe(1)

    // Mint 1 token
    const minter = RangeEditionMinter__factory.connect(RANGE_MINTER_ADDRESS, client.signer!)
    await minter.mint(EDITION_ADDRESS, RANGE_MINT_ID1, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })

    eligibleAmount = await getEligibleMintQuantity(client, {
      editionAddress: EDITION_ADDRESS,
      userAddress: USER_ADDRESS,
    })

    await expect(eligibleAmount).toBe(0)
  })

  it(`Eligible balance becomes zero for every user if range edition mint instance is sold out before closingTime`, async () => {
    // Range edition uses maxMintableUpper prior to closingTime
    for (let i = 0; i < MAX_MINTABLE_UPPER - USER1_INITIAL_BALANCE; i++) {
      const signer = new Wallet(TEST_PRIVATE_KEYS[i % TEST_PRIVATE_KEYS.length], provider)
      const minter = RangeEditionMinter__factory.connect(RANGE_MINTER_ADDRESS, signer)
      await minter.mint(EDITION_ADDRESS, RANGE_MINT_ID1, 1, NULL_ADDRESS, { value: BigNumber.from(PRICE) })
    }

    for (let i = 0; i < 10; i++) {
      const signer = Wallet.createRandom()
      signer.connect(provider)
      const eligibleAmount = await getEligibleMintQuantity(client, {
        editionAddress: EDITION_ADDRESS,
        userAddress: signer.address,
      })
      await expect(eligibleAmount).toBe(0)
    }
  })

  it(`Eligible balance becomes zero for every user if range edition mint instance is sold out after closingTime`, async () => {})

  it(`Random users are eligible for ${MAX_PER_ACCOUNT} tokens each.`, async () => {
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const eligibleAmount = await getEligibleMintQuantity(client, {
        editionAddress: EDITION_ADDRESS,
        userAddress: wallet.address,
      })
      await expect(eligibleAmount).toBe(2)
    }
  })
})

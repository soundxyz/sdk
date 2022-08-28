import 'dotenv/config'
import { beforeEach, describe, expect, it } from 'vitest'
import { createClient, connectClient, SoundClient, isSoundEdition, getEligibleMintQuantity } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { Wallet } from '@ethersproject/wallet'
import testConfig from './testConfig.json'

// First private key from 'test test test...' mnemonic
const TEST_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const PROVIDER_URL = 'http://localhost:8545'

const provider = new JsonRpcProvider({ url: PROVIDER_URL })

const EDITION_ADDRESS = '0x9bd03768a7DCc129555dE410FF8E85528A4F88b5'
const USER_ADDRESS = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const ONE_HOUR = 3600

const { PRICE, MAX_MINTABLE_LOWER, MAX_MINTABLE_UPPER, MAX_PER_ACCOUNT } = testConfig

const MINT1_START_TIME = 0
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
    const signer = new Wallet(TEST_PK)
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
    client = createClient(provider)
  })

  it(`Test user is eligible for ${MAX_PER_ACCOUNT - 1} tokens.`, async () => {
    const eligibleAmount = await getEligibleMintQuantity(client, {
      editionAddress: EDITION_ADDRESS,
      userAddress: USER_ADDRESS,
    })
    await expect(eligibleAmount).toBe(1)
  })

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

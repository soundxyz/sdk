import 'dotenv/config'
import { beforeEach, describe, expect, it } from 'vitest'
import { createClient, connectClient, SoundClient, isSoundEdition, isUserEligibleToMint } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'
import { parseEther } from '@ethersproject/units'
import { Wallet } from '@ethersproject/wallet'

// First private key from 'test test test...' mnemonic
const TEST_PK = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
const PROVIDER_URL = 'http://localhost:8545'

const provider = new JsonRpcProvider({ url: PROVIDER_URL })

const PRICE = parseEther('0.1')
const MAX_MINTABLE_LOWER = 3
const MAX_MINTABLE_UPPER = 5
const MAX_PER_ACCOUNT = 1

const EDITION_ADDRESS = '0x9bd03768a7DCc129555dE410FF8E85528A4F88b5'
const MINT1_START_TIME = 0
const MINT1_CLOSING_TIME = MINT1_START_TIME + 10
const MINT1_END_TIME = MINT1_CLOSING_TIME + 10

// 2nd mint starts halfway through 1st mint
const MINT2_START_TIME = MINT1_CLOSING_TIME
// ...but its closing time is 10 seconds after the end time of the 1st mint
const MINT2_CLOSING_TIME = MINT1_END_TIME + 10
const MINT2_END_TIME = MINT2_CLOSING_TIME + 10

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
    await expect(() => isSoundEdition(client, { address: '0x123' })).rejects.toThrowError('Invalid contract address')
  })

  it('Correctly identifies SoundEdition addresses', async () => {
    for (let i = 0; i < 10; i++) {
      const wallet = Wallet.createRandom()
      const isEdition = await isSoundEdition(client, { address: wallet.address })
      expect(isEdition).toBe(false)
    }

    const isEdition = await isSoundEdition(client, { address: EDITION_ADDRESS })
    expect(isEdition).toBe(true)
  })
})

describe('isUserEligibleToMint', () => {
  let client: SoundClient

  beforeEach(() => {
    client = createClient(provider)
  })

  it('Should return expected value', async () => {
    const canMint = await isUserEligibleToMint(client, { address: EDITION_ADDRESS })
    await expect(canMint).toBe(true)
  })
})

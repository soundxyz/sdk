import 'dotenv/config'
import { beforeEach, describe, expect, it } from 'vitest'
import { createClient, SoundClient, isSoundEdition } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'

const PROVIDER_URL =
  process.env.TEST_ENV === 'local'
    ? 'http://localhost:8545'
    : `https://eth-goerli.alchemyapi.io/v2/${process.env.VITE_ALCHEMY_GOERLI_KEY}`

const provider = new JsonRpcProvider({ url: PROVIDER_URL })

describe('createClient', () => {
  it('Should create SoundClient', async () => {
    const client = createClient(provider)

    expect(client.signer).toBeUndefined()
    expect(client.provider).toBeDefined()
    expect(client.connect).toBeDefined()
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
})

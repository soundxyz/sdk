import 'dotenv/config'
import { beforeEach, describe, expect, it } from 'vitest'
import { createClient, SoundClient, isSoundEdition } from '../src/index'
import { JsonRpcProvider } from '@ethersproject/providers'

const PROVIDER_URL = 'http://localhost:8545'

const provider = new JsonRpcProvider({ url: PROVIDER_URL })

console.log(`Waiting for network to be ready (if you're testing locally, make sure you have a local node running).`)
await provider.ready

describe('createClient', () => {
  it('Should create SoundClient', async () => {
    const client = await createClient(provider)

    expect(client.signer).toBeNull()
    expect(client.provider).toBeDefined()
    expect(client.connect).toBeDefined()
  })
})

describe('isSoundEdition', () => {
  let client: SoundClient

  beforeEach(async () => {
    client = await createClient(provider)
  })

  it("Should throw error if the address isn't valid", async () => {
    await expect(() => isSoundEdition(client, { address: '0x123' })).rejects.toThrowError('Invalid contract address')
  })
})

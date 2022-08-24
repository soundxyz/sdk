import 'dotenv/config'

import { describe, expect, it } from 'vitest'
import { SoundClient } from '../src/index'
import { StaticJsonRpcProvider } from '@ethersproject/providers'

const PROVIDER_URL =
  process.env.TEST_ENV === 'local'
    ? 'http://localhost:8545'
    : `https://eth-goerli.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`

const provider = new StaticJsonRpcProvider({ url: PROVIDER_URL })
const client = new SoundClient({ chainId: 5, provider })

describe('isSoundEdition', () => {
  it("Should throw error if the address isn't valid", async () => {
    await expect(() => client.isSoundEdition('0x123')).rejects.toThrowError('Invalid contract address')
  })
})

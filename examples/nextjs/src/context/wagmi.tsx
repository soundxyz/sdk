'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { optimism, optimismGoerli } from 'viem/chains'
import { createPublicClient, http, type PublicClientConfig } from 'viem'
import assert from 'assert'

const PUBLIC_ALCHEMY_KEY = process.env.PUBLIC_ALCHEMY_KEY

assert(PUBLIC_ALCHEMY_KEY, 'Missing public alchemy key')

export const IS_PRODUCTION = process.env.PRODUCTION_DEPLOYMENT === '1'

export const RPC_URL = IS_PRODUCTION
  ? `https://opt-mainnet.g.alchemy.com/v2/${PUBLIC_ALCHEMY_KEY}`
  : `https://opt-goerli.g.alchemy.com/v2/${PUBLIC_ALCHEMY_KEY}`

export const chain: PublicClientConfig['chain'] = IS_PRODUCTION ? optimism : optimismGoerli

export const publicClient = createPublicClient({
  chain,
  transport: http(RPC_URL),
})

const config = createConfig({
  autoConnect: true,
  publicClient,
})

export function WagmiContext({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { optimismGoerli } from 'viem/chains'
import { createPublicClient, http, type Chain } from 'viem'
import assert from 'assert'
import {
  editionV1PublicActions,
  editionV2PublicActionsCreate,
  editionV2PublicActionsInfo,
  editionV2PublicActionsMint,
  withMerkleProvider,
  soundEditionVersionPublicActions,
} from '@soundxyz/sdk'
import { soundApi } from './sound'

const PUBLIC_ALCHEMY_KEY = process.env.PUBLIC_ALCHEMY_KEY

assert(PUBLIC_ALCHEMY_KEY, 'Missing public alchemy key')

export const RPC_URL = `https://opt-goerli.g.alchemy.com/v2/${PUBLIC_ALCHEMY_KEY}`

export const chain: Chain = optimismGoerli

export const publicClient = createPublicClient({
  chain,
  transport: http(RPC_URL),
})
  .extend(withMerkleProvider(soundApi))
  .extend(editionV1PublicActions)
  .extend(editionV2PublicActionsCreate)
  .extend(editionV2PublicActionsInfo)
  .extend(editionV2PublicActionsMint)
  .extend(soundEditionVersionPublicActions)

const config = createConfig({
  chains: [chain],
  transports: {
    [chain.id]: http(RPC_URL),
  },
})

export function WagmiContext({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

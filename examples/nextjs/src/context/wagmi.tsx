'use client'

import { WagmiConfig, createConfig } from 'wagmi'
import { optimism, optimismGoerli } from 'viem/chains'
import { createPublicClient, http, type Chain } from 'viem'
import assert from 'assert'
import { IS_PRODUCTION } from '@/utils/constants'
import {
  editionV1PublicActions,
  editionV2PublicActionsCreate,
  editionV2PublicActionsInfo,
  editionV2PublicActionsMint,
  withMerkleProvider,
} from '@soundxyz/sdk'
import { SoundAPI } from '@soundxyz/sdk/api/sound'

const PUBLIC_ALCHEMY_KEY = process.env.PUBLIC_ALCHEMY_KEY

assert(PUBLIC_ALCHEMY_KEY, 'Missing public alchemy key')

export const RPC_URL = IS_PRODUCTION
  ? `https://opt-mainnet.g.alchemy.com/v2/${PUBLIC_ALCHEMY_KEY}`
  : `https://opt-goerli.g.alchemy.com/v2/${PUBLIC_ALCHEMY_KEY}`

export const chain: Chain = IS_PRODUCTION ? optimism : optimismGoerli

export const soundApi = SoundAPI({
  apiEndpoint: 'https://preview.api.sound.xyz/graphql',
  apiKey: 'preview-no-key',
})

export const publicClient = createPublicClient({
  chain,
  transport: http(RPC_URL),
})
  .extend(withMerkleProvider(soundApi))
  .extend(editionV1PublicActions)
  .extend(editionV2PublicActionsCreate)
  .extend(editionV2PublicActionsInfo)
  .extend(editionV2PublicActionsMint)

const config = createConfig({
  autoConnect: true,
  publicClient,
})

export function WagmiContext({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}

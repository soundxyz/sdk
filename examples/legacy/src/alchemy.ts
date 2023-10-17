import 'dotenv/config'

import { Alchemy, Network } from 'alchemy-sdk'
import { requireEnv } from 'require-env-variable'

const { PUBLIC_ALCHEMY_KEY } = requireEnv('PUBLIC_ALCHEMY_KEY')

export const alchemyMainnetClient = new Alchemy({
  apiKey: PUBLIC_ALCHEMY_KEY,
  network: Network.ETH_MAINNET,
})

export const alchemyGoerliClient = new Alchemy({
  apiKey: PUBLIC_ALCHEMY_KEY,
  network: Network.ETH_GOERLI,
})

export const [mainnetProvider, goerliProvider] = await Promise.all([
  alchemyMainnetClient.config.getProvider(),
  alchemyGoerliClient.config.getProvider(),
])

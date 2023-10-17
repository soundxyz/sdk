import 'dotenv/config'

import { Wallet } from 'ethers'
import { requireEnv } from 'require-env-variable'

import { goerliProvider } from './alchemy'

const { PUBLIC_WALLET_PRIVATE_KEY } = requireEnv('PUBLIC_WALLET_PRIVATE_KEY')

export const signer = new Wallet(PUBLIC_WALLET_PRIVATE_KEY, goerliProvider)

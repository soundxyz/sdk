import type { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'dotenv/config'
import { requireEnv } from 'require-env-variable'

const { MNEMONIC } = requireEnv('MNEMONIC')

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.16',
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: MNEMONIC,
      },
    },
  },
}

export default config

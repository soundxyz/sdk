import type { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import * as dotenv from 'dotenv'

dotenv.config()

console.log({ mnemonic: process.env.MNEMONIC })

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.16',
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC as string,
      },
    },
  },
}

export default config

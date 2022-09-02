import type { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.16',
  },
}

export default config

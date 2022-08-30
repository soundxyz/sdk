import { HardhatUserConfig } from 'hardhat/config'
import '@nomiclabs/hardhat-ethers'

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.16',
  },
}

export default config
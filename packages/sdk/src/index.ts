import type { Provider } from '@ethersproject/abstract-provider'
import type { Signer } from '@ethersproject/abstract-signer'
import { isAddress } from '@ethersproject/address'

type SoundClientConfig = {
  chainId: number
  provider?: Provider
  signer?: Signer
}

const SUPPORTED_CHAIN_IDS = [
  // mainnet
  1,
  // goerli
  5,
  // hardhat
  1337, 31337,
]

export class SoundClient {
  private readonly _chainId: number
  private readonly _signer?: Signer

  constructor({ chainId, provider, signer }: SoundClientConfig) {
    if (!provider) {
      throw new Error('Missing provider')
    }

    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      throw new Error('Unsupported chainId')
    }

    this._chainId = chainId
    this._signer = signer
  }

  async isSoundEdition(contractAddress: string) {
    this._isValidAdddress(contractAddress)
    // TODO
  }

  async isUserEligibleToMint(contractAddress: string, time = Date.now()) {
    this._isValidAdddress(contractAddress)
    // TODO
  }

  async mint(contractAddress: string) {
    this._isValidAdddress(contractAddress)
    // TODO
  }

  /**
   * HELPER FUNCTIONS
   */

  private _isValidAdddress(contractAddress: string) {
    if (!isAddress(contractAddress)) {
      throw new Error('Invalid contract address')
    }
  }
}

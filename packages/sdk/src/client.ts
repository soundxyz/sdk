import { SoundEditionV1__factory } from '@soundxyz/sound-protocol/typechain/index'

import { interfaceIds } from './config'
import { MissingSignerError, MissingSignerOrProviderError } from './errors'
import { SignerOrProvider } from './types'
import { validateAddress } from './utils/helpers'

import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
type SoundClientConfig = {
  provider?: Provider
  signer?: Signer
  apiKey: string
}

export class SoundClient {
  private readonly _provider?: Provider
  private readonly _signer?: Signer
  private readonly _apiKey: string

  constructor({ signer, provider, apiKey }: SoundClientConfig) {
    this._signer = signer
    this._provider = provider
    this._apiKey = apiKey
  }

  async isSoundEdition(params: { editionAddress: string }) {
    validateAddress(params.editionAddress)
    const signerOrProvider = this._requireSignerOrProvider()

    const editionContract = SoundEditionV1__factory.connect(params.editionAddress, signerOrProvider)

    return editionContract.supportsInterface(interfaceIds.ISoundEditionV1)
  }

  private _requireSigner(): Signer {
    if (this._signer) return this._signer

    throw new MissingSignerError()
  }

  private _requireSignerOrProvider(): SignerOrProvider {
    if (this._signer) return this._signer
    if (this._provider) return this._provider

    throw new MissingSignerOrProviderError()
  }
}

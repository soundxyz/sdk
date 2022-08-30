import { SoundEditionV1__factory } from '@soundxyz/sound-protocol/typechain'
import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'
import { interfaceIds } from './config'
import { MissingSignerError, MissingSignerOrProviderError } from './errors'
import { validateAddress } from './utils/helpers'
import { ChainId, SignerOrProvider } from './types'

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

    const isSoundEdition = await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)

    return { isSoundEdition }
  }

  private _requireSigner(): Signer {
    if (!this._signer) throw new MissingSignerError()
    return this._signer
  }

  private _requireSignerOrProvider(): SignerOrProvider {
    if (!this._provider || !this._signer) throw new MissingSignerOrProviderError()
    return (this._signer || this._provider) as SignerOrProvider
  }
}

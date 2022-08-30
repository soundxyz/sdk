import { SoundEditionV1__factory } from '@soundxyz/sound-protocol/typechain'

import { interfaceIds } from './config'
import { MissingProviderError } from './errors'
import { validateAddress } from './utils/helpers'

import type { Signer } from '@ethersproject/abstract-signer'
import type { Provider } from '@ethersproject/abstract-provider'

type SoundClientConfig = {
  chainId: ChainId
  provider: Provider | null
  signer: Signer | null
  apiKey: string | null
}

export class SoundClient {
  private readonly _chainId: ChainId | null
  private readonly _provider: Provider | null
  private readonly _signer: Signer | null
  private readonly _apiKey: string | null

  constructor({ signer, provider, chainId, apiKey }: SoundClientConfig) {
    this._chainId = chainId
    this._signer = signer
    this._provider = provider
    this._apiKey = apiKey
  }

  async isSoundEdition(params: { editionAddress: string }) {
    validateAddress(params.editionAddress)
    const provider = this._requireProvider()

    const editionContract = SoundEditionV1__factory.connect(params.editionAddress, provider)

    const isSoundEdition = await editionContract.supportsInterface(interfaceIds.ISoundEditionV1)

    return { isSoundEdition }
  }

  private _requireSigner(): Signer {
    if (this._signer === null) throw new MissingProviderError()
    return this._signer
  }

  private _requireProvider(): Provider {
    if (this._provider === null) throw new MissingProviderError()
    return this._provider
  }
}

import { SoundAPI } from '../api'
import {
  MissingMerkleProvider,
  MissingProviderError,
  MissingSignerError,
  MissingSignerOrProviderError,
  MissingSoundAPI,
} from '../errors'
import { MerkleProvider, Provider, Signer, SignerOrProvider, SoundClientContractProvider } from '../types'
import { getLazyOption } from '../utils/helpers'

export type SoundClientInstanceConfig = SoundClientContractProvider & {
  /**
   * @default console.error
   */
  onUnhandledError?(error: unknown): void

  /**
   * Sound.xyz API instance
   */
  soundAPI?: SoundAPI

  /**
   * Merkle provider to be used
   */
  merkleProvider?: MerkleProvider
}

export function SoundClientInstance({
  signer,
  provider,
  merkleProvider,
  onUnhandledError = console.error,
  soundAPI,
}: SoundClientInstanceConfig) {
  const IdempotentCache: Record<string, unknown> = {}
  const IdempotentCachePromises: Record<string, Promise<unknown>> = {}

  function idempotentCachedCall<T>(key: string, cb: () => Promise<Awaited<T>>): Promise<Awaited<T>> | Awaited<T> {
    if (key in IdempotentCache) return IdempotentCache[key] as Awaited<T>

    return ((IdempotentCachePromises[key] as Promise<Awaited<T>> | undefined) ||= cb()
      .then((value) => {
        IdempotentCache[key] = value
        return value
      })
      .finally(() => {
        delete IdempotentCachePromises[key]
      }))
  }

  const instance = {
    signer: signer || null,
    provider: provider || null,
    merkleProvider: merkleProvider || null,
    onUnhandledError,
    soundAPI: soundAPI || null,
    idempotentCachedCall,
  }

  function expectMerkleProvider() {
    if (instance.merkleProvider) return instance.merkleProvider

    throw new MissingMerkleProvider()
  }

  async function getNetworkChainId() {
    const networkProvider = await expectProvider()

    const network = await networkProvider.getNetwork()

    return network.chainId
  }

  async function expectSigner(): Promise<{ signer: Signer; userAddress: string }> {
    if (instance.signer) {
      const signer = await getLazyOption(instance.signer)
      const userAddress = await signer.getAddress()

      return { signer, userAddress }
    }

    throw new MissingSignerError()
  }

  async function expectProvider(): Promise<Provider> {
    if (instance.provider) {
      return getLazyOption(instance.provider)
    }

    if (instance.signer) {
      const signer = await getLazyOption(instance.signer)

      if (signer.provider) return signer.provider
    }

    throw new MissingProviderError()
  }

  /**
   * @deprecated Prefer using expectProviderOrSigner
   */
  async function expectSignerOrProvider(): Promise<{ signerOrProvider: SignerOrProvider }> {
    if (instance.signer) {
      const signer = await getLazyOption(instance.signer)
      return { signerOrProvider: signer }
    }
    if (instance.provider) {
      const provider = await getLazyOption(instance.provider)
      return { signerOrProvider: provider }
    }

    throw new MissingSignerOrProviderError()
  }

  async function expectProviderOrSigner(): Promise<{ providerOrSigner: SignerOrProvider }> {
    if (instance.provider) {
      const provider = await getLazyOption(instance.provider)
      return { providerOrSigner: provider }
    }
    if (instance.signer) {
      const signer = await getLazyOption(instance.signer)

      if (signer.provider) return { providerOrSigner: signer.provider }

      return { providerOrSigner: signer }
    }

    throw new MissingSignerOrProviderError()
  }

  function expectSoundAPI() {
    const soundAPI = instance.soundAPI
    if (!soundAPI) throw new MissingSoundAPI()

    return soundAPI
  }

  return {
    instance,
    expectMerkleProvider,
    expectSigner,
    expectProvider,
    expectSignerOrProvider,
    expectProviderOrSigner,
    expectSoundAPI,
    getNetworkChainId,
  }
}

export type SoundClientInstance = ReturnType<typeof SoundClientInstance>

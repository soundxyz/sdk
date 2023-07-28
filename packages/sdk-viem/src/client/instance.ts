import type { Address } from 'viem'
import { SoundAPI } from '../api'
import { MissingMerkleProvider, MissingProviderError, MissingSignerError, MissingSoundAPI } from '../errors'
import type { MerkleProvider, PublicClient, WalletClient, SoundClientContractProvider } from '../types'
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
  client,
  account,
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
    client: client || null,
    wallet: account || null,
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
    const client = await expectClient()

    return client.chain
  }

  async function expectWallet(): Promise<{ wallet: WalletClient; userAddress: Address }> {
    if (instance.wallet) {
      const wallet = await getLazyOption(instance.wallet)

      if (wallet.account) {
        return {
          userAddress: wallet.account.address,
          wallet,
        }
      }
    }

    throw new MissingSignerError()
  }

  async function expectClient(): Promise<PublicClient> {
    if (instance.client) {
      return getLazyOption(instance.client)
    }

    throw new MissingProviderError()
  }

  function expectSoundAPI() {
    const soundAPI = instance.soundAPI
    if (!soundAPI) throw new MissingSoundAPI()

    return soundAPI
  }

  return {
    instance,
    expectMerkleProvider,
    expectWallet,
    expectClient,
    expectSoundAPI,
    getNetworkChainId,
  }
}

export type SoundClientInstance = ReturnType<typeof SoundClientInstance>

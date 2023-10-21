import { proxy, useSnapshot } from 'valtio'
import { derive } from 'valtio/utils'
import { createWalletClient, http, isHex } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { chain, RPC_URL } from './wagmi'
import { PersistenceStorage } from '@/lib/persistence'
import { string } from 'zod'
import { onHydration, useHydration } from './hydration'
import { editionV1WalletActions, editionV2WalletActionsCreate, editionV2WalletActionsMint } from '@soundxyz/sdk'

const WalletInput = proxy({
  privateKey: '',
  isHydrated: false,
})

const walletKeyPersistence = PersistenceStorage({
  key: 'walletKey',
  schema: string().length(66).refine(isHex).nullable(),
})

onHydration(() => {
  walletKeyPersistence
    .get()
    .then((privateKey) => {
      if (privateKey) {
        WalletInput.privateKey = privateKey
      }
    })
    .catch(console.error)
    .finally(() => {
      WalletInput.isHydrated = true
    })
})

export function useWalletPrivateKey() {
  useHydration()
  return useSnapshot(WalletInput, { sync: true })
}

export function setWalletPrivateKey(privateKey: string) {
  WalletInput.privateKey = privateKey
  walletKeyPersistence.set(privateKey).catch(() => {
    walletKeyPersistence.set(null).catch(console.error)
  })
}

const WalletState = derive({
  wallet(get) {
    const privateKey = get(WalletInput).privateKey

    if (!privateKey) return null

    if (!isHex(privateKey, { strict: true }) || privateKey.length !== 66) return null

    const account = privateKeyToAccount(privateKey)

    const walletClient = createWalletClient({
      transport: http(RPC_URL),
      account,
      chain,
    })
      .extend(editionV1WalletActions)
      .extend(editionV2WalletActionsCreate)
      .extend(editionV2WalletActionsMint)

    return {
      walletClient,
      account,
    }
  },
})

export function useWallet() {
  return useSnapshot(WalletState)
}

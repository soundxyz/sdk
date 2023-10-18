import { PersistenceStorage } from '@/lib/persistence'
import { proxy, useSnapshot } from 'valtio'
import { isAddress } from 'viem'
import { string } from 'zod'
import { onHydration, useHydration } from './hydration'

const ContractAddressInput = proxy({
  contractAddress: '',
  isHydrated: false,
})

const ContractAddressPersistence = PersistenceStorage({
  key: 'contract-address',
  schema: string().refine(isAddress).nullable(),
})

onHydration(() => {
  ContractAddressPersistence.get()
    .then((contractAddress) => {
      if (contractAddress) {
        ContractAddressInput.contractAddress = contractAddress
      }
    })
    .catch(console.error)
    .finally(() => {
      ContractAddressInput.isHydrated = true
    })
})

export function useContractAddress() {
  useHydration()

  const input = useSnapshot(ContractAddressInput, { sync: true })

  const { value: contractAddress } = ContractAddressPersistence.useStore()

  return {
    contractAddress,
    input,
  }
}

export function setContractAddress(contractAddress: string) {
  ContractAddressInput.contractAddress = contractAddress
  ContractAddressPersistence.set(contractAddress).catch(() => {
    ContractAddressPersistence.set(null).catch(console.error)
  })
}

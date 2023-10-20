import { publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'
import type { Address } from 'viem'

export function useEditionVersion({ contractAddress }: { contractAddress: Address | null }) {
  return useQuery({
    queryKey: ['edition-version'],
    queryFn() {
      if (!contractAddress) return undefined

      return publicClient.soundEditionVersion({
        contractAddress,
      })
    },
  })
}

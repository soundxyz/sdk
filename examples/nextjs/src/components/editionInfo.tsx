import { useContractAddress } from '@/context/contractAddress'
import { publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'
import { editionV1PublicActions } from '@soundxyz/sdk/contract/edition-v1/read/actions'

export function EditionInfo() {
  const { contractAddress } = useContractAddress()

  const { data } = useQuery({
    queryKey: ['edition-info', contractAddress],
    enabled: !contractAddress,
    async queryFn() {
      if (!contractAddress) return null

      const { editionV1 } = publicClient.extend(editionV1PublicActions)

      return editionV1.getEditionInfo({
        editionAddress: contractAddress,
      })
    },
  })

  return <p>{JSON.stringify(data, null, 2)}</p>
}

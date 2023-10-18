import { useContractAddress } from '@/context/contractAddress'
import { publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export function EditionInfo() {
  const { contractAddress } = useContractAddress()

  const { data: editionBaseInfo, error: baseInfoError } = useQuery({
    queryKey: ['edition-info', contractAddress],
    enabled: !!contractAddress,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.getEditionInfo({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samAddress } = useQuery({
    queryKey: ['edition-sam-address', contractAddress],
    enabled: !!contractAddress,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.sam.samAddress({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samTotalBuyPrice } = useQuery({
    queryKey: ['edition-buy-sam-price', contractAddress, samAddress],
    enabled: !!samAddress,
    async queryFn() {
      if (!samAddress || !contractAddress) return null

      return publicClient.editionV1.sam.buy.buyPrice({
        editionAddress: contractAddress,
      })({
        samAddress,
      })({
        offset: 0,
        quantity: 1,
      })
    },
  })

  return (
    <div>
      <p>{JSON.stringify({ editionBaseInfo, samAddress, samTotalBuyPrice }, null, 2)}</p>
    </div>
  )
}

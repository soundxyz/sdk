import { useContractAddress } from '@/context/contractAddress'
import { publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export function EditionInfo() {
  const { contractAddress } = useContractAddress()

  const { data: editionBaseInfo = null } = useQuery({
    queryKey: ['edition-info', contractAddress],
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.getEditionInfo({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: tierEditionBaseInfo = null } = useQuery({
    queryKey: ['tier-edition-info', contractAddress],
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV2.info({
        edition: contractAddress,
      })
    },
  })

  const { data: tieredSchedules = null } = useQuery({
    queryKey: ['tier-schedules', contractAddress],
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV2.mintSchedules({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samAddress = null } = useQuery({
    queryKey: ['edition-sam-address', contractAddress],
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.sam.samAddress({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samTotalBuyPrice = null } = useQuery({
    queryKey: ['edition-buy-sam-price', contractAddress, samAddress],
    async queryFn() {
      if (!samAddress || !contractAddress) return null

      return publicClient.editionV1.sam.buy.buyPrice({
        editionAddress: contractAddress,
        samAddress,
      })({
        offset: 0,
        quantity: 1,
      })
    },
  })

  return (
    <div>
      <p>
        {JSON.stringify(
          { editionBaseInfo, tierEditionBaseInfo, tieredSchedules, samAddress, samTotalBuyPrice },
          null,
          2,
        )}
      </p>
    </div>
  )
}

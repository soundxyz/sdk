import { useContractAddress } from '@/context/contractAddress'
import { chain, publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'
import { SoundAPI } from '@soundxyz/sdk/api/sound'
import { useWallet } from '@/context/wallet'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

const soundApi = SoundAPI({
  apiEndpoint: 'https://preview.api.sound.xyz/graphql',
  apiKey: 'preview-no-key',
})

export function EditionInfo() {
  const { contractAddress } = useContractAddress()

  const { wallet } = useWallet()

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

  const activeSchedule = tieredSchedules?.activeSchedules[0]

  const { data: tieredMintEstimation = null } = useQuery({
    queryKey: [
      'edition-tiered-mint-estimation',
      contractAddress,
      activeSchedule?.tier,
      activeSchedule?.scheduleNum,
      wallet?.account.address,
    ],
    async queryFn() {
      if (!contractAddress || !wallet || !activeSchedule) return null

      return publicClient.editionV2
        .mint({
          merkleProvider: soundApi,
        })
        .mintParameters({
          editionAddress: contractAddress,
        })({
          quantity: 1,
          tier: activeSchedule.tier,
          chain,
          mintTo: wallet.account.address,
          schedule: activeSchedule,
          userAddress: wallet.account.address,
        })
        .then((data) => ({
          args: data.mint.input?.args,
          gasEstimate: data.mint.gasEstimate,
        }))
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
      <p>
        {JSON.stringify(
          {
            tieredMintEstimation,
          },
          null,
          2,
        )}
      </p>
    </div>
  )
}

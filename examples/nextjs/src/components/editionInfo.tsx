import { useContractAddress } from '@/context/contractAddress'
import { chain, publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@/context/wallet'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

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

  const activeGASchedule = tieredSchedules?.activeSchedules.filter((v) => v.tier === 0)[0]

  const { data: tieredMintEstimation = null } = useQuery({
    queryKey: [
      'edition-tiered-mint-estimation',
      contractAddress,
      activeGASchedule?.tier,
      activeGASchedule?.scheduleNum,
      wallet?.account.address,
    ],
    async queryFn() {
      if (!contractAddress || !wallet || !activeGASchedule) return null

      const mintParams = await publicClient.editionV2.mintParameters({
        editionAddress: contractAddress,
        quantity: 1,
        tier: activeGASchedule.tier,
        chain,
        mintTo: wallet.account.address,
        schedule: activeGASchedule,
        account: wallet.account,
      })

      if (mintParams.mint.type === 'mint') {
        wallet.walletClient.editionV2
          .mint(mintParams.mint)
          .then((transactionHash) => {
            console.log({ transactionHash })
          })
          .catch(console.error)
      }

      return {
        args: mintParams.mint.input?.args,
        gasEstimate: mintParams.mint.gasEstimate,
      }
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

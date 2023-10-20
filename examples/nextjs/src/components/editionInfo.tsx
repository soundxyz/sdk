import { useContractAddress } from '@/context/contractAddress'
import { chain, publicClient } from '@/context/wagmi'
import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@/context/wallet'
import { useMemo } from 'react'
import { soundApi } from '@/context/sound'

// @ts-expect-error
BigInt.prototype.toJSON = function () {
  return this.toString()
}

export function EditionInfo() {
  const { contractAddress } = useContractAddress()

  const { wallet } = useWallet()

  const walletAddress = wallet?.account.address

  const { data: { isSoundEditionV1 = false, isSoundEditionV2 = false } = {} } = useQuery({
    queryKey: ['edition-version-check', contractAddress],
    queryFn() {
      if (!contractAddress) return undefined

      return publicClient.soundEditionVersion({
        contractAddress,
      })
    },
  })

  const { data: editionRelease = null } = useQuery({
    queryKey: ['edition-release', contractAddress, walletAddress],
    async queryFn() {
      if (!contractAddress) return null

      return soundApi
        .editionRelease({
          contractAddress,
          webappUriInput: walletAddress
            ? {
                referralAddress: walletAddress,
              }
            : null,
          webEmbedInput: walletAddress
            ? {
                referralAddress: walletAddress,
              }
            : null,
        })
        .then((v) => v.data)
    },
  })

  const { data: editionBaseInfo = null } = useQuery({
    queryKey: ['edition-info', contractAddress],
    enabled: isSoundEditionV1,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.getEditionInfo({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: tierEditionBaseInfo = null } = useQuery({
    queryKey: ['tier-edition-info', contractAddress],
    enabled: isSoundEditionV2,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV2.info({
        edition: contractAddress,
      })
    },
  })

  const { data: tieredSchedules = null } = useQuery({
    queryKey: ['tier-schedules', contractAddress],
    enabled: isSoundEditionV2,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV2.mintSchedules({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samAddress = null } = useQuery({
    queryKey: ['edition-sam-address', contractAddress],
    enabled: isSoundEditionV1,
    async queryFn() {
      if (!contractAddress) return null

      return publicClient.editionV1.sam.samAddress({
        editionAddress: contractAddress,
      })
    },
  })

  const { data: samTotalBuyPrice = null } = useQuery({
    queryKey: ['edition-buy-sam-price', contractAddress, samAddress],
    enabled: isSoundEditionV1,
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
    enabled: isSoundEditionV2,
    async queryFn() {
      if (!contractAddress || !wallet || !activeGASchedule) return null

      const mintParams = await publicClient.editionV2.mintParameters({
        editionAddress: contractAddress,
        quantity: 1,
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

  const embed = useMemo(() => {
    if (!editionRelease?.webEmbed) return null

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: editionRelease.webEmbed,
        }}
      />
    )
  }, [editionRelease?.webEmbed])

  return (
    <div className="flex flex-col gap-10">
      {editionRelease ? (
        <a target="_blank" href={editionRelease.webappUri}>
          <p className="text-cyan-500">{editionRelease.webappUri}</p>
        </a>
      ) : null}
      {embed}
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
      <p>
        {JSON.stringify({
          editionRelease,
        })}
      </p>
    </div>
  )
}

import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'
import { EditionInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISoundEditionV1'
import { ReleaseInfoQueryVariables, ReleaseShareInfoQueryVariables } from '../../api/graphql/gql'
import { SoundNotFoundError } from '../../errors'
import { ExpandTypeChainStructOutput } from '../../types'
import { LazyPromise } from '../../utils/promise'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { isSoundV1_2_OrGreater } from './interface'

export function editionInfo(this: SoundClientInstance, soundParams: ReleaseInfoQueryVariables) {
  const { contractAddress } = soundParams

  const { expectSignerOrProvider, expectSoundAPI } = this

  const isVersionAtLeastV1_2 = LazyPromise(() => {
    return isSoundV1_2_OrGreater.call(this, {
      editionAddress: contractAddress,
    })
  })

  const info = LazyPromise(async () => {
    await validateSoundEdition.call(this, {
      editionAddress: contractAddress,
    })
    const { signerOrProvider } = await expectSignerOrProvider()

    const editionContract = SoundEditionV1_2__factory.connect(contractAddress, signerOrProvider)

    const info: ExpandTypeChainStructOutput<EditionInfoStructOutput> = await editionContract.editionInfo()

    return {
      ...info,
    }
  })

  const contract = {
    isVersionAtLeastV1_2,
    info,
  }

  const api = LazyPromise(async () => {
    const soundAPI = expectSoundAPI()

    const { data, errors } = await soundAPI.releaseInfo(soundParams)

    const release = data?.release
    if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

    return {
      ...release,
      mintStartDate: new Date(release.mintStartTimestamp),
    }
  })

  async function apiShare(variables: Omit<ReleaseShareInfoQueryVariables, 'contractAddress' | 'editionId'>) {
    const soundAPI = expectSoundAPI()

    const { data, errors } = await soundAPI.releaseShareInfo({ ...soundParams, ...variables })

    const release = data?.release
    if (!release) throw new SoundNotFoundError({ ...soundParams, graphqlErrors: errors })

    return {
      ...release,
      mintStartDate: new Date(release.mintStartTimestamp),
    }
  }

  return {
    contract,
    api,
    apiShare,
  }
}

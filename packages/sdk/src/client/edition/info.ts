import { SoundEditionV1_2__factory } from '@soundxyz/sound-protocol/typechain'
import type { EditionInfoStructOutput } from '@soundxyz/sound-protocol/typechain/ISoundEditionV1'
import type { ReleaseInfoQueryVariables, ReleaseShareInfoQueryVariables } from '../../api/graphql/gql'
import { SoundNotFoundError } from '../../errors'
import type { ExpandTypeChainStructOutput, SoundContractValidation } from '../../types'
import { LazyPromise } from '../../utils/promise'
import { SoundClientInstance } from '../instance'
import { validateSoundEdition } from '../validation'
import { isSoundV1_2_OrGreater } from './interface'

export function editionInfo(
  this: SoundClientInstance,
  soundParams: ReleaseInfoQueryVariables & SoundContractValidation,
) {
  const { contractAddress, assumeValidSoundContract = false } = soundParams

  const { expectProviderOrSigner, expectSoundAPI } = this

  const isVersionAtLeastV1_2 = LazyPromise(() => {
    return isSoundV1_2_OrGreater.call(this, {
      editionAddress: contractAddress,
    })
  })

  const info = LazyPromise(async () => {
    await validateSoundEdition.call(this, {
      editionAddress: contractAddress,
      assumeValidSoundContract,
    })
    const { providerOrSigner } = await expectProviderOrSigner()

    const editionContract = SoundEditionV1_2__factory.connect(contractAddress, providerOrSigner)

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

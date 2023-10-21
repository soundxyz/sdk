import { SoundAPI } from '@soundxyz/sdk/api/sound'

export const soundApi = SoundAPI({
  // Remove this line to use the production API
  apiEndpoint: 'https://preview.api.sound.xyz/graphql',

  // Change with your own API key
  apiKey: 'preview-no-key',
})

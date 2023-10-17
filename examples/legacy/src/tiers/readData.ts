import assert from 'assert'

import { clientMainnetProvider } from '../clientMainnetProvider'

const XYZ_EditionAddress = '0xA6c4df945DBB1D71Fe9a8D71Ae93B8d5C2BbeBE4'

assert.strictEqual(
  await clientMainnetProvider.isSoundEdition({
    editionAddress: XYZ_EditionAddress,
  }),
  true,
)

const XYZ_EditionInfo = clientMainnetProvider.edition.info({
  contractAddress: XYZ_EditionAddress,
}).contract

console.log(await XYZ_EditionInfo.info)

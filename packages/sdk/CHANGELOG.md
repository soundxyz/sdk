# @soundxyz/sdk

## 0.13.2

### Patch Changes

- [#185](https://github.com/soundxyz/sdk/pull/185) [`ecbf4af`](https://github.com/soundxyz/sdk/commit/ecbf4afdc62902cd32dee1cd76163052d9b70ddb) Thanks [@PabloSzx](https://github.com/PabloSzx)! - MintSchedule includes affiliateFeeBPS

## 0.13.1

### Patch Changes

- [#180](https://github.com/soundxyz/sdk/pull/180) [`ecde08d`](https://github.com/soundxyz/sdk/commit/ecde08dac7e1c1271e7176ea0de3a8bb1746b600) Thanks [@gigamesh](https://github.com/gigamesh)! - Check for CALL_EXCEPTION in isSoundEdition catch, otherwise throw error higher

- [#168](https://github.com/soundxyz/sdk/pull/168) [`fa78c09`](https://github.com/soundxyz/sdk/commit/fa78c0939baec7ab3a825491fe29a2e1d2705e58) Thanks [@gigamesh](https://github.com/gigamesh)! - Makes eligibleQuantity respect edition quantity over mint schedule quantity

## 0.13.0

### Minor Changes

- [#175](https://github.com/soundxyz/sdk/pull/175) [`4d34ade`](https://github.com/soundxyz/sdk/commit/4d34ade567773c8e34af7d2a97ab962d0eb0f565) Thanks [@gigamesh](https://github.com/gigamesh)! - getContractError helper for parsing failed transactions

### Patch Changes

- [#165](https://github.com/soundxyz/sdk/pull/165) [`4061789`](https://github.com/soundxyz/sdk/commit/4061789e2a378b3f7940a2a0325c9d7b6c379cbc) Thanks [@gigamesh](https://github.com/gigamesh)! - Improves address validation

- [#173](https://github.com/soundxyz/sdk/pull/173) [`8d72b04`](https://github.com/soundxyz/sdk/commit/8d72b04333d429155fc45e7c246264c5db11f93d) Thanks [@vigneshka](https://github.com/vigneshka)! - Bump sound-protocol to 1.3.0

- [#164](https://github.com/soundxyz/sdk/pull/164) [`f133dea`](https://github.com/soundxyz/sdk/commit/f133dea9859a348e8d8bc60cced837bd7312f30b) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds fallback gas limit for mint calls

## 0.12.1

### Patch Changes

- [#170](https://github.com/soundxyz/sdk/pull/170) [`20df074`](https://github.com/soundxyz/sdk/commit/20df074788e1f21b6c749be84762b8c39280a2b0) Thanks [@PabloSzx](https://github.com/PabloSzx)! - "activeMintSchedules" accepts optional "scheduleIds" to optimize chain calls

## 0.12.0

### Minor Changes

- [#162](https://github.com/soundxyz/sdk/pull/162) [`a343777`](https://github.com/soundxyz/sdk/commit/a3437770af1c2271a29458e9a2a34a61188c07c8) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds 20% gas limit buffer to mint call

## 0.11.1

### Patch Changes

- [#146](https://github.com/soundxyz/sdk/pull/146) [`500f7cd`](https://github.com/soundxyz/sdk/commit/500f7cd6dbce7199bf0f67073df9e3c2a16267a5) Thanks [@PabloSzx](https://github.com/PabloSzx)! - "eligibleQuantity" should never return less than 0

## 0.11.0

### Minor Changes

- [#133](https://github.com/soundxyz/sdk/pull/133) [`fa8ae9f`](https://github.com/soundxyz/sdk/commit/fa8ae9f3d6adc189493c1c347c0f5c3f1204e44c) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds validation for edition & mint configs

## 0.10.0

### Minor Changes

- [#139](https://github.com/soundxyz/sdk/pull/139) [`04146d9`](https://github.com/soundxyz/sdk/commit/04146d9d94871ca99219d0764ad867f9bed4648d) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Use new "Release.eggGame" field, with backwards compatible "Release.goldenEggImage" field

- [#139](https://github.com/soundxyz/sdk/pull/139) [`04146d9`](https://github.com/soundxyz/sdk/commit/04146d9d94871ca99219d0764ad867f9bed4648d) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Update Release API info query, using track.revealedAudio, with backwards-compatible "trackAudio" object

- [#139](https://github.com/soundxyz/sdk/pull/139) [`04146d9`](https://github.com/soundxyz/sdk/commit/04146d9d94871ca99219d0764ad867f9bed4648d) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Remove Release.artist.openseaCollectionUrl field from query

### Patch Changes

- [#132](https://github.com/soundxyz/sdk/pull/132) [`ae826b8`](https://github.com/soundxyz/sdk/commit/ae826b83641149cc51e6824edc00b3d4460c9d33) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds test for editionRegisteredMinters

- [`19a45f2`](https://github.com/soundxyz/sdk/commit/19a45f2ecaaef58a3e2546c7d2ad421d76825cee) Thanks [@gigamesh](https://github.com/gigamesh)! - Removes .only

## 0.9.0

### Minor Changes

- [#130](https://github.com/soundxyz/sdk/pull/130) [`ae551a0`](https://github.com/soundxyz/sdk/commit/ae551a036cdd661235291123c5da5ed5716bc332) Thanks [@gigamesh](https://github.com/gigamesh)! - Protocol SoundEditionV1_1

- [#130](https://github.com/soundxyz/sdk/pull/130) [`ae551a0`](https://github.com/soundxyz/sdk/commit/ae551a036cdd661235291123c5da5ed5716bc332) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds editionInitFlags and implements OPERATOR_FILTERING_ENABLED flag

## 0.8.0

### Minor Changes

- [#126](https://github.com/soundxyz/sdk/pull/126) [`a33dd22`](https://github.com/soundxyz/sdk/commit/a33dd2279a15be4e74d150957f990bdedf006562) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Composable mint schedules functions with "editionRegisteredMinters", "editionMinterMintIds", "editionScheduleIds" and "editionMintSchedules"

## 0.7.0

### Minor Changes

- [#125](https://github.com/soundxyz/sdk/pull/125) [`f5e7fc8`](https://github.com/soundxyz/sdk/commit/f5e7fc8868dab0842b05a627c65f733a926907d4) Thanks [@PabloSzx](https://github.com/PabloSzx)! - mintSchedules & activeMintSchedules accepts "fromBlockOrBlockHash" optional parameter for logs query

### Patch Changes

- [`dfeb644`](https://github.com/soundxyz/sdk/commit/dfeb644ad11c2ad4154aabc46c653af5cf39c890) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Target ES2019, transpiling "?."

- [#123](https://github.com/soundxyz/sdk/pull/123) [`ec5bb15`](https://github.com/soundxyz/sdk/commit/ec5bb159f039296e1e3803cb69b1be64e849296a) Thanks [@gigamesh](https://github.com/gigamesh)! - Improves isSoundEdition error message"

## 0.6.3

### Patch Changes

- [#121](https://github.com/soundxyz/sdk/pull/121) [`3fa8782`](https://github.com/soundxyz/sdk/commit/3fa8782706063c14ade8d4ff879a0707fd62d697) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Expose "getMerkleProof" on SoundClient

## 0.6.2

### Patch Changes

- [#118](https://github.com/soundxyz/sdk/pull/118) [`2e5feaf`](https://github.com/soundxyz/sdk/commit/2e5feaf0051d195e19320bb72c12709697545b0f) Thanks [@saihaj](https://github.com/saihaj)! - Adds a new method `numberOfTokensOwned` to get the number of tokens owned by a user on a given NFT contract.

  ```ts
  const numberOfTokensOwned = await sdk.numberOfTokensOwned({
    editionAddress: '0x...',
    userAddress: '0x...',
  })
  ```

## 0.6.1

### Patch Changes

- [#116](https://github.com/soundxyz/sdk/pull/116) [`54e5728`](https://github.com/soundxyz/sdk/commit/54e572802e669c1a14326159c65135e0b5956a06) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Take in account schedule total remaining for eligibleQuantity

## 0.6.0

### Minor Changes

- [#112](https://github.com/soundxyz/sdk/pull/112) [`2c2a0d6`](https://github.com/soundxyz/sdk/commit/2c2a0d6dc084e9d983f691dd2f33f23fd9a8a9a7) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework merkle drop integration with providers, accepting Lanyard or Sound.xyz API

- [#112](https://github.com/soundxyz/sdk/pull/112) [`2c2a0d6`](https://github.com/soundxyz/sdk/commit/2c2a0d6dc084e9d983f691dd2f33f23fd9a8a9a7) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework Sound API integration, SoundAPI needs to be instatiated separately and specified as parameter for SoundClient

### Patch Changes

- [#109](https://github.com/soundxyz/sdk/pull/109) [`38ae490`](https://github.com/soundxyz/sdk/commit/38ae490e08a51d2bbbb2e73d0316ba1eddee4e39) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Idempotent cached isSoundEdition check

- [#113](https://github.com/soundxyz/sdk/pull/113) [`0cbe4de`](https://github.com/soundxyz/sdk/commit/0cbe4de4653a81d1d6335fb662fa5566063c2398) Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "networkChainMatches" helper to validate connected network

- [#115](https://github.com/soundxyz/sdk/pull/115) [`a666999`](https://github.com/soundxyz/sdk/commit/a66699992eea5a999f0e2216163a7a3eae7ceb28) Thanks [@PabloSzx](https://github.com/PabloSzx)! - SoundClient options "provider" or "signer" can be returned from a callback

  ```ts
  import { getSigner } from './chain'

  const signerClient = SoundClient({
    signer() {
      return getSigner()
      // ...
    },
  })

  // ...

  import { getProvider } from './chain'

  const providerClient = SoundClient({
    provider() {
      return getProvider()
      // ...
    },
  })
  ```

## 0.5.5

### Patch Changes

- [#107](https://github.com/soundxyz/sdk/pull/107) [`ae3d69b`](https://github.com/soundxyz/sdk/commit/ae3d69bdf35bbb182cb3b9499d10abdb6bb2b8bc) Thanks [@vigneshka](https://github.com/vigneshka)! - eligibleQuantity returns 0 if the user is not in the merkle list

## 0.5.4

### Patch Changes

- [#103](https://github.com/soundxyz/sdk/pull/103) [`f4b3909`](https://github.com/soundxyz/sdk/commit/f4b390968129bf5a05bd5dec18983795a9f01a09) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Merkle Proof api query throws on merkle tree issues

- [#104](https://github.com/soundxyz/sdk/pull/104) [`ec23f1d`](https://github.com/soundxyz/sdk/commit/ec23f1d45c05aa6832cc2ac62f473745ded89c02) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Math.floor preventing unexpected float numbers on createEdition contract call

- [#103](https://github.com/soundxyz/sdk/pull/103) [`f4b3909`](https://github.com/soundxyz/sdk/commit/f4b390968129bf5a05bd5dec18983795a9f01a09) Thanks [@PabloSzx](https://github.com/PabloSzx)! - New "merkleProof" option on SoundClient and SoundClient.mint({ merkleProof: ... })

## 0.5.3

### Patch Changes

- [#95](https://github.com/soundxyz/sdk/pull/95) [`4c8bd16`](https://github.com/soundxyz/sdk/commit/4c8bd1657e5547694ede71ecce8a32222f11f8c8) Thanks [@PabloSzx](https://github.com/PabloSzx)! - [BREAKING CHANGE] Remove not-needed audioFromTrack in-between object of editionInfo.trackAudio

## 0.5.2

### Patch Changes

- [`962facf`](https://github.com/soundxyz/sdk/commit/962facf919262c7d4f6adea4ab958aa119747333) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix CommonJS build

## 0.5.1

### Patch Changes

- [#99](https://github.com/soundxyz/sdk/pull/99) [`ac5d15d`](https://github.com/soundxyz/sdk/commit/ac5d15d8dbc27a508d993e5c25bd7fb7efbab52f) Thanks [@vigneshka](https://github.com/vigneshka)! - "Add numberMinted and use in eligibility check"

## 0.5.0

### Minor Changes

- [#98](https://github.com/soundxyz/sdk/pull/98) [`e15110b`](https://github.com/soundxyz/sdk/commit/e15110b3a2ab611e91401f3167fe94eb6351c574) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework SoundAPI connection by specifying apiEndpoint manually, by default goes to https://api.sound.xyz/graphql

### Patch Changes

- [#96](https://github.com/soundxyz/sdk/pull/96) [`3f16900`](https://github.com/soundxyz/sdk/commit/3f16900741b99862da755e1f3a4a99afce314043) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix README & LICENSE on package

- [#98](https://github.com/soundxyz/sdk/pull/98) [`e15110b`](https://github.com/soundxyz/sdk/commit/e15110b3a2ab611e91401f3167fe94eb6351c574) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Consistent error definitions

- [#98](https://github.com/soundxyz/sdk/pull/98) [`e15110b`](https://github.com/soundxyz/sdk/commit/e15110b3a2ab611e91401f3167fe94eb6351c574) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Remove unused api requests

- [#98](https://github.com/soundxyz/sdk/pull/98) [`e15110b`](https://github.com/soundxyz/sdk/commit/e15110b3a2ab611e91401f3167fe94eb6351c574) Thanks [@PabloSzx](https://github.com/PabloSzx)! - new "onError" option to customize handled errors, by default is console.error

- [#98](https://github.com/soundxyz/sdk/pull/98) [`e15110b`](https://github.com/soundxyz/sdk/commit/e15110b3a2ab611e91401f3167fe94eb6351c574) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework soundCreatorAddress handling to rely on given parameter

## 0.4.1

### Patch Changes

- [#90](https://github.com/soundxyz/sdk/pull/90) [`3debc4d`](https://github.com/soundxyz/sdk/commit/3debc4d51675c17311d5caf302239fce5307cb13) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Trim GraphQL schema into public subgraph

## 0.4.0

### Minor Changes

- [#82](https://github.com/soundxyz/sdk/pull/82) [`43b92ed`](https://github.com/soundxyz/sdk/commit/43b92edd1d0c87d568b0a6097df316f28c2c98cb) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds txOverrides to createEdition

- [#87](https://github.com/soundxyz/sdk/pull/87) [`5d2e3ca`](https://github.com/soundxyz/sdk/commit/5d2e3caecfd89c91ef700806642efcdcd51dee44) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework expectedEditionAddress to return named object: { editionAddress: string, exists: boolean }

- [#86](https://github.com/soundxyz/sdk/pull/86) [`a86875d`](https://github.com/soundxyz/sdk/commit/a86875d8c98ddc2e256485fc6fe80f2c045b737c) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework "client.editionInfo" into "editionInfo.api" for Sound.xyz API and "editionInfo.contract" for on-chain contract information

- [#86](https://github.com/soundxyz/sdk/pull/86) [`a86875d`](https://github.com/soundxyz/sdk/commit/a86875d8c98ddc2e256485fc6fe80f2c045b737c) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework release api query fields

### Patch Changes

- [#86](https://github.com/soundxyz/sdk/pull/86) [`a86875d`](https://github.com/soundxyz/sdk/commit/a86875d8c98ddc2e256485fc6fe80f2c045b737c) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Simplify editionInfo trackAudio usage

## 0.3.6

### Patch Changes

- [#84](https://github.com/soundxyz/sdk/pull/84) [`9423878`](https://github.com/soundxyz/sdk/commit/9423878cf0229c7b041ea9035d6a60cf7f403189) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix await requireValidSoundEdition

- [#84](https://github.com/soundxyz/sdk/pull/84) [`9423878`](https://github.com/soundxyz/sdk/commit/9423878cf0229c7b041ea9035d6a60cf7f403189) Thanks [@PabloSzx](https://github.com/PabloSzx)! - NotSoundEditionError includes contractAddress property

## 0.3.5

### Patch Changes

- [`af6c884`](https://github.com/soundxyz/sdk/commit/af6c88419a1d6b0180e78d038a42134a53f154ab) Thanks [@vigneshka](https://github.com/vigneshka)! - Bump protocol version

## 0.3.4

### Patch Changes

- [#78](https://github.com/soundxyz/sdk/pull/78) [`05bac14`](https://github.com/soundxyz/sdk/commit/05bac14270fa17d556e74fa645f96a6a039af8d6) Thanks [@gigamesh](https://github.com/gigamesh)! - Convert salt to string before converting to bytes32

## 0.3.3

### Patch Changes

- [#76](https://github.com/soundxyz/sdk/pull/76) [`444ca62`](https://github.com/soundxyz/sdk/commit/444ca6205c471d667310a785c20e126db537036f) Thanks [@gigamesh](https://github.com/gigamesh)! - Bumps sound-protocol

## 0.3.2

### Patch Changes

- [`bdd7f83`](https://github.com/soundxyz/sdk/commit/bdd7f8391898f5888e471346b795c0f1ea44baa6) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix SoundClientConfig to follow SoundAPI optional apiKey

## 0.3.1

### Patch Changes

- [#73](https://github.com/soundxyz/sdk/pull/73) [`fbcd255`](https://github.com/soundxyz/sdk/commit/fbcd2557aeda449f668b802429fe20666a4d8077) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Make apiKey optional but MissingApiKey error is thrown when is required and it's not specified

- [#73](https://github.com/soundxyz/sdk/pull/73) [`fbcd255`](https://github.com/soundxyz/sdk/commit/fbcd2557aeda449f668b802429fe20666a4d8077) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Add new "development" for api environments, by default points to http://localhost:4000/graphql and can be overriden by changing ApiEndpointsMap

## 0.3.0

### Minor Changes

- [#71](https://github.com/soundxyz/sdk/pull/71) [`441886f`](https://github.com/soundxyz/sdk/commit/441886f0e5ce0c93b0467dfa35b59a721178ac60) Thanks [@gigamesh](https://github.com/gigamesh)! - - Bumps sound-protocol to 0.2.0
  - Removes EditionType (no longer deploying separate SoundCreator for albums)

## 0.2.1

### Patch Changes

- [#68](https://github.com/soundxyz/sdk/pull/68) [`bc239f3`](https://github.com/soundxyz/sdk/commit/bc239f3f0e9b6f603a06363877eaa8690d5b2810) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix type definitions on package

## 0.2.0

### Minor Changes

- [#63](https://github.com/soundxyz/sdk/pull/63) [`8f00721`](https://github.com/soundxyz/sdk/commit/8f007212ba66607fe0d7b01abff7755ff7a6a196) Thanks [@gigamesh](https://github.com/gigamesh)! - - [BREAKING] Rename createEditionWithMintSchedules to createEdition
  - [BREAKING] Rename soundInfo to editionInfo
  - [BREAKING] Removes client `soundNumSold`, and renames `editionInfo.numSold` to `totalMinted`

### Patch Changes

- [#66](https://github.com/soundxyz/sdk/pull/66) [`db003a0`](https://github.com/soundxyz/sdk/commit/db003a0765559b3e7b2588f418956eec3da9aadb) Thanks [@gigamesh](https://github.com/gigamesh)! - unix_timestamp -> unixTimestamp

- [#62](https://github.com/soundxyz/sdk/pull/62) [`5696974`](https://github.com/soundxyz/sdk/commit/56969749749e4f6c823ae626b8bb729927c1f4d6) Thanks [@gigamesh](https://github.com/gigamesh)! - Integrates album contract & EditionType to distinguish between single & album

## 0.1.5

### Patch Changes

- [#55](https://github.com/soundxyz/sdk/pull/55) [`d40a902`](https://github.com/soundxyz/sdk/commit/d40a902d9c414528b172eceb2a5b91e6cb6847c4) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Add numSold to soundInfo & soundNumSold helper to client

## 0.1.4

### Patch Changes

- [#59](https://github.com/soundxyz/sdk/pull/59) [`ee0184d`](https://github.com/soundxyz/sdk/commit/ee0184d4856d0fd022071f89ae615efa4b494744) Thanks [@vigneshka](https://github.com/vigneshka)! - Add merkle root to merkledrop sale schedule

## 0.1.3

### Patch Changes

- [#57](https://github.com/soundxyz/sdk/pull/57) [`932cb59`](https://github.com/soundxyz/sdk/commit/932cb59914846dbba1e5c0f979fd74c1c119001f) Thanks [@vigneshka](https://github.com/vigneshka)! - Add maxMintable helper function for range editions

## 0.1.2

### Patch Changes

- [#54](https://github.com/soundxyz/sdk/pull/54) [`bd76d66`](https://github.com/soundxyz/sdk/commit/bd76d663dbcc43b204a4a0c715fff4874e13561c) Thanks [@vigneshka](https://github.com/vigneshka)! - Improved types, using string name instead of mintType

## 0.1.1

### Patch Changes

- [#52](https://github.com/soundxyz/sdk/pull/52) [`2b5de3f`](https://github.com/soundxyz/sdk/commit/2b5de3f3c2c13ba6505a27064dbf93a2439a9bb4) Thanks [@vigneshka](https://github.com/vigneshka)! - Moving keccak to regular dependency

## 0.1.0

### Minor Changes

- [#47](https://github.com/soundxyz/sdk/pull/47) [`f6e54d0`](https://github.com/soundxyz/sdk/commit/f6e54d07fef26e6f653de2278f3199f92e19ca5a) Thanks [@gigamesh](https://github.com/gigamesh)! - - Enables edition salt to be any string or number, which we hash & format to Bytes32
  - Adds public expectedEditionAddress function

## 0.0.10

### Patch Changes

- [#48](https://github.com/soundxyz/sdk/pull/48) [`b3f7c1e`](https://github.com/soundxyz/sdk/commit/b3f7c1e5e8e12b13019a8e195c9393d9841cf361) Thanks [@gigamesh](https://github.com/gigamesh)! - - Bumps @soundxyz/sound-protocol
  - Makes isSoundEdition test less noisy

## 0.0.9

### Patch Changes

- [#44](https://github.com/soundxyz/sdk/pull/44) [`3682273`](https://github.com/soundxyz/sdk/commit/3682273ad0e4c5bfcb79bf7b297bef8c90c3d1d4) Thanks [@gigamesh](https://github.com/gigamesh)! - Export types

## 0.0.8

### Patch Changes

- [#26](https://github.com/soundxyz/sdk/pull/26) [`fbc9aaf`](https://github.com/soundxyz/sdk/commit/fbc9aaf8d0d5f8f9836dabe42845a7264ba99a20) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Implement proper Merkle eligibility check

## 0.0.7

### Patch Changes

- [#41](https://github.com/soundxyz/sdk/pull/41) [`3383a3a`](https://github.com/soundxyz/sdk/commit/3383a3a9647483b600f4ca9603c731ae3ec919bb) Thanks [@vigneshka](https://github.com/vigneshka)! - Fix local network error

## 0.0.6

### Patch Changes

- [#38](https://github.com/soundxyz/sdk/pull/38) [`09f9c20`](https://github.com/soundxyz/sdk/commit/09f9c207ff10d1bb5893ef0af12b346f8b8521d2) Thanks [@gigamesh](https://github.com/gigamesh)! - Renames public-facing functions

## 0.0.5

### Patch Changes

- [#33](https://github.com/soundxyz/sdk/pull/33) [`7c09ba2`](https://github.com/soundxyz/sdk/commit/7c09ba2efb04e51002f2ee4bf26b5ed009b58e38) Thanks [@gigamesh](https://github.com/gigamesh)! - Adds network chainId validation

- [#27](https://github.com/soundxyz/sdk/pull/27) [`6b807e4`](https://github.com/soundxyz/sdk/commit/6b807e49fae4a6c316e9cac111f84ecfecadb5b4) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Add "index" to package, re-exporting SoundClient

- [#25](https://github.com/soundxyz/sdk/pull/25) [`902d68e`](https://github.com/soundxyz/sdk/commit/902d68e2af661bc940dcdd96f6ce6c2660311059) Thanks [@gigamesh](https://github.com/gigamesh)! - Updates SDK with SoundCreatorV1.createEditionAndMints

- [#31](https://github.com/soundxyz/sdk/pull/31) [`32c6402`](https://github.com/soundxyz/sdk/commit/32c6402ee6ff9f6bde43ec7f5dc6b934b44641d3) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Rework soundInfo,releaseInfo functions to work with contractAddress and editionId

- [#29](https://github.com/soundxyz/sdk/pull/29) [`8e82f1c`](https://github.com/soundxyz/sdk/commit/8e82f1c60c4c3260a43994cb05a1112b27bb7290) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Specify environment of API on SoundClient init

- [#30](https://github.com/soundxyz/sdk/pull/30) [`4a0c0b6`](https://github.com/soundxyz/sdk/commit/4a0c0b68dbe399b832a46893510d33acda9b67ba) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Improve GraphQL Error types

## 0.0.3

### Patch Changes

- [`1d218b9`](https://github.com/soundxyz/sdk/commit/1d218b951fbebcb2f0d4974463082d4ed9368e01) Thanks [@vigneshka](https://github.com/vigneshka)! - Adding mint function to sdk

## 0.0.2

### Patch Changes

- [`f4f9941`](https://github.com/soundxyz/sdk/commit/f4f994185d2a84e255f56096637cb7c93840bb6a) Thanks [@PabloSzx](https://github.com/PabloSzx)! - Fix sound-protocol as peer dependency

## 0.0.1

### Patch Changes

- [`d10f656`](https://github.com/soundxyz/sdk/commit/d10f65652e273e1a2c63720aaf9f1e2349b5f9f6) Thanks [@PabloSzx](https://github.com/PabloSzx)! - First alpha release

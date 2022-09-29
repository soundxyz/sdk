---
'@soundxyz/sdk': minor
---

Adds a new method `numberOfTokensOwned` to get the number of tokens owned by a user on a given NFT contract.

```ts
const numberOfTokensOwned = await sdk.numberOfTokensOwned({
  editionAddress: '0x...',
  userAddress: '0x...',
})
```

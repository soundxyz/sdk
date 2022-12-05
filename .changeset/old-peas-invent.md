---
'@soundxyz/sdk': minor
---

Getting Minter address for an edition and the minter addresses is an expensive operation if we do the lookups from chain. Using [TheGraph](http://thegraph.com) protocol we are indexing the Sound contracts and we get a GraphQL API (checkout the code [here](https://github.com/soundxyz/sdk/tree/main/packages/subgraph)). To reduce the latency and help improve performance you can optionally provide an instance of SoundSubgraph which can be be used to get the minter address and mint IDs. In case it returns no data we will fallback to chain lookups.

```diff
- import { Signer, SoundClient, SoundAPI } from '@soundxyz/sdk';
+ import { Signer, SoundClient, SoundAPI, SoundSubgraph } from '@soundxyz/sdk';

const soundAPI = SoundAPI({
  apiEndpoint: GATEWAY_API_URL,
  apiKey: CLIENT_API_KEY,
});

+ const soundSubgraph = SoundSubgraph({})

const client = SoundClient({
  soundCreatorAddress: soundCreatorV1,
  provider: getProvider(),
  soundAPI,
  merkleProvider: soundAPI,
  signer: getSigner(),
+ soundSubgraph
});
```

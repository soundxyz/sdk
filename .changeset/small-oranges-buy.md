---
'@soundxyz/sdk': patch
---

SoundClient options "provider" or "signer" can be returned from a callback

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

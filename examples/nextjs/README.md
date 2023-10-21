# Sound.xyz SDK + Viem + Wagmi + Next.js Example

This example uses:

- `Next.js` https://nextjs.org/
- `Typescript` https://www.typescriptlang.org/
- `Wagmi` https://wagmi.sh/
- `Viem` https://viem.sh/
- `Tailwind` https://tailwindcss.com/
- `Tanstack Query` aka `React Query` https://tanstack.com/query

With the help of libraries like:

- `radix-ui/themes` https://www.radix-ui.com/
- `Zod` https://zod.dev/
- `Valtio` https://valtio.pmnd.rs/

## Breakdown of important scripts

- [./src/context/wagmi.tsx](./src/context/wagmi.tsx) **Wagmi** initialization and importing **Sound.xyz SDK**
- [./src/context/wallet.ts](./src/context/wallet.ts) **Viem** initialization and importing **Sound.xyz SDK**, this integration will vary depending on custom wallet integration, this example only includes a secret-key implementation that is not suitable for production environments
- [./src/context/sound.ts](./src/context/sound.ts) **Sound.xyz API + SDK** client initialization
- [./src/app/v2/page.tsx](./src/app/v2/page.tsx) **Sound Edition V2 usage** (Tiered Editions)
- [./src/app/v1/page.tsx](./src/app/v1/page.tsx) **Sound Edition V1 usage** (Previous Tiered Edition Upgrade)
  - [./src/app/v1/sam/page.tsx](./src/app/v1/sam/page.tsx) **Sound Edition V1 with SAM/Sound Swap usage**

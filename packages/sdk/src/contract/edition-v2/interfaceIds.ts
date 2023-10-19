import type { Hex } from 'viem'

export const interfaceIds = {
  ISoundEditionV2: '0x7888cfe1',
  ISuperMinter: '0x1459ad68',
} as const satisfies Record<string, Hex>

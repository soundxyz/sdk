import type { Hex } from 'viem'

export const interfaceIds = {
  ISoundEditionV2: '0x7888cfe1',
  ISoundEditionV2_1: '0x8477f7b3',
  ISuperMinter: '0x1459ad68',
  ISuperMinterV2: '0x75dd7850',
} as const satisfies Record<string, Hex>

import { getSaltAsBytes32 } from '../src/utils/helpers'

export const DEFAULT_SALT = getSaltAsBytes32(12345678)
export const SOUND_FEE = 0
export const ONE_HOUR = 3600
export const PRICE = 420420420n
export const INVALID_ADDRESS = 'not an address'
export const EDITION_MAX = 100

// constants to move out

const messages = new Map()
function warn(message: string) {
  if (!messages.has(message)) {
    messages.set(message, true)
    console.warn(message)
  }
}

export let forkUrl: string
if (process.env['VITE_ANVIL_FORK_URL']) {
  forkUrl = process.env['VITE_ANVIL_FORK_URL']
} else {
  forkUrl = 'https://cloudflare-eth.com'
  warn(`\`VITE_ANVIL_FORK_URL\` not found. Falling back to \`${forkUrl}\`.`)
}

export const poolId = Number(process.env['VITEST_POOL_ID'] ?? 1)
export const localHttpUrl = `http://127.0.0.1:8545/${poolId}`
export const localWsUrl = `ws://127.0.0.1:8545/${poolId}`

export let forkBlockNumber: bigint
if (process.env['VITE_ANVIL_BLOCK_NUMBER']) {
  forkBlockNumber = BigInt(Number(process.env['VITE_ANVIL_BLOCK_NUMBER']))
} else {
  forkBlockNumber = 16280770n
  warn(`\`VITE_ANVIL_BLOCK_NUMBER\` not found. Falling back to \`${forkBlockNumber}\`.`)
}

export let blockTime: number
if (process.env['VITE_ANVIL_BLOCK_TIME']) {
  blockTime = Number(process.env['VITE_ANVIL_BLOCK_TIME'])
} else {
  blockTime = 1
  warn(`\`VITE_ANVIL_BLOCK_TIME\` not found. Falling back to \`${blockTime}\`.`)
}

// Test accounts
export const ACCOUNTS = [
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  '0x976EA74026E726554dB657fA54763abd0C3a0aa9',
  '0x14dC79964da2C08b23698B3D3cc7Ca32193d9955',
  '0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f',
  '0xa0Ee7A142d267C1f36714E4a8F75612F20a79720',
] as const

// Named accounts
export const [ALICE, BOB] = ACCOUNTS

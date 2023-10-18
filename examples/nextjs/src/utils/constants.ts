export const IS_SERVER = typeof window === 'undefined'
export const IS_PRODUCTION = process.env.PRODUCTION_DEPLOYMENT === '1'

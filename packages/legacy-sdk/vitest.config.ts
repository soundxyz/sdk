import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    benchmark: {
      outputFile: './bench/report.json',
      reporters: process.env['CI'] ? ['json'] : ['verbose'],
    },
    coverage: {
      reporter: process.env['CI'] ? ['lcov'] : ['text', 'json', 'html'],
      exclude: ['**/errors/utils.ts', '**/dist/**', '**/*.test.ts', '**/_test/**'],
    },
    environment: 'node',
    setupFiles: ['./test/setup.ts'],
    globalSetup: ['./test/globalSetup.ts'],
    testTimeout: 30_000,
  },
})

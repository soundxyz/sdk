import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./test/index.test.ts'],
  },
})

// @ts-check

import { execSync } from 'child_process'

execSync('pnpm graphql-codegen', {
  stdio: 'inherit',
})

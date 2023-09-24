// @ts-check

import { buildCode } from 'bob-ts'
import { spawn } from 'child_process'
import { writeFile, readFile, copyFile, mkdir } from 'fs/promises'

spawn(`pnpm tsc -p tsconfig.build.json`, {
  stdio: 'inherit',
  shell: true,
})

await mkdir('dist').catch(() => null)

const [pkgString] = await Promise.all([
  readFile('package.json', 'utf-8'),
  buildCode({
    entryPoints: ['src'],
    clean: true,
    format: 'interop',
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
  }),
  copyFile('README.md', 'dist/README.md'),
  copyFile('LICENSE', 'dist/LICENSE'),
])

/**
 * @type {{name: string, version: string, exports: Record<string,{types: string; require: string; import: string} | string>; main: string; module: string; types: string; sideEffects: false; author: string, license: string, dependencies: Record<string,string>; peerDependencies: Record<string,string>} & Record<string, unknown>}
 */
const {
  name,
  version,
  exports: pkgExports,
  main,
  module: modulePkg,
  types,
  sideEffects,
  author,
  dependencies,
  peerDependencies,
  license,
  scripts,
  devDependencies,
  publishConfig,
  ...rest
} = JSON.parse(pkgString)

const exports = {}

function cleanDistPrefix(
  /**
   * @type {string}
   */
  path,
) {
  return path.replace('./dist', '.')
}

for (const [key, value] of Object.entries(pkgExports)) {
  if (typeof value === 'string') {
    exports[key] = cleanDistPrefix(value)
  } else {
    exports[key] = {
      types: cleanDistPrefix(value.types),
      require: cleanDistPrefix(value.require),
      import: cleanDistPrefix(value.import),
    }
  }
}

await writeFile(
  'dist/package.json',
  JSON.stringify(
    {
      name,
      version,
      main: cleanDistPrefix(main),
      module: cleanDistPrefix(modulePkg),
      types: cleanDistPrefix(types),
      exports,
      sideEffects,
      author,
      license,
      dependencies,
      peerDependencies,
      ...rest,
    },
    null,
    2,
  ),
)

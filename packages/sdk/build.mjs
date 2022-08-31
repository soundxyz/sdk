// @ts-check

import { buildCode } from 'bob-ts'
import { execSync } from 'child_process'
import { writeFile, readFile } from 'fs/promises'

await buildCode({
  entryPoints: ['src'],
  clean: true,
  format: 'interop',
  outDir: 'dist',
  target: 'es2020',
  sourcemap: false,
})

await writeFile(
  'dist/package.json',
  await readFile('package.json', 'utf-8').then(async (pkgString) => {
    /**
     * @type {{name: string, version: string, exports: Record<string,{types: string; require: string; import: string} | string>; main: string; module: string; types: string; sideEffects: false; author: string, license: string, dependencies: Record<string,string>}}
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
      license,
    } = JSON.parse(pkgString)

    const exports = {}

    for (const [key, value] of Object.entries(pkgExports)) {
      if (typeof value === 'string') {
        exports[key] = value.replace('./dist', '.')
      } else {
        exports[key] = {
          types: value.types.replace('./dist', '.'),
          require: value.require.replace('./dist', '.'),
          import: value.import.replace('./dist', '.'),
        }
      }
    }

    return JSON.stringify(
      {
        name,
        version,
        main: main.replace('./dist', '.'),
        module: modulePkg.replace('./dist', '.'),
        types: types.replace('./dist', '.'),
        exports,
        sideEffects,
        author,
        license,
        dependencies,
      },
      null,
      2,
    )
  }),
)

execSync(`pnpm tsc -p tsconfig.build.json`, {
  stdio: 'inherit',
})

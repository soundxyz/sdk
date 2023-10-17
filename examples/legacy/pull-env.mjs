import { promises } from 'fs'
import { fetch } from 'undici'

await fetch('https://vault.dotenv.org/pull.txt', {
  method: 'POST',
  body: 'DOTENV_VAULT=vlt_4011aac495b93f704eea755ec8deba6c5eac6f1a6af55ba645a32b3015dce13c&DOTENV_ME=it_a106570406176c5a9233bd477704bd3c863b660e00cbd4f179023a11714cec70',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
})
  .then((response) => response.text())
  .then((env) => promises.writeFile('.env', env))

import { Minter } from '../generated/schema'

export function buildMinterId(edition: string, mintId: string): string {
  return edition + '-' + mintId
}

export function loadOrCreateMinter(edition: string, mintId: string): Minter {
  const id = buildMinterId(edition, mintId)
  let entity = Minter.load(id)
  if (entity == null) {
    entity = new Minter(id)
  }
  return entity
}

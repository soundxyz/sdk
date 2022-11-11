import { log } from '@graphprotocol/graph-ts'
import { SoundEditionCreated } from '../generated/SoundCreatorV1/SoundCreatorV1'
import { SoundEditionV1 } from '../generated/templates/SoundEditionV1/SoundEditionV1'
import { SoundEditionV1 as SoundEditionV1Template } from '../generated/templates'
import { Song } from '../generated/schema'

export function handleSoundEditionCreated(event: SoundEditionCreated): void {
  SoundEditionV1Template.create(event.params.soundEdition)
  log.info('soundEditionAddress: {}', [event.params.soundEdition.toHexString()])
  log.info('soundEditionDeployer {}', [event.params.deployer.toHexString()])
  log.debug('instantiate song entity', [])
  let song = new Song(event.params.soundEdition.toHexString())
  song.address = event.params.soundEdition
  song.owner = event.params.deployer
  log.info('song.owner {}', [song.owner.toHexString()])

  const contract = SoundEditionV1.bind(event.params.soundEdition)
  const contractName = contract.name()
  log.info('contractName {}', [contractName])

  song.baseURI = contract.baseURI()
  song.contractURI = contract.contractURI()
  song.name = contract.name()
  song.symbol = contract.symbol()
  song.fundingRecipient = contract.fundingRecipient()

  const metadataModule = contract.metadataModule()
  if (metadataModule.toString() !== '0x0000000000000000000000000000000000000000') {
    log.info('metadataModule {}', [metadataModule.toHexString()])
    song.metadataModule = metadataModule
  } else {
    log.info('metadataModule is null', [])
    song.metadataModule = null
  }

  song.royaltyBPS = contract.royaltyBPS()
  song.save()
}

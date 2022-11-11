const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const subgraphYaml = yaml.load(fs.readFileSync('subgraph.yaml', 'utf8'))
const DEPLOY_NETWORK = process.env['ENV_NAME'] === 'production' ? 'mainnet' : 'goerli'

const network = fs.readFileSync(path.join(__dirname, 'networks', `${process.env['ENV_NAME']}.json`), 'utf8')
const parsedNetworkFile = JSON.parse(network)

subgraphYaml.dataSources[0].network = DEPLOY_NETWORK
subgraphYaml.dataSources[0].source.address = parsedNetworkFile[DEPLOY_NETWORK]['SoundCreatorV1']['address']
subgraphYaml.dataSources[0].source.startBlock = parsedNetworkFile[DEPLOY_NETWORK]['SoundCreatorV1']['startBlock']

subgraphYaml.dataSources[1].network = DEPLOY_NETWORK
subgraphYaml.dataSources[1].source.address = parsedNetworkFile[DEPLOY_NETWORK]['MerkleDropMinter']['address']
subgraphYaml.dataSources[1].source.startBlock = parsedNetworkFile[DEPLOY_NETWORK]['MerkleDropMinter']['startBlock']

subgraphYaml.dataSources[2].network = DEPLOY_NETWORK
subgraphYaml.dataSources[2].source.address = parsedNetworkFile[DEPLOY_NETWORK]['RangeEditionMinter']['address']
subgraphYaml.dataSources[2].source.startBlock = parsedNetworkFile[DEPLOY_NETWORK]['RangeEditionMinter']['startBlock']

subgraphYaml.templates[0].network = DEPLOY_NETWORK

const newSubgraphYaml = yaml.dump(subgraphYaml)
fs.writeFileSync('subgraph.yaml', newSubgraphYaml)

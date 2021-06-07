const fs = require('fs')
const path = require('path')
const { ethers } = require('hardhat')

const artifacts = [
  {
    contractName: 'UniswapV2Factory',
    buildPath: './UniswapV2Factory.json'
  },
  {
    contractName: 'UniswapV2Pair',
    buildPath: './UniswapV2Pair.json'
  },
  {
    contractName: 'UniswapV2Router02',
    buildPath: './UniswapV2Router02.json'
  }
]

module.exports = async () => {
  const [signer] = await ethers.getSigners()
  let _contracts = {}

  for (var i in artifacts) {
    const { contractName, buildPath } = artifacts[i]
    const filePath = path.join(__dirname, buildPath)
    const { abi, bytecode } = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    _contracts[contractName] = new ethers.ContractFactory(abi, bytecode, signer)
  }

  return _contracts
}

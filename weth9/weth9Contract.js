const fs = require('fs')
const path = require('path')

module.exports = async function () {
  const [signer] = await this.ethers.getSigners()
  const filePath = path.join(__dirname, './WETH9.json')
  const { abi, bytecode } = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const weth9 = new this.ethers.ContractFactory(abi, bytecode, signer)
  return weth9
}

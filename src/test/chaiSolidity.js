function chaiSolidity() {
  const chai = require('chai')
  const { solidity } = require('ethereum-waffle')
  chai.use(solidity)
  return chai
}

module.exports = chaiSolidity

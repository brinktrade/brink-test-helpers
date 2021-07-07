const { constants } = require('@openzeppelin/test-helpers')
const balanceTests = require('./src/test/balanceTests')
const bn = require('./src/test/bignumber')
const metaTx = require('./src/test/metaTx')

module.exports = {
  get bnToBinaryString () { return require('./src/bnToBinaryString') },
  get calcGasFee () { return require('./src/calcGasFee') },
  get computeAccountBytecode () { return require('./src/computeAccountBytecode') },
  get deployData () { return require('./src/deployData') },
  get encodedFnSignature () { return require('./src/encodedFnSignature') },
  get encodedParams () { return require('./src/encodedParams') },
  get encodeFunctionCall () { return require('./src/encodeFunctionCall') },
  get signEIP712 () { return require('./src/signEIP712') },
  get test() {
    return {
      get zeroBalanceTest () { return balanceTests.zeroBalanceTest },
      get tokenBalanceTest () { return balanceTests.tokenBalanceTest },
      get ethBalanceTest () { return balanceTests.ethBalanceTest },
      get chaiSolidity () { return require('./src/test/chaiSolidity') },
      get deployTestTokens () { return require('./src/test/deployTestTokens') },
      get deployUniswapV2 () { return require('./src/test/deployUniswapV2') },
      get latestBlock () { return require('./src/test/latestBlock') },
      get signMetaTx () { return metaTx.signMetaTx },
      get metaTxPromise () { return metaTx.metaTxPromise },
      get metaTxPromiseWithSignedData () { return metaTx.metaTxPromiseWithSignedData },
      get execMetaTx () { return metaTx.execMetaTx },
      get metaTxParamTypes () { return metaTx.metaTxParamTypes },
      get nextAvailableBit () { return require('./src/test/nextAvailableBit') },
      get randomAddress () { return require('./src/test/randomAddress') },
      get splitCallData () { return require('./src/test/splitCallData') },
      get testMetaTxEndpoint () { return require('./src/test/testMetaTxEndpoint') },
      get BN () { return bn.BN },
      get BN2 () { return bn.BN2 },
      get BN3 () { return bn.BN3 },
      get BN4 () { return bn.BN4 },
      get BN5 () { return bn.BN5 },
      get BN6 () { return bn.BN6 },
      get BN7 () { return bn.BN7 },
      get BN8 () { return bn.BN8 },
      get BN9 () { return bn.BN9 },
      get BN10 () { return bn.BN10 },
      get BN11 () { return bn.BN11 },
      get BN12 () { return bn.BN12 },
      get BN13 () { return bn.BN13 },
      get BN14 () { return bn.BN14 },
      get BN15 () { return bn.BN15 },
      get BN16 () { return bn.BN16 },
      get BN17 () { return bn.BN17 },
      get BN18 () { return bn.BN18 },
      get BN19 () { return bn.BN19 },
      get BN20 () { return bn.BN20 },
      get BN21 () { return bn.BN21 },
      get BN22 () { return bn.BN22 },
      get BN23 () { return bn.BN23 },
      get BN24 () { return bn.BN24 },
      get ZERO_ADDRESS() { return constants.ZERO_ADDRESS }
    }
  }
}

const _ = require('lodash')
const { getTypedData } = require('./getTypedData')
// signer is an ethers.js signer with _signTypedData() implemented
async function signEIP712 ({
  signer,
  contractAddress,
  contractName,
  contractVersion,
  chainId,
  method,
  paramTypes,
  params
}) {
  const domain = {
    name: contractName,
    version: contractVersion,
    chainId: chainId,
    verifyingContract: contractAddress
  }
  const { typedData, typedDataHash } = getTypedData(domain, method, paramTypes, params)
  const signature = await _signTypedData(signer, typedData)
  return { typedData, signature, typedDataHash }
}

async function _signTypedData(signer, typedData) {
  const signedData = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  return signedData
}

module.exports = signEIP712

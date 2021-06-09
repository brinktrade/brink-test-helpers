const _ = require('lodash')

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
  const typedData = _getTypedData(domain, method, paramTypes, params)
  const signature = await _signTypedData(signer, typedData)
  return { typedData, signature }
}

async function _signTypedData(signer, typedData) {
  const signedData = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  return signedData
}

function _getTypedData(domain, method, paramTypes, params) {
  const methodType = _capitalize(method)
  let typedData = {
    types: {
      [`${methodType}`]: paramTypes
    },
    domain,
    value: { }
  }
  for (var i in paramTypes) {
    const { name } = paramTypes[i]
    const paramValue = params[i]
    if (_.isUndefined(paramValue)) throw new Error(`No value for param "${name}"`)
    typedData.value[name] = paramValue.toString()
  }
  return typedData
}

const _capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = signEIP712

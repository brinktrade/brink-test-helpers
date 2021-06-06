const _ = require('lodash')

const signMetaTx = async ({
  contract,
  method,
  signer,
  params = []
}) => {
  const typedData = getTypedData(contract.address, method, params)
  const signature = await signTypedData(signer, typedData)
  return { typedData, to: contract.address, method, signature, signer, params }
}

const metaTxPromise = async ({
  contract,
  method,
  signer,
  params = [],
  unsignedParams = [],
  value = 0
}) => {
  const signedData = await signMetaTx({
    contract,
    method,
    signer,
    params
  })
  let opts = { value }
  const promise = contract[method].apply(this, [
    ...signedData.params,
    signedData.signature,
    ...unsignedParams,
    opts
  ])
  return { promise, signedData }
}

const metaTxPromiseWithSignedData = ({
  contract,
  unsignedParams = [],
  value = 0,
  signedData,
}) => {
  let opts = { value }
  const promise = contract[signedData.method].apply(this, [
    ...signedData.params,
    signedData.signature,
    ...unsignedParams,
    opts
  ])
  return { promise, signedData }
}

const execMetaTx = async ({
  contract,
  method,
  signer,
  params = [],
  unsignedParams = [],
  value
}) => {
  const { promise, signedData } = await metaTxPromise({
    contract,
    method,
    signer,
    unsignedParams,
    params,
    value
  })
  const tx = await promise
  return { tx, signedData }
}

async function signTypedData(signer, typedData) {
  const signedData = await signer._signTypedData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  return signedData
}

// get typed data object for EIP712 signature
function getTypedData(verifyingContract, method, params) {
  const paramTypes = metaTxParamTypes[method]
  if (!paramTypes) throw new Error(`unknown method ${method}`)
  const methodType = capitalize(method)
  let typedData = {
    types: {
      [`${methodType}`]: paramTypes
    },
    domain: {
      name: "BrinkAccount",
      version: "1",
      chainId: 1,
      verifyingContract
    },
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

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const metaTxParamTypes = {
  metaCall: [
    { name: 'value', type: 'uint256' },
    { name: 'to', type: 'address' },
    { name: 'data', type: 'bytes' }
  ],
  
  metaDelegateCall: [
    { name: 'to', type: 'address' },
    { name: 'data', type: 'bytes' }
  ],
  
  metaPartialSignedDelegateCall: [
    { name: 'to', type: 'address' },
    { name: 'data', type: 'bytes' }
  ],
}


module.exports = {
  signMetaTx,
  metaTxPromise,
  metaTxPromiseWithSignedData,
  execMetaTx,
  metaTxParamTypes
}

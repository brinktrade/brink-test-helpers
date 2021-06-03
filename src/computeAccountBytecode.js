const ethJsAbi = require('ethereumjs-abi')
const { bufferToHex } = require('ethereumjs-util')

const computeAccountBytecode = (proxyBytecode, implementationAddress, ownerAddress, chainId) => {
  const encodedParameters = bufferToHex(
    ethJsAbi.rawEncode(
      ['address', 'address', 'uint256'],
      [implementationAddress, ownerAddress, chainId]
    )
  ).replace('0x', '')
  return `${proxyBytecode}${encodedParameters}`
}

module.exports = computeAccountBytecode

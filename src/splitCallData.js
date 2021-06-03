function splitCallData (callData, numSignedParams) {
  // signed data is the prefix + fnSig + signedParams
  const bytes32SlotLen = 64
  const fnSigLen = 8
  const signedDataLen = fnSigLen + (numSignedParams * bytes32SlotLen)
  const signedData = `0x${callData.slice(0, signedDataLen)}`

  // unsigned data is the rest
  const unsignedData = `0x${callData.slice(signedDataLen)}`
  return { signedData, unsignedData }
}

module.exports = splitCallData

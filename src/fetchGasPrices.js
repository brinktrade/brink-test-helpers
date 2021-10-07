const { get } = require('axios')
const { parseEther } = require('@ethersproject/units');

const etherscanUrl = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle'

const fetchGasPrices = async (apiKey) => {
  let constructedApiKey
  if (!apiKey) { 
    constructedApiKey = '' 
    console.warn('Missing Etherscan API Key, rate limit of 1req/5sec')
  } else {
    constructedApiKey = '&apikey=' + apiKey
  }
  const resp = await get(etherscanUrl + constructedApiKey)
  const gasPrices = resp.data.result
  return {
    safe: parseEther(String(gasPrices.SafeGasPrice)),
    standard: parseEther(String(gasPrices.ProposeGasPrice)),
    fast: parseEther(String(gasPrices.FastGasPrice)),
  }
}

module.exports = fetchGasPrices
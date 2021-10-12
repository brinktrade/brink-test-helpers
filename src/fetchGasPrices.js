const { get } = require('axios')
const { parseUnits } = require('@ethersproject/units');

const etherscanUrl = 'https://api.etherscan.io/api?module=gastracker&action=gasoracle'
const gasStationUrl = 'https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json'
const ethGasWatchUrl = 'http://ethgas.watch/api/gas'

const fetchGasPrices = async ({ etherscanApiKey, gasStationApiKey, provider }) => {
  let gasPrices
  let gasDefault = false
  if (!etherscanApiKey && !provider && !gasStationApiKey) { 
    gasDefault = true
  }
  
  if (etherscanApiKey) {
    try {
      gasPrices = await getEtherscanPrices(etherscanApiKey)
    } catch {
      console.warn('Unable to retreive gas prices from etherscan')
    }
  }

  if (gasStationApiKey && !gasPrices) {
    try {
      gasPrices = await getGasStationPrices(gasStationApiKey)
    } catch {
      console.warn('Unable to retreive gas prices from eth gas station')
    }
  }

  if (provider && !gasPrices) {
    try {
      gasPrices = await getProviderGasPrices(provider)
    } catch {
      console.warn('Unable to retreive gas prices from eth provider')
    }
  }

  if (gasDefault || !gasPrices) {
    try {
      gasPrices = await getGasWatchPrices()
    } catch {
      console.warn('Unable to retreive gas prices gas watch')
    }
    if (!gasPrices) {
      try {
        gasPrices = await getEtherscanPrices('')
      } catch {
        throw 'Unable to retreive gas prices from any source'
      }
    }
  }
  
  return gasPrices
}

const getGasWatchPrices = async () => {
  const resp = await get(ethGasWatchUrl)
  const gasPrices = resp.data
  return {
    safe: parseUnits(String(gasPrices.slow.gwei), 'gwei'),
    standard: parseUnits(String(gasPrices.normal.gwei), 'gwei'),
    fast: parseUnits(String(gasPrices.fast.gwei), 'gwei'),
    fastest: parseUnits(String(gasPrices.instant.gwei), 'gwei')
  }
}

const getProviderGasPrices = async (provider) => {
  const gasPrice = await provider.getGasPrice()
  return {
    safe: gasPrice,
    standard: gasPrice,
    fast: gasPrice,
    fastest: gasPrice
  }
}

const getGasStationPrices = async (apiKey) => {
  const constructedApiKey = '?api-key=' + apiKey
  const resp = await get(gasStationUrl + constructedApiKey)
  const gasPrices = resp.data
  return {
    safe: parseUnits(String((gasPrices.safeLow / 10)), 'gwei'),
    standard: parseUnits(String((gasPrices.average / 10)), 'gwei'),
    fast: parseUnits(String((gasPrices.fast / 10), 'gwei')),
    fastest: parseUnits(String((gasPrices.fastest / 10), 'gwei'))
  }
}

const getEtherscanPrices = async (apiKey) => {
  let constructedApiKey = ''
  if (apiKey) {
    constructedApiKey = '&apikey=' + apiKey
  }
  const resp = await get(etherscanUrl + constructedApiKey)
  const gasPrices = resp.data.result
  return {
    safe: parseUnits(String(gasPrices.SafeGasPrice), 'gwei'),
    standard: parseUnits(String(gasPrices.ProposeGasPrice), 'gwei'),
    fast: parseUnits(String(gasPrices.FastGasPrice), 'gwei'),
    fastest: parseUnits(String(gasPrices.FastGasPrice), 'gwei')
  }
}

module.exports = fetchGasPrices
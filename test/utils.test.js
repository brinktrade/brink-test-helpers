const { ethers } = require('hardhat')
const { expect } = require('chai')

const utils = require('../index')

describe('brink-utils', function() {
  describe('testHelpers', function () {
    beforeEach(function () {
      this.testHelpers = utils.testHelpers(ethers)
    })
    describe('latestBlock', function () {
      it('should return latest block', async function () {
        const block = await this.testHelpers.latestBlock()
        expect(block.hash).not.to.be.undefined
      })
    })
    describe('constants', function () {
      it('should be exported', function () {
        expect(utils.constants).not.to.be.undefined
      })
    })
  })

  describe('fetchGasPrices', function () {
    it('should return latest gas prices from gas watch', async function () {
      const gasPrices = await utils.fetchGasPrices({})
      expect(gasPrices).not.to.be.undefined
      expect(gasPrices.fast.gte(gasPrices.standard)).to.be.true;
      expect(gasPrices.standard.gte(gasPrices.safe)).to.be.true;
    })

    it('should return latest gas prices from provider', async function () {
      const gasPrices = await utils.fetchGasPrices({ provider: ethers.provider })
      expect(gasPrices).not.to.be.undefined
      expect(gasPrices.fast.gte(gasPrices.standard)).to.be.true;
      expect(gasPrices.standard.gte(gasPrices.safe)).to.be.true;
    })

    it('should return latest gas prices from etherscan', async function () {
      // Etherscan allows 1 req / 5 secs for missing api keys, so result
      // may come from gas watch if you test rapidly 
      const gasPrices = await utils.fetchGasPrices({ etherscanApiKey: ' ' })
      expect(gasPrices).not.to.be.undefined
      expect(gasPrices.fast.gte(gasPrices.standard)).to.be.true;
      expect(gasPrices.standard.gte(gasPrices.safe)).to.be.true;
    })

    it('should return latest gas prices from eth watch and console warn gas station', async function () {
      const gasPrices = await utils.fetchGasPrices({ gasStationApiKey: ' ' })
      expect(gasPrices).not.to.be.undefined
      expect(gasPrices.fast.gte(gasPrices.standard)).to.be.true;
      expect(gasPrices.standard.gte(gasPrices.safe)).to.be.true;
    })
  })
})

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
    it('should return latest gas prices', async function () {
      const gasPrices = await utils.fetchGasPrices()
      expect(gasPrices).not.to.be.undefined
      expect(gasPrices.fast.gte(gasPrices.standard)).to.be.true;
      expect(gasPrices.standard.gte(gasPrices.safe)).to.be.true;
    })
  })
})

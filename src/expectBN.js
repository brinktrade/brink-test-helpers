const { expect } = require('chai')

function equal (bn1, bn2) {
  expect(bn1.toString()).to.equal(bn2.toString())
}

module.exports = {
  equal
}

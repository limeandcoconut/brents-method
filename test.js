const brentsMethod = require('./index.js')

let expect = require('chai').expect

/* eslint-disable no-undef, no-unused-expressions */
describe('Brent\'s Method', () => {

  it('find roots successfully', function() {
    expect(brentsMethod(
      x => x * Math.cos(x),
      -1,
      1,
    )).to.equal(0)

    let y = brentsMethod(
      x => (x ** 3) - (2 * (x ** 2)) - x - 2,
      -5,
      5,
    )
    expect(Math.abs(y - 2.658967) < 1e-7).to.be.true

    y = brentsMethod(
      (x) => {
        if (x > 7.87236423) {
          return 1
        }
        if (x < 7.87236423) {
          return -5
        }
        return 0
      },
      -1,
      10,
    )
    expect(Math.abs(y - 7.87236423) < 1e-7).to.be.true

    expect(brentsMethod(
      x => (x + 3) * Math.pow(x - 1, 2),
      -4,
      4 / 3,
    )).to.equal(-3)

  })

  it('use default error tolerance', function() {
    expect(brentsMethod(x => x * Math.cos(x), -1, -0.01)).to.equal(-0.01)
  })

  it('should respect error tolerance argument and return false if a root cannot be found', function() {
    expect(brentsMethod(x => x * Math.cos(x), -1, -0.01, { errorTolerance: 1e-15 })).to.equal(false)
  })
})

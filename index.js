/*
 * In the following implementation, the inverse quadratic interpolation is applied directly.
 * In other cases the Lagrange polynomial is reduced defining the variables p, q, r, s, and t as explained at the link
 * below and the x value is not overwritten with the bisection method, but modified.
 * For simplicity of the code, here the inverse quadratic interpolation is applied directly and the new guess is
 * overwritten if needed.
 *
 * http://mathworld.wolfram.com/BrentsMethod.html
 *
 * Based in part on https://mmas.github.io/brent-julia with edits and error corrections.
 * (See: https://www.reddit.com/r/math/comments/htmaui/several_explanations_of_brents_method_appear_to/)
 *
 * Other useful resources:
 * https://www.youtube.com/watch?v=-bLSRiokgFk
 * https://en.wikipedia.org/wiki/Brent%27s_method#Brent's_method
 * https://rosettacode.org/wiki/Roots_of_a_function#Brent.27s_Method_2 (Note errors are present)
 * https://en.wikipedia.org/wiki?title=Talk:Brent%27s_method#Removed_code
 * https://en.wikipedia.org/wiki?title=Talk:Brent%27s_method#Thanks_to_the_authors
 *
 */

/**
 * @function brentsMethod
 * @param {Function}  f          The function for which roots are desired.
 * @param {Number}    lowerLimit The lower value used to bracket root finding into the function.
 * @param {Number}    upperLimit The upper value used to bracket root finding into the function.
 * @param {Object}    options    An optional arguments object.
 * @param {Number}    [options.errorTolerance=1e-7] Used to determine how close the bounds bracketing root finding must
 *                                                  converge before quitting.
 * @param {Number}    [options.maxIterations=50]    The maximum number of iterations before root finding will fail.
 * @return {Number|Boolean} Returns a input value resulting in a suitable root if successful. Returns false on failure.
 */
module.exports = (
  f,
  lowerLimit,
  upperLimit,
  {
    errorTolerance = 1e-7,
    maxIterations = 50,
  } = {},
) => {
  // xTolerance is used to determine how close the bounds need to converge before quitting.
  const xTolerance = errorTolerance
  // This is a computational limit and doesn't need to be configured
  const yTolerance = 2 * Number.EPSILON

  // x0 = a
  // x1 = b
  // y0 = fa
  // y1 = fb
  let x0 = lowerLimit
  let x1 = upperLimit
  let y0 = f(x0)
  let y1 = f(x1)

  // Swap lower and upper bounds so that y1 is closest to 0
  // This makes b a better approximation of the intercept than a and it simulates a being the previous iteration of b
  if (Math.abs(y0) < Math.abs(y1)) {
    let temporary = x0
    x0 = x1
    x1 = temporary

    temporary = y0
    y0 = y1
    y1 = temporary
  }

  // c = a
  let x2 = x0
  let y2 = y0
  // d
  let x3 = x2
  let bisected = true

  while (maxIterations) {
    maxIterations--

    // Stop the bounds converge to less than the tolerance
    if (Math.abs(x1 - x0) < xTolerance) {
      return x1
    }
    // Stop if it's found a suitable on a root
    if (Math.abs(y1) < yTolerance) {
      return x1
    }

    let x

    // Use inverse quadratic interpolation if f(x0) !== f(x1) !== f(x2)
    // (You can't draw a parabola without some distinct y values)
    if (Math.abs(y0 - y2) > yTolerance && Math.abs(y1 - y2) > yTolerance) {
      x = ((x0 * y1 * y2) / ((y0 - y1) * (y0 - y2))) +
          ((x1 * y0 * y2) / ((y1 - y0) * (y1 - y2))) +
          ((x2 * y0 * y1) / ((y2 - y0) * (y2 - y1)))
    // If IQI is not possible use the secant method of linear interpolation
    } else {
      x = x1 - (y2 * ((x1 - x0) / (y1 - y0)))
    }

    let delta = Math.abs(2 * Number.EPSILON * Math.abs(x1))
    let currentStep = Math.abs(x - x1)
    let previousStep = Math.abs(x1 - x2)
    let secondStep = Math.abs(x2 - x3)
    // Use the bisection method under these conditions:
    if (
      // (x < ((3 * x0) + x1) / 4 && x > x1) ||
      ((x - (((3 * x0) + x1) / 4)) * (x - x1) >= 0) ||
      // If interpolation resulting in a very small step, use bisection instead
      (bisected && currentStep >= previousStep / 2) ||
      (!bisected && currentStep >= secondStep / 2) ||
      // If previous steps were very close to b then use bisection
      (bisected && previousStep < delta) ||
      (!bisected && secondStep < delta)
    ) {
      x = (x0 + x1) / 2
      bisected = true
    } else {
      bisected = false
    }

    let y = f(x)
    // Stop if it's found a suitable on a root
    if (Math.abs(y) < yTolerance) {
      return x
    }

    // Set c and d to the previous steps
    x3 = x2
    x2 = x1

    // Choose the new a and b to bracket the intercept
    if ((y0 * y < 0)) {
      // b = s
      x1 = x
      y1 = y
    } else {
      // a = s
      x0 = x
      y0 = y
    }

    // Swap lower and upper bounds so that y1 is closest to 0
    // This makes b a better approximation of the intercept than a
    if (Math.abs(y0) < Math.abs(y1)) {
      let temporary = x0
      x0 = x1
      x1 = temporary

      temporary = y0
      y0 = y1
      y1 = temporary
    }
  }

  // Max iterations hit and no root found
  return false
}

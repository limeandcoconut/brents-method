# Brent's Method

## Description
Brent's Method is a novel, highly efficient method for finding the roots of a function within given bounds - that is, where the function returns 0 (or very nearly 0), also known as an x-intercept. 

[Wikipedia's entry](https://en.wikipedia.org/wiki/Brent%27s_method) reads:
> In numerical analysis, Brent's method is a root-finding algorithm combining the bisection method, the secant method and inverse quadratic interpolation. It has the reliability of bisection but it can be as quick as some of the less-reliable methods. The algorithm tries to use the potentially fast-converging secant method or inverse quadratic interpolation if possible, but it falls back to the more robust bisection method if necessary.

## Example
```js
const brentMethod = require('brents-method')

brentsMethod(
  x => (x + 3) * Math.pow(x - 1, 2),
  -4,
  4 / 3,
) // -3
```

## Parameters
| Param                     | Type                  | Default           | Description                                                                                   |
| ---                       | ---                   | ---               | ---                                                                                           |
| f                         | <code>function</code> |                   | The function for which roots are desired.                                                     |
| lowerLimit                | <code>Number</code>   |                   | The lower value used to bracket root finding into the function.                               |
| upperLimit                | <code>Number</code>   |                   | The upper value used to bracket root finding into the function.                               |
| options                   | <code>Object</code>   |                   | An optional arguments object.                                                                 |
| [options.errorTolerance]  | <code>Number</code>   | <code>1e-7</code> | Used to determine how close the bounds bracketing root finding must converge before quitting. |
| [options.maxIterations]   | <code>Number</code>   | <code>50</code>   | The maximum number of iterations before root finding will fail.                               |

## Specifics
In my implementation, the inverse quadratic interpolation is applied directly. In other cases, the Lagrange polynomial is [reduced by defining the variables p, q, r, s, and t](http://mathworld.wolfram.com/BrentsMethod.html), and the x value is not overwritten with the bisection method, but modified. For simplicity's sake, the inverse quadratic interpolation is applied directly in this implementation and the new guess is overwritten if needed.

This is based in part on a number of other implementations and references.

Useful references:
https://www.youtube.com/watch?v=-bLSRiokgFk
https://en.wikipedia.org/wiki/Brent%27s_method#Brent's_method
https://en.wikipedia.org/wiki?title=Talk:Brent%27s_method#Removed_code

### Gotchas
Several implementations I have seen  [contain a common error](https://www.reddit.com/r/math/comments/htmaui/several_explanations_of_brents_method_appear_to/), which I carefully corrected. The bug isn't fatal, but can cause the algorithm to run extra iterations. Two of these are listed below, both as useful references and as a warning to avoid this error.

One in [Julia](https://mmas.github.io/brent-julia)
And one in [C++](https://rosettacode.org/wiki/Roots_of_a_function#Brent.27s_Method_2)

## Testing
```
npm test
```

If you have suggestions for particularly trying functions, or better tests, please hit me up 😁

## TODO:

- [ ] More thorough description than a wiki link
- [ ] Usage stats


## Feedback ✉️

[Website 🌐](https://jacobsmith.tech)

[js@jacobsmith.tech 📧](mailto:js@jacobsmith.tech)

[https://github.com/limeandcoconut 🐙😸](https://github.com/limeandcoconut)

[@limeandcoconut 🐦](https://twitter.com/limeandcoconut)

Cheers!

## License

ISC, see [license](./license) for details.



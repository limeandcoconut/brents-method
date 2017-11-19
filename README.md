# Brent's Method
A root solver for functions using Brent's Method. Based on the work of Borgar [Thorsteinsson](https://gist.github.com/borgar/3317728).


## Example
```js
const BrentMethod = require('brents-method')

BrentsMethod({
    func: (x) => (x + 3) * Math.pow(x - 1, 2),
    lowerLimit: -4,
    upperLimit: 4 / 3,
}) // -3
```

## Testing
Coming soon.

## Feedback ✉️

[messagethesmith@gmail.com](messagethesmith@gmail.com)

[https://github.com/limeandcoconut](https://github.com/limeandcoconut)

[@limeandcoconut](https://twitter.com/limeandcoconut)

Cheers!

## TODO:

- [ ] Tests
- [ ] More thorough description than a wiki link
- [ ] Usage stats

## Usage Stats
Coming soon.

## License

MIT, see [LICENSE.md](http://github.com/limeandcoconut/brents-method/blob/master/LICENSE.md) for details.

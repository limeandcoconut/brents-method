# Brent's Method
A root solver for functions using Brent's Method. Based on the work of Borgar [Thorsteinsson](https://gist.github.com/borgar/3317728).


## Example
```js
const brentMethod = require('brents-method')

brentsMethod({
    func: (x) => (x + 3) * Math.pow(x - 1, 2),
    lowerLimit: -4,
    upperLimit: 4 / 3,
}) // -3
```

## Testing
Coming soon.

## TODO:

- [ ] Tests
- [ ] More thorough description than a wiki link
- [ ] Usage stats


## Feedback ✉️

[Website 🌐](https://jacobsmith.tech)

[js@jacobsmith.tech](mailto:js@jacobsmith.tech)

[https://github.com/limeandcoconut](https://github.com/limeandcoconut)

[@limeandcoconut 🐦](https://twitter.com/limeandcoconut)

Cheers!

## License

ISC, see [license](./license) for details.



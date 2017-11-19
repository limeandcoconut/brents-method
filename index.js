module.exports = ({func, lowerLimit, upperLimit, errorTolerance, maxIterations}) => {
    let a = lowerLimit
    let b = upperLimit
    let c = a
    let fa = func(a)
    let fb = func(b)
    let fc = fa

    // Actual tolerance.
    let actualTolerance
    // Step at this iteration.
    let newStep
    // Distance from the current to the last approximation.
    let previousStep
    // Interpolation step is calculated in the form p/q. Division is delayed until the last moment.
    let p
    let q

    errorTolerance = errorTolerance || 0
    maxIterations = maxIterations || 1000

    while (maxIterations > 0) {
        maxIterations--

        previousStep = b - a

        // If c is closer than b, swap so that b to is the best approximation.
        if (Math.abs(fc) < Math.abs(fb)) {
            a = b
            b = c
            c = a
            fa = fb
            fb = fc
            fc = fa
        }

        actualTolerance = (1e-15 * Math.abs(b)) + (errorTolerance / 2)
        // Bisection is default.
        newStep = (c - b) / 2

        if (Math.abs(newStep) <= actualTolerance || fb === 0) {
            // Acceptable approximation is found.
            return b
        }

        // If previousStep was large enough and was in right direction, interpolation may be tried.
        if (Math.abs(previousStep) >= actualTolerance && Math.abs(fa) > Math.abs(fb)) {
            let t1
            let cb
            let t2

            cb = c - b

            if (a === c) {
                // If we have only two distinct points use linear interpolation.
                t1 = fb / fa
                p = cb * t1
                q = 1.0 - t1
            } else {
                // Inverse quadratic interpolation.
                q = fa / fc
                t1 = fb / fc
                t2 = fb / fa
                p = t2 * ((cb * q * (q - t1)) - ((b - a) * (t1 - 1)))
                q = (q - 1) * (t1 - 1) * (t2 - 1)
            }

            if (p > 0) {
                // p was calculated with the opposite sign; make p positive.
                q = -q
            } else {
                // and assign possible minus to q.
                p = -p
            }

            if (p < ((0.75 * cb * q) - (Math.abs(actualTolerance * q) / 2)) &&
                p < Math.abs(previousStep * q / 2)) {
                // If (b + p / q) falls in [b,c] and isn't too large it is accepted.
                newStep = p / q
            }

            // If p/q is too large then the bissection procedure can further reduce [b,c].
        }

        // Adjust the step to be not less than tolerance.
        if (Math.abs(newStep) < actualTolerance) {
            newStep = (newStep > 0) ? actualTolerance : -actualTolerance
        }

        // Save the previous approximation.
        a = b
        fa = fb
        // Do new step.
        b += newStep
        fb = func(b)

        if ((fb > 0 && fc > 0) ||
            (fb < 0 && fc < 0)) {
            // Adjust c for it to have a sign opposite to that of b
            c = a
            fc = fa
        }
    }
}

function RoundsInLower(N) {
    if (N === 2) {
        return 0
    } else if (N === 3) {
        return 1
    }

    // get # of teams in upper
    const P = Math.pow(2, Math.ceil(Math.log(N)/Math.log(2)))
    const U1 = 2*N - P
    let U2 = U1/2 + N - U1;
    const upper = [U1, U2]
    for (let i = U2/2; i > 1; i/=2) {
        upper.push(i)
    }
    
    // format the lower bracket like the upper bracket, treat losers as N
    let losers = (U1 + U2)/2
    const logCeil = Math.pow(2, Math.ceil(Math.log(losers)/Math.log(2)))
    const L1 = 2 * losers - logCeil
    const L2 = L1/2 + losers - L1
    const lower = [L1, L2]
    
    let i = 2
    while (i < upper.length) {
        const last = (lower[lower.length - 1] + upper[i])/2
        // if last is not a power of 2
        const floorPowOf2 = Math.log(last)/Math.log(2)
        if (last%floorPowOf2 !== 0) {
            lower.push(lower[lower.length - 1]/2)
        } else {
            lower.push(last)
            i++
        }
    }

    return lower.length
}

export default RoundsInLower
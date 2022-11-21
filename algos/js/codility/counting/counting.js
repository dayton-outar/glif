
const counting = (A, m) => {
    const n = A.length
    let count = Array(m + 1).fill(0);
    for (let i = 0; i < n; i++) {
        count[A[i]]++;
    }

    return count;
}

console.log( counting([0, 0, 4, 2, 4, 5], 5) );

const slowSolution = (A, B, m) => {
    const n = A.length;
    const sumA = A.reduce((p, c) => p + c, 0);
    const sumB = B.reduce((p, c) => p + c, 0);

    for ( let i = 0; i < n; i ++ ) {
        for ( let j = 0; j < n; j++ ) {
            let change = B[j] - A[i];
            sumA += change;
            sumB -= change;
            if (sumA == sumB) {
                return true;
            }
            sumA -= change;
            sumB += change;
        }
    }

    return false;
}

const fastSolution = (A, B, m) => {
    const n = A.length;
    const sumA = A.reduce((p, c) => p + c, 0);
    const sumB = B.reduce((p, c) => p + c, 0);

    let d = Math.abs(sumB - sumA);
    console.log( `before = ${d}` );
    if (d % 2 == 1) return false; // Why odd number difference fails requirement?

    d = Math.floor( d / 2 );
    console.log( `after = ${d}` );

    let count = counting(A, m);
    console.log( `count(s): ${count}` );
    for ( let i = 0; i < n; i++ ) {
        let value = B[i] - d;
        if ( (value > 0) && (value <= m) && (count[value] > 0) ) {
            console.log( ` i: ${i} --> value: ${value} --> count: ${count[value]}` );
            return true;
        }
    }

    return false;
}

// console.log( fastSolution([0, 1, 1, 4, 5, 3, 2, 1], [5, 4, 3, 2, 1, 1, 1, 0], 5) ); //
console.log( fastSolution([0, 1, 1, 4, 5, 3, 2, 1], [5, 4, 3, 2, 1, 2, 1, 1], 5) );
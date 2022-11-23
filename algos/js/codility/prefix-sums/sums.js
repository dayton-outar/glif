console.log( [2, 1, 5, 3, 2] );

const prefixSums = (A) => {
    const n = A.length;
    let P = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1); i++ ) {
        P[i] = P[i - 1] + A[i - 1];
    }

    return P;
}

console.log( prefixSums([2, 1, 5, 3, 2]) );

const countTotal = (P, x, y) => P[y + 1] - P[x];

console.log( countTotal([ 0, 2, 3, 8, 11, 13 ], 1, 2) ); // 8 - 2 = 6

const mushrooms = (A, k, m) => {
    let n = A.length;
    let result = 0;
    const sums = prefixSums(A);

    //for ( let i = 0; i < )
    return result;
}

console.log( mushrooms( [], 4, 6) );
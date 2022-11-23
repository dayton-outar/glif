// console.log( [2, 1, 5, 3, 2] );

const prefixSums = (A) => {
    const n = A.length;
    let P = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1); i++ ) {
        P[i] = P[i - 1] + A[i - 1];
    }

    return P;
}

// console.log( prefixSums([2, 1, 5, 3, 2]) );

const countTotal = (P, x, y) => P[y + 1] - P[x];

// console.log( countTotal([ 0, 2, 3, 8, 11, 13 ], 1, 2) ); // 8 - 2 = 6

const mushrooms = (A, k, m) => {
    let n = A.length;
    let result = 0;
    const sums = prefixSums(A);

    const min1 = Math.min(m , k) + 1;
    console.log(`min2 ----> ${min1}`);
    for ( let i = 0; i < min1; i++ ) {
        let leftPos = k - i;
        let rightPos = Math.min( n - 1, Math.max( k, (k + m - 2 * i) ) );        
        result = Math.max( result, countTotal( sums, leftPos, rightPos ) );
        console.log( leftPos, rightPos, `---> ${result}` );
    }

    const min2 = Math.min( m + 1, n - k );
    console.log(`min2 ----> ${min2}`);
    for ( let i = 0; i < min2; i++ ) {
        let rightPos = k + i;
        let leftPos = Math.max( 0, Math.min( k, (k - (m - 2 * i) ) ) );
        result = Math.max( result, countTotal( sums, leftPos, rightPos ) );
        console.log( leftPos, rightPos, `---> ${result}` );
    }

    return result;
}

console.log( [2, 3, 7, 5, 1, 3, 9], prefixSums( [2, 3, 7, 5, 1, 3, 9] ) );
console.log( mushrooms( [2, 3, 7, 5, 1, 3, 9], 4, 6) );
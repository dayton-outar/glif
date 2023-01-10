const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array.from(Array(n + 1), () => new Array(k + 1).fill(0) );

    for ( let i = 1; i < dp[0].length; i++ ) {
        dp[0][i] = Number.MAX_SAFE_INTEGER; // MAX_SAFE_INTEGER represents infinity
    }

    for ( let i = 1; i < (n + 1); i++ ) {
        
        for ( let j = 1; j < C[i - 1]; j++ ) {
            console.log('initial');
            dp[i][j] = dp[i - 1][j];
        }

        console.log( `2. ${i} ----> `, dp );

        for ( let j = C[i - 1]; j < (k + 1); j++ ) {
            console.log(C[i - 1]);
            dp[i][j] = Math.min(dp[i][j - C[i - 1]] + 1, dp[i - 1][j]);
        }

        console.log( `3. ${i} ----> `, dp );
    }

    return dp[n];
}

// const dynamicCoinChanging = (C, k) => {
//     const n = C.length;
//     const dp = Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
//     dp[0] = 0;

//     for ( let i = 1; i < (n + 1); i++ ) {
//         for ( let j = C[i - 1]; j < (k + 1); j++ ) {
//             dp[j] = Math.min(dp[j - C[i - 1]] + 1, dp[j]);
//         }
//     }

//     return dp;
// }

console.log( dynamicCoinChanging( [1, 3, 4], 6 ) );

const frog = (S, k, q) => {
    const n = S.length;
    const dp = Array(k + 1).fill(0);
    dp[0] = 1;

    for ( let j = 1; j < (k + 1); j++ ) {
        for ( let i = 0; i < n; i++ ) {
            if ( S[i] <= j ) {
                dp[j] = (dp[j] + dp[j - S[i]]) % q;
            }
        }
    }
    console.log( dp );

    return dp[k];
}

// console.log( frog( [ 1, 3, 5 ], 7, 7 ) );

const pascalTriangle = n => {
    let bc = Array.from(Array(n + 1), () => new Array(n + 1).fill(0) );

    // Initializing conditions
    for (let i = 0; i <= n; i++ ) {
        bc[i][0] = 1;
        bc[i][i] = 1;
    }

    // Fill out recurrence relational values. Based on Pascal triangle starts at level 3 but 2 for array index (since array starts at 0)
    for (let i = 2; i <= n; i++ ) {
        for (let j = 1; j <= i; j++ ) {
            bc[i][j] = bc[i - 1][j - 1] + bc[i - 1][j];
        }
    }

    return bc;
}

const binomialCoefficient = (n , k) => {
    const pt = pascalTriangle(n);

    return pt[n][k]; // n choose k
}

// console.log( pascalTriangle(5) );

// console.log( binomialCoefficient(5, 4) );
// const dynamicCoinChanging = (C, k) => {
//     const n = C.length;
//     const dp = Array(n + 1).fill( Array(k + 1).fill(0) );
    
//     for ( let i = 1; i < dp[0].length; i++ ) {
//         dp[0][i] = Number.MAX_SAFE_INTEGER;
//     }

//     for ( let i = 1; i < (n + 1); i++ ) {
//         for ( let j = 1; j < C[i - 1]; j++ ) {
//             dp[i][j] = dp[i - 1][j];
//         }
//         for ( let j = C[i - 1]; j < (k + 1); j++ ) {
//             dp[i][j] = Math.min(dp[i][j - C[i - 1]] + 1, dp[i - 1][j]);
//         }
//     }

//     return dp[n];
// }

const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    for ( let i = 1; i < (n + 1); i++ ) {
        for ( let j = C[i - 1]; j < (k + 1); j++ ) {
            dp[j] = Math.min(dp[j - C[i - 1]] + 1, dp[j]);
        }
    }

    return dp;
}

console.log( dynamicCoinChanging( [10, 20, 50], 130 ) );

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

    return dp[k];
}

console.log( frog( [ ],  ) );
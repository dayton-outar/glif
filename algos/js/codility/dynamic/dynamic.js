const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array(n + 1).fill( Array(k + 1).fill(0) );
    
    for ( let i = 1; i < dp[0].length; i++ ) {
        dp[0][i] = Number.MAX_SAFE_INTEGER;
    }

    for ( let i = 1; i < (n + 1); i++ ) {
        for ( let j = 1; j < C[i - 1]; j++ ) {
            dp[i][j] = dp[i - 1][j];
        }
        for ( let j = C[i - 1]; j < (k + 1); j++ ) {
            dp[i][j] = Math.min(dp[i][j - C[i - 1]] + 1, dp[i - 1][j]);
        }
    }

    return dp[n];
}

console.log( dynamicCoinChanging( [10, 20, 50], 130 ) );
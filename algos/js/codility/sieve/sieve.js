const sieve = n => {
    let sieve = Array(n + 1).fill(true);
    sieve[0] = sieve[1] = false;

    for ( let i = 2; i * i <= n; i++ ) {
        if (sieve[i]) {
            k = i * i;
            while ( k <= n ) {
                sieve[k] = false;
                k += i;
            }
        }
    }

    return sieve;
}

console.log( sieve(20) );

const arrayF = n => {
    let F = Array(n + 1).fill(0);
    
    for ( let i = 2; i * i <= n; i++ ) {
        if (F[i] == 0) {
            k = i * i;
            while ( k <= n ) {
                if ( F[k] == 0 ) {
                    F[k] = i;
                }
                k += i;
            }
        }
    }

    return F;
}

console.log( arrayF(20) );

const factorization = x => {
    let primeFactors = [];
    let F = arrayF(x);

    while ( F[x] > 0 ) {
        primeFactors.push(F[x]);
        x /= F[x];
    }
    primeFactors.push(x);

    return primeFactors;
}

console.log( factorization(20) );
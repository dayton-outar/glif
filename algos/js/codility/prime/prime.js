const divisors = n => {
    let i = 1;
    let result = 0;

    while ( i * i < n ) {
        if (n % i == 0) {
            result += 2;
        }
        i++;
    }

    if ( i * i == n ) {
        result++;
    }

    return result;
}

console.log( divisors(9) );

const primality = n => {
    let i = 2;

    while ( i * i <= n ) {
        if ( n % i == 0 ) return false;
        i++;
    }

    return true;
}

console.log( primality(7) );
console.log( primality(9) );

const coins = n => {
    let result = 0;
    let coin = Array(n).fill(0);

    for ( let i = 1; i <= n;i++ ) {
        let k = i;
        while ( k <= n ) {
            coin[k - 1] = (coin[k - 1] + 1) % 2;
            k += i;
        }
        result += coin[i - 1];
    }

    return result;
}

console.log( coins(10) );
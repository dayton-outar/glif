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

console.log( divisors(8) );

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
    let coin = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1);i++ ) {
        let k = i;
        while ( k <= n ) {
            console.log( `i --> ${i} ... k --> ${k}` );
            coin[k] = (coin[k] + 1) % 2;
            k++;
        }
        result += coin[i];
    }

    console.log( coin );

    return result;
}

console.log( coins(10) );
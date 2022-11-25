const gcdBySub = (a, b) => (a == b) ? a : ((a > b) ? gcdBySub(a - b, b) : gcdBySub(a, b - a));

const gcd = (a, b) => a % b == 0 ? b : gcd(b, a % b);

const euclidean = (a, b, res) => {
    if (a == b)
        return res * a;
    else if ((a % 2 == 0) && (b % 2 == 0))
        return gcd(Math.floor(a / 2), Math.floor(b / 2), 2 * res);
    else if ((a % 2 == 0))
        return gcd(Math.floor(a / 2), b, res);
    else if (b % 2 == 0)
        return gcd(a, Math.floor(b / 2), res);
    else if (a > b)
        return gcd(a - b, b, res);
    else
        return gcd(a, b - a, res);
}

console.log(`gcd(12, 18) ==> ${gcd(12, 18)}`);
console.log(`gcd(24, 9) ==> ${gcd(24, 9)}`);
console.log(`gcd(9, 6) ==> ${gcdBySub(9, 6)}`);
console.log(`gcd(6, 3) ==> ${gcd(6, 3)}`);
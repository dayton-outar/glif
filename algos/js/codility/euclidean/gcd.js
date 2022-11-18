const gcd = (a, b) => a % b == 0 ? b : gcd(b, a % b);

console.log(`gcd(16, 8) ==> ${gcd(8, 2)}`);
console.log(`gcd(27, 9) ==> ${gcd(27, 9)}`);
console.log(`gcd(34, 17) ==> ${gcd(34, 17)}`);

const euclidean = (a, b, res) => {
    if (a == b)
        return res * a
    else if ((a % 2 == 0) && (b % 2 == 0))
        return gcd(Math.floor(a / 2), Math.floor(b / 2), 2 * res)
    else if ((a % 2 == 0))
        return gcd(Math.floor(a / 2), b, res)
    else if (b % 2 == 0)
        return gcd(a, Math.floor(b / 2), res)
    else if (a > b)
        return gcd(a - b, b, res);
    else
        return gcd(a, b - a, res);
}
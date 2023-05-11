# Count Semi Primes

## Problem

A _prime_ is a positive integer $X$ that has exactly two distinct divisors: 1 and $X$. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A _semiprime_ is a natural number that is the product of two (not necessarily distinct) prime numbers. The first few semiprimes are 4, 6, 9, 10, 14, 15, 21, 22, 25, 26.

You are given two non-empty arrays $P$ and $Q$, each consisting of $M$ integers. These arrays represent queries about the number of semiprimes within specified ranges.

Query $K$ requires you to find the number of semiprimes within the range $(P[K], Q[K])$, where $1 ≤ P[K] ≤ Q[K] ≤ N$.

For example, consider an integer $N = 26$ and arrays $P, Q$ such that:

```js
    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
```

The number of semiprimes within each of these ranges is as follows:

- (1, 26) is 10,
- (4, 10) is 4,
- (16, 20) is 0.

Write a function:

```js
    function solution(N, P, Q);
```

that, given an integer $N$ and two non-empty arrays $P$ and $Q$ consisting of $M$ integers, returns an array consisting of $M$ elements specifying the consecutive answers to all the queries.

For example, given an integer $N = 26$ and arrays $P$, $Q$ such that:

```js
    P[0] = 1    Q[0] = 26
    P[1] = 4    Q[1] = 10
    P[2] = 16   Q[2] = 20
```

the function should return the values [10, 4, 0], as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1..50,000]$;
- $M$ is an integer within the range $[1..30,000]$;
- each element of arrays $P$ and $Q$ is an integer within the range $[1..N]$;
- $P[i] ≤ Q[i]$.

## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function getArray(N) {
    let A = [];
    
    for (let i = 0; i < N; i++) {
        A.push(0)
    }
    
    return A;
}
    
function solution(N, P, Q) {
    let m = P.length;
    let M = P.map(i => 0);    

    let f = getArray(N + 1);
    let i = 2;
    
    while (i * i <= N) {
        if (f[i] == 0) {
            let k = i * i;
            while (k <= N) {
                if (f[k] == 0) {
                    f[k] = i;
                }
                k += i;
            }
        }
        i++;
    }

    let semi =  getArray(N + 1);

    let sum = 0;
    for (let k = 1; k <= N; k++) {
        if (f[k] != 0) {
            let b = k / f[k];
            if (f[b] == 0) {
                sum++;
            }
        }
        semi[k] = sum;
    }

    for (let mi = 0; mi < m; mi++) {
        let p = P[mi];
        let q = Q[mi];
        M[mi] = semi[q] - semi[p - 1];
    }

    return M;
}

solution( 26, [1, 4, 16], [26, 10, 20] ); // [ 10, 4, 0 ]
```

This is a lengthy solution and obviously a very mathematical one. Once again, the principle of finding prime numbers by knowing that **every composite number has a _prime factor_ less than or equal to its square root** is used. The first set of nested `while` loops are used to identify all _prime factors_ between 0 and 26 in a type of array dictionary. This forms the basis for the next phase of the solution, which is to identify the semi-primes between the provided ranges.

The second major loop from lines 23 to 31 is counting the numbers that's divisible by a prime factor yet having a result that is a prime factor (basically, the definition of a _semi-prime_) by using the [prefix sums](../prefix-sums/) technique. The cheeky technique of using the array dictionary can be seen when a look up is done to find out if the result of the division is a prime factor (`f[b] == 0`). This is so cheeky!

The final loop is used to draw out the difference (between the indices provided in arrays `P` and `Q`) found in the prefix sums found in the array `semi`. Since, the elements in the provided range needs to be included some math needed to be done to ensure that this happens, hence `semi[p - 1]`. See below completed array of `semi` for case with $N = 26$, $P = [1, 4, 16]$ and $Q = [26, 10, 20]$,

```js
[
  0, 0,  0, 0, 1, 1, 2, 2,
  2, 3,  4, 4, 4, 4, 5, 6,
  6, 6,  6, 6, 6, 7, 8, 8,
  8, 9, 10
]
```

You can work out how `M` is arrived from the above values in `semi`.

The detected time complexity of this solution is $O(n + log\text{ }log\text{ }n + m)$, where n is the integer provided and m is the size of the array of ranges provided.
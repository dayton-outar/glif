# Common Prime Divisors

## Problem

A _prime_ is a positive integer $X$ that has exactly two distinct divisors: 1 and $X$. The first few prime integers are 2, 3, 5, 7, 11 and 13.

A prime $D$ is called a _prime divisor_ of a positive integer $P$ if there exists a positive integer $K$ such that $D \times K = P$. For example, 2 and 5 are prime divisors of 20.

You are given two positive integers $N$ and $M$. The goal is to check whether the sets of prime divisors of integers $N$ and $M$ are exactly the same.

For example, given:

- $N = 15$ and $M = 75$, the prime divisors are the same: {3, 5};
- $N = 10$ and $M = 30$, the prime divisors aren't the same: {2, 5} is not equal to {2, 3, 5};
- $N = 9$ and $M = 5$, the prime divisors aren't the same: {3} is not equal to {5}.

Write a function:

```js
    function solution(A, B);
```

that, given two non-empty arrays $A$ and $B$ of $Z$ integers, returns the number of positions $K$ for which the prime divisors of $A[K]$ and $B[K]$ are exactly the same.

For example, given:

```js
    A[0] = 15   B[0] = 75
    A[1] = 10   B[1] = 30
    A[2] = 3    B[2] = 5
```

the function should return 1, because only one pair (15, 75) has the same set of prime divisors.

Write an **efficient** algorithm for the following assumptions:

- $Z$ is an integer within the range $[1 ... 6,000]$;
- each element of arrays $A$ and $B$ is an integer within the range $[1 ... 2,147,483,647]$.

## Solution

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function gcd(a, b) {
    if ((a % b) == 0) {
        return b;
    } else {
        return gcd(b, a % b);
    }
}

function solution(A, B) { 
    let res = 0;

    for (let i = 0; i < A.length; i++) {
        let a = A[i];
        let b = B[i];

        let d = gcd(a, b);
        let c = 0;

        while (c != 1) {
            c = gcd(a, d);
            a /= c;
        }

        c = 0;
        
        while (c != 1) {
            c = gcd(b, d);
            b /= c;
        }

        if (a == 1 && b == 1) {
            res++;
        }

    }
    
    return res;
}

solution( [15, 10, 3], [75, 30, 5] ); // 1
```

The first loop iterates through the elements of the pair of the arrays provided. The two inner loops work towards a baseline to find _common prime divisors_ between the pair of numbers in $A$ and $B$. The iteration of these inner loops are using 1 as the baseline for finding the lowest _common prime divisors_. Remember that 1 divides any natural number. So, if no number greater than 1 exists to divide a given number, the number 1 will always be able to divide that given number.

When the `gcd` between one of the pairs divides until it arrives at one, we know that both pairs share the same _prime divisors_. Take for example, the pair 15 and 75,
 - The `gcd` of 15 and 75 is 15
 - When the `gcd` above divides 15, we get 1. But we need to find if we can break down the other number to 1.
 - When the `gcd` (of 15 and 75) divides 75, we get 5. (We need to work recursively down to the `gcd` of 1 to get the _prime divisors_).
 - When we take the quotient of the last operation, which is 5, to get the `gcd` of it and 75, we get 5.
 - When we take 5 and divide it by 5, we arrive at 1 and exit the second inner loop.
 - Because both pairs were worked down to get a quotient of 1, we know that the prime divisors of both pairs are the same.

The number $75$ is a result of $5 \times 5 \times 3$.

The number $15$ is a result of $5 \times 3$.

The set of numbers that multiply to give both $75$ and $15$ is {3, 5}.

When the `gcd` is worked down to 1, but the resulting numbers of `gcd` cannot bring any one of the pairs down to 1, then we know that the pairs do not share the same set of _prime divisors_. For example, with the pair of 10 and 30 when the second inner loop brings the `gcd` down to 3 and 10, the only number that can divide both is 1. But as we proceed to have 3 divide by 1, the loop is exited with 3 as the lowest quotient of the operation.

The detected time complexity of this solution is $O(Z \cdot log(max(A) + max(B))^2)$.
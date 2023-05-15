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

- $Z$ is an integer within the range [1..6,000];
- each element of arrays $A$ and $B$ is an integer within the range [1..2,147,483,647].

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

The first loop iterates through the elements of the pair of the arrays provided. The two inner loops work towards a baseline to find _common prime divisors_ between the pair of numbers in $A$ and $B$. The iteration of these inner loops are ...

The detected time complexity of this solution is $O(Z \cdot log(max(A) + max(B))^2)$.
# Count Factors

## Problem

A positive integer $D$ is a _factor_ of a positive integer $N$ if there exists an integer $M$ such that $N = D \times M$.

For example, 6 is a factor of 24, because $M = 4$ satisfies the above condition (24 = 6 * 4).

Write a function:

```js
    function solution(N);
```

that, given a positive integer $N$, returns the number of its factors.

For example, given $N = 24$, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 2,147,483,647]$.


## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(N) {
    let i = 1;
    let factors = 0;

    for(; (i * i) < N; i++) {
        factors += ((N % i) === 0) ? 2 : 0;
    }

    factors += ((i * i) == N) ? 1 : 0;

    return factors;
}

solution(24);
solution(12);
solution(1);
```

Since **every composite number has a _prime factor_ less than or equal to its square root**, the first loop is set up to count factors on this significant mathematical principle. _One of the important points learned here is the significance of knowing mathematical principles to arrive at the most optimal solutions possible_.

So, in the first loop, given that one prime is found as a factor of the number, it means that another factor was used to arrive at the number hence the counter goes up by 2 each time a _prime factor_ is found.

Outside the loop, a final count is made for numbers that are actually the square of a number. For example, 25 (5 $\times$ 5) or 9 (3 $\times$ 3).

The detected time complexity for this solution is $O(\sqrt n)$.
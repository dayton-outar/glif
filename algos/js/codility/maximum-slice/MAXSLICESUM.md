# Max Slice Sum

## Problem

A non-empty array $A$ consisting of $N$ integers is given. A pair of integers $(P, Q)$, such that $0 ≤ P ≤ Q < N$, is called a slice of array $A$. The sum of a slice $(P, Q)$ is the total of $A[P] + A[P+1] + ... + A[Q]$.

Write a function:

```js
    function solution(A);
```

that, given an array $A$ consisting of $N$ integers, returns the maximum sum of any slice of $A$.

For example, given array A such that:

```js
A[0] = 3  A[1] = 2  A[2] = -6
A[3] = 4  A[4] = 0
```

the function should return 5 because:

- (3, 4) is a slice of A that has sum 4,
- (2, 2) is a slice of A that has sum −6,
- (0, 1) is a slice of A that has sum 5,
- no other slice of A has sum greater than (0, 1).

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 1,000,000]$;
- each element of array $A$ is an integer within the range $[−1,000,000 ... 1,000,000]$;
- the result will be an integer within the range $[−2,147,483,648 ... 2,147,483,647]$.

## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    let meh = -Infinity;
    let msf = -Infinity;

    for (let i = 0; i < A.length; i++) {
        meh = Math.max(A[i], meh + A[i]);
        msf = Math.max(msf, meh);
    }
    return parseInt(msf, 10);
}

console.log( solution([3, 2, -6, 4, 0]) ); // 5
```

The solution here is pretty much a similar approach to that taken in [Max Profit](MAXPROFIT.md). The major difference is whereas in the _Max Profit_ solution, the difference between elements is used in the running max, `meh`, in this solution the value of the element is used in the runnnig max.

Let's take a look at another case, to appreciate the magic of this algorithm. In the case of the array that includes, `[ 1, 2, -1, 2, 2, 3, -2, 1]`, we can track `meh` in the following table,

| `A[i]` | `meh` |
| ------:| -----:|
| 1      | 1     |
| 2      | 3     |
| -1     | 2     |
| 2      | 4     |
| 2      | 6     |
| 3      | 9     |
| -2     | 7     |
| 1      | 8     |

So, notice that in this case the maximum sum is at index 5 (the 6<sup>th</sup> element) of the array. At this point in the loop, the `msf` variable becomes useful. So, value returned as the solution for this case is 9.
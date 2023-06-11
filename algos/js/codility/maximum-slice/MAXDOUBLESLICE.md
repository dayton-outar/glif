# Max Double Slice Sum

## Problem

A non-empty array A consisting of N integers is given.

A triplet $(X, Y, Z)$, such that $0 ≤ X < Y < Z < N$, is called a double slice.

The sum of double slice $(X, Y, Z)$ is the total of $A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[Y + 2] + ... + A[Z − 1]$.

For example, array $A$ such that:

```js
    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2
```

contains the following example double slices:

- double slice (0, 3, 6), sum is 2 + 6 + 4 + 5 = 17,
- double slice (0, 3, 7), sum is 2 + 6 + 4 + 5 − 1 = 16,
- double slice (3, 4, 5), sum is 0.

The goal is to find the maximal sum of any double slice.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ consisting of $N$ integers, returns the maximal sum of any double slice.

For example, given:

```js
    A[0] = 3
    A[1] = 2
    A[2] = 6
    A[3] = -1
    A[4] = 4
    A[5] = 5
    A[6] = -1
    A[7] = 2
```

the function should return 17, because no double slice of array A has a sum of greater than 17.

Write an efficient algorithm for the following assumptions:

- N is an integer within the range $[3 ... 100,000]$;
- each element of array A is an integer within the range $[−10,000 ... 10,000]$.

## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    let sumsL = A.map(i => 0);
    let sumsR = A.map(i => 0);

    for (let iL = 1, iR = A.length - 2; iR >= 2; iL++, iR--) {
        sumsL[iL] = Math.max(0, sumsL[iL - 1] + A[iL]);
        sumsR[iR] = Math.max(0, sumsR[iR + 1] + A[iR]);
    }

    let max = sumsL[0] + sumsR[2];

    for (let i = 2; i < A.length - 1; i++) {
        max = Math.max(max, sumsL[i - 1] + sumsR[i + 1]);
    }

    return max;
}

solution( [3, 2, 6, -1, 4, 5, -1, 2] ); // 17
```

It's important to understand the problem before moving into the solution. Let's use the case provided in the problem to better understand what is required.

When the double slice (0, 3, 6) is used, the sum that is required is the sum gained by adding up all the numbers between 0, 3 and 6 but not using the numbers at 0, 3 and 6, where 0 is the lower bound and 6 is the upper bound. So, values of elements between 0 and 3 are `A[1] = 2` and `A[2] = 6`. Values between 3 and 6 are `A[4] = 4` and `A[5] = 5`.

The array, `sumsL`, is basically a running balance starting from the left and running to the right. While `sumsR`, is the running balance starting from the right and running to the left. Take note that the running balance was done by initially excluding the elements at both extreme ends. Take for example the case in the problem, the table below shows the values in the mentioned arrays,

|         | Values                         |
|:------- |:------------------------------ |
| `sumsL` | `[ 0, 2, 8, 7, 11, 16, 0, 0 ]` |
| `sumsR` | `[ 0, 0, 14, 8, 9, 5, 0, 0 ]`  |

So, how does the use of these sums solve the problem of finding the maximal sum of any double slice?

Summing from left to right takes care of keeping track of the first slice as it expands from index 1 to the second to last index. So, the values of `sumsL` are done in sequence of the following slices adding up the _max values_ in between index of the slices,

 - (0, 2) = 2
 - (0, 3) = 8
 - (0, 4) = 7
 - (0, 5) = 11
 - (0, 6) = 16

In likewise manner, we can track the slices and _max values_ of the slices of `sumsR` as follows,

 - (5, 7) = 0
 - (4, 7) = 5
 - (3, 7) = 9
 - (2, 7) = 8
 - (1, 7) = 14

The final loop in this solution, does a crafty job of stitching the max sum values of the first slice and the second slice together as follows

 - (0, 2) + (2, 7) = 10
 - (0, 3) + (3, 7) = 17
 - (0, 4) + (4, 7) = 12
 - (0, 5) + (5, 7) = 11
 - (0, 6) + (6, 7) = 16

 The detected time complexity of this solution is $O(n)$.
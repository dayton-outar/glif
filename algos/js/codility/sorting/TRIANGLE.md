# Triangle

## Problem

An array $A$ consisting of $N$ integers is given. A triplet $(P, Q, R)$ is triangular if $0 ≤ P < Q < R < N$ and:

- $A[P] + A[Q] > A[R]$
- $A[Q] + A[R] > A[P]$
- $A[R] + A[P] > A[Q]$

For example, consider array A such that:

```js
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20
```

Triplet (0, 2, 4) is triangular.

Write a function:

```js
function solution(A);
```

that, given an array $A$ consisting of $N$ integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise.

For example, given array $A$ such that:

```js
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20
```

the function should return 1, as explained above. Given array $A$ such that:

```js
  A[0] = 10    A[1] = 50    A[2] = 5
  A[3] = 1
```

the function should return 0.

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[0 ... 100,000]$;
- each element of array $A$ is an integer within the range $[−2,147,483,648 ... 2,147,483,647]$.

## Solution

The aim of the problem is to _find a triangular triplet_ that exists from the provided array.

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    A.sort((a, b) => (a - b));

    for (var i = 0; i < A.length - 2; i++) {
        var p = A[i],
            q = A[i + 1],
            r = A[i + 2];

        if (p + q > r &&
            q + r > p &&
            r + p > q)
            return 1;
    }
    
    return 0;
}

solution([10, 2, 5, 1, 8, 20]); // 1
```

Let's deconstruct this solution.

Now, why is sorting required at the first line of the `solution` function?

So, why was sorting the array by values important first, especially that there was a condition placed on the indices of the array such that $0 ≤ P < Q < R < N$? An explanation for this can be found in [Sorting for Triangular Triplets](../caterpillar/COUNTRIANGLES.md#sorting-for-triangular-triplets).

The detected time complexity for this solution is $O(n \cdot \text{log n})$.
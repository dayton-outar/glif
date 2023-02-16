# Triangle

## Problem

An array A consisting of N integers is given. A triplet (P, Q, R) is triangular if $0 ≤ P < Q < R < N$ and:

- A[P] + A[Q] > A[R]
- A[Q] + A[R] > A[P]
- A[R] + A[P] > A[Q]

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

that, given an array A consisting of N integers, returns 1 if there exists a triangular triplet for this array and returns 0 otherwise.

For example, given array A such that:

```js
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 20
```

the function should return 1, as explained above. Given array A such that:

```js
  A[0] = 10    A[1] = 50    A[2] = 5
  A[3] = 1
```

the function should return 0.

Write an efficient algorithm for the following assumptions:

- N is an integer within the range [0..100,000];
- each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

## Solution

Credit should be given to Yaseen Shaik (See [here](https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Triangle.md)) for providing this solution.

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

console.log( solution([10, 2, 5, 1, 8, 20]) ); // 1
```

The detected time complexity for this solution is $O(n \cdot \text{log n})$.

Now, why would we sort the array in the first line of the `solution` function?

The aim of the solution is to find the first triplet to declare that a triplet has been found. It does not require all triplets to be found, hence the reason for the return when the condition is met.

So, why was sorting the array by values important first, especially that there was a condition placed on the indices of the array such that $0 ≤ P < Q < R < N$?
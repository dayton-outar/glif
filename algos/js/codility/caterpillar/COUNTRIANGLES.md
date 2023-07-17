# Count Triangles

## Problem

An array $A$ consisting of $N$ integers is given. A triplet $(P, Q, R)$ is triangular if it is possible to build a triangle with sides of lengths $A[P], A[Q]$ and $A[R]$. In other words, triplet $(P, Q, R)$ is triangular if $0 ≤ P < Q < R < N$ and:

- $A[P] + A[Q] > A[R]$,
- $A[Q] + A[R] > A[P]$,
- $A[R] + A[P] > A[Q]$.

For example, consider array $A$ such that:

```js
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12
```

There are four triangular triplets that can be constructed from elements of this array, namely (0, 2, 4), (0, 2, 5), (0, 4, 5), and (2, 4, 5).

Write a function:

```js
    function solution(A);
```

that, given an array $A$ consisting of $N$ integers, returns the number of triangular triplets in this array.

For example, given array $A$ such that:

```js
  A[0] = 10    A[1] = 2    A[2] = 5
  A[3] = 1     A[4] = 8    A[5] = 12
```

the function should return 4, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[0 ... 1,000]$;
- each element of array $A$ is an integer within the range $[1 ... 1,000,000,000]$.

## Solution

The aim of this problem is _to find the number of triplets that are triangular_ based on the mathematical rules provided.

Let's take out one of the 4 triangular triplets mentioned in the use case and break it down. Let's take the triplet (0, 2, 4), which is basically $(A[0], A[2], A[4])$ that meets the following conditions,

 - 10 + 5 > 8
 - 5 + 8 > 10
 - 8 + 10 > 5

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function check(arr, base, mid, end) {
    if ( arr[base] + arr[mid] > arr[end] ) return true;
    
    return false;
}

function solution(A) {    
    let start = 0;
    let mid = 1;
    let end = 2;
    let count = 0;
    
    if(A.length < 3) {
        return 0;
    }
    
    A.sort(function(a, b) {
        return a - b;
    });
    
    for( start = 0; start < A.length - 2; start++) {
        for( mid = start + 1; mid < A.length - 1; mid++ ) {
            end = mid + 1;
            
            while( end < A.length && check(A, start, mid, end) ) {
                end++;
            }
            
            count += end - mid - 1;
        }
    }
    
    return count;
}

solution( [10, 2, 5, 1, 8, 12] );
```

Let's deconstruct this solution.

It appears that the `solution` function has a nested loop with two inner loops. It's obvious that three pointers are used, which would classify this approach as a caterpillar method. The loop and the logics within it are pretty straightforward: perform checks using the `check` function to determine the combination of _triplet_ values that meet the mathematical conditions stated. The `count` variable basically keeps track of a running total of the number of these checks that pass the condition for being _triangular_. Take note that `count += end - mid - 1` is the same as `count += end - (mid + 1)`.

There are 2 things that may not be easily grasped from this solution. The first thing is the involvement of a sort to arrive at an accurate result and the second thing is the time complexity detected. So, the questions are based on the rules outlined about indices, how is it that a sort is required to arrive at the correct answer? And, how is it that a nested loop with two inner loop has a time complexity of $O(n^2)$ and not $O(n^3)$?

### Sorting for Triangular Triplets

Even though the rules in the problem definition stated that a _triplet is triangular_ when $0 ≤ P < Q < R < N$ and,

- $A[P] + A[Q] > A[R]$,
- $A[Q] + A[R] > A[P]$,
- $A[R] + A[P] > A[Q]$.

The important takeaway is that _the sum of any two numbers of the triplet must be greater than any one of the numbers in the triplet_. This is basically what is being expressed in the condition for a triplet being _triangular_. (Take note of this observation from CodeTrading YouTube Channel[^1])

The provided use case outlines the _triangular triplets_ found from the unordered array, `A`. What if the array was ordered? It would look like this `[1, 2, 5, 8, 10, 12]`. Upon the first iteration of the nested loop, the first 3 elements would fail to meet the condition of being a _triangular triplet_ because $1 + 2$ is not greater than $5$. The _triangular triplets_ found from the ordered array are: (2, 3, 4), (2, 3, 5), (2, 4, 5) and (3, 4, 5). These _triangular triplets_ still match up to the values stated from the _triangular triplets_ in the problem definition. See the table below mapping them.

| `A` |  triangular triplets | values of triangular triplets |
|:----|:---------------------|:------------------------------|
| _unordered_: `[10, 2, 5, 1, 8, 12]` | (`A[0]`, `A[2]`, `A[4]`) | (10, 5, 8) |
| | (`A[0]`, `A[2]`, `A[5]`) | (10, 5, 12) |
| | (`A[0]`, `A[4]`, `A[5]`) | (10, 8, 12) |
| | (`A[2]`, `A[4]`, `A[5]`) | (5, 8, 12) |
| _ordered_: `[1, 2, 5, 8, 10, 12]` | (`A[2]`, `A[3]`, `A[4]`)| (5, 8, 10) |
| | (`A[2]`, `A[3]`, `A[5]`) | (5, 8, 12) |
| | (`A[2]`, `A[4]`, `A[5]`) | (5, 10, 12) |
| | (`A[3]`, `A[4]`, `A[5]`) | (8, 10, 12) |

From the definition of a _triangular triplet_, let's say that $R$ is some index in the sorted array as `i + 2`, $Q$ is the index at `i + 1` and $P$ is the index at `i`. Because the array is sorted in ascending order, $A[i + 2]$ is greater than $A[i + 1]$ and $A[i + 1]$ is greater than $A[i]$. Since $A[i + 2]$ is greater than both $A[i + 1]$ and $A[i]$, two of the conditions of being a _triangular triplet_ are met. The conditions are,

 - $A[i + 2] + A[i + 1] > A[i]$ (or $A[R] + A[P] > A[Q]$)
 - $A[i + 2] + A[i] > A[i + 1]$ (or $A[R] + A[Q] > A[P]$)

This can be demonstrated using the sorted array, `[1, 2, 5, 8, 10, 12]`. If the first 3 elements are used for the first 2 rules, they would be evaluated as shown below,

 - $5 + 2 > 1$
 - $5 + 1 > 2$

As mentioned above, the third condition where $A[i] + A[i + 1] > A[i + 2]$ may not be met as in this case $1 + 2$ is not greater than $5$. However, as progress is made further up to the last three, for example, the third condition is met as $8 + 10$ is greater than $12$.

The worst case for counting _triangular triplets_ involves iterating through every element of the sorted array, doing a binary search on every iteration and, doing another iteration through $n - 3$ elements within the binary search loop. The expanded equation for the performance of the nested loop could be $O(n \cdot \text{log n} \cdot n)$ (or $(O(n^2 \text{log n}))$).

[^1]: [Triangle Triplet in Python and C++ Codility Solutions Lesson 6](https://youtu.be/YCA1D--El-Q)
# Maximum Non-overlapping Segments

## Problem

Located on a line are $N$ segments, numbered from 0 to $N − 1$, whose positions are given in arrays $A$ and $B$. For each $I$ $(0 ≤ I < N)$ the position of segment $I$ is from $A[I]$ to $B[I]$ (inclusive). The segments are sorted by their ends, which means that $B[K] ≤ B[K + 1]$ for $K$ such that $0 ≤ K < N − 1$.

Two segments $I$ and $J$, such that $I ≠ J$, are overlapping if they share at least one common point. In other words, $A[I] ≤ A[J] ≤ B[I]$ or $A[J] ≤ A[I] ≤ B[J]$.

We say that the set of segments is non-overlapping if it contains no two overlapping segments. The goal is to find the size of a non-overlapping set containing the maximal number of segments.

For example, consider arrays $A$, $B$ such that:

```js
    A[0] = 1    B[0] = 5
    A[1] = 3    B[1] = 6
    A[2] = 7    B[2] = 8
    A[3] = 9    B[3] = 9
    A[4] = 9    B[4] = 10
```

The segments are shown in the figure below.

![Overlapping Segments](/.attachments/overlapping.png)

The size of a non-overlapping set containing a maximal number of segments is 3. For example, possible sets are {0, 2, 3}, {0, 2, 4}, {1, 2, 3} or {1, 2, 4}. There is no non-overlapping set with four segments.

Write a function:

```js
    function solution(A, B);
```

that, given two arrays $A$ and $B$ consisting of $N$ integers, returns the size of a non-overlapping set containing a maximal number of segments.

For example, given arrays $A$, $B$ shown above, the function should return 3, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[0 ... 30,000]$;
- each element of arrays $A$ and $B$ is an integer within the range $[0 ... 1,000,000,000]$;
- $A[I] ≤ B[I]$, for each $I$ $(0 ≤ I < N)$;
- $B[K] ≤ B[K + 1]$, for each $K$ $(0 ≤ K < N − 1)$.

## Solution

This problem may take some re-reading before the idea of just understanding how to count segments that don't overlap.

Based on the use case provided, it counts possible sets of non-overlapping segments as follows,

| Non-overlapping set | Indices of array for the set |
|:--------------------|:-----------------------------|
| {0, 2, 3} | `A[0]` = 1 ... `B[0]` = 5, `A[2]` = 7 ... `B[2]` = 8, `A[3]` = 9 ... `B[3]` = 9 |
| {0, 2, 4} | `A[0]` = 1 ... `B[0]` = 5, `A[2]` = 7 ... `B[2]` = 8, `A[4]` = 9 ... `B[4]` = 10 |
| {1, 2, 3} | `A[1]` = 3 ... `B[1]` = 6, `A[2]` = 7 ... `B[2]` = 8, `A[3]` = 9 ... `B[3]` = 9 |
| {1, 2, 4} | `A[1]` = 3 ... `B[1]` = 6, `A[2]` = 7 ... `B[2]` = 8, `A[4]` = 9 ... `B[4]` = 10 |

As mentioned in the problem definition, _there is no non-overlapping set with four segments_. Take note that the set {0, 1, 2, 3} has the segment 0 overlapping with segment 1. Also note that segment 3 overlaps with segment 4. Hence, every non-overlapping set has either segment 0 or segment 1 but does not include bith. The same goes for segment 3 or segment 4. Since the aim of this problem is to _find the size of a non-overlapping set containing the maximum number of segments_, it appears that in this use case that the answer is 3.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(A, B) {
    let count = 1;
    let last = 0;
    
    if(A.length === 0) {
        return 0;
    }
    
    last = B[0];
    
    for( let i = 1; i < A.length; i++) {
        if(A[i] > last) {
            count++;
            last = B[i];
        }
    }
    
    return count;
}

solution( [1, 3, 7, 9, 9], [5, 6, 8, 9, 10] ); // 3
```

Let's deconstruct this solution.

Although the temptation to iterate through every combination exists in this problem, this solution chooses to find the answer by _selecting the best option available at the moment_. This is [Greedy Algorithms](./README.md) approach. By keeping track of the endpoint of the first segment and every other segment thereafter that does not overlap, this approach does not consider the other possibilities.

The indices of `A` that was visited in this solution (given the provided use case within the problem definition) were 0, 2 and 3. So, out of all the possible sets mentioned in the table above, only the first set was considered. See below a chat snippet from ChatGPT on this subject matter.

> A greedy algorithm is best to use when solving optimization problems that exhibit the "greedy choice property" and the "optimal substructure property."
>
>
> 1. Greedy Choice Property: A problem exhibits the greedy choice property if a locally optimal choice at each step leads to a globally optimal solution. In other words, a greedy algorithm makes the best possible choice at each step without considering the consequences of that choice on future steps.
> 2. Optimal Substructure Property: A problem has the optimal substructure property if an optimal solution to the problem contains an optimal solution to its subproblems. This property allows a greedy algorithm to build the overall optimal solution by making locally optimal choices.
>
>
> Greedy algorithms are particularly useful in situations where finding the globally optimal solution through exhaustive search or dynamic programming would be computationally expensive or impractical. They are often straightforward to implement and can offer efficient solutions for many real-world problems.
>
<image src="/.attachments/chatgpt-logo.png" alt="Chat GPT Logo" width="16" height="16" />

While this approach may not fit every problem, it fits this one. A few articles exist on the internet that explains [when to use greedy algorithms](https://www.freecodecamp.org/news/when-to-use-greedy-algorithms/).

The detected time complexity of this problem is $O(n)$.
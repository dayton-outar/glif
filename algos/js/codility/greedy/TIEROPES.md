# Tie Ropes

## Problem

There are $N$ ropes numbered from 0 to $N − 1$, whose lengths are given in an array $A$, lying on the floor in a line. For each $I$ $(0 ≤ I < N)$, the length of rope $I$ on the line is $A[I]$.

We say that two ropes $I$ and $I + 1$ are _adjacent_. Two adjacent ropes can be tied together with a knot, and the length of the tied rope is the sum of lengths of both ropes. The resulting new rope can then be tied again.

For a given integer $K$, the goal is to tie the ropes in such a way that the number of ropes whose length is greater than or equal to $K$ is maximal.

For example, consider $K = 4$ and array $A$ such that:

```js
    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 1
    A[5] = 1
    A[6] = 3
```

The ropes are shown in the figure below.

![Tie Ropes](/.attachments/tie-ropes.png)

We can tie:

- rope 1 with rope 2 to produce a rope of length $A[1] + A[2] = 5$;
- rope 4 with rope 5 with rope 6 to produce a rope of length $A[4] + A[5] + A[6] = 5$.

After that, there will be three ropes whose lengths are greater than or equal to $K = 4$. It is not possible to produce four such ropes.

Write a function:

```js
    function solution(K, A);
```

that, given an integer $K$ and a non-empty array $A$ of $N$ integers, returns the maximum number of ropes of length greater than or equal to $K$ that can be created.

For example, given $K = 4$ and array $A$ such that:

```js
    A[0] = 1
    A[1] = 2
    A[2] = 3
    A[3] = 4
    A[4] = 1
    A[5] = 1
    A[6] = 3
```

the function should return 3, as explained above.

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- $K$ is an integer within the range $[1 ... 1,000,000,000]$;
- each element of array $A$ is an integer within the range $[1 ... 1,000,000,000]$.

## Solution

The problem seems pretty straightforward to understand.

There is an array that provides the length of _adjacent_ ropes as the values. The aim is to find the maximum number of ropes that can be chained together in a away that the sum of the values of the chained ropes does not exceed a certain value $K$.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(K, A) {
    let count = 0;
    let size = 0;
    
    for(let i = 0; i < A.length; i++) {
        size += A[i];
        
        if(size >= K) {
            count++;
            size = 0;
        }
    }

    return count;
}

solution(4, [1, 2, 3, 4, 1, 1, 3]); // 3
```

Let's deconstruct this solution.

Since the sum of the values of the chained ropes must not exceed $K$, the idea here in this solution is to iterate through the array sum the values of the array until that sum is greater than or equal to $K$. When the sum arrives at a value greater than or equal to $K$, the variable tracking the sum (or `size`) of the chained ropes is reset because the aim is to find the maximum number of possibilities exists where ropes can be chained until the sum meets this condition.

The fact that the ropes must be chained to an _adjacent_ rope simplifies the problem and, thus, makes the solution simple.

The detected time complexity of this algorithm is $O(n)$.
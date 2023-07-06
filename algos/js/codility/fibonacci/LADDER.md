# Ladder

## Problem

You have to climb up a ladder. The ladder has exactly $N$ rungs, numbered from 1 to $N$. With each step, you can ascend by one or two rungs. More precisely:

- with your first step you can stand on rung 1 or 2,
- if you are on rung $K$, you can move to rungs $K + 1$ or $K + 2$,
- finally you have to stand on rung $N$.

Your task is to count the number of different ways of climbing to the top of the ladder.

For example, given $N = 4$, you have five different ways of climbing, ascending by:

- 1, 1, 1 and 1 rung,
- 1, 1 and 2 rungs,
- 1, 2 and 1 rung,
- 2, 1 and 1 rungs, and
- 2 and 2 rungs.

Given $N = 5$, you have eight different ways of climbing, ascending by:

- 1, 1, 1, 1 and 1 rung,
- 1, 1, 1 and 2 rungs,
- 1, 1, 2 and 1 rung,
- 1, 2, 1 and 1 rung,
- 1, 2 and 2 rungs,
- 2, 1, 1 and 1 rungs,
- 2, 1 and 2 rungs, and
- 2, 2 and 1 rung.

The number of different ways can be very large, so it is sufficient to return the result modulo $2^P$, for a given integer $P$.

Write a function:

```js
    function solution(A, B);
```

that, given two non-empty arrays $A$ and $B$ of $L$ integers, returns an array consisting of $L$ integers specifying the consecutive answers; position $I$ should contain the number of different ways of climbing the ladder with $A[I]$ rungs modulo $2^{B[I]}$.

For example, given $L = 5$ and:

```js
    A[0] = 4   B[0] = 3
    A[1] = 4   B[1] = 2
    A[2] = 5   B[2] = 4
    A[3] = 5   B[3] = 3
    A[4] = 1   B[4] = 1
```

the function should return the sequence [5, 1, 8, 0, 1], as explained above.

Write an **efficient** algorithm for the following assumptions:

- $L$ is an integer within the range $[1..50,000]$;
- each element of array $A$ is an integer within the range $[1..L]$;
- each element of array $B$ is an integer within the range $[1..30]$.

## Solution

This problem takes some re-reading to grasp.

The part that is not easily grasp is the part that involves the modulus equation. So, let's work through the use case provided to understand a few details.

Two arrays are provided: `A` and `B`. `A` contains the values `[ 4, 4, 5, 5, 1 ]` and `B` contains the values `[ 3, 2, 4, 3, 1 ]`. The outcome of the `solution` function for the first index, 0, of the resulting array is 5. How is this number arrived at? First thing that was done was to find the number of ways that a ladder of 4 rungs (`A[0] = 4`) can be climbed given the rule that you can climb the ladder either by $K + 1$ or $K + 2$, where $K$ is position (or rung) on the ladder. A ladder of 4 rungs (with the rule mentioned) can be climbed in 5 ways,

 1. 1, 1, 1, 1
 2. 1, 1, 2
 3. 1, 2, 1
 4. 2, 1, 1
 5. 2, 2

Since _the number of different ways can be large_ [for more rungs], _it is sufficient to return the result modulo 2P, for a given integer P_. That integer, P, for this use case turns out to be the matching value in the array `B`. So, since we are checking for a ladder of 4 rungs based on `A[0]`, we should be using 3 (from `B[0]`) in the place of that integer, P. When this is done, the result is $5 \mod (2^3) = 5 \mod 8 = 5$.

Since the next index of A, `A[1]`, provides a ladder with same number of rungs as the first index of A, `A[0]`, the number of ways climbing it remains the same. However, _that integer, P,_ is different, the value of `B[1]` is 2. When the result of $A[1] \mod (2^{B[1]})$ is calculated, the result is $5 \mod (2^2) = 5 \mod 4 = 1$.

We know that the number of ways to climb a ladder of 5 rungs by the given rules is 8 based on the details provided in the problem definition. So, following the pattern to work out the results preceding index 2 of A, we get $8 \mod (2^4) = 8 \mod 16 = 8$.

Although, there is an impulse to categorise this problem as a type of permutations and combinations. The use case can already guide us when we find the number of ways possible for ladders with 3, 4 and 5 rungs. A ladder of 3 rungs, has only 3 ways to climb the ladder with the mentioned rule. A ladder of 4 rungs, has only 5 ways to climb and a ladder of 5 rungs, has 8 ways to climb it. When we look at the progression of the number of ways in relation to the number of rungs on a ladder, we notice part of a _fibonacci sequence_. Pure math enthusiasts are welcome to prove the connection between the _fibonacci sequence_ and _permutations and combinations_. Maybe, there is a connection. Maybe.

But given the context of the lesson of this problem, it's highly likely that the number of ways that a ladder of a set number of rungs can be discovered by making use of the fibonacci sequence.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(A, B) {
    let i = 0;
    let result = [];
    let max = 0;
    let steps = [];
    let maxB = 0;

    steps[0] = 1;
    steps[1] = 1;

    for (i = 0; i < A.length; i++) {
        max = Math.max(max, A[i]);
        maxB = Math.max(maxB, B[i]);
    }

    i = 1;
    while (i++ <= max) {
        steps[i] = (steps[i - 1] + steps[i - 2]) % Math.pow(2, maxB);
    }

    for (i = 0; i < A.length; i++) {
        let div = steps[A[i]] & (Math.pow(2, B[i]) - 1);
        result.push(div);
    }

    return result;
}
```
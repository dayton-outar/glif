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

This problem takes some re-reading to grasp. So, let's work through the use case provided to understand a few details.

Two arrays are provided: `A` and `B`. `A` contains the values `[ 4, 4, 5, 5, 1 ]` and `B` contains the values `[ 3, 2, 4, 3, 1 ]`. The outcome of the `solution` function for the first index, 0, of the resulting array is 5. How is this number arrived at? First thing that was done was to find the number of ways that a ladder of 4 rungs (`A[0] = 4`) can be climbed given the rule that the ladder can be climbed either by $K + 1$ or $K + 2$, where $K$ is position (or rung) on the ladder. A ladder of 4 rungs (with the rule mentioned) can be climbed in 5 ways,

 1. 1, 1, 1, 1
 2. 1, 1, 2
 3. 1, 2, 1
 4. 2, 1, 1
 5. 2, 2

Since _the number of different ways can be large_ [for more rungs], _it is sufficient to return the result modulo 2P, for a given integer P_. That integer, P, for this use case turns out to be the matching value in the array `B`. So, since we are checking for a ladder of 4 rungs based on `A[0]`, we should be using 3 (from `B[0]`) in the place of that integer, P. When this is done, the result is $5 \mod (2^3) = 5 \mod 8 = 5$.

Since the next index of A, `A[1]`, provides a ladder with same number of rungs as the first index of A, `A[0]`, the number of ways climbing it remains the same. However, _that integer, P,_ is different, the value of `B[1]` is 2. When the result of $A[1] \mod (2^{B[1]})$ is calculated, the result is $5 \mod (2^2) = 5 \mod 4 = 1$.

We know that the number of ways to climb a ladder of 5 rungs by the given rules is 8 based on the details provided in the problem definition. So, following the pattern to work out the results preceding index 2 of A, we get $8 \mod (2^4) = 8 \mod 16 = 8$.

Although, there is an impulse to categorise this problem as a type of permutations and combinations problem. The use case can already guide us when we find the number of ways possible for ladders with 3, 4 and 5 rungs. A ladder of 3 rungs, has only 3 ways to climb the ladder with the mentioned rule. A ladder of 4 rungs, has only 5 ways to climb and a ladder of 5 rungs, has 8 ways to climb it. When we look at the progression of the number of ways in relation to the number of rungs on a ladder, we notice part of a _fibonacci sequence_. Pure math enthusiasts are welcome to prove the connection between the _fibonacci sequence_ and _permutations and combinations_. Maybe, there is a connection. Maybe. But given the context of the lesson of this problem, it's highly likely that the number of ways that a ladder of a set number of rungs can be discovered is by making use of the fibonacci sequence.

The solution to this problem involves getting the set of fibonacci numbers up to the maximum number possible to be used within the sequence. Even though the range for `A` and `B` is stated in the _assumptions_ of the problem, there exist crafty ways to determine a _safe_ maximum number (or upper bound) expected in the fibonacci sequence.

By outlining the outcome of one iteration of the use case provided, it's clear that the solution has to be in the order of $O(n)$. Basically, after determining the number of ways that each ladder can be climbed based on the number of rungs (which is the values in `A`), that _number of ways_ need to be plugged into the $result \mod 2^P$ formula.

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
        result.push( steps[A[i]] & (Math.pow(2, B[i]) - 1) );
    }

    return result;
}
```

[Yaseen Shaik](https://github.com/yaseenshaik/) also provides his [solution to the ladder problem](https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Ladder.md) that is noteworthy. I think his solution is pretty straightforward. It makes use of the assumptions to limit the upper bounds but it simply gets the number of ways by generating an array of the fibonacci numbers and then it applies the formula through a crafty use of the shift binary operator, `<<`. Using the binary shift on the value of 1 is the same as using the power formula that calculates 2 raised to the power of a provided integer. See the code snippet below.

```js
function solution(A, B) {
    let f = new Array(A.length+1);
    f[0] = 1;
    f[1] = 1;
    let MAX = 1 << 30;

    for (let i = 2; i < f.length; ++i) {
        f[i] = f[i - 1] + f[i - 2];
        f[i] = f[i] % MAX;
    }

    let res = new Array(A.length);

    for (let i = 0; i < A.length; ++i) {
        res[i] = f[A[i]] % (1 << B[i]);
    }

    return res;
}
```

Let's get back to Jonatas' solution and destruct it.

The first two loops within this solution has one main objective and that is to get the fibonacci sequence that include values up to $2^P$, where $P$ is the maximum value within the array `B`. This is a crafty way of maintaining.

```js
    steps[0] = 1;
    steps[1] = 1;
    
    ...

    i = 1;
    while (i++ <= max) {
        steps[i] = (steps[i - 1] + steps[i - 2]) % Math.pow(2, maxB);
    }
```

From the use case provided in the problem, the loop in the snippet above will generate the `steps` array as such, `[1, 1, 2, 3, 5, 8, 13]`. But let's say that Jonatas' solution function was called as `solution( [4, 4, 5, 5, 1, 6], [3, 2, 4, 3, 1, 3] )`, where `A` and `B` is expanded to include another element. Given that the last element of `A` includes a ladder of 6 rungs and `B` includes the integer 3, which can be used in the modulus equation, the `steps` array would be produced as `[1, 1, 2, 3, 5, 8, 13, 5]`. Notice the ladder of 6 rungs gets a value of 5 in the `steps` array. The modulus equation is used in arriving at the values within `steps` but the integer used is the maximum number within the `B` array. What's the genius in this?

To make this interesting the final loop shown below contains a formula that seems boggling at first glance but it completes the genius stroke of the preceding loop.

```js
    for (i = 0; i < A.length; i++) {
        result.push( steps[A[i]] & (Math.pow(2, B[i]) - 1) );
    }
```

Jonatas' solution gets the power of 2 needed for each iteration, subtracts it from 1 and then makes use of the bitwise and operator, `&`, to arrive at the result.

This approach definitely puts limits for the generation of fibonacci numbers for huge datasets. Imagine providing the `solution` function with an array of 100,000 elements for both `A` and `B`. Maybe that's conservative. What about a million elements.

Let's expand the list of elements provided in `A` and `B`. Let's invoke `solution` function with the following arrays `A`, `[4, 4, 5, 5, 1, 6, 7, 10, 12]` and `B`, `[3, 2, 4, 3, 1, 3, 2, 4, 3]`. This expanded use case generates a `steps` array containing the values shown below. 

```js
[
   1, 1, 2, 3, 5, 8,
  13, 5, 2, 7, 9, 0,
   9, 9
]
```

The results coming out of providing this expanded use case is `[5, 1, 8, 0, 1, 5, 1, 9, 1]`. Let's track the process by watching the `steps` and `result` values for each index starting from index 5 for `A` and `B` for this expanded use case.

| `i`   | `A[i]`   | `B[i]`   | `steps[A[i]]`  | `(Math.pow(2, B[i]) - 1)`| `result[i]`                           |
|:-----:|:--------:|:--------:|:--------------:|:------------------------:|:-------------------------------------:|
| ...   | ...      | ...      | ...            | ...                      | ...                                   |
| $5$   | $6$      | $3$      | $1101_2 = 13$  | $0111_2 = 7$             | $1101_2 \wedge 0111_2 = 0101_2 = 5$   |
| $6$   | $7$      | $2$      | $0101_2 = 5$   | $0011_2 = 3$             | $0101_2 \wedge 0011_2 = 0001_2 = 1$   |
| $7$   | $10$     | $4$      | $1001_2 = 9$   | $1111_2 = 15$            | $1001_2 \wedge 1111_2 = 1001_2 = 9$   |
| $8$   | $12$     | $3$      | $1001_2 = 9$   | $0111_2 = 7$             | $1001_2 \wedge 0111_2 = 0001_2 = 1$   |

The mathematics of using the values of `steps`, where the modulus is used and the binary and operation is used, to arrive at the results works. But how? Why does this mathematics work?

Let's re-arrange some instructions to get the insight that Jonatas' solution provides. If we remove the upper bound limiter of using the modulus equation to arrive at the value for `steps`, which includes the fibonacci numbers then the values of the `steps` array would have looked as follows,

```js
[
    1,   1,  2,  3,  5,   8,
   13,  21, 34, 55, 89, 144,
  233, 377
]
```

So, basically `steps` would just contain the fibonacci numbers possible for the ladders with the highest number of rungs.

Let's see if the last 4 numbers of this version of `steps` for the expanded use case arrives at the same outcome, `result[i]`, if the number were to be plugged into the modulus equation. Let's reuse the tracking table above but change the caption of the `steps[A[i]]` column to `fib[A[i]]` to prevent any confusion.

| `i`   | `A[i]`   | `B[i]`   | `fib[A[i]]`         | `(Math.pow(2, B[i]))`    | `result[i]`                                        |
|:-----:|:--------:|:--------:|:-------------------:|:------------------------:|:--------------------------------------------------:|
| ...   | ...      | ...      | ...                 | ...                      | ...                                                |
| $5$   | $6$      | $3$      | $0000 1101_2 = 13$  | $0000 1000_2 = 8$        | $0000 1101_2 \mod 0000 1000_2 = 0000 0101_2 = 5$   |
| $6$   | $7$      | $2$      | $0001 0101_2 = 21$  | $0000 0100_2 = 4$        | $0001 0101_2 \mod 0000 0100_2 = 0000 0001_2 = 1$   |
| $7$   | $10$     | $4$      | $0101 1001_2 = 89$  | $0001 0000_2 = 16$       | $0101 1001_2 \mod 0001 0000_2 = 0000 1001_2 = 9$   |
| $8$   | $12$     | $3$      | $1110 1001_2 = 233$ | $0000 1000_2 = 8$        | $1110 1001_2 \mod 0000 1000_2 = 0000 0001_2 = 1$   |

When taking a look at the modulus equation from the perspective of binary operations then a standard pattern should be noticed. Studying the patterns will eventually will manifest the involvement of _Number Theory_ concepts. More specifically, this problem involves the use of [Modular Arithmetic](https://brilliant.org/wiki/modular-arithmetic/).

When using modulus, the interest is in the $remainder$. The formula to calculate the division of two numbers is: $dividend \div divisor = quotient + remainder$[^1]. Since the $divisor$ in the modulus equation is a product of 2 raised to power of a given $exponent$, the binary representation will always have a 1 in the binary position of the $exponent$ (see [binary number system](https://www.mathsisfun.com/binary-number-system.html) to understand binary position). For example, the binary representation of 4 is $0100_2$, the binary representation of 8 is $1000_2$. The $remainder$ will always be less than the $divisor$ and from a binary representation perspective, the only part of the binary number of the $dividend$ that will remain as the outcome of the modulus is the values in the binary positions that are below the binary position of the 1 in the $divisor$. For example, when 13 is divided by 8, the $remainder$ is 5. The number 8 has a binary number, where the 1 is the fourth spot from the right reading to the left. The only part of the $dividend$ that comes out of the modulus equation is the part of binary representation that comes after that fourth spot. So, when 13, represented as $1101_2$, is divided by 8, represented as $1000_2$, the last 3 positions will be used to arrive at the $remainder$, which is $0101_2$. Hopefully, this explanation makes the genius stroke of using binary operations easier to understand.

When the numbers and the operations are seen from a binary representation, it can be understood the reason for subtracting the divisor by 1 and using the bitwise and operator. Wow! This just emphasize the usefulness of lessons learnt from _Discrete Mathematics_.

[^1]: [Divide (Meaning, Symbol, Division Formula and Examples)](https://byjus.com/maths/divide/)
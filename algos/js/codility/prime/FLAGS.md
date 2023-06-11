# Flags

## Problem

A non-empty array $A$ consisting of $N$ integers is given.

A peak is an array element which is larger than its neighbours. More precisely, it is an index $P$ such that $0 < P < N − 1$ and $A[P − 1] < A[P] > A[P + 1]$.

For example, the following array A:

```js
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
```

has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.

![Flags](/.attachments/flags.png)

Flags can only be set on peaks. What's more, if you take $K$ flags, then the distance between any two flags should be greater than or equal to $K$. The distance between indices $P$ and $Q$ is the absolute value $|P − Q|$.

For example, given the mountain range represented by array $A$, above, with $N = 12$, if you take:

- two flags, you can set them on peaks 1 and 5;
- three flags, you can set them on peaks 1, 5 and 10;
- four flags, you can set only three flags, on peaks 1, 5 and 10.

You can therefore set a maximum of three flags in this case.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ of $N$ integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array $A$:

```js
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
```

the function should return 3, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range [1..400,000];
- each element of array $A$ is an integer within the range [0..1,000,000,000].

## Solutions

Let's take a moment to appreciate this problem.

The example with $K = 2$, which is two flags, only allows for the flags to be set on peaks 1 and 5. But how so? YouTube Channel Author of CodeTrading[^1] does not agree with this. If $K = 2$, then the first two flags can be placed on peak 1 and peak 3. So, the first example must be an error

The reason that no flag can be placed on peak 3 is because the distance between peak 1 and 3 is 1 and that distance (of 1) is less than the number of flags, $K$. The rule that is set is that $K \geq d$, where $d$ is the distance between peaks. Hmm ... But is the distance between peak 1 and 3 equal to 1 or 2?

[^1]: [Flags in Python and C++ Codility Solutions Lesson 10](https://youtu.be/6KK2eglhvdQ) - [CodeTrading](https://www.youtube.com/@CodeTradingCafe)
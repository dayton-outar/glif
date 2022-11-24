# 5. Prefix Sums

There is a simple yet powerful technique that allows for the fast calculation of sums of elements in given slice (contiguous segments of array). Its main idea uses preﬁx sums which are deﬁned as the consecutive totals of the ﬁrst $0, 1, 2, \dots, n$ elements of an array.

|           | $a_0$       | $a_1$             | $a_2$                  | $\ldots$ | $a_{n - 1}$                           |
|:---------:|:-----------:|:-----------------:|:----------------------:|:--------:|:-------------------------------------:|
| $p_0 = 0$ | $p_1 = a_0$ | $p_2 = a_0 + a_1$ |$p_3 = a_0 + a_1 + a_2$ | $\ldots$ | $p_n = a_0 + a_1 + \dots + a_{n - 1}$ |

We can easily calculate the prefix sums in $O(n)$ time complexity. Notice that the total $p_k$ equals $p_{k - 1} + a_{k - 1}$, so each consecutive value can be calculated in a constant time.

**5.1: Counting prefix sums - $O(n)$.**
```js
const prefixSums = (A) => {
    const n = A.length;
    let P = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1); i++ ) {
        P[i] = P[i - 1] + A[i - 1];
    }

    return P;
}

prefixSums([2, 1, 5, 3, 2]); // [ 0, 2, 3, 8, 11, 13 ]
```

Similarly, we can calculate suﬃx sums, which are the totals of the $k$ last values. Using preﬁx (or suﬃx) sums allows us to calculate the total of any slice of the array very quickly. For example, assume that you are asked about the totals of $m$ slices $[x..y]$ such that $0 \leq x \leq y < n$, where the total is the sum $a_x + a_{x + 1} + \ldots + a_{y - 1} + a_y$.

The simplest approach is to iterate through the whole array for each result separately; however, that requires $O(n · m)$ time. The better approach is to use preﬁx sums. If we calculate the preﬁx sums then we can answer each question directly in constant time.

| $p_{y + 1}$  | $a_0$ | $a_1$ | $\ldots$ | $a_{x - 1}$ | $a_x$ | $a_{x + 1}$ | $\ldots$ | $a_{y -1}$ | $a_y$ |
|:------------:|:-----:|:-----:|:--------:|:-----------:|:-----:|:-----------:|:--------:|:----------:|:-----:|
| $p_x$        | $a_0$ | $a_1$ | $\ldots$ | $a_{x - 1}$ |       |             |          |            |       |
| $p_{x + 1} = p_x$ |  |       |          |             | $a_x$ | $a_{x + 1}$ | $\ldots$ | $a_{y -1}$ | $a_y$ |

**5.2: Total of one slice - $O(1)$.**
```js
const countTotal = (P, x, y) => P[y + 1] - P[x];

countTotal([ 0, 2, 3, 8, 11, 13 ], 1, 2); // 8 - 2 = 6
```

We have calculated the total of $a_x + a_{x - 1} + \ldots + a_{y - 1} + a_y$ in $O(1)$ time. Using this approach, the total time complexity is $O(n + m)$.

## 5.1. Exercise

**Problem:** You are given a non-empty, zero-indexed array $A$ of $n$ $(1 \leq n \leq 100,000)$ integers $a_0 ,a_1 , \ldots, a_{n − 1}$ $(0 \leq ai \leq 1,000)$. This array represents number of mushrooms growing on the consecutive spots along a road. You are also given integers $k$ and $m$ $(0 \leq k, m < n)$. 

A mushroom picker is at spot number $k$ on the road and should perform $m$ moves. In one move she moves to an adjacent spot. She collects all the mushrooms growing on spots she visits. The goal is to calculate the maximum number of mushrooms that the mushroom picker can collect in $m$ moves.

For example, consider array A such that:

![Array A](/.attachments/prefix-array-sums.png)

The mushroom picker starts at spot $k = 4$ and should perform $m = 6$ moves. She might move to spots 3, 2, 3, 4, 5, 6 and thereby collect 1 + 5 + 7 + 3 + 9 = 25 mushrooms. This is the maximal number of mushrooms she can collect.

**Solution $O(m^2)$:** Note that the best strategy is to move in one direction optionally followed by some moves in the opposite direction. In other words, the mushroom picker should not change direction more than once. With this observation we can ﬁnd the simplest solution. Make the ﬁrst $p = 0, 1, 2, \\dots, m $moves in one direction, then the next $m − p$ moves in the opposite direction. This is just a simple simulation of the moves of the mushroom picker which requires $O(m^2)$ time.

**Solution $O(n + m)$:** A better approach is to use preﬁx sums. If we make $p$ moves in one direction, we can calculate the maximal opposite location of the mushroom picker. The mushroom picker collects all mushrooms between these extremes. We can calculate the total number of collected mushrooms in constant time by using preﬁx sums.

**5.3: Mushroom picker - $O(n + m)$**
```js
const mushrooms = (A, k, m) => {
    let n = A.length;
    let result = 0;
    const sums = prefixSums(A);

    const min1 = Math.min(m , k) + 1;
    for ( let i = 0; i < min1; i++ ) {
        let leftPos = k - i;
        let rightPos = Math.min( n - 1, Math.max( k, ( (k + m) - 2 * i) ) );
        result = Math.max( result, countTotal( sums, leftPos, rightPos ) );
    }

    const min2 = Math.min( m + 1, n - k );
    for ( let i = 0; i < min2; i++ ) {
        let rightPos = k + i;
        let leftPos = Math.max( 0, Math.min( k, ( (k - m) - 2 * i ) ) );
        result = Math.max( result, countTotal( sums, leftPos, rightPos ) );
    }

    return result;
}

mushrooms( [2, 3, 7, 5, 1, 3, 9], 4, 6); // 25
```

The total time complexity of such a solution is $O(n + m)$.

## Observations

In the `mushrooms` function, there are two (2) loops. Both of which are getting the maximum sum of a slice of the array.

In the loops, the idea is to calculate the right position and the left position to get the sum between those positions. The formulas to derive the positions are most interesting. For the first loop, the minimum number between the length of the array and the maximum of `k` and `(k + m) - 2 * i` is derived for the `rightPos`. The second loop uses an inverse approach to arrive at the left position and includes the formula `(k - m) - 2 * i)`. Why the need for these formulas? Why do they work?
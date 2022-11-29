# 17. Dynamic Programming

Dynamic programming is a method by which a solution is determined based on solving successively similar but smaller problems. This technique is used in algorithmic tasks in which the solution of a bigger problem is relatively easy to ﬁnd, if we have solutions for its sub-problems.

> Many programming problems that have recursive solutions can be rewritten using the techniques of dynamic programming. A dynamic programming solution builds a table, usually using an array, that holds the results of the many subsolutions as the problem is broken down. When the algorithm is complete, the solution is found in a distinct spot in the table. [^1]

Based on the above-mentioned statement, we can reference [Fibonacci Numbers](../fibonacci/README.md) to appreciate that statement.

> Algorithms for optimization problems require proof that they _always_ return the best possible solution. Greedy algorithms that make the best local decision at each step are typically eﬃcient, but usually do not guarantee global optimality. Exhaustive search algorithms that try all possibilities and select the best always produce the optimum result, but usually at a prohibitive cost in terms of time complexity.[^2]

> Dynamic programming is a technique for eﬃciently implementing a recursive algorithm by storing partial results. It requires seeing that a naive recursive algorithm computes the same subproblems over and over and over again.[^2]

> Dynamic programming is essentially a tradeoﬀ of space for time. Repeatedly computing a given quantity can become a drag on performance. If so, we are better oﬀ storing the results of the initial computation and looking them up instead of recomputing them.[^2]
## 17.1 The Coin Changing Problem

For a given set of denominations, you are asked to ﬁnd the minimum number of coins with which a given amount of money can be paid. Assume that you can use as many coins of a particular denomination as necessary. The greedy algorithmic approach is always to select the largest denomination not exceeding the remaining amount of money to be paid. As long as the remaining amount is greater than zero, the process is repeated. However, this algorithm may return a suboptimal result. For instance, for an amount of 6 and coins of values 1, 3, 4, we get 6 = 4 + 1 + 1, but the optimal solution here is 6 = 3 + 3.

A dynamic algorithm ﬁnds solutions to this problem for all amounts not exceeding the given amount, and for increasing sets of denominations. For the example data, it would consider all the amounts from 0 to 6, and the following sets of denominations: $\emptyset$, {1}, {1, 3} and {1, 3, 4}. Let $dp[i, j]$ be the minimum number of coins needed to pay the amount $j$ if we use the set containing the $i$ smallest denominations. The number of coins needed must satisfy the following rules:

- no coins are needed to pay a zero amount: $dp[i, 0] = 0$ (for all $i$);
- if there are no denominations and the amount is positive, there is no solution, so for convenience the result can be inﬁnite in this case: $dp[0, j] = \infty$ (for all $j > 0$);
- if the amount to be paid is smaller than the highest denomination c i , this denomination can be discarded: $dp[i, j] = dp[i − 1, j]$ (for all $i > 0$ and all $j$ such that $c_i > j$);
- otherwise, we should consider two options and choose the one requiring fewer coins: either we use a coin of the highest denomination, and a smaller amount to be paid remains, or we don’t use coins of the highest denomination (and the denomination can thus be discarded): $dp[i, j] =\text{ min}(dp[i, j − ci ] + 1, dp[i − 1, j]$) (for all $i > 0$ and all $j$ such that $c_i \leq j$).

The following table shows all the solutions to sub-problems considered for the example data.

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|  {1, 3}      | 0   | 1   | 2   | 1   | 2   | 3   | 2   |
|  {1, 3, 4}   | 0   | 1   | 2   | 1   | 1   | 2   | 2   |


### Implementation

Consider n denominations, $0 < c0 \leq c1 \leq \ldots \leq c_{n − 1}$. The algorithm processes the respective denominations and calculates the minimum number of coins needed to pay every amount from 0 to $k$. When considering each successive denomination, we use the previously calculated results for the smaller amounts.

**17.1: The dynamic algorithm for ﬁnding change.**
```js
const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array(n + 1).fill( Array(k + 1).fill(0) );
    
    for ( let i = 1; i < dp[0].length; i++ ) {
        dp[0][i] = Number.MAX_SAFE_INTEGER;
    }

    for ( let i = 1; i < (n + 1); i++ ) {
        for ( let j = 1; j < C[i - 1]; j++ ) {
            dp[i][j] = dp[i - 1][j];
        }
        for ( let j = C[i - 1]; j < (k + 1); j++ ) {
            dp[i][j] = Math.min(dp[i][j - C[i - 1]] + 1, dp[i - 1][j]);
        }
    }

    return dp[n];
}
```

Both the time complexity and the space complexity of the above algorithm is $O(n · k)$. In the above implementation, memory usage can be optimized. Notice that, during the calculation of $dp$, we only use the previous row, so we don’t need to remember all of the rows.

**17.2: The dynamic algorithm for ﬁnding change with optimized memory.**
```js
const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0] = 0;

    for ( let i = 1; i < (n + 1); i++ ) {
        for ( let j = C[i - 1]; j < (k + 1); j++ ) {
            dp[j] = Math.min(dp[j - C[i - 1]] + 1, dp[j]);
        }
    }

    return dp;
}
```

The time complexity is $O(n · k)$ and the space complexity is $O(k)$.

## 17.2 Binomial Coefficient

How do you compute binomial coeﬃcients? First, $\binom{n}{k} = \frac{k!}{k!(n−k)!}$, so in principle you can compute them straight from factorials. However, this method has a serious drawback. Intermediate calculations can easily cause arithmetic overﬂow, even when the ﬁnal coeﬃcient ﬁts comfortably within an integer.

A more stable way to compute binomial coeﬃcients is using the recurrence relation implicit in the construction of Pascal’s triangle:

![Pascal's Triangle](/.attachments/pascal-triangle.png)

We can use a matrix to mimic the Pascal triangle. Take the table shown below (credit to _The Algorithm Design Manual_),

| n / k | k = 0 | k = 1 | k = 2 | k = 3 | k = 4 | k = 5 |
|------:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|     0 | A     |       |       |       |       |       |
|     1 | B     | G     |       |       |       |       |
|     2 | C     | 1     | H     |       |       |       |
|     3 | D     | 2     | 3     | I     |       |       |
|     4 | E     | 4     | 5     | 6     | J     |       |
|     5 | F     | 7     | 8     | 9     | 10    | K     |


The initialization conditions are labeled A - K and the evaluation of the recurrence relations are labeled 1 - 10. When the evaluation is complete for the range of values $0 \leq n \leq 5$ and $0 \leq k \leq 5$, we arrive at the following matrix,

| n / k | k = 0 | k = 1 | k = 2 | k = 3 | k = 4 | k = 5 |
|------:|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
|     0 | 1     |       |       |       |       |       |
|     1 | 1     | 1     |       |       |       |       |
|     2 | 1     | 2     | 1     |       |       |       |
|     3 | 1     | 3     | 3     | 1     |       |       |
|     4 | 1     | 4     | 6     | 4     | 1     |       |
|     5 | 1     | 5     | 10    | 10    | 5     | 1     |

Each number is the sum of the two numbers directly above it. The recurrence relation implicit in this is

$$\large
\binom{n}{k} = 
\left(
    \begin{matrix}
    {n - 1} \\ 
    {k - 1}
    \end{matrix}
\right) + 
\left(
    \begin{matrix}
    {n - 1} \\ 
    k
    \end{matrix}
\right)
$$

## 17.3. Exercise

**Problem:** A small frog wants to get from position 0 to $k$ $(1 \leq k \leq 10,000)$. The frog can jump over any one of n ﬁxed distances $s_0 , s_1 , \dots , s_{n − 1}$ $(1 \leq s_i \leq k)$. The goal is to count the number of diﬀerent ways in which the frog can jump to position $k$. To avoid overﬂow, it is suﬃcient to return the result modulo $q$, where $q$ is a given number.

We assume that two patterns of jumps are diﬀerent if, in one pattern, the frog visits a position which is not visited in the other pattern.

**Solution $O(n · k)$:** The task can be solved by using dynamic programming. Let’s create an array $dp$ consisting of $k$ elements, such that $dp[j]$ will be the number of ways in which the frog can jump to position $j$.

We update consecutive cells of array $dp$. There is exactly one way for the frog to jump to position 0, so $dp[0] = 1$. Next, consider some position $j > 0$.

The number of ways in which the frog can jump to position $j$ with a ﬁnal jump of $s_i$ is $dp[j − s_i]$. Thus, the number of ways in which the frog can get to position $j$ is increased by the number of ways of getting to position $j − s_i$ , for every jump $s_i$.

![Show jump made to position j](/.attachments/dynamic-jumps.png)

More precisely, $dp[j]$ is increased by the value of $dp[j − s_i]$ (for all $s_i \leq j$) modulo $q$.

**17.3: Solution in time complexity $O(n · k)$ and space complexity $O(k)$.**
```js
const frog = (S, k, q) => {
    const n = S.length;
    const dp = Array(k + 1).fill(0);
    dp[0] = 1;

    for ( let j = 1; j < (k + 1); j++ ) {
        for ( let i = 0; i < n; i++ ) {
            if ( S[i] <= j ) {
                dp[j] = (dp[j] + dp[j - S[i]]) % q;
            }
        }
    }

    return dp[k];
}
```

The time complexity is $O(n · k)$ (all cells of array dp are visited for every jump) and the space complexity is $O(k)$.

## Observations

...

## Videos

1. [5 Simple Steps for Solving Dynamic Programming Problems](https://youtu.be/aPQY__2H3tE)

## References

1. [Codility Training Media - Dynamic Programming](https://codility.com/media/train/15-DynamicProgramming.pdf)
2. Chapter 14. Dynamic Programming. Introduction to Algorithms by Thomas H. Cormen, Charles E. Leiserson, Ronald Rivest and Clifford Stein
2. Chapter 10: Dynamic Programming. The Algorithm Design Manual by Steven Skiena.

[^1]: Page 208. Chapter 14: Advanced Algorithms. Data Structures and Algorithms with JavaScript by Michael McMillan.

[^2]: Chapter 10: Dynamic Programming. The Algorithm Design Manual by Steven Skiena.
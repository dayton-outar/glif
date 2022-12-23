# 17. Dynamic Programming

Dynamic programming is a method by which a solution is determined based on solving successively similar but smaller problems. This technique is used in algorithmic tasks in which the solution of a bigger problem is relatively easy to ﬁnd, if we have solutions for its sub-problems.

> Many programming problems that have recursive solutions can be rewritten using the techniques of dynamic programming. A dynamic programming solution builds a table, usually using an array, that holds the results of the many subsolutions as the problem is broken down. When the algorithm is complete, the solution is found in a distinct spot in the table. [^1]

Based on the above-mentioned statement, we can reference [Fibonacci Numbers](../fibonacci/README.md) to appreciate that statement.

> Algorithms for optimization problems require proof that they _always_ return the best possible solution. Greedy algorithms that make the best local decision at each step are typically eﬃcient, but usually do not guarantee global optimality. Exhaustive search algorithms that try all possibilities and select the best always produce the optimum result, but usually at a prohibitive cost in terms of time complexity.[^2]

> Dynamic programming is a technique for eﬃciently implementing a recursive algorithm by storing partial results. It requires seeing that a naive recursive algorithm computes the same subproblems over and over and over again.[^2]

> Dynamic programming is essentially a tradeoﬀ of space for time. Repeatedly computing a given quantity can become a drag on performance. If so, we are better oﬀ storing the results of the initial computation and looking them up instead of recomputing them.[^2]
## 17.1 The Coin Changing Problem

For a given set of denominations, you are asked to ﬁnd the minimum number of coins with which a given amount of money can be paid. Assume that you can use as many coins of a particular denomination as necessary. The greedy algorithmic approach is always to select the largest denomination not exceeding the remaining amount of money to be paid. As long as the remaining amount is greater than zero, the process is repeated. However, this algorithm may return a suboptimal result. _For instance, for an amount of 6 and coins of values 1, 3, 4, we get 6 = 4 + 1 + 1, but the optimal solution here is 6 = 3 + 3_.[^3]

A dynamic algorithm ﬁnds solutions to this problem for all amounts not exceeding the given amount, and for increasing sets of denominations. For the example data, it would consider all the amounts from 0 to 6, and the following sets of denominations: $\emptyset$, {1}, {1, 3} and {1, 3, 4}. Let $dp[i, j]$ be the minimum number of coins needed to pay the amount $j$ if we use the set containing the $i$ smallest denominations. The number of coins needed must satisfy the following rules:

- no coins are needed to pay a zero amount: $dp[i, 0] = 0$ (for all $i$);
- if there are no denominations and the amount is positive, there is no solution, so for convenience the result can be inﬁnite in this case: $dp[0, j] = \infty$ (for all $j > 0$);
- if the amount to be paid is smaller than the highest denomination $c_i$ , this denomination can be discarded: $dp[i, j] = dp[i − 1, j]$ (for all $i > 0$ and all $j$ such that $c_i > j$);
- otherwise, we should consider two options and choose the one requiring fewer coins: either we use a coin of the highest denomination, and a smaller amount to be paid remains, or we don’t use coins of the highest denomination (and the denomination can thus be discarded): $dp[i, j] =\text{ min}(dp[i, j − c_i ] + 1, dp[i − 1, j]$) (for all $i > 0$ and all $j$ such that $c_i \leq j$).

The following table shows all the solutions to sub-problems considered for the example data.

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|  {1, 3}      | 0   | 1   | 2   | 1   | 2   | 3   | 2   |
|  {1, 3, 4}   | 0   | 1   | 2   | 1   | 1   | 2   | 2   |


### Implementation

Consider $n$ denominations, $0 < c_0 \leq c_1 \leq \ldots \leq c_{n − 1}$. The algorithm processes the respective denominations and calculates the minimum number of coins needed to pay every amount from 0 to $k$. When considering each successive denomination, we use the previously calculated results for the smaller amounts.

**17.1: The dynamic algorithm for ﬁnding change.**
```js
const dynamicCoinChanging = (C, k) => {
    const n = C.length;
    const dp = Array.from(Array(n + 1), () => new Array(k + 1).fill(0) );

    for ( let i = 1; i < dp[0].length; i++ ) {
        dp[0][i] = Number.MAX_SAFE_INTEGER; // MAX_SAFE_INTEGER represents infinity
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

dynamicCoinChanging( [1, 3, 4], 6 ); // [  0, 1, 2, 1, 1, 2, 2 ]
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

dynamicCoinChanging( [1, 3, 4], 6 ); // [  0, 1, 2, 1, 1, 2, 2 ]
```

The time complexity is $O(n · k)$ and the space complexity is $O(k)$.

## 17.2 Binomial Coefficient

How do you compute binomial coeﬃcients? First, $\binom{n}{k} = \frac{k!}{k!(n−k)!}$, so in principle you can compute them straight from factorials. However, this method has a serious drawback. Intermediate calculations can easily cause arithmetic overﬂow, even when the ﬁnal coeﬃcient ﬁts comfortably within an integer.

A more stable way to compute binomial coeﬃcients is using the recurrence relation implicit in the construction of Pascal’s triangle:

![Pascal's Triangle](/.attachments/pascal-triangle.png)

We can use a matrix to mimic the Pascal triangle[^4]. Take the table shown below (credit to _The Algorithm Design Manual_),

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

Take for example $\binom{4}{3}$, we would get evaluation from the value in co-ordinates $\binom{3}{2} + \binom{3}{1}$ (or (3, 2) and (3, 1): row 3 column **k = 2** and row 3 column **k = 1**). The value from these positions are 3 and 1, which evaluates to 4 for $\binom{4}{3}$.

Let's write some code to generate Pascal's Triangle,

**17.3: Generating Pascal Triangle for coefficients of a binomial.**
```js
const pascalTriangle = n => {
    let bc = Array.from(Array(n + 1), () => new Array(n + 1).fill(0) );

    // Initializing conditions
    for (let i = 0; i <= n; i++ ) {
        bc[i][0] = 1;
        bc[i][i] = 1;
    }

    // Fill out recurrence relational values. 
    // Based on Pascal triangle starts at level 3 but 2 for array index (since array starts at 0)
    for (let i = 2; i <= n; i++ ) {
        for (let j = 1; j <= i; j++ ) {
            bc[i][j] = bc[i - 1][j - 1] + bc[i - 1][j];
        }
    }

    return bc;
}

pascalTriangle(5); // Triangle for polynomial of 5
```

After the triangle is built in a two-dimensional array, we can now get $\binom{n}{k}$, which is the number of combinations involved in $n$ choosing $k$. So, how many ways are there to choose 4 things from a set of 5 things? Let's do this using the matrix created,

**17.4: Getting $\binom{n}{k}$ from Pascal Triangle matrix.**
```js
const binomialCoefficient = (n , k) => {
    const pt = pascalTriangle(n);

    return pt[n][k]; // n choose k
}

binomialCoefficient(5, 4); // 5
```

## 17.3. Exercise

**Problem:** A small frog wants to get from position 0 to $k$ $(1 \leq k \leq 10,000)$. The frog can jump over any one of $n$ ﬁxed distances $s_0 , s_1 , \dots , s_{n − 1}$ $(1 \leq s_i \leq k)$. The goal is to count the number of diﬀerent ways in which the frog can jump to position $k$. To avoid overﬂow, it is suﬃcient to return the result modulo $q$, where $q$ is a given number.

We assume that two patterns of jumps are diﬀerent if, in one pattern, the frog visits a position which is not visited in the other pattern.

**Solution $O(n · k)$:** The task can be solved by using dynamic programming. Let’s create an array $dp$ consisting of $k$ elements, such that $dp[j]$ will be the number of ways in which the frog can jump to position $j$.

We update consecutive cells of array $dp$. There is exactly one way for the frog to jump to position 0, so $dp[0] = 1$. Next, consider some position $j > 0$.

The number of ways in which the frog can jump to position $j$ with a ﬁnal jump of $s_i$ is $dp[j − s_i]$. Thus, the number of ways in which the frog can get to position $j$ is increased by the number of ways of getting to position $j − s_i$ , for every jump $s_i$.

![Show jump made to position j](/.attachments/dynamic-jumps.png)

More precisely, $dp[j]$ is increased by the value of $dp[j − s_i]$ (for all $s_i \leq j$) modulo $q$.

**17.5: Solution in time complexity $O(n · k)$ and space complexity $O(k)$.**
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

// Matrix generated for this is [ 1, 1, 1, 2, 3, 5, 1, 5 ]
frog( [ 1, 3, 5 ], 7, 7 ); // 5
```

The time complexity is $O(n · k)$ (all cells of array dp are visited for every jump) and the space complexity is $O(k)$.

## Observations

The table showing solution to the coin changing problem for the example of providing 6 with denominations of a set of {1, 3, 4} needs a little explanation for interpretation. Basically, the column is a value that needs to be delivered through the set of denominations. For example, 2 can be delivered with 2 **1** coins. Hence the cells for row **{1}**, **{1, 3}** and **{1, 3, 4}** under column **2** would show 2. The value of 6 can be delivered with 2 **3 coins**. Hence, the cells for row **{1, 3}** and **{1, 3, 4}** under column **6** would show 2. But since the set of **{1}** only contains 1 coins, 6 can only be delivered with 6 **1 coins**. (Maybe it would have been better to use 60 cents with a set of {**10 cent**, **30 cent**, **40 cent**} coins )

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|  {1, 3}      | 0   | 1   | 2   | 1   | 2   | 3   | 2   |
|  {1, 3, 4}   | 0   | 1   | 2   | 1   | 1   | 2   | 2   |

Now, moving onto the two code snippets 17.1 and 17.2 that I find interesting, particularly the mathematics within the nested loops. The mathematics is described in the algorithmic steps outlined in the introduction to section [17.1](#171-the-coin-changing-problem). So, in order to steps through the evaluation of the case of using denominations, {1, 3, 4}, to for a value up to 6, the table of values at each iteration will be shown.

When the table is initialized, it starts by using the highest value possible as a precursor in support of finding minimum possible value in the next row as shown below,

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 0   | 0   | 0   | 0   | 0   | 0   |
|  {1, 3}      | 0   | 0   | 0   | 0   | 0   | 0   | 0   |
|  {1, 3, 4}   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

This was achieved by the following snippet,

```js
for ( let i = 1; i < dp[0].length; i++ ) {
    dp[0][i] = Number.MAX_SAFE_INTEGER; // MAX_SAFE_INTEGER represents infinity
}
```

As we progress into the nested loop, we find that the algorithm transfers values from the row immediately above for up to the index (or column) just prior to the value of the denomination. Take for example, when the outer loop reaches second row, where `i` is 2, the denomination the first inner loop picks out of `C` is 3. The first inner loop that we refer to is shown below,

```js
for ( let j = 1; j < C[i - 1]; j++ ) {
    dp[i][j] = dp[i - 1][j];
}
```

So, at this point the table will look like this (remember by this point all the values for denomination 1 has been filled out by the next inner loop, which will be discussed after this),

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|  {1, 3}      | 0   | 1   | 2   | 0   | 0   | 0   | 0   |
|  {1, 3, 4}   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

At this point, columns 3 to 6 in the second row needs to be evaluated and filled out. This is where the second inner loop comes in,

```js
for ( let j = C[i - 1]; j < (k + 1); j++ ) {
    dp[i][j] = Math.min(dp[i][j - C[i - 1]] + 1, dp[i - 1][j]);
}
```

Now, we will step through for each column from column 3 to 6 from here on. So, stepping into column 3,

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | **3**   | 4   | 5   | 6   |
|  {1, 3}      | **0**   | 1   | 2   | 0   | 0   | 0   | 0   |
|  {1, 3, 4}   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

The first column or index of the second row is taken and added to 1, where **0** and 1 gives 1. When 1 and **3** (from the same column as column being evaluated, `j`, in row immediately above) is compared to choose the minimum value using `Math.min`, the value 1 is returned as the outcome. Hence,

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | **4**   | 5   | 6   |
|  {1, 3}      | 0   | **1**   | 2   | 1   | 0   | 0   | 0   |
|  {1, 3, 4}   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

Now, onto column 4 in second row. We take the second column or index and add it to 1, where **1** and 1 gives 2. When 2 and **4** (from column 4 in row immediately above current row) is compared to choose minimum value, the value 2 is returned as the outcome. Hence,

| ${dp[i, j]}$ | 0   | 1   | 2   | 3   | 4   | 5   | 6   |
|-------------:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|  $\emptyset$ | 0   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   | $\infty$   |
|  {1}         | 0   | 1   | 2   | 3   | **4**   | 5   | 6   |
|  {1, 3}      | 0   | **1**   | 2   | 1   | 2   | 0   | 0   |
|  {1, 3, 4}   | 0   | 0   | 0   | 0   | 0   | 0   | 0   |

And we follow this pattern as stated by the algorithm until the table (or matrix) is fully evaluated. So, this works but why does it work?

The whole idea of how this works hinges on the final rule stated in section [17.1](#171-the-coin-changing-problem),

> we should consider two options and _choose the one requiring fewer coins_: ***either we use a coin of the highest denomination, and a smaller amount to be paid remains, or we don’t use coins of the highest denomination***

For the exercise, there is a frog jumping problem that involves an array that has a set number of lengths that the frog can jump (discrete values). The problem comes when the frog needs to jump to certain positions. How many ways can the frog get to position $k$. Time for an example. So, we plugged in the parameters `[1, 3, 5]` as the number of discrete values representing the distance the frog can jump. We want the frog to reach position 7, so we plug in 7 and then _to avoid overflow_, we plug in 7. Hence, `frog( [ 1, 3, 5 ], 7, 7 )`.

Before we delve into the guts of the solution, I want to expand on the need _to avoid overflow_. When we remove the modulo from the function, `frog`, and put `dp[j] = (dp[j] + dp[j - S[i]]);` instead of `dp[j] = (dp[j] + dp[j - S[i]]) % q;`, the same parameters, `frog( [ 1, 3, 5 ], 7, 7 )`, returns 12 (from array of `[1, 1, 1, 2, 3, 5, 8, 12]`) instead of 5 (from array of `[1, 1, 1, 2, 3, 5, 1, 5]`).

But can a frog with the ability to jump distances of `[1, 3, 5]` have 12 different ways to reach to position 7? Especially, when _two patterns of jumps are different if, in one pattern, the frog visits a position which is not visited in the other pattern_. The fact that the one pattern cannot be counted as another unique way because a position has been visited eliminates a permutation.


## Videos

1. [5 Simple Steps for Solving Dynamic Programming Problems](https://youtu.be/aPQY__2H3tE)
2. [Dynamic Programming - Learn to Solve Algorithmic Problems & Coding Challenges](https://youtu.be/oBt53YbR9Kk)

## References

1. [Codility Training Media - Dynamic Programming](https://codility.com/media/train/15-DynamicProgramming.pdf)
2. Chapter 10: Dynamic Programming. The Algorithm Design Manual by Steven Skiena.

[^1]: Page 208. Chapter 14: Advanced Algorithms. Data Structures and Algorithms with JavaScript by Michael McMillan.

[^2]: Chapter 10: Dynamic Programming. The Algorithm Design Manual by Steven Skiena.

[^3]: Getting 6 = 4 + 1 + 1 comes from the use of [Greedy Algorithms](../greedy#161-the-coin-changing-problem).

[^4]: Details on Pascal's Triangle can be found in this [wiki](https://en.wikipedia.org/wiki/Pascal%27s_triangle).
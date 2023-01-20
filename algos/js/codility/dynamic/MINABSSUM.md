# Min Abs Sum
**with the help of Pen Cao**

## The Problem

For a given array A of N integers and a sequence S of N integers from the set {−1, 1}, we define val(A, S) as follows:

$$ val(A, S) = |sum\{ A[i] \times S[i]\text{ for i }= 0..N−1 \}| $$

(Assume that the sum of zero elements equals zero.)

For a given array $A$, we are looking for such a sequence $S$ that minimizes $val(A, S)$.

Write a function:

```js
function solution(A);
```

that, given an array $A$ of $N$ integers, computes the minimum value of $val(A, S)$ from all possible values of $val(A,S)$ for all possible sequences $S$ of $N$ integers from the set $\{−1, 1\}$.

For example, given array:

```js
   A[0] =  1
   A[1] =  5
   A[2] =  2
   A[3] = -2
```

your function should return 0, since for $S = [−1, 1, −1, 1]$, $val(A, S) = 0$, which is the minimum possible value.

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[0..20,000]$;
- each element of array $A$ is an integer within the range $[−100..100]$.

## Solution

Since we can arbitrarily choose to take the element or its negative, we can simplify the problem and replace each number with its absolute value. Then the problem becomes dividing the numbers into two groups and making the difference between the sums of the two groups as small as possible. It is a classic dynamic programming problem.

Assume the sum of absolute values of all the numbers is $S$. ***We want to choose some of the numbers (absolute values) to make their sum as large as possible without exceeding*** $\frac{S}{2}$. Why? Let $P$ be the sum of the first group, $Q$ be the sum of the other group and $P < Q$. We have $P \leq \frac{S}{2} \leq Q$ and $Q + P = S$. The larger is $P$, the smaller is Q and the difference $Q − P$. Hence, the largest possible $P \leq \frac{S}{2}$ gives the optimal result. Let M be the maximal element in the given array A. We create an array $dp$ of size $S$.

### Slow solution $O(N^2 \cdot M)$

Let $dp_i$ equal 1 if it is possible to achieve the sum of $i$ using elements of $A$, and $0$ otherwise. Initially $dp_i = 0$ for all of i (except $dp_0 = 1$). For every successive element in $A$ we update the array taking this element into account. We simply go through all the cells, starting from the top, and if $dp_i = 1$ then we also set $dp_{i + A_j}$ to 1. The direction in which array $dp$ is processed is important, since each element of $A$ can be used only once. After computing the array $dp$, $P$ is the largest index such that $P \leq \frac{S}{2}$ and $dp_P = 1$.

**1: Slow solution**
```js
const slowSolution = (A) => {
    const N = A.length;
    let M = 0;

    for(let i = 0; i < A.length; i++) {
        A[i] = Math.abs(A[i]);
        M = Math.max(A[i], M);
    }

    S = A.reduce( (p, c) => p + c );
    let dp = Array( S + 1).fill(0);
    dp[0] = 1;

    for(let j = 0; j < N; j++ ) {
        for(let i = S; i > -1; i-- ) {
            if (dp[i] == 1 && (i + A[j] <= S) ) {
                dp[i + A[j]] = 1;
            }
        }
    }

    result = S;

    for(let i = 0; i < Math.floor( S / 2 ) + 1 ; i++) {
        if (dp[i] == 1) {
            result = Math.min(result, S - 2 * i);
        }
    }

    return result;
}

slowSolution( [1, 5, 2, -2] );
```
The time complexity of the above solution is $O(N^2 · M)$, since $S = O(N · M)$.

### Golden solution $O(N \cdot M^2)$

Notice that the range of numbers is quite small (maximum 100). Hence, there must be a lot of duplicated numbers. Let $count_i$ denote the number of occurrences of the value $i$. We can improve the previous solution by processing all occurrences of the same value at once. First we calculate values $count_i$. Then we create array $dp$ such that:

- $dp_j = −1$ if we cannot get the sum $j$,
- $dp_j \geq 0$ if we can get sum $j$.

Initially, $dp_j = −1$ for all of $j$ (except $dp_0 = 0$). Then we scan through all the values appearing in $A$; we consider all $a$ such that $count_a > 0$.

For every such $a$ we update $dp$ that $dp_j$ denotes how many values $a$ remain (maximally) after achieving sum $j$. Note that if the previous value at $dp_j ­\geq 0$ then we can set $dp_j = count_a$ as no value $a$ is needed to obtain the sum $j$. Otherwise we must obtain sum $j − a$ first and then use a number $a$ to get sum $j$. In such a situation $dp_j = dp_{j − a} − 1$.

Using this algorithm, we can mark all the sum values and choose the best one (closest to half of $S$).

**2: Golden solution**
```js
function solution(A) {
    
    let max = 0;
    let total = 0;
    let target = 0;
    let dp = [];
    let count = [];
    let minDiff = Infinity;
    
    if(A.length === 0) {
        return 0;
    }
    
    A.sort(function(a, b) {
        return Math.abs(a) - Math.abs(b);
    });
    
    max = Math.abs(A[A.length - 1]);
    
    for(let i = 0; i <= max; i++) {
        count[i] = 0;
    }
    
    for(let i = 0; i < A.length; i++) {
        A[i] = Math.abs(A[i]);
        count[A[i]]++;
        total += A[i];
    }
    
    dp[0] = 0;
    for(let i = 1; i <= total; i++) {
        dp[i] = -1;
    }

    target = total / 2;
    
    for(let i = 0; i < count.length; i++) {
        if(count[i] > 0) {
            let step = i;
            for(let j = 0; j < dp.length; j++) {
                if(dp[j] >= 0) {
                    dp[j] = count[i];
                } else if(j >= step && dp[j - step] > 0) {
                    dp[j] = dp[j - step] - 1;
                }

                if(dp[j] >= 0) {
                    if(j === target) {
                        return 0;
                    } else {
                        minDiff = Math.min(minDiff, Math.abs( total - 2 * j ));
                    }
                }
            }
        }
    }
    
    return minDiff;
}

solution([ 1, 5, 2, -2 ])
```
The time complexity of the above solution is $O(N · M^2)$, where $M$ is the maximal element, since $S = O(N · M)$ and there are at most $M$ different values in $A$.

## Observations

I have an issue that the problem did not explicitly state that the minimum value should be an absolute value (value greater than or equal to 0). Nonetheless, provided above are two solutions. My frustration with the solution explanation is that it explains what the algorithm is doing but it does not state the reason for what it's doing.

As we move into the solution, the explanation for using half of the total sum of the absolute values help to clear up the use of `target = total / 2` in the **Golden solution**. My difficulty thereafter in accepting and fully grasping the solution was to visualize the use of $dp$ array (use of tabulation).

So, $dp$ is built out in such a way that it is a hash for all numbers up to the sum of the absolute values of the provided array. Tabulation was used in both the **Slow solution** and the **Golden solution**. So for the **Slow solution**, why is $dp$ updated based on the _sum of_ $i$ _using elements of_ $A$? You can see that condition `(i + A[j] <= S)` in the nested loop used on the basis of this statement. But why? And if so, why is $dp_0$ initiated as 1? Why does the nested loop decrement instead of increment?

When we keep watch of `i`, `A[j]` and `dp` in the nested loop of the `slowSolution`, we can see that `dp` is filled with a 1 once groups of the number in the provided array can sum up to a value between 1 and `S`. For example, when `[ 1 ]` (out of the `[ 1, 5, 2, -2 ]` array) is considered in the nested loop, it can only sum up to 1 while `i` is equal to 0. When `[1, 5]` (out of the `[ 1, 5, 2, -2 ]` array) is considered in the nested loop, it can sum up to 6 while `i` is equal to 1, hence that index is set to 1 in `dp`. When `i` is decremented to 0, using the same `[1, 5]`, it can sum up to 5, hence that index is also set to 1 in `dp`. When `i` is decremented to 6, 5, 1 and 0 while using `[1, 5, 2]`, indices 8 (6 + _2_), 7 (5 + _2_), 3 (1 + _2_) and 2 (0 + _2_) are set to 1 in `dp`. The pattern of filling out `dp`, suggests accounting for all possible sums from progressive groups of array `[1, 5, 2, -2]` as `[ 1 ]`, `[1, 5]`, `[1, 5, 2]` and `[1, 5, 2, 2]` (since absolute values are considered 2 is used instead of -2).

For the case of `[1, 5, 2, -2]` using `slowSolution`, the `dp` array has all indices filled with 1 when it completes the nested loop. So, upon approaching the last loop,

```js
for(let i = 0; i < Math.floor( S / 2 ) + 1 ; i++) {
    if (dp[i] == 1) {
        result = Math.min(result, S - 2 * i);
    }
}
```

Given that `S` is equal to 10, the values for `result` would evolve as shown in the table below,

| `i` | `result` |
|----:|---------:|
| 0   | 10       |
| 1   | 8        |
| 2   | 6        |
| 3   | 4        |
| 4   | 2        |
| 5   | 0        |

Now onto the details of the **Golden solution**.

The code snippet for the **Golden solution** makes use of sorting, [counting elements](../counting/) and the use of tabulation. Since, indices of the `count` array is being used as a key for the value of the elements in the array passed to the function, absolute values are used and so ignoring the sign (negative) of the number. So, for the case of the array, `[1, 5, 2, -2]`, the `count` should arrive at `[0, 1, 2, 0, 0, 1]` (which states one 1, two 2's and a 5).

When initializing the `dp` array, it is already assumed that any array will have a sub-array that is an empty set. The sum of an empty set of an array is 0. Therefore, `dp[0]` is 0, which raises the possibility that a sum of 0 can be derived.

First, we focus on the first two conditions within the nested loop shown below,

```js
if(dp[j] >= 0) {
    dp[j] = count[i];
} else if(j >= step && dp[j - step] > 0) {
    dp[j] = dp[j - step] - 1;
}
```

The aim of the first condition _denotes how many values_ $a$ _remain (maximally) after achieving sum_ $j$. Once $dp_j \geq 0$, sum $j$ is achieved. Ultimately, _if the previous value at_ $dp_j ­\geq 0$ _then we can set_ $dp_j = count_a$ ***as no value*** $a$ ***is needed to obtain the sum*** $j$.

Let's resume looking at the case of array, `[1, 5, 2, -2]` passed to the **Golden solution** to understand the consequences of the first condition.
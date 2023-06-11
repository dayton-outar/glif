# Min Abs Sum
**with the help of Pen Cao**

## The Problem

For a given array $A$ of $N$ integers and a sequence $S$ of $N$ integers from the set {−1, 1}, we define $val(A, S)$ as follows:

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

- $N$ is an integer within the range $[0 ... 20,000]$;
- each element of array $A$ is an integer within the range $[−100 ...100]$.

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

Let's resume looking at the case of array, `[1, 5, 2, -2]` passed to the **Golden solution** to understand the consequences of the first condition and the meaning of the highlighted statements in the last paragraph. So, as mentioned before, the `count` upon entering the nested loop would look like this ( $i$ is the column header values),

| 0 | 1 | 2 | 3 | 4 | 5 |
|--:|--:|--:|--:|--:|--:|
| 0 | 1 | 2 | 0 | 0 | 1 |

whereas the `dp` would look like this ( $j$ is the column header values),

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 0 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

Since, this is a divide-and-conquer approach, the array, `[1, 5, 2, -2]`, is first divided down to the base case of having an empty set passed in `[]`. The outer loop has within it a condition to by-pass all elements within `count` that are zero and, so, when the process enters the inner loop for the first time for this case `i` would be equal to 1 and `count[1]` would be 1. When `j` is 0, `dp[0]` meets the criteria to enter first condition. Following the highlighted statement, no value 1 is needed to obtain the sum 0, so then $dp_0$ is assigned to the total number of 1's passed in the array (`dp[0] = count[1]`). This causes `dp` to update to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

As we progress to another iteration within the nested loop, `dp[1]` does not meet the first condition but the second condition is met. The second condition is basically asking if a number exist to arrive at the sum $j$. There's a possibility of getting `[ 1 ]` from `[1, 5, 2 -2]` to get the sum 1. Given that `step` has been assigned to `i` before entering the inner loop, we must obtain `j - i` (in solution explanation it said $j - a$). So, when `j` is 1 and `i` is 1, we are updating `dp[1]` to arrive at sum 1 by _obtaining 1 from the_ `count` value that was temporarily stored at `dp[0]`. We decrement to demonstrate that a 1 has been used to arrive at the sum $j$ (which is 1 in this case). So, after completing the second iteration, `dp` looks like this,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 1 | 0 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

Upon the third iteration of the nested loop where `i` is 1, `j` is now 2 and `dp[2]` does not meet the first condition nor the second condition. Any sum above 1 cannot be derived from `[ 1 ]`. So, both conditions will not be met until `j` iterates pass 10 when `i` is 1.

When the outer loop enters its third iteration and `i` is now set to 2, `j` reset to 0 in the inner (nested) loop. The first condition is met when `dp[0]` is equal to 1. So, _no value 2 is needed to obtain the sum 0_, so then $dp_0$ is assigned to the total number of 2's passed in the array. This causes `dp` to update to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 0 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

When `j` iterates to 1 given that `i` is 2, the first condition is met once again because _no value 2 is needed to obtain the sum 1_, so then $dp_1$ is assigned to the total number of 2's passed in the array. This causes `dp` to update to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 2 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

When `j` iterates to 2 given that `i` is 2, the first condition is not met but the second condition is met. How can a sum of 2 be met from two 2's? (We take one). Hence, `dp` now looks like this,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 2 | 1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

Let's do a couple more iterations for this case when `i` is 2. When `j` is 3, the second condition is met so the value at `dj[1]` is taken and subtracted by 1 and the result assigned to `dj[3]`. So, `dp` now looks like this,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 2 | 1 | 1 |-1 |-1 |-1 |-1 |-1 |-1 |-1  |

When `j` is 4 while `i` is 2, the second condition is met so the value at `dj[2]` is taken and subtracted by 1 and the result assigned to `dj[4]`. So, `dp` now looks like this,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 2 | 1 | 1 | 0 |-1 |-1 |-1 |-1 |-1 |-1  |

When `j` is 5 while `i` is 2, the second condition is met so the value at `dj[3]` is taken and subtracted by 1 and the result assigned to `dj[5]`. So, `dp` now looks like this,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 2 | 2 | 1 | 1 | 0 | 0 |-1 |-1 |-1 |-1 |-1  |

At this point within the inner loop, `j` is equal to the `target` (which is the largest possible _sum_ without exceeding $S \over 2$). So, the entire process terminates through the first condition at the instructions shown below,

```js
if(j === target) {
    return 0;
} else {
    minDiff = Math.min(minDiff, Math.abs( total - 2 * j ));
}
```

We can test this process in such a way that the execution path goes through the second condition of the instructions shown above. In the first case with array, `[1, 5, 2, -2]`, the absolute sum is an even number. What if the sum is an odd number? `j` will never equal to `target`. Let's try another case with the array, `[1, 3, 3]`. Here the `total` is 7 and `count` is `[0, 1, 0, 2]` (one 1 and two 3's).

When `j` is 0 and `i` is 1, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 1 |-1 |-1 |-1 |-1 |-1 |-1 |-1 |

and the `minDiff` is updated to 7.

When `j` is 1 and `i` is 1, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 1 | 0 |-1 |-1 |-1 |-1 |-1 |-1 |

and the `minDiff` is updated to 5.

Neither `dp` nor `minDiff` is changed until `i` is iterated to 3.

When `j` is 0 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 0 |-1 |-1 |-1 |-1 |-1 |-1 |

the `minDiff` remains at 5.

When `j` is 1 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 |-1 |-1 |-1 |-1 |-1 |

the `minDiff` remains at 5.

When `j` is 2 and `i` is 3, `dp` remains,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 |-1 |-1 |-1 |-1 |-1 |

the `minDiff` remains at 5.

When `j` is 3 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 | 1 |-1 |-1 |-1 |-1 |

the `minDiff` remains at 1.

When `j` is 4 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 | 1 | 1 |-1 |-1 |-1 |

the `minDiff` remains at 1.

When `j` is 5 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 | 1 | 1 |-1 |-1 |-1 |

the `minDiff` remains at 1.

When `j` is 6 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 | 1 | 1 |-1 | 0 |-1 |

the `minDiff` remains at 1.

When `j` is 7 and `i` is 3, `dp` is updated to,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|--:|--:|--:|--:|--:|--:|--:|--:|
| 2 | 2 |-1 | 1 | 1 |-1 | 0 | 0 |

the `minDiff` remains at 1.

So, because `j` is never eual to `target`, the process returns the last value of `minDiff`.
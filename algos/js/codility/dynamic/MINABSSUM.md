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

Let $dp_i$ equal 1 if it is possible to achieve the sum of $i$ using elements of $A$, and $0$ otherwise. Initially $dp_i = 0$ for all of i (except $dp_0 = 1$). For every successive element in $A$ we update the array taking this element into account. We simply go through all the cells, starting from the top, and if $dp_i = 1$ then we also set $dp_{i + A_j}$ to 1. The direction in which array $dp$ is processed is important, since each element of $A$ can be used only once. After computing the array dp, $P$ is the largest index such that $P \leq \frac{S}{2}$ and $dp_P = 1$.

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

For every such a we update $dp$ that $dp_j$ denotes how many values $a$ remain (maximally) after achieving sum $j$. Note that if the previous value at $dp_j ­\geq 0$ then we can set $dp_j = count_a$ as no value $a$ is needed to obtain the sum $j$. Otherwise we must obtain sum $j − a$ first and then use a number $a$ to get sum $j$. In such a situation $dp_j = dp_{j − a} − 1$.

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

    target = total / 2; // 
    
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

I have an issue that the problem did not explicitly state that the minimum value should be an absolute value (value greater than or equal to 0).

As we move into the solution, the explanation for using half of the total sum of the absolute values help to clear up the use of `target = total / 2` in the **Golden solution**. My difficulty thereafter in accepting and fully grasping the solution was to visualize the use of $dp$ array (use of tabulation).

So, $dp$ is built out in such a way that it is a hash for all numbers up to the sum of the absolute values of the provided array.
# 9. Maximum Slice Problem

Let’s deﬁne a problem relating to maximum slices. You are given a sequence of n integers $a_0, a_1 , \ldots, a_{n − 1}$ and the task is to ﬁnd the slice with the largest sum. More precisely, we are looking for two indices $p$, $q$ such that the total $a_p + a_{p + 1} + \ldots + a_q$ is maximal. We assume that the slice can be empty and its sum equals 0.

In the picture, the slice with the largest sum is highlighted in gray. The sum of this slice equals 10 and there is no slice with a larger sum. Notice that the slice we are looking for may contain negative integers, as shown above.

## 9.1 Solution with $O(n^3)$ time complexity

The simplest approach is to analyze all the slices and choose the one with the largest sum.

**9.1: Maximal slice - $O(n^3)$**
```js
const slowMaxSlice = A => {
    const n = A.length;
    let result = 0;

    for ( let i = 0; i < n; i++ ) {
        for ( let j = i; j < n; j++ ) {
            let sum = 0;
            for ( let k = i; k < (j + 1); k++ ) {
                sum += A[k];
            }
            result = Math.max(result, sum);
        }
    }

    return result;
}

slowMaxSlice( [5, -7, 3, 5, -2, 4, -1] ); // 10
```

Analyzing all possible slices requires $O(n^2)$ time complexity, and for each of them we compute the total in $O(n)$ time complexity. It is the most straightforward solution, however it is far from optimal.

## 9.2. Solution with $O(n^2)$ time complexity

We can easily improve our last solution. Notice that the preﬁx sum allows the sum of any slice to be computed in a constant time. With this approach, the time complexity of the whole algorithm reduces to $O(n^2)$. We assume that $pref$ is an array of [preﬁx sums](../prefix-sums/README.md) $(pref_i = a_0 + a_1 + \ldots + a_{i − 1})$.

**9.2: Maximal slice - $O(n^2)$**
```js
const prefixSums = (A) => {
    const n = A.length;
    let P = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1); i++ ) {
        P[i] = P[i - 1] + A[i - 1];
    }

    return P;
}

const quadraticMaxSlice = (A, pref) => {
    const n = A.length;
    let result = 0;

    for ( let i = 0; i < n; i++ ) {
        for ( let j = i; j < n; j++ ) {
            let sum = pref[j + 1] - pref[i];
            result = Math.max(result, sum);
        }
    }

    return result;
}

let elements = [5, -7, 3, 5, -2, 4, -1];
quadraticMaxSlice( elements, prefixSums( elements ) ); // 10
```

We can also solve this problem without using preﬁx sums, within the same time complexity. Assume that we know the sum of slice $(p, q)$, so $s = a_p + a_{p + 1} + \ldots + a_q$. The sum of the slice with one more element $(p, q + 1)$ equals $s + a_{q + 1}$. Following this observation, there is no need to compute the sum each time from the beginning; we can use the previously calculated sum.

**9.3: Maximal slice - $O(n^2)$**
```js
const quadraticMaxSlice = (A) => {
    const n = A.length;
    let result = 0;

    for ( let i = 0; i < n; i++ ) {
        let sum = 0;
        for ( let j = i; j < n; j++ ) {
            sum += A[j];
            result = Math.max(result, sum);
        }
    }

    return result;
}

quadraticMaxSlice( [5, -7, 3, 5, -2, 4, -1] ); // 10
```

Still these solutions are not optimal.

## 9.3. Solution with $O(n)$ time complexity

This problem can be solved even faster. For each position, we compute the largest sum that ends in that position. If we assume that the maximum sum of a slice ending in position $i$ equals $maxEnding$, then the maximum slice ending in position $i + 1$ equals $max(0, maxEnding + a_{i + 1})$.

**9.4: Maximal slice - $O(n^2)$**
```js
const goldenMaxSlice = A => {
    let maxEnding = 0,
        maxSlice = 0;
    
    for ( let i = 0; i < A.length; i++ ) {
        maxEnding = Math.max(0, maxEnding + A[i]);
        maxSlice = Math.max(maxSlice, maxEnding);
    }

    return maxSlice;
}

goldenMaxSlice( [5, -7, 3, 5, -2, 4, -1] ); // 10
```

This time, the fastest algorithm is the one with the simplest implementation, however it is conceptually more diﬃcult. We have used here a very popular and important technique. Based on the solution for shorter sequences we can ﬁnd the solution for longer sequences.

## Observations

I think the use of a running total and `Math.max`, to keep track of the maximum total is pretty crafty. Performant ideas like this is what studying algorithms is all about. So, arrived at a performant solution after a dramatic difference in running time. From $O(n^3)$ to $O(n)$.

## References

1. [Codility Training Media - Counting Elements](https://codility.com/media/train/7-MaxSlice.pdf)
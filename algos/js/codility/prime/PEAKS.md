# Peaks

## Problem

A non-empty array $A$ consisting of $N$ integers is given.

A peak is an array element which is larger than its neighbors. More precisely, it is an index P such that $0 < P < N − 1,  A[P − 1] < A[P]$ and $A[P] > A[P + 1]$.

For example, the following array $A$:

```js
    A[0] = 1
    A[1] = 2
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

has exactly three peaks: 3, 5, 10.

We want to divide this array into blocks containing the same number of elements. More precisely, we want to choose a number $K$ that will yield the following blocks:

- $A[0], A[1], ..., A[K − 1]$,
- $A[K], A[K + 1], ..., A[2K − 1]$,
  
  ...

- $A[N − K], A[N − K + 1], ..., A[N − 1]$.

What's more, every block should contain at least one peak. Notice that extreme elements of the blocks (for example $A[K − 1]$ or $A[K]$) can also be peaks, but only if they have both neighbors (including one in an adjacent blocks).

The goal is to find the maximum number of blocks into which the array $A$ can be divided.

Array $A$ can be divided into blocks as follows:

- one block (1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2). This block contains three peaks.
- two blocks (1, 2, 3, 4, 3, 4) and (1, 2, 3, 4, 6, 2). Every block has a peak.
- three blocks (1, 2, 3, 4), (3, 4, 1, 2), (3, 4, 6, 2). Every block has a peak. Notice in particular that the first block (1, 2, 3, 4) has a peak at $A[3]$, because $A[2] < A[3] > A[4]$, even though $A[4]$ is in the adjacent block.

However, array $A$ cannot be divided into four blocks, (1, 2, 3), (4, 3, 4), (1, 2, 3) and (4, 6, 2), because the (1, 2, 3) blocks do not contain a peak. Notice in particular that the (4, 3, 4) block contains two peaks: $A[3]$ and $A[5]$.

The maximum number of blocks that array $A$ can be divided into is three.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ consisting of $N$ integers, returns the maximum number of blocks into which $A$ can be divided.

If $A$ cannot be divided into some number of blocks, the function should return 0.

For example, given:

```js
    A[0] = 1
    A[1] = 2
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

- $N$ is an integer within the range $[1 ... 100,000]$;
- each element of array $A$ is an integer within the range $[0 ... 1,000,000,000]$.

## Solution

The key points to note for this problem is:

1. All blocks need to have the same number of elements
2. Each block must have a peak

Ultimately, the aim is to find the maximum number of blocks possible from the provided array.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23).

See below the snippet of code that worked performantly to deliver the solution.

```js
function solution(A) {    
    if ( A.length < 3 ) {
        return 0;
    }
    
    let peaks = [];
    let maxSize = 0;
    
    for ( let i = 1; i < A.length - 1; i++ ) {
        if ( A[i] > A[i-1] && A[i] > A[i+1] ) {
            peaks.push(i);
        }
    }
    
    if ( peaks.length < 2 ) {
        return peaks.length;
    }
    
    for( let i = 1; i <= A.length; i++ ) {
        if ( A.length % i === 0 ) {
            let blockSize = i;
            let blockCount = A.length / i;
            
            let lastGroup = 0;
            for( let j = 0; j < peaks.length; j++ ) {
                if ( parseInt( peaks[j] / blockSize ) === lastGroup ) {
                    lastGroup++;
                }
            }
            
            if ( lastGroup === blockCount ) {
                maxSize = Math.max(maxSize, blockCount);
            }
        }
    }
    
    return maxSize;
}

solution( [1, 2, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2] ); // 3
```

Let's dive in and deconstruct this solution.

The first condition (or `if` statement) addresses arrays that contain less than 3 elements. A peak can only exist when there are at least 3 elements in the array to meet the condition that define a peak, which is stated in the second paragraph of the problem.

The first loop in the solution is basically counting the number of peaks that can be found within the provided array.

The second condition is basically stating that if the number of peaks found is less than 2, then the maximum number of blocks possible has to be the number of peaks found. The cases that would meet this condition would be when there are no peaks and when there is only 1 peak.

So, the second outer loop will check every block size possibility that can be had with the provided array. Since _all blocks need to have the same number of elements_, it means that the block size (number of elements in each block) and the block count (number of blocks that can be created) from the provided array _must be divisors_ of the total number of elements of that array. This is the main principle of the instructions just before entering the inner loop.

The main aim of the inner loop is to count the number of blocks that contain at least 1 peak. The craftiness about finding the first peak within the `blockSize` and moving to the next through the condition, `parseInt( peaks[j] / blockSize ) === lastGroup`, is pretty efficient. When all blocks that have a peak that fits the rules are counted and stored in `lastGroup`, the solution transition to the final critical condition check within the outer loop.

Just to make the point of the efficiency of the condition within the inner loop, take a look at the solution below from Yaseen Shaik[^1], which scored 90% (it was almost perfect).

```js
function solution(A) {
    let n = A.length;
    let peaks = [];
    
    for (let i = 1; i < n - 1; i++) {
        if (A[i - 1] < A[i] && A[i] > A[i + 1]) {
            peaks.push(i);
        }
    }

    let max = 0;
    
    for (let i = 1; i < n; i++) {
        if ((n % i) == 0) {
            let bi = 0;
            let block = n / i;
            for( let ind in peaks ) {
            	let p = peaks[ind]
                if (bi * block <= p && p < (bi + 1) * block) {
                    bi++;
                }
            }
            if (bi == i) {
                max = i;
            }
        }
    }

    return max;
}
```

The condition within the inner loop of Yaseen Shaik's solution, `(bi * block <= p && p < (bi + 1) * block)`, achieves the same thing as Jonatas Walker's condition, `parseInt( peaks[j] / blockSize ) === lastGroup`, but with more instructions. Could this be the reason that Yaseen Shaik's solution did not get a score of 100%?

Since the overall aim is to _find the maximum number of blocks possible_, then while checking every block size possibility there must be a variable to maintain the state of the _maximum number of blocks_ from the checks.

The time complexity of this solution is $O(n \cdot \text{ log ( log n )})$.

The counting of the peaks will cost $O(n)$. Since the inner loop has to find _divisors_, this causes the body of the outer loop to be executed in a harmonic series of iterations. For example, an array of length 8, will enter the block within the outer loop when the counter is 1, 2, 4 and 8. It is because of this type of iteration that the time complexity for the outer loop is deduced as $O(\text{log n})$. The inner loop will not count every peak but every first peak within a block and the blocks are iterating at a harmonic rythm. So, since we have a harmonic iterating loop within a harmonic iterating loop, we arrive at $O(\text{ log ( log n )})$.

[^1]: [Yaseen Shaik Solution for Codility Peaks](https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Peaks.md)
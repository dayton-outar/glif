# Fibonacci Frog

## Problem

The Fibonacci sequence is defined using the following recursive formula:

$F(0) = 0$

$F(1) = 1$

$F(M) = F(M - 1) + F(M - 2) \text{ if } M >= 2$

A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position − 1) and wants to get to the other bank (position, $N$). The frog can jump over any distance $F(K)$, where $F(K)$ is the $K$-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position $N$.

The leaves on the river are represented in an array $A$ consisting of $N$ integers. Consecutive elements of array A represent consecutive positions from $0$ to $N − 1$ on the river. Array $A$ contains only 0s and/or 1s:

- 0 represents a position without a leaf;
- 1 represents a position containing a leaf.

The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from (position − 1) to position, $N$). The frog can jump between (positions − 1) and $N$ (the banks of the river) and every position containing a leaf.

For example, consider array A such that:

```js
    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
```

The frog can make three jumps of length $F(5) = 5$, $F(3) = 2$ and $F(5) = 5$.

Write a function:

```js
    function solution(A);
```

that, given an array $A$ consisting of $N$ integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

For example, given:
```js
    A[0] = 0
    A[1] = 0
    A[2] = 0
    A[3] = 1
    A[4] = 1
    A[5] = 0
    A[6] = 1
    A[7] = 0
    A[8] = 0
    A[9] = 0
    A[10] = 0
```

the function should return 3, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[0 ... 100,000]$;
- each element of array $A$ is an integer that can have one of the following values: 0, 1.

## Solution

Basically, there are a set of steps from one point to the next that a frog has to make his way across but his jumps are in levels of the fibonacci numbers. _The frog can jump between (positions − 1) and N (the banks of the river) and every position containing a leaf_. The aim is to _find the minimum number of jumps it takes to get to the other bank of the river, N_. The frog is not allowed to jump to any position greater than $N$.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See below his solution to this problem.


```js
function solution(A) {    
    let fib = [];
    let N = A.length + 1;
    let i = 1;
    let steps = [];
    let arr = [];
    
    arr[0] = 1; // jumping from start
    for( i = 1; i <= A.length; i++ ) {
        arr[i] = A[i - 1];
    }
    
    if(N < 3) {
        return 1;
    }
    
    fib[0] = 0;
    fib[1] = 1;
    
    i = 1;
    
    while( fib[i++] < N ) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    
    steps[0] = 1;
    for( i = 1; i <= N; i++ ) {
        steps[i] = 0;
    }
    
    let base = 0;
    i = 2;
    
    let result = -1;
    
    while(i < fib.length && base <= N) {
        let nextPos = base + fib[i];
        
        if(steps[base] === 0) {
            base++;
        } else if(nextPos > N) {
            base++;
            i = 2;
        } else {
            if(nextPos === N) {
                if(base === 0) {
                    return 1;
                } else {
                    if(result < 0) {
                        result = steps[base] + 1;
                    } else {
                        result = Math.min(result, steps[base] + 1);
                    }
                }
            } else if(arr[nextPos] === 1) {
                if(steps[nextPos] === 0) {
                    if(base === 0) {
                        steps[nextPos] = 1;
                    } else {
                        steps[nextPos] = steps[base] + 1;
                    }
                } else {
                    steps[nextPos] = Math.min(steps[nextPos], steps[base] + 1);
                }
            }
            
            i++;
        }
    }
    
    return result;
}

solution( [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0] ); // 3
```

This solution makes use of a number of techniques to deliver accurate results at optimal performance. There is use of [Dynamic Programming](../dynamic/) and the main loop (the fourth one in the `solution` function) uses two pointers to maintain a hashtable that [count occurences](../counting/) of jumps.

Before the `solution` function transitions into the final loop, it prepares 3 arrays (or hashtable depending on how you see it) to better track the possible jumps that can be made into the appropriate positions possible. The first loop simply adds the _(position - 1)_ as a baseline to start from in the `arr` array, where 1 is placed at the beginning index, 0, of this array. The `arr` states the appropriate positions possible for the frog to land. The `fib` array keeps the possible jumps (distance that the frog can jump) limited by the distance between one bank of the river to the other bank, which is the length of the array plus 1. The illustration below justifies the formula from which $N$ is derived.

![Starting Position of Fibonacci Frog](/.attachments/fibonacci-frog-start.png)

The `steps` array, is the array that will be updated to keep track of all (really? all?) possibilities from each position and is critically important in _find the minimum number of jumps it takes to get to the other bank of the river, N_.
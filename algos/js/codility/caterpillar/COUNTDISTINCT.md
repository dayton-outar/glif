# Count Distinct Slices

## Problem

An integer $M$ and a non-empty array $A$ consisting of $N$ non-negative integers are given. All integers in array $A$ are less than or equal to $M$.

A pair of integers $(P, Q)$, such that $0 ≤ P ≤ Q < N$, is called a _slice_ of array A. The slice consists of the elements $A[P], A[P + 1], ..., A[Q]$. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

For example, consider integer $M = 6$ and array $A$ such that:

```js
    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2
```

There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

The goal is to calculate the number of distinct slices.

Write a function:

```js
    function solution(M, A);
```

that, given an integer $M$ and a non-empty array $A$ consisting of $N$ integers, returns the number of distinct slices.

If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

For example, given integer $M = 6$ and array $A$ such that:

```js
    A[0] = 3
    A[1] = 4
    A[2] = 5
    A[3] = 5
    A[4] = 2
```

the function should return 9, as explained above.

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- $M$ is an integer within the range $[0 ... 100,000]$;
- each element of array $A$ is an integer within the range $[0 ... M]$.

## Solution

This problem is not hard to grasp. The goal is _to calculate the number of distinct slices_ that can be had from the provided array. Slices should not contain the same number more than once.

See below the details of the nine distinct slices from the provided use case in this problem.

| #     | slice | numbers in slice |
|:------| :-----|:-----------------|
|**1.** | (0,0) | [ 3 ]            |
|**2.** | (0,1) | [ 3, 4 ]         |
|**3.** | (0,2) | [ 3, 4, 5 ]      |
|**4.** | (1,1) | [ 4 ]            |
|**5.** | (1,2) | [ 4, 5 ]         |
|**6.** | (2,2) | [ 5 ]            |
|**7.** | (3,3) | [ 5 ]            |
|**8.** | (3,4) | [ 5, 2 ]         |
|**9.** | (4,4) | [ 2 ]            |

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(M, A) {    
    const LIMIT = 1000000000;    
    
    if(A.length === 1) {
        return 1;
    }
    
    let lastPos = Array((M + 1)).fill(-1);

    let count = 0;
    let start = 0;
    for(let i = 0; i < A.length; i++ ) {
        let item = A[i];
        
        // -- Important core logic
        if(lastPos[item] + 1 > start) {
            start = lastPos[item] + 1;
        }
        
        lastPos[item] = i;
        count += i - start + 1;
        
        if(count > LIMIT) break;
    }
    
    return count > LIMIT ? LIMIT : count;
}

solution( 6, [3, 4, 5, 5, 2] ); // 9
```

Let's deconstruct this problem.

The first control structure handles the edge case of being provided an array of 1 element. In such a case, only 1 possibility is expected. For example, an array such as `[ 4 ]` will only have one distinct slice and that is (0, 0).

The `solution` function makes use of a hashtable (using `lastPos` array as hashtable) to keep track of the last position visited and the value of the element in the array. The concept used is similar to [counting elements](../counting/) but the difference is that the array is keeping track of the last position rather than counting the occurrences of a certain value within the array.

Initially, the `lastPos` array will contain -1 as the value for all the elements within it. So, the variable, `M`, helps a lot with performance optimization in that the program need not loop through all the elements of the provided array to find the maximum value but it simply depends on the rule that all values within the provided array _are less than or equal to M_. So, the `lastPos` array acts as a kind of hashtable that creates a distinct slot for every value that can be found within the provided array. See table below that shows an illustration of how `lastPos` is initialized,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|-1 |-1 |-1 |-1 |-1 |-1 |-1 |

The program enters a loop equipped with the mentioned hashtable and two variables, `count` and `start`. The `start` pointer variable plays a critical role in the logic to identify when a value occurs more than once and, hence, grants the program the ability to determine _distinct slices_ where the slices _consists of only unique numbers_.

Let's go through a few iterations to understand the role of the `start` variable. When `i` is 0 for the provided use case, the value at index 0 in the provided array is 3. Since the `lastPos` index value at 3 is -1, the calculation and outcome of the `if` statement (shown in snippet below) will cause the program to skip the instruction to update the `start` variable.

```js
if(lastPos[item] + 1 > start) {
    start = lastPos[item] + 1;
}
```

So, after the first iteration, `start` remains at 0.

Since the value 3 was discovered at index 0, this last position updates the appropriate index within `lastPos`, which is the index that matches to the value currently checked. See an updated state of the `lastPos` array hashtable after first iteration,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|-1 |-1 |-1 | 0 |-1 |-1 |-1 |

Now, that the logic that identifies distinct slices have been explained, it's time to move to counting the distinct slices.

So how does the following snippet of code in the `solution` function manage to count the distinct slices?

```js
count += i - start + 1;
```

Let's put the variables used in the arithmetic calculation into perspective. The `start` variable is basically maintaining state of the start of the slice while the `i` pointer variable is maintaining state of the end of the slice. This is the caterpillar method at work. So, look at the following possibilities for `start` and `i`,

 - when `start` is 0 and `i` is 0, there can only be 1 slice: (0, 0)
 - when `start` is 0 and `i` is 1, 2 slices are possible: (0, 1), (1, 1)
 - when `start` is 0 and `i` is 2, : (0, 2), (1, 2), (2, 2)

When `i` is iterated to 3, a value that was found in the provided array is discovered once again. So, in order to maintain unique values within slices, the `start` position has to be updated. So, as the loop continues to iterate, the possibilities are as follows,

 - when `start` is 3 and `i` is 3, there can only be 1 slice: (3,3)
 - when `start` is 3 and `i` is 4, 2 slices are possible: (3, 4), (4, 4)

When all the slices are counted for the provided use case, the total comes to 9. The breakdown of possibilities shows in detail the slices that are counted to arrive at 9 as the total number of distinct slices.

The arithmetic for counting possibilities of slices, subtracts the index used as the start of the slice from the index used as the end of the slice and adds 1 to the outcome (`i - start + 1`). When reviewing the breakdown of the provided use case, the addition of 1 can be understood, especially when `start` is 0 and `i` is 0. Progressing throught the breakdown can give the idea of how the combination of slices grows as the end index increases away from the start index. If an array contains 2 unique values, the number of slices possible are 2 slices, If an array contains 4 unique values, the number of slices possible are 4 slices. So, understanding this logic helps in understanding how the total number of distinct slices for a given array is arrived at.

The time complexity of this algorithm is $O(n)$.
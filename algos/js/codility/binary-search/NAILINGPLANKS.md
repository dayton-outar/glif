# Nailing Planks

## Problem

You are given two non-empty arrays $A$ and $B$ consisting of $N$ integers. These arrays represent $N$ planks. More precisely, $A[K]$ is the start and $B[K]$ the end of the $K$−th plank.

Next, you are given a non-empty array $C$ consisting of $M$ integers. This array represents $M$ nails. More precisely, $C[I]$ is the position where you can hammer in the $I$−th nail.

We say that a plank $(A[K], B[K])$ is nailed if there exists a nail $C[I]$ such that $A[K] ≤ C[I] ≤ B[K]$.

The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value $J$ such that all planks will be nailed after using only the first $J$ nails. More precisely, for every plank $(A[K], B[K])$ such that $0 ≤ K < N$, there should exist a nail $C[I]$ such that $I < J$ and $A[K] ≤ C[I] ≤ B[K]$.

For example, given arrays $A$, $B$ such that:

```js
    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10
```

four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

Given array $C$ such that:

```js
    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2
```

if we use the following nails:

- 0, then planks [1, 4] and [4, 5] will both be nailed.
- 0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
- 0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
- 0, 1, 2, 3, then all the planks will be nailed.

Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

Write a function:

```js
    function solution(A, B, C);
```

that, given two non-empty arrays $A$ and $B$ consisting of $N$ integers and a non-empty array $C$ consisting of $M$ integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

If it is not possible to nail all the planks, the function should return −1.

For example, given arrays $A$, $B$, $C$ such that:

```js
    A[0] = 1    B[0] = 4
    A[1] = 4    B[1] = 5
    A[2] = 5    B[2] = 9
    A[3] = 8    B[3] = 10

    C[0] = 4
    C[1] = 6
    C[2] = 7
    C[3] = 10
    C[4] = 2
```

the function should return 4, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ and $M$ are integers within the range $[1 ... 30,000]$;
- each element of arrays $A$, $B$ and $C$ is an integer within the range $[1 ... 2 \cdot M]$;
- $A[K] ≤ B[K]$.


## Solution

The only part of the problem definition that can be misunderstood was the explanation of how the nails were used in the provided use case. I would prefer to expand on the bullet points as follows,

 - 0, where $C[0] = 4$, planks [1, 4] and [4, 5] will both be nailed.
 - 0, 1, where $C[0] = 4$ and $C[1] = 6$, planks [1, 4], [4, 5] and [5, 9] will be nailed.
 - 0, 1, 2, where $C[0] = 4$, $C[1] = 6$ and $C[2] = 7$, planks [1, 4], [4, 5] and [5, 9] will be nailed.
 - 0, 1, 2, 3, where $C[0] = 4$, $C[1] = 6$, $C[2] = 7$ and $C[3] = 10$, all planks will be nailed.

I think the above would better clarify that the numbers stated were the indices of the array of $C$ that contained the position of the nails.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function allNailed(arrA, arrB, totalNails) {
    for(let i = 0; i < arrA.length; i++ ) {

        // totalNails is basically a rolling/running total in each increasing element.
        if ( totalNails[arrA[i] - 1] === totalNails[arrB[i]] ) {
            return false;
        }

    }
    
    return true;
}

function solution(A, B, C) {    
    let maxB = 0;
    let min = 0;
    let max = C.length;
    let atLeastOne = false;
    let i = 0;
    let totalNails = [];
    
    if(C.length === 1) {
        if(A[0] <= C[0] && C[0] <= B[0]) {
            return 1;
        } else {
            return -1;
        }
    }
    
    for(i = 0; i < A.length; i++) {
        maxB = Math.max(maxB, B[i]);
    }
    
    for(i = 0; i <= maxB; i++) {
        totalNails[i] = 0;
    }
    
    while(min <= max) {
        let mid = parseInt((min + max) / 2);
        
        // Resetting array filling all positions with 0
        for(i = 0; i < totalNails.length; i++) {
            totalNails[i] = 0;
        }

        // Set the index in the array to 1 for nail position. If nail is 4, index 4 is set to 1
        // There exists a nail in the set between 0 and mid that can nail plank at x position
        for(i = 0; i < mid; i++) {
            totalNails[C[i]] = 1;
        }

        // Increment value of current index based on number in previous index. Why?
        // This approach is almost like something borrowed from dynamic programming and counting occurences
        // Notice no comparison between the nails and planks were done like (A[i] <= C[j]) && (C[j] <= B[i])
        for(i = 1; i < totalNails.length; i++) {
            totalNails[i] += totalNails[i - 1];
        }
        
        let result = allNailed(A, B, totalNails);
        
        if(result) {
            atLeastOne = true;
            if(max === mid) {
                break;
            }
            
            max = mid;
        } else {
            min = mid + 1;
        }
    }
    
    if(!atLeastOne) {
        return -1;
    } else {    
        return min;
    }
}

solution([1, 4, 5, 8], [4, 5, 9, 10], [4, 6, 7, 10, 2]); // 4
```

Let's deconstruct.

Central to the `solution` above is the use of the `totalNails` array. This solution makes use of [Dynamic Programming](../dynamic/) and [Counting Occurences](../counting/). First thing that was done is to decide the length of the array based on the maximum position of the planks, which was stored in `maxB` and storing the maximum of each value in the upper part of each plank stored in array, `B`. So, for the use case stated in the problem defintion, we could represent `totalNails` initiated as follows,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |  0 |

After `totalNails` is initialized, the program enters into a binary search loop, where the mid point of all the indices of array, `C`, is found.

The next step of the algorithm was to mark the positions where the nails in the array, `C`, can be nailed along the planks but restricted to `mid` point of `C`. The outcome of this step is as follows,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 0 | 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 0 |  0 |

After marking the positions, a running total is done through the array to state the occurrence of nails used throughout the length of the planks. The outcome of this step is as follows,

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|---:|
| 0 | 0 | 0 | 0 | 1 | 1 | 2 | 2 | 2 | 2 |  2 |

The array, `totalNails`, is now moved into the craftiest part of the algorithm, which all the dynamic programming and counting occurences was meant for being used. This part is encapsulated within the `allNailed` function. Within this function all the indices of the planks are looped through to test the condition that if the value at position of the lower bound minus 1 of a plank is equal to the position of the upper bound of the plank (`totalNails[arrA[i] - 1] === totalNails[arrB[i]]`), then break the loop and return `false`. Importantly, the rules for every plank $(A[K], B[K])$ such that $0 ≤ K < N$. So, we know that any array of `C` cannot have values lower than 1. `totalNails` was initialized to have 0, to facilitate the mentioned condition testing a plank like [1, 4]. So, simulating with the provided test case the condition would test plank [1, 4] like so,

```js
totalNails[1 - 1] === totalNails[4]; // totalNails[0] <-- 0 is not equal to totalNails[4] <-- 1
```

The condition would fail and iterate to the next plank, [4, 5], which would also fail (stating that the plank is nailed with the nails chosen). Plank, [8, 10] would cause the condition to pass and then make the program exit the loop and return `false` from `allNailed`. So, when nails `C[0]` and `C[1]` are used, they can nail down planks [1, 4], [4, 5] and [5, 9] but not [8, 10].

Now that the algorithm can detect when all planks are nailed through various possibilities, the next major logical step is how to exit the binary search loop with the _minimum number of nails needed to nail down all planks_. Let's take a look at the control structure after the call to `allNailed`.

```js
if(result) {
    atLeastOne = true;
    if(max === mid) {
        break;
    }
    
    max = mid;
} else {
    min = mid + 1;
}
```

The `mid` pointer basically states the upper bound index of the array of nails, `C`, that had to be used _sequentially_ to _nail down all planks_. If a `mid` value is arrived at that _nails down all planks_, then that value becomes the `max` since it fulfills a minimum requirement. If all nails are not nailed down, the `min` is incremented and closes in onto the `max` value until _minimum number of nails needed to nail down all planks_ is arrived.

The time complexity of this $O((n + m) \cdot log(m))$, where $n$ is the length of the array, `totalNails`, representing the plank positions and $m$ is the length of `C`, the array containing the position where the nails are allowed.
# Min Max Division

## Problem

You are given integers $K$, $M$ and a non-empty array $A$ consisting of $N$ integers. Every element of the array is not greater than $M$.

You should divide this array into $K$ blocks of consecutive elements. The size of the block is any integer between 0 and $N$. Every element of the array should belong to some block.

The sum of the block from $X$ to $Y$ equals $A[X] + A[X + 1] + ... + A[Y]$. The sum of empty block equals 0.

The _large sum_ is the maximal sum of any block.

For example, you are given integers $K = 3$, $M = 5$ and array $A$ such that:

```js
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2
```

The array can be divided, for example, into the following blocks:

- [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
- [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
- [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
- [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.

The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

Write a function:

```js
    function solution(K, M, A);
```

that, given integers $K$, $M$ and a non-empty array $A$ consisting of $N$ integers, returns the minimal large sum.

For example, given $K = 3$, $M = 5$ and array $A$ such that:

```js
  A[0] = 2
  A[1] = 1
  A[2] = 5
  A[3] = 1
  A[4] = 2
  A[5] = 2
  A[6] = 2
```

the function should return 6, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ and $K$ are integers within the range $[1 ... 100,000]$;
- $M$ is an integer within the range $[0 ... 10,000]$;
- each element of array $A$ is an integer within the range $[0 ... M]$.

## Solution

The problem definition is clear and easy to understand. When the array is divided into $K$ number of blocks, the block that contains the largest sum is noted. The aim of this problem is to find an arrangement of dividing the blocks in such a way that the _minimal largest sum_ is arrived.

The number of combinations possible of dividing the array is limited to the rule stating that the elements of the array should maintain $K$ blocks of consecutive elements. So, the elements of the array should not be shifted around but flow in the same order of position only that it is being divided into $K$ blocks (or arrays).

How would we find the _minimal largest sum_ given that there could be several ways of dividing an array into blocks? The brute force method to arrive at a solution for this problem can easily arrive at a performance of polynomial time (or quadratic time $O(n^2)$).

Let's take a look at Jonatas Walker's approach to resolve this problem in the most efficient way possible.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function neededBlocks(arr, maxValue) {
    var countBlocks = 1;
    var sum = arr[0];
    
    for(var j = 1; j < arr.length; j++) {
        if(sum + arr[j] > maxValue) {
            sum = arr[j];
            countBlocks++;
        } else {
            sum += arr[j];
        }
    }
    
    return countBlocks;
}

function solution(K, M, A) {
    let min = 0;
    let max = 0;
    let mid = 0;
    
    for (let i = 0; i < A.length; i++) {
        max += A[i];
        min = Math.max(min, A[i]);
    }
    
    if (K === 1) {
        return max;
    } else if (K >= A.length) {
        return min;
    }
    
    while(min <= max) {
        let temp = mid;
        mid = parseInt((max + min) / 2);
        
        if(mid === temp) {
            break;
        }
        
        let blocks = neededBlocks(A, mid);
        
        if(blocks > K) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }
    
    return max;
}

solution(3, 5, [2, 1, 5, 1, 2, 2, 2]); // 6
```

The first loop within `solution` function finds the minimum possible _largest sum_ and the maximum possible _largest sum_ for any arrangement. The minimum possible largest sum is arrived at when a block contains the largest element of the array as the only element within that block. For the provided use case, 5 is the minimum possible largest sum. The maximum possible largest sum is arrived at when all the elements of the array are summed up as if all those elements were arranged into one block. For the provided use case, where $K = 3$, there could be 2 empty blocks and one block containing all the elements, which sum up to 15.

Before sifting through combinations, the control structure was put in place to check edge cases. One edge case involves the use of only 1 block to divide the array. There's only one way to divide an array into 1 block and that block will contain all the elements.

The other edge case involves having to divide the elements where the number of blocks, $K$, is the same as the number of elements within the array. In this case, there's only one way to divded $x$ number of elements into $x$ number of blocks. The _minimal largest sum_ in such a case is to find the element that has the maximum value.

Now, for cases where the number of elements in the provided array, `A`, are greater than the number of blocks, `K`, a binary search method is used to find the _minimal largest sum_ between the _minimum possible largest sum_ and the _maximum possible largest sum_. Let's call the sum between the _minimum possible largest sum_ and the _maximum possible largest sum_, the _mid-point largest sum_. Each iteration of the binary search loop invokes the `neededBlocks` function and uses the results of that function determines the next iteration of the loop. Basically, this approach tests whether the _mid-point largest sum_ is the _minimal largest sum_ that meets the requirement with $K$ blocks on each iteration.

How does `neededBlocks` work? The current _mid-point largest sum_ is provided with the given array and that sum is used as the dividing factor on each iteration looping through the given array. The `sum` variable keeps track of the running balance and is used as part of the arithmetic and logic to determine the dividing point. Another variable keeps track of the number of times that a dividing point was arrived at. This is, basically, the number of blocks needed to get that _mid-point largest sum_, which could be the _minimal largest sum_ if the number of blocks meet the requirements specified in $K$.

The time complexity of this algorith is $O(n \cdot \text{log n})$.
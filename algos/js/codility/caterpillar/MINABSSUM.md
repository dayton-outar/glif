# Min Absolute Sum of Two

## Problem

Let $A$ be a non-empty array consisting of $N$ integers.

The _abs sum of two_ for a pair of indices $(P, Q)$ is the absolute value $| A[P] + A[Q] |$, for $0 ≤ P ≤ Q < N$.

For example, the following array $A$:

```js
  A[0] =  1
  A[1] =  4
  A[2] = -3
```

has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).

The abs sum of two for the pair (0, 0) is $A[0] + A[0] = |1 + 1| = 2$.

The abs sum of two for the pair (0, 1) is $A[0] + A[1] = |1 + 4| = 5$.

The abs sum of two for the pair (0, 2) is $A[0] + A[2] = |1 + (−3)| = 2$.

The abs sum of two for the pair (1, 1) is $A[1] + A[1] = |4 + 4| = 8$.

The abs sum of two for the pair (1, 2) is $A[1] + A[2] = |4 + (−3)| = 1$.

The abs sum of two for the pair (2, 2) is $A[2] + A[2] = |(−3) + (−3)| = 6$.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ consisting of $N$ integers, returns the minimal abs sum of two for any pair of indices in this array.

For example, given the following array $A$:

```js
  A[0] =  1
  A[1] =  4
  A[2] = -3
```

the function should return 1, as explained above.

Given array $A$:

```js
  A[0] = -8
  A[1] =  4
  A[2] =  5
  A[3] =-10
  A[4] =  3
```

the function should return |(−8) + 5| = 3.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- each element of array $A$ is an integer within the range $[−1,000,000,000 ... 1,000,000,000]$.


## Solution

The aim of this problem is to _find the minimal absolute sum of two for any pair of indices in a provided array_.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(A) {    
    let positives = [];
    let negatives = [];
    let i = 0;
    let min = 0;
    
    let start = 0;
    let end = 0;
    
    if ( A.length === 1 ) {
        return Math.abs(A[0] + A[0]);
    }
    
    A.sort(function(a, b) {
        return a - b;
    });
    
    for (i = 0; i < A.length; i++) {
        if(A[i] < 0) {
            negatives.push(A[i]);
        } else {
            positives.push(A[i]);
        }
    }
    
    negatives.sort(function(a, b) {
        return b - a;
    });
    
    if ( positives.length === 0 ) {
        return Math.abs(2 * negatives[0]);
    }
    
    if ( negatives.length === 0 ) {
        return 2 * positives[0];
    }
    
    if ( positives[0] === 0 ) {
        return 0;
    }
    
    min = positives[0] * 2;
    
    for( i = 0; i < negatives.length; i++ ) {
        start = 0;
        end = positives.length - 1;
        let neg = A[i];
        
        while ( start <= end ) {
            let mid = parseInt((start + end) / 2);
            let pos = positives[mid];
            let sum = Math.abs(neg + pos);
            
            min = Math.min(sum, min);
            
            if ( pos > Math.abs(neg) ) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
    }
    
    return min;
}

solution( [-8, 4, 5, -10, 3] ); // 3
```

Let's deconstruct this solution.

The first control structure met within `solution` function handles the edge case where only one element is within the provided array. In such a case, the _absolute sum of two_ would be the first element added to itself (or the first element multiplied by 2). In this case the pair of indices would be (0, 0) giving the absolute value through the formula $| A[0] + A[0] |$.

Other edge cases are addressed after the provided array is sorted in a manner that allows for the array to be split into two arrays, where one set of numbers are negative and the other set of numbers are positive.

When negative numbers are sorted in ascending order, the number with the least magnitude floats to the top. For example, -3 is greater than -9. Since absolute number focuses more on the magnitude than the direction, the negative numbers need to be sorted in descending order to match up to the same order as positive numbers, especially that absolute values will be used.

So, the array, `[-8, 4, 5, -10, 3]`, sorted in ascending order produces this: `[-10, -8, 3, 4, 5]`. When the array in it's sorted order is split around zero (0), the array containing the negatives is `[-10, -8]` and the array containing the positives is `[3, 4, 5]`. The first number within the negatives is the maximum absolute number but the first number within the positives is the minimum absolute number. The negatives can match the order of the positives by ordering the numbers in descending order. When this is done, the negatives for the mentioned use case is `[-8, -10]` and the positives remains in the same order as `[3, 4, 5]`.

When the negatives and the positives are ordered based on absolute values, then the other edge cases can be handled with ease. In the edge case where no positve number is provided in the array, the _minimal absolute sum of two for any pair of indices_ would be the absolute number of the first element of the negatives multiplied by 2 (since the first element can be paired with itself). On the other hand if there is no negatives, the _minimal absolute sum of two for any pair of indices_ would be the absolute number of the first element of the positives multiplied by 2. The final edge case is if zero (0) exists within the array, if zero (0) exists, zero (0) will always be the _minimal absolute sum of two for any pair of indices_. No other absolute number is less than zero (0).

If no edge cases are met, the program enters a set of instructions intended to find the _minimal absolute sum of two for any pair of indices_ by checking the combination of pairs possible from the provided array. The temptation is to do a brute force approach where for each negative number is paired with every positive number to identify the _minimum absolute sum_ from any of the pairs. This would definitely involve a nested loop with time complexity of $O(n^2)$. This, however, does not have to be the case.

The core instructions of this solution has a nested loop that performs a binary search in the inner loop. The inner loop finds the midpoint of the list of the postive numbers (which is in ascending order), when seeking to find a postive number that is closer in magnitude to the negative number. If the inner loop starts at the midpoint with a number that is lesser than absolute value of the negative number, then it seeks for another number in the upper half (or the half that has numbers greater than the current positive number) of the positives. If the current positive number at the midpoint is greater than the absolute value of the nagative number, then it seeks for another number in the lower half of the positives. Binary searches always perform with a time complexity of $O(\text{log n})$.

The detected time complexity of this algorithm is $O(n \cdot \text{log n})$.
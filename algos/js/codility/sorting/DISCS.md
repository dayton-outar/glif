# Number of Disc Intersections

## Problem

We draw N discs on a plane. The discs are numbered from 0 to N − 1. An array A of N non-negative integers, specifying the radiuses of the discs, is given. The J-th disc is drawn with its center at (J, 0) and radius A[J].

We say that the J-th disc and K-th disc intersect if J ≠ K and the J-th and K-th discs have at least one common point (assuming that the discs contain their borders).

The figure below shows discs drawn for N = 6 and A as follows:

```js
  A[0] = 1
  A[1] = 5
  A[2] = 2
  A[3] = 1
  A[4] = 4
  A[5] = 0
```
![6 Discs on x-axis](/.attachments/discs.png)

There are eleven (unordered) pairs of discs that intersect, namely:

- discs 1 and 4 intersect, and both intersect with all the other discs;
- disc 2 also intersects with discs 0 and 3.

Write a function:

```js
    function solution(A);
```

that, given an array A describing N discs as explained above, returns the number of (unordered) pairs of intersecting discs. The function should return −1 if the number of intersecting pairs exceeds 10,000,000.

Given array A shown above, the function should return 11, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[0 ... 100,000]$;
- each element of array $A$ is an integer within the range $[0 ... 2,147,483,647]$.

## Solution

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function sortAsc(a, b) {
    return (a - b)
}

function solution(A) {
    var counter = 0,
        j = 0;
    var lower = [];
    var upper = []

    for (var i = 0; i < A.length; i++) {
        lower[i] = i - A[i];
        upper[i] = i + A[i];
    }

    lower.sort(sortAsc)
    upper.sort(sortAsc)

    for (var i = 0; i < A.length; i++) {
        while (j < A.length && upper[i] >= lower[j]) {
            counter += j - i;
            j++;
        }
        
        if (counter > 10000000) return -1;
    }

    return counter;
}

console.log( solution([1, 5, 2, 1, 4, 0]) );
```

So, the idea in this solution is to find the lower bound and the upper bound of the discs on the x-axis based on the radius. (The idea is more than this. The videos referenced below shed some light. I have yet to understand the reason for the use of `counter += j - i`. Hopefully, I can return to explain this in more detail)

Since `i` is the center of the discs, the lower bound is `i - A[i]` and the upper bound is `i + A[i]`. So, for the case of the array, `[1, 5, 2, 1, 4, 0]`, the lower and upper bound values are,

| array | values |
| :---- | :----- |
| lower | `[-1, -4, 0, 2, 0, 5]` |
| upper | `[1, 6, 4, 4, 8, 5]` |

After sorting these values are now in the order shown in the table below,

| array | values |
| :---- | :----- |
| lower | `[-4, -1, 0, 0, 2, 5]` |
| upper | `[1, 4, 4, 5, 6, 8]` |

The deciding factor of this algorithm is the condition, `upper[i] >= lower[j]`, and the assignment to `counter`, where `counter += j - i`. The nested loop does not have the effect of $O(n^2)$ because the loop variable, `j`, is not re-initialized in the outer loop.

Basically, this approach involves counting the number of discs that are open and taking note of the discs that are being opened while others are still open. When we take note of discs that are open while other dscs are open, this is called an intersection. Here's an idea of how the logic works,

1. We start with the lower bounds and a disc will be opened at position, -4.
2. Then we move to open another disc at -1 since it has value that is lesser than the lowest upper bound values. Since 1 disc is already opened at this time, we now have 1 intersection and 2 open discs.
3. We open a disc at 0 since it's value is still less than 1 in the upper bound. Since 2 discs are opened at this time, we now have (1 + 2) 3 intersections and 3 open discs.
4. We open another disc at 0, which is still less than 1 in the upper bound. Since 3 discs are opened at this time, we now have (3 + 3) 6 intersections and 4 opened discs.
5. Now, the next value in the lower bounds, which is 2, is greater than the next (and first) value in the upper bounds. So, we have to use that value in the upper bounds to close a disc. When closing this disc, the opened discs are now reduced to 3.
6. Now, we move to compare the value 2 in the lower bounds as mentioned in the above step to the next value in upper bounds, which is now 4. Since 2 is less than 4, we can open another disc. At this point (just before opening the disc), we have 3 opened discs and, thus, we have (6 + 3) 9 intersections and, now, 4 opened discs.
7. So, the lower bounds have one last value, which is 5. Can we open that disc that start at 5 given that the next value in upper bounds is 4? No. So, we have to close a disc, leaving 3 opened discs.
8. Can we now open disc at 5 given that the next value is another 4? No. So, we close another disc, leaving 2 opened discs.
9. Can we now open disc at 5 given that the next value is 5? Yes. So, given we have 2 opened discs, we now have (9 + 2) 11 intersections and 3 opened discs.

The detected time complexity for this solution is $O(n \cdot \text{log n})$.

## Videos

1. [Number Of Disc Intersections (Codility) Solution](https://youtu.be/HV8tzIiidSw)
2. [Disc Intersections Codility Test Solution Explained - Full Tutorial Explanation - in Python!](https://youtu.be/NYjnoZulqrQ)
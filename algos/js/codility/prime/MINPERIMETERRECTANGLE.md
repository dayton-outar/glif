# Minimum Perimeter Rectangle

## Problem

An integer $N$ is given, representing the area of some rectangle.

The _area_ of a rectangle whose sides are of length $A$ and $B$ is $A \times B$, and the _perimeter_ is $2 \times (A + B)$.

The goal is to find the minimal perimeter of any rectangle whose area equals $N$. The sides of this rectangle should be only integers.

For example, given integer $N = 30$, rectangles of area $30$ are:

- (1, 30), with a perimeter of 62,
- (2, 15), with a perimeter of 34,
- (3, 10), with a perimeter of 26,
- (5, 6), with a perimeter of 22.

Write a function:

```js
    function solution(N);
```

that, given an integer $N$, returns the minimal perimeter of any rectangle whose area is exactly equal to $N$.

For example, given an integer $N = 30$, the function should return $22$, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1..1,000,000,000]$.

## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
calculatePerimeter = (a, b) => 2 * (a + b)

function solution(N) {
    for (var i = parseInt(Math.sqrt(N), 10); true ; i--) {
        if (N % i == 0) return calculatePerimeter(i, (N / i));
    }
}

solution(30); // 22
solution(49); // 28
```

This is such a succinct solution that is based on mathematical principles. The loop that seeks the most appropriate number to use to find minimal perimeter maintains parameters that is on the basis that **every composite number has a _prime factor_ less than or equal to its square root**.

Note also that the loop starts from the highest number and decrements to the lowest number. The highest number tend to work out to producing the lowest perimeter.

If we can find one factor that divides the provided number, we can find the other number by simply dividing the provided number by the factor. For this reason, we arrive at passing `(N / i)` into the `calculatePerimeter` function.

The detected time complexity for this solution is $O(\sqrt n)$.
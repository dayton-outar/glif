# Max Profit

## Problem

An array A consisting of N integers is given. It contains daily prices of a stock share for a period of N consecutive days. If a single share was bought on day P and sold on day Q, where $0 ≤ P ≤ Q < N$, then the profit of such transaction is equal to $A[Q] − A[P]$, provided that $A[Q] ≥ A[P]$. Otherwise, the transaction brings loss of $A[P] − A[Q]$.

For example, consider the following array A consisting of six elements such that:

```js
  A[0] = 23171
  A[1] = 21011
  A[2] = 21123
  A[3] = 21366
  A[4] = 21013
  A[5] = 21367
```

If a share was bought on day $0$ and sold on day $2$, a loss of $2048$ would occur because $A[2] − A[0] = 21123 − 23171 = −2048$. If a share was bought on day $4$ and sold on day $5$, a profit of $354$ would occur because $A[5] − A[4] = 21367 − 21013 = 354$. Maximum possible profit was $356$. It would occur if a share was bought on day $1$ and sold on day $5$.

Write a function,

```js
    function solution(A);
```

that, given an array $A$ consisting of $N$ integers containing daily prices of a stock share for a period of $N$ consecutive days, returns the maximum possible profit from one transaction during this period. The function should return $0$ if it was impossible to gain any profit.

For example, given array $A$ consisting of six elements such that:

```js
  A[0] = 23171
  A[1] = 21011
  A[2] = 21123
  A[3] = 21366
  A[4] = 21013
  A[5] = 21367
```

the function should return $356$, as explained above.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [0..400,000];
each element of array A is an integer within the range [0..200,000].

## Solution

Credit to Yaseen Shaik for the solution below.

```js
function solution(A) {
    if (A.length < 2) {
        return 0;
    }
    var msf = 0;
    var meh = 0;
    for (var i = 1; i < A.length; i++) {
        meh = Math.max(0, meh + A[i] - A[i - 1]);
        msf = Math.max(msf, meh);
    }
    return msf > 0 ? msf : 0;
}
```

Let's examine this in detail.

The first 5 lines in this function are pretty easy to grasp. Since, we need an array of more than 1 element to calculate any profit, any array that has number of elements below 2 would be 0.

Lines 7 and 8 are where the real genius of this algorithm lies. ...

The expected worst-case time complexity is $O(N)$ and the expected worst-case space complexity is $O(1)$ (no recursion was used).
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

N is an integer within the range $[0 ... 400,000]$;
each element of array A is an integer within the range $[0 ... 200,000]$.

## Solution

Credit to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    if (A.length < 2) {
        return 0;
    }
    let msf = 0;
    let meh = 0;
    for (let i = 1; i < A.length; i++) {
        meh = Math.max(0, meh + A[i] - A[i - 1]);
        msf = Math.max(msf, meh);
    }
    return msf > 0 ? msf : 0;
}
```

Let's examine this in detail.

The first 5 lines in this function are pretty easy to grasp. Since, we need an array of more than 1 element to calculate any profit, an array that has number of elements below 2 would return 0 because there is no profit to gain from 1 day of stocks.

Lines 7 and 8 are where the real genius of this algorithm lies but the core of the genius is line 7,

```js
meh = Math.max(0, meh + A[i] - A[i - 1]);
```

So, basically $0$ is the baseline maximum for `meh` and no negative number will be stored in `meh`. Line 7 stores the _maxiumum sum of the difference_ as we progress through the provided array. The table below illustrates this progression.

| `A[i]` | `A[i - 1]` | `A[i] - A[i - 1]` | `meh` |
| ------:| ----------:| -----------------:| -----:|
| 21011  | 23171      | -2160             | 0     |
| 21123  | 21011      | 112               | 112   |
| 21366  | 21123      | 243               | 355   |
| 21013  | 21366      | -353              | 2     |
| 21367  | 21013      | 354               | 356   |

According to the problem, if we bought stock on day $1$ and sold on day $5$, then we would have made the maximum profit over the time.

| `A[i]` | `A[i - 1]` | `A[i] - A[i - 1]` |
| ------:| ----------:| -----------------:|
| 21367  | 21011      | 356               |

It's so coincidental that this figure happen to be the _maximum sum of the difference_ as we progressed sequentially through the elements of the provided array.

Let's suppose, though, that on day $4$, the stock price was $20009$ instead of $21013$, then what would have been the _maximum sum of the difference_ when we progressed through all the elements sequentially?

| `A[i]` | `A[i - 1]` | `A[i] - A[i - 1]` | `meh` |
| ------:| ----------:| -----------------:| -----:|
| 21011  | 23171      | -2160             | 0     |
| 21123  | 21011      | 112               | 112   |
| 21366  | 21123      | 243               | 355   |
| 20009  | 21366      | -1357             | 0     |
| 21367  | 20009      | 1358              | 1358  |

The algorithm still works! Day $4$ has the lowest stock price and the following day the stock price jumped to the second highest price in the provided array. It's basically asking for the highest number after the lowest number is found.

When you think about it, the _maximum profit_ is actually the _maximum sum of the difference_ between two numbers.

So, the big question is why does this work? Maybe a few more cases are needed to better understand the magic of this algorithm.

Let's replace day $0$, with $20009$ and see the outcome,

| `A[i]` | `A[i - 1]` | `A[i] - A[i - 1]` | `meh` |
| ------:| ----------:| -----------------:| -----:|
| 21011  | 20009      | 1002              | 1002  |
| 21123  | 21011      | 112               | 1114  |
| 21366  | 21123      | 243               | 1357  |
| 21013  | 21366      | -353              | 1004  |
| 21367  | 21013      | 354               | 1358  |

Look at that! Look at how the sum of the differences have brought the outcome to arrive at the _maximum profit_.

The expected worst-case time complexity is $O(n)$ and the expected worst-case space complexity is $O(1)$ (no recursion was used).
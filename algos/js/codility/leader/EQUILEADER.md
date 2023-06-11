# Equi Leader

## Problem

A non-empty array A consisting of N integers is given.

The _leader_ of this array is the value that occurs in more than half of the elements of A.

An _equi leader_ is an index S such that $0 ≤ S < N − 1$ and two sequences $A[0], A[1], ..., A[S]$ and $A[S + 1], A[S + 2], ..., A[N − 1]$ have leaders of the same value.

For example, given array A such that:

```js
    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2
```

we can find two equi leaders:

- 0, because sequences: (4) and (3, 4, 4, 4, 2) have the same leader, whose value is 4.
- 2, because sequences: (4, 3, 4) and (4, 4, 2) have the same leader, whose value is 4.

The goal is to count the number of equi leaders.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array A consisting of N integers, returns the number of equi leaders.

For example, given:

```js
    A[0] = 4
    A[1] = 3
    A[2] = 4
    A[3] = 4
    A[4] = 4
    A[5] = 2
```

the function should return 2, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- each element of array A is an integer within the range $[−1,000,000,000 ... 1,000,000,000]$.

## Solution

Counting the number of _equi leaders_

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    var pos = 0;
    var count = 0;

    for (var i = 0; i < A.length; i++) {
        if (A[pos] == A[i]) {
            count++;
        } else {
            count--;
            if (count == 0) {
                pos = i;
                count++;
            }
        }
    }

    var ret = 0;
    var cand = A[pos];

    var E = [];
    var N = [];

    var ec = 0; // candidate
    var nc = 0; // not candidate
    for (var i = 0; i < A.length; i++) {
        if (A[i] == cand) {
            ec++;
        } else {
            nc++;
        }
        E[i] = ec;
        N[i] = nc;
    }

    for (var i = 0; i < A.length; i++) {
        if (E[i] > N[i] && ((nc - N[i]) < (ec - E[i]))) {
            ret++;
        }
    }

    return ret;
}

console.log( solution( [4, 3, 4, 4, 4, 2] ) );
```

Lines 5 to 15 is an implementation that behaves much like the stack that is explained in [8.3](./README.md#83-solution-with-time-complexity). The purpose of the use of the stack to track the elements is to identify the _leader_.

The second loop at lines 25 to 33 is using the method of [Counting Elements](../counting/README.md) to keep track of the positions that the leader (using array `E`) occupoes and positions that it does not occupy. This is a prelude to the solution that identifies sequences of the array passed into function _have leaders of the same value_. So, for the case of the array, `[4, 3, 4, 4, 4, 2]`, the arrays `E` and `N` were filled out as follows,

|    |                        |
|:---|:-----------------------|
| E  | `[ 1, 1, 2, 3, 4, 4 ]` |
| N  | `[ 0, 1, 1, 1, 1, 2 ]` |

Note that `E` has the leader, 4, at index 0, so the leader count in the array starts with 1 at index 0. The next time that the leader is encountered in array `A` is at index 2 and notice that the leader count is increased to 2 at index 2 in `E`.

Take note of array `N` and see that the it counts the presence of non-leader elements of `A` when they are encountered at their respective index position in `A`.

As we move into the final loop and the penultimate logic combination of this solution, we can take note of the values of the arrays, `E` and `N` and the counters used for these arrays, `ec` and `nc`. For the case of the array, `[4, 3, 4, 4, 4, 2]`, the value of `ec` came out of the second loop as 4 and the value of `nc` came out as 2.

So, let's look at the condition in the final loop that counts the _equi leaders_. The first part of the conjunction logic is `E[i] > N[i]`, which is basically checking to see if the number of elements up to the position `i` that is a leader candidate is greater than those elements that are not a leader candidate. Because, the only way an element is a leader is if the number of occurrences in that sequence is more than the occurrences of non-leader elements.

The last part of the conjunction is `((nc - N[i]) < (ec - E[i]))`. Since the array would be split into 2 sequences at anytime, this part of the logic basically calculates the ratio of leader elements to non-leader elements in the second sequences (because as the final loop iterates, it is checking the all the possible sequences that keeps the order of array `A`).

As the condition containing both conjunctions are met, the counter `ret` increments and the end result, coming out of the final loop, is the _number of equi leaders_. The detected time complexity is $O(n)$.
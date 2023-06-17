# Flags

## Problem

A non-empty array $A$ consisting of $N$ integers is given.

A peak is an array element which is larger than its neighbours. More precisely, it is an index $P$ such that $0 < P < N − 1$ and $A[P − 1] < A[P] > A[P + 1]$.

For example, the following array A:

```js
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
```

has exactly four peaks: elements 1, 3, 5 and 10.

You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.

![Flags](/.attachments/flags.png)

Flags can only be set on peaks. What's more, if you take $K$ flags, then the distance between any two flags should be greater than or equal to $K$. The distance between indices $P$ and $Q$ is the absolute value $|P − Q|$.

For example, given the mountain range represented by array $A$, above, with $N = 12$, if you take:

- two flags, you can set them on peaks 1 and 5;
- three flags, you can set them on peaks 1, 5 and 10;
- four flags, you can set only three flags, on peaks 1, 5 and 10.

You can therefore set a maximum of three flags in this case.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ of $N$ integers, returns the maximum number of flags that can be set on the peaks of the array.

For example, the following array $A$:

```js
    A[0] = 1
    A[1] = 5
    A[2] = 3
    A[3] = 4
    A[4] = 3
    A[5] = 4
    A[6] = 1
    A[7] = 2
    A[8] = 3
    A[9] = 4
    A[10] = 6
    A[11] = 2
```

the function should return 3, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 400,000]$;
- each element of array $A$ is an integer within the range $[0 ... 1,000,000,000]$.

## Solutions

Let's take a moment to appreciate this problem.

The example with $K = 2$, which is two flags, can be set on peaks 1 and 5. YouTube Channel Author of CodeTrading[^1] states that the first two flags can _also_ be placed on peak 1 and peak 3. The key thing to note is that *the distance between any two flags **should be greater than or equal to the number of flags***, $K$.

Now, the first part of the problem should not be difficult to resolve. It involves counting the peaks. All that is required in the solution is to loop through the points in the array and test the condition provided to identify peaks. The mathematical notation for the condition to be met for a peak is $A[P − 1] < A[P] > A[P + 1]$. So, since a part of the condition requires one step back from the current index position, the loop needs to start one step ahead. Here's how we find the peaks,

```js
let peaks = [];
for (let i = 1; i < A.length - 1; ++i) {
    if (A[i] > A[i - 1] && A[i] > A[i + 1]) {
        peaks.push(i);
    }
}
```

The above snippet of code could also be written as follows,

```js
let peaks = [];
for (let i = 1; i < A.length - 1; ++i) {
    if (A[i] > Math.max(A[i - 1], A[i + 1])) {
        peaks.push(i);
    }
}
```

The main concept of this problem is to _find the maximum number of flags that can be set on the peaks_ of a provided arrangement (or array). Hinging on that is the rule that $K \geq d$, where $K$ is the number of flags and $d$ is the distance between peaks.

Once we can determine the number of peaks in an array, we can also determine a lower bound. Given that the number of elements in the array is greater than 3, it's possible to have at least 1 peak. (It's also possible to have no peaks as well.) Let's say that there are only two peaks in an array consisting 4 elements. An array consisting 4 elements can have at most 4 peaks where the distance between them is at least 2. If you were to sketch out the possibilities for an array of 3 elements, you'd realize that 2 peaks can also be achieved where the distance between them would have to be 2. So, knowing this the following snippet of code is placed in the solution before counting through an array that provides us with more than 2 peaks,

```js
let size = peaks.length;
if (size <= 2) return size;
```

Now, we can proceed to the entrée of this algorithm.

Let's look at the full solution provided by [Yaseen Shaik](https://github.com/yaseenshaik) from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(A) {
    if (A.length <= 2) return 0;

    let peaks = [];
    for (let i = 1; i < A.length-1; ++i) {
        if (A[i] > A[i-1] && A[i] > A[i+1]) {
            peaks.push(i);
        }
    }
    
    let size = peaks.length;
    if (size <= 2) return size;
    
    const maxFlag = parseInt( Math.sqrt(peaks[size - 1] - peaks[0]) + 1);

    for (let i = maxFlag; i >= 2; --i) {
        let count = 1;
        let curPos = peaks[0];
        for (let j = 1; j < size; ++j) {
            if (curPos + i <= peaks[j]) {
                curPos = peaks[j];
                ++count;
            }
        }
        if (count >= i) return i;
    }
    
    return 2;
}

solution( [1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2] ); // 3
```

The main genius of this algorithm is found on line 13 within the `solution` function.

```js
const maxFlag = parseInt( Math.sqrt(peaks[size - 1] - peaks[0]) + 1);
```

The bold statement made here is that the _maximum number of flags possible from the elements (or points) in the provided array is equal to 1 plus the square root of the distance between the first peak and the last peak_. In mathematical notation, $m = 1 + \sqrt{d}$, where $m$ is the maximum number of flags possible to be set between $d$, the distance between the first peak and the last peak. So, how did this come about?

The main theme of the lesson that this problem was provided is that **every composite number has a _prime factor_ less than or equal to its square root**. But what does composite number and prime factors have to do with this problem? Let's take a step back and deconstruct the problem.

If we look at $d$, the distance between peaks, as the **composite number**, then the maximum number of divisions that can be made within $d$ is decided by the ***prime factor***. Based on the rule set where _the distance between flags must be greater than or equal to the number of flags_, $K$, we can conclude that $K$ is a _factor_ (it may not be prime factor as it may not be a prime number but it is a factor). Let's say that the distance, $d$, is 16 where the factors are 1, 2, 4, 8 and 16. If we say that $K$ is 1, then based on the rule only 1 flag can be set within $d$. If we take the other extreme and say that $K$ is 16, then based on the rule only 1 flag can be set. The maximum number of flags that can be set happens to be 4, which is the $\sqrt{16}$. For those that have learned calculus, will realize that this is some kind of optimization problem.

From the example previously mentioned, it must be noted that when _dividing_ the _distance_, $d$, the peak at the beginning will not be taken into account. This is the reason for adding 1 in the equation.

So, after figuring the genius stroke that will give us the performance edge in delivering the solution, the anchor leg is left. The anchor leg is to count the peaks within $d$ by assuming the maximum number of divisions possible (or maximum number of flags possible, $m$) and then decrementing the possibilities until all the peaks are found.

Although, a nested loop was used to find all the peaks within $d$, the manner of the iteration of the inner loop was done like a harmonic series. Hence, the inner loop should have time complexity of $O(\text{log }d)$. Since the outer loop was done on square root of $d$, then the time complexity of the outer loop is $O(\sqrt{d})$. We cannot forget that we had to loop through every point to identify peaks, so the time complexity for the first loop is $O(n)$. It comes as no surprise then that the time complexity for this solution is $O(n)$. It could also be $O(n + \sqrt{d})$, but then d is such a small subset of $n$.


[^1]: [Flags in Python and C++ Codility Solutions Lesson 10](https://youtu.be/6KK2eglhvdQ) - [CodeTrading](https://www.youtube.com/@CodeTradingCafe)
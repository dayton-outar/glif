# Count Non-Divisible

## Problem

You are given an array $A$ consisting of $N$ integers.

For each number $A[i]$ such that $0 ≤ i < N$, we want to count the number of elements of the array that are not the divisors of $A[i]$. We say that these elements are non-divisors.

For example, consider integer $N = 5$ and array $A$ such that:

```js
    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
```

For the following elements:

- A[0] = 3, the non-divisors are: 2, 6,
- A[1] = 1, the non-divisors are: 3, 2, 3, 6,
- A[2] = 2, the non-divisors are: 3, 3, 6,
- A[3] = 3, the non-divisors are: 2, 6,
- A[4] = 6, there aren't any non-divisors.

Write a function:

```js
    function solution(A);
```

that, given an array $A$ consisting of $N$ integers, returns a sequence of integers representing the amount of non-divisors.

Result array should be returned as an array of integers.

For example, given:

```js
    A[0] = 3
    A[1] = 1
    A[2] = 2
    A[3] = 3
    A[4] = 6
```

the function should return [2, 4, 3, 2, 0], as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 50,000]$;
- each element of array $A$ is an integer within the range $[1..2 \cdot N]$.

## Solution

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23).

This solution but this was found on Codility [here](https://app.codility.com/demo/results/trainingDWZVT3-E7U/).

```js
function solution(A) {
    const lenOfA = A.length;
    const counters = Array(lenOfA * 2 + 1).fill(0);
    
    for(let j = 0; j < lenOfA; j++) counters[A[j]]++;

    return A.map(number=> {
        let nonDivisor = lenOfA;
        for(let i = 1; i * i <= number; i++) {
            if(number % i !== 0) continue;
            nonDivisor -= counters[i];
            if(i * i !== number) nonDivisor -= counters[ number / i];
        }
        return nonDivisor;
    })
}

solution( [3, 1, 2, 3, 6] ); // [ 2, 4, 3, 2, 0 ]
```

My initial thought while looking at this solution is why is twice the size of the array required to maintain the array, `counters`? The idea of `counters` is to maintain a hash of the numbers in the provided array. In such a case, I don't think the initialization of `counters` is a best fit for this solution because it can easily be broken with a number that is beyond the result of `A.length * 2 + 1`. Take for example providing the solution with `[3, 1, 2, 3, 12]`, the outcome would be `[2, 4, 3, 2, NaN]` (this is given that the second assumption is not respected).

I have provided an updated version that I think is better. See below,

```js
function solution(A) { 
    const lenOfA = A.length;
    const max = Math.max(...A);
    const counters = Array(max + 1).fill(0);
    
    for(let j = 0; j < (max - 1); j++) counters[A[j]]++;

    return A.map(number => {
        let nonDivisor = lenOfA;
        for(let i = 1; i * i <= number; i++) {
            if(number % i !== 0) continue;
            nonDivisor -= counters[i];
            if(i * i !== number) nonDivisor -= counters[number / i];
        }
        return nonDivisor;
    })
}

solution( [3, 1, 2, 3, 12] ); // [ 2, 4, 3, 2, 0 ]
```

But testing the above solution resulted in a failure on Codility. So, the recommended solution is the one above that hinges on the second assumption stated in the final notes of the problem.

Now, after the technique to [count elements](../counting/) is used, then that array is used to deduct the divisors or prime factors within the array. The prime factors in the array are identified by using the mathematical principle that **every composite number has a _prime factor_ less than or equal to its square root**.

So, the idea is to presume initially that all numbers within the array are non-divisors then deduct numbers that meet the criteria of being a factor.

The detected time complexity of the recommended solution is $O(n \cdot log\text{ }n)$.
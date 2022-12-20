# Algorithms

This folder contains projects focused on learning data structures and algorithms. The languages of preference were [C (also includes some C++)](./c-c%2B%2B/README.md) and [JavaScript](./js/README.md).

> Informally, an ***algorithm*** is any well-deûned computational procedure that takes some value, or set of values, as ***input*** and produces some value, or set of values, as ***output*** in a _finite amount of time_. An algorithm is thus a sequence of computational steps that transform the input into the output.[^1]


## Asymptotic Time Complexity Terms

The table below is ordered in descending order of highest performance.

| Term             | Big O                     |
|:-----------------|:-------------------------:|
| Constant Time    | $O(1)$                    |
| Logarithmic Time | $O(log\text{ }n)$         |
| Square Root Time | $O(\sqrt n)$              |
| Linear Time      | $O(n)$                    |
| Superlinear Time | $O(n\text{ }·\text{ }log\text{ }n)$ |
| Quadratic Time   | $O(n^2)$                  |
| Cubic Time       | $O(n^3)$                  |
| Exponential Time | $O(c^n)$                  |
| Factorial Time   | $O(n!)$                   |

Most algorithms that perform below _Quadratic Time_ are acceptable for addressing certain problems.

### Constant Time

Computer instructions that run in $O(1)$ like the following line of code.

```js
x = x + 1;
```

Constant time is the highest level of performance that any program can achieve.

### Logarithmic Time

Computer instructions that run in $O(log\text{ }n)$ like the following `binarySearch` function.

```js
const binarySearch = (A, x) => {
    const n = A.length;
    let beg = 0;
    let end = n - 1;
    let result = -1;

    while ( beg <= end ) {
        let mid = Math.floor( ((beg + end) / 2) );
        if ( A[mid] <= x ) {
            beg = mid + 1;
            result = mid;
        } else {
            end = mid - 1;
        }
    }

    return result;
}
```

### Square Root Time

Computer instructions that run in $O(\sqrt n)$ like the following `divisors` function.

```js
const divisors = n => {
    let i = 1;
    let result = 0;

    while ( i * i < n ) {
        if (n % i == 0) {
            result += 2;
        }
        i++;
    }

    if ( i * i == n ) {
        result++;
    }

    return result;
}
```

### Linear Time

Computer instructions that run in $O(n)$ like the following loop.

```js
for ( let i = 0; i < n; i++ ) {
    ...
}
```

### Superlinear Time

_Quick Sort_, _Merge Sort_ and _Heap Sort_ are said to complete sorting in $O(n\text{ }·\text{ }log\text{ }n)$ at worst case.

This time is basically a nested loop with an inner loop that increments like harmonic series or like the version of binary search found [here](#logarithmic-time).

### Quadratic Time

Computer instructions that involve nested loops, which loop over the same maximum limits, are considered to be $O(n^2)$.

```js
const triangles = A => {
    const n = A.length;
    let result  = 0;

    for ( let x = 0; x < n; x++ ) {
        z = x + 2;
        for ( let y = x + 1; y < n; y++ ) {
            while ( z < n && A[x] + A[y] > A[z] ) {
                z++;
            }
            result += z - y - 1;
        }
    }

    return result;
}
```

### Cubic Time

Cubic time has 2 inner loops, which loop over the same maximum limits.

```js
for ( let i = 0; i < n; i++ ) {
    for ( let i = 0; i < n; i++ ) {
        for ( let i = 0; i < n; i++ ) {
            ...
        }
    }
}
```

### Exponential Time

The growth rate of the recursive version of the `fibonacci` function is $O(c^n)$, specifically $O(2^n)$.

```js
const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
```

### Factorial Time

This is the least performant time complexity that any program can arrive at.

As mentioned at [this](https://stackoverflow.com/questions/16555978/example-of-a-factorial-time-algorithm-o-n) Stack Overflow entry, an example of an $O(n!)$ is to generate all the permutations of a list.


## References

1. The Algorithm Design Manual by Steven Skiena
2. [Algorithm Repository](https://www.algorist.com/algorist.html)
3. [How to Develop Algorithmic Thinking in Data Structures and Algorithms](https://www.enjoyalgorithms.com/blog/how-to-develop-algorithmic-thinking-in-data-structure-and-algorithms)

[^1]: Chapter 1 - The Role of Algorithms in Computing. Introduction to Algorithms, 4<sup>th</sup> Edition by Thomas Cormen
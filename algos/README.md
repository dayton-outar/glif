# Algorithms

This folder contains projects focused on learning data structures and algorithms. The languages of preference were,

- [C (also includes some C++)](./c-c%2B%2B/)
- [JavaScript](./js/).

> Informally, an ***algorithm*** is any well-defined computational procedure that takes some value, or set of values, as ***input*** and produces some value, or set of values, as ***output*** in a _finite amount of time_. An algorithm is thus a sequence of computational steps that transform the input into the output.[^1]

The study of analysing the optimal _finite amount of time_ of an algorithm is referred to as _Asymptotic Time Complexity_.

## Approaches

There are several approaches that can be used in solving problems when designing algorithms. Some of these approaches includes,

1. Brute Force
2. Divide and Conquer
3. [Greedy Algorithms](./js/codility/greedy/)
4. [Dynamic Programming](./js/codility/dynamic/)

### Brute Force

A brute force approach is an approach that finds all the possible solutions to find a satisfactory solution to a given problem. The focus here is in getting the correct answer to the problem and not necessarily the most efficient.

### Divide and Conquer

For divide-and-conquer, you solve a given problem (instance) recursively. If the problem is small enough&mdash;the ***base case***&mdash;you just solve it directly without recursing. Otherwise&mdash;the ***recursive case***&mdash;you perform three characteristic steps:

- **Divide** the problem into one or more subproblems that are smaller instances of the same problem.
- **Conquer** the subproblems by solving them recursively.
- **Combine** the subproblem solutions to form a solution to the original problem.

A divide-and-conquer algorithm breaks down a large problem into smaller sub-problems, which themselves may be broken down into even smaller subproblems, and so forth. The recursion ***bottoms out*** when it reaches a base case and the sub-problem is small enough to solve directly without further recursing.[^2]

Whereas dynamic programming typically removes one element from the problem, solves the smaller problem, and then adds back the element to the solution of this smaller problem in the proper way. Divide and conquer instead splits the problem into (say) halves, solves each half, then stitches the pieces back together to form a full solution.[^3]

Some divide-and-conquer algorithms include,

- [Binary Search](./js/codility/binary-search/)
- [Quick Sort](./js/structures/README.md#quick-sort)
- [Merge Sort](./js/structures/README.md#merge-sort)

## Asymptotic Time Complexities

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

## Big O for Common Data Structure Operations

<table>
    <thead>
        <tr>
            <th>Data Structure</th>
            <th colspan="8"></th>
            <th></th>
        </tr>
        <tr>
            <th></th>
            <th colspan="4">Average</th>
            <th colspan="4">Worst</th>
            <th>Worst</th>
        </tr>
        <tr>
            <th></th>
            <th>Access</th>
            <th>Search</th>
            <th>Insertion</th>
            <th>Deletion</th>
            <th>Access</th>
            <th>Search</th>
            <th>Insertion</th>
            <th>Deletion</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Array</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
        </tr>
        <tr>
            <td>Stack</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
        </tr>
        <tr>
            <td>Queue</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
        </tr>
        <tr>
            <td>Singly-linked List</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
        </tr>
        <tr>
            <td>Doubly-linked List</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(1)$</td>
            <td>$O(1)$</td>
            <td>$O(n)$</td>
        </tr>
        <tr>
            <td>Skip List</td>
            <td>$O(log \text{ n})$</td>
            <td>$O(log \text{ n})$</td>
            <td>$O(log \text{ n})$</td>
            <td>$O(log \text{ n})$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n)$</td>
            <td>$O(n \text{log n })$</td>
        </tr>
    </tbody>
</table>

## Basic Problem Solving Steps

1. Understand the problem
   1. Re-read the problem definition
   2. Work through the example

2. Visualize the solution

3. Make the solution work (Correctness)
   1. Implement it
   2. Test it

4. Make the solution efficient
   1. Make less nested loops where possible
   2. Increase loop steps where possible
   3. Make use of caching or memoization where possible
   4. Rethink approach to solution

## Critical Thinking for Algorithms

The questionnaire below was sourced from _The Algorithm Design Manual_. I find that it can be very useful.

1. Do I really understand the problem?

   1. What exactly does the input consist of?
   2. What exactly are the desired results or output?
   3. Can I construct an input example small enough to solve by hand? What happens when I try to solve it?
   4. How important is it to my application that I always ﬁnd the optimal answer? Might I settle for something close to the best answer?
   5. How large is a typical instance of my problem? Will I be working on 10 items? 1,000 items? 1,000,000 items? More?
   6. How important is speed in my application? Must the problem be solved within one second? One minute? One hour? One day?
   7. How much time and eﬀort can I invest in implementation? Will I be limited to simple algorithms that can be coded up in a day, or do I have the freedom to experiment with several approaches and see which one is best?
   8. Am I trying to solve a numerical problem? A graph problem? A geometric problem? A string problem? A set problem? Which formulation seems easiest?

2. Can I ﬁnd a simple algorithm or heuristic for my problem?

   1. Will brute force solve my problem correctly by searching through all subsets or arrangements and picking the best one?

      1. If so, why am I sure that this algorithm always gives the correct answer?
      2. How do I measure the quality of a solution once I construct it?
      3. Does this simple, slow solution run in polynomial or exponential time? Is my problem small enough that a brute-force solution will suﬃce?
      4. Am I certain that my problem is suﬃciently well deﬁned to actually have a correct solution?
   2. Can I solve my problem by repeatedly trying some simple rule, like picking the biggest item ﬁrst? The smallest item ﬁrst? A random item ﬁrst?
   
      1. If so, on what types of inputs does this heuristic work well? Do these correspond to the data that might arise in my application?
      2. On what inputs does this heuristic work badly? If no such examples can be found, can I show that it always works well?
      3. How fast does my heuristic come up with an answer? Does it have a simple implementation?

3. Is the problem published on the World Wide Web?

   1. What is known about the problem? Is there an available implementation that I can use?
   2. Are there relevant resources available? Did I do a proper Google search using the right keywords?

4. Are there special cases of the problem that I know how to solve?

   1. Can I solve the problem eﬃciently when I ignore some of the input parameters?
   2. Does the problem become easier to solve when some of the input parameters are set to trivial values, such as 0 or 1?
   3. How can I simplify the problem to the point where I can solve it eﬃciently? Why can’t this special-case algorithm be generalized to a wider class of inputs?
   4. Is my problem a special case of a more general problem in the catalog?

5. Which of the standard algorithm design paradigms are most relevant to my problem?

   1. Is there a set of items that can be sorted by size or some key? Does this sorted order make it easier to ﬁnd the answer?
   2. Is there a way to split the problem into two smaller problems, perhaps by doing a binary search? How about partitioning the elements into big and small, or left and right? Does this suggest a divide-and-conquer algorithm?
   3. Does the set of input objects have a natural left-to-right order among its components, like the characters in a string, elements of a permutation, or the leaves of a rooted tree? Could I use dynamic programming to exploit this order?
   4. Are there certain operations being done repeatedly, such as searching, or ﬁnding the largest/smallest element? Can I use a data structure to speed up these queries? Perhaps a dictionary/hash table or a heap/priority queue?
   5. Can I use random sampling to select which object to pick next? What about constructing many random conﬁgurations and picking the best one? Can I use a heuristic search technique like simulated annealing to zoom in on a good solution?
   6. Can I formulate my problem as a linear program? How about an integer program?
   7. Does my problem resemble satisﬁability, the traveling salesman problem, or some other NP-complete problem? Might it be NP-complete and thus not have an eﬃcient algorithm?

6. Am I still stumped?

   1. Am I willing to spend money to hire an expert to tell me what to do?
   2. Go back to the beginning and work through these questions again. Did any of my answers change during my latest trip through the list?

## References

1. The Algorithm Design Manual by Steven Skiena
2. [Algorithm Repository](https://www.algorist.com/algorist.html)
3. [How to Develop Algorithmic Thinking in Data Structures and Algorithms](https://www.enjoyalgorithms.com/blog/how-to-develop-algorithmic-thinking-in-data-structure-and-algorithms)

[^1]: Chapter 1 - The Role of Algorithms in Computing. Introduction to Algorithms, 4<sup>th</sup> Edition by Thomas Cormen
[^2]: Chapter 4 - Divide-and-Conquer. Introduction to Algorithms, 4<sup>th</sup> Edition by Thomas Cormen
[^3]: Chapter 5 - Divide and Conquer. The Algorithm Design Manual by Steven Skiena
# 15. Caterpillar Method

The Caterpillar method is a likeable name for a popular means of solving algorithmic tasks. The idea is to check elements in a way that’s reminiscent of movements of a caterpillar. The caterpillar crawls through the array. We remember the front and back positions of the caterpillar, and at every step either of them is moved forward.

![Caterpillar moving](/.attachments/moving-caterpillar.gif)

## 15.1 Usage example

Let’s check whether a sequence ${a_0, a_1, \dots, a_{n − 1} (1 \leq a_i \leq 10^9)}$ contains a contiguous subsequence whose sum of elements equals $s$. For example, in the following sequence we are looking for a subsequence whose total equals $s = 12$.

![Sub-sequence in a sequence](/.attachments/caterpillar-sequence.png)


Each position of the caterpillar will represent a different contiguous subsequence in which the total of the elements is not greater than $s$. Let’s initially set the caterpillar on the first element. Next we will perform the following steps:

 - if we can, we move the right end _(front)_ forward and increase the size of the caterpillar;
 - otherwise, we move the left end _(back)_ forward and decrease the size of the caterpillar.

 In this way, for every position of the left end we know the longest caterpillar that covers elements whose total is not greater than $s$. If there is a subsequence whose total of elements equals $s$, then there certainly is a moment when the caterpillar covers all its elements.

**15.1 Caterpillar in _O(n)_ time complexity.**
```js
const caterpillarMethod = (A, s) => {
    const n = A.length;
    let front = 0, total = 0;

    for ( let i = 0; i < n; i++ ) {
        while (front < n && total + A[front] <= s) {
            total += A[front];
            front++;
        }

        if (total == s) return true;

        total -= A[i];
    }

    return false;
}

caterpillarMethod( [6, 2, 7, 4, 1, 3, 6], 12 ); // Output: true
```

Let’s estimate the time complexity of the above algorithm. At the first glance we have two nested loops, what suggest quadratic time. However, notice that at every step we move the front or the back of the caterpillar, and their positions will never exceed $n$. Thus we actually get an _O(n)_ solution.

The above estimation of time complexity is based on amortized cost[^1].

## 15.2 Exercise

**Problem:** You are given $n$ sticks (of length ${1 \leq a_0 \leq a_1 \leq \dots \leq a_{n − 1} \leq 10^9}$). The goal is to count the number of triangles that can be constructed using these sticks. More precisely, we have to count the number of triplets at indices ${x < y < z}$, such that ${a_x + a_y > a_z}$.

**Solution ${O(n^2)}$:** For every pair $x$, $y$ we can find the largest stick $z$ that can be used to construct the triangle. Every stick $k$, such that ${y < k \leq z}$, can also be used, because the condition ${a_x + a_y > a_k}$ will still be true. We can add up all these triangles at once.

If the value $z$ is found every time from the beginning then we get a $O(n^3)$ time complexity solution. However, we can instead use the caterpillar method. When increasing the value of $y$, we can increase (as far as possible) the value of $z$.

**15.2 The number of triangles in $O(n^2)$.**
```js
const triangles = A => {
    const n = A.length;
    let result  = 0;

    for ( let x = 0; x < n; x++ ) {
        let z = x + 2;
        for ( let y = x + 1; y < n; y++ ) {
            while ( z < n && A[x] + A[y] > A[z] ) {
                z++;
            }
            result += z - ( y + 1 );
        }
    }

    return result;
}

triangles( [1, 3, 1, 2, 2, 5, 4, 6, 1] ); // 36
```

The time complexity of the above algorithm is $O(n^2)$, because for every stick $x$ the values of $y$ and $z$ increase $O(n)$ number of times.

## Observations

The triangle problem is not easy to grasp. The algorithm contains nested loops that is used to traverse the array with three pointers. Two pointers increment by 1 through the first 2 elements and comparing those two elements with the element in the third position until the third pointer exhausts the array. The third pointer starts again when the first two pointers increments by one. The use of the pointers can be seen in the condition `A[x] + A[y] > A[z]`. When the condition is met, it increments `k`.

The most interesting line of code in snippet 15.2 is the line with some basic math with the instructions, `result += z - ( y + 1 );`. So, here's what I think about this line of code. It's reconciling back the outcome due to incrementing `z` (as in `let z = x + 2;`) outside the loop to initiate the third pointer.

I find it difficult to believe that code snippet 15.2 runs in $O(n^2)$ time.

## References

1. [Codility Training Media - Caterpillar Method](https://codility.com/media/train/13-CaterpillarMethod.pdf)

## Videos

1. [Codility Count Distinct Slices solution](https://youtu.be/6CkGw6u0n9A)

[^1]: This term comes out of a concept called, [Amortized analysis](https://en.wikipedia.org/wiki/Amortized_analysis). "The motivation for amortized analysis is that looking at the worst-case run time can be too pessimistic. Instead, amortized analysis averages the running times of operations in a sequence over that sequence."
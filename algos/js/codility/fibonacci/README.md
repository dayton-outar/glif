# 13. Fibonacci Numbers

The Fibonacci numbers form a sequence of integers deﬁned recursively in the following way. The ﬁrst two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.

$$\large
F_n = \begin{cases}
0 \qquad \text{for }n=0\\
1 \qquad \text{for }n=1\\
{F_{n - 1} + F_{n - 2}} \quad \text{for }n>1 
\end{cases}$$

The first twelve Fibonacci numbers are:

![Fibonacci sequence](/.attachments/fibonacci-sequence.png)

Notice that recursive enumeration as described by the definition is very slow. The definition of $F_n$ repeatedly refers to the previous numbers from the Fibonacci sequence.

**13.1: Finding Fibonacci numbers recursively.**
```js
const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);

fibonacci(11); // Output: 89
```
The above algorithm performs $F_n$ additions of 1, and, as the sequence grows exponentially, we get an ineﬃcient solution.[^1]

Enumeration of the Fibonacci numbers can be done faster simply by using a basis of dynamic programming. We can calculate the values $F_0, F_1, \dots, F_n$ based on the previously calculated numbers (it is sufficient to remember only the last two values).

**13.2: Finding Fibonacci numbers dynamically**
```js
const fibonacciDynamics = n => {
    let fib = Array(n + 2).fill(0);
    fib[1] = 1; // So, starting with 0, 1, ... sets the basis
    for ( let i = 2; i < fib.length; i++ ) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib[n];
}
```

The time complexity of the above algorithm is $O(n)$.

## 13.1 Faster algorithms for Fibonacci numbers

Fibonacci numbers can be found in $O(log(n))$ time. However, for this purpose we have to use matrix multiplication and the following formula:

$$\large
\begin{bmatrix}
1 & 1 \\
1 & 0
\end{bmatrix} = 
\begin{bmatrix}
F_{n + 1} & F_n \\
F_n & F_{n - 1}
\end{bmatrix},
\text{for }n \geq 1
$$

Even faster solution is possible by using the following formula:[^2]

$$\large
Fib_n = { {({1 + \sqrt 5 \over 2})^n} - {({1 - \sqrt 5 \over 2})^n} \over \sqrt 5 }
$$

## 13.2 Exercise

**Problem:** For all the given numbers $x_0, x_1, \ldots, x_{n - 1}$ such that $1 \leq x_i \leq m \leq 1,000,000$, check whether they may be presented as the sum of two Fibonacci numbers.

**Solution:** Notice that that only a few tens of Fibonacci numbers are smaller than the maximal $m$ (exactly 31). We consider all the pairs. If some of them sum to $k \leq m$, then we mark index $k$ in the array to denote that the value $k$ can be presented as the sum of two Fibonacci numbers.

In summary, for each number $x_i$ we can answer whether it is the sum of two Fibonacci numbers in constant time. The total time complexity is $O(n + m)$.

## Observations

I'm pretty impressed with _Binet's formula_ and started looking at the proof. Usually, when I encounter formulas like these, I start to look for the proof.

## References

1. [Codility Training Media - Fibonacci Numbers](https://codility.com/media/train/11-Fibonacci.pdf)

## Videos

1. [Fibonacci's Explicit: Binet's Formula](https://youtu.be/3vbHTi6sID0)

[^1]: Why such a statement? It must be inefficiency in space but certainly not time. Recursion takes up memory but not processing time.
[^2]: This formula is called Binet's formula. See proof [here](https://www.themathdoctors.org/a-few-inductive-fibonacci-proofs/), [here](http://www.milefoot.com/math/discrete/sequences/binetformula.htm#:~:text=The%20explicit%20formula%20for%20the,the%20first%20to%20use%20it.) and [here](https://planetmath.org/derivationofbinetformula).
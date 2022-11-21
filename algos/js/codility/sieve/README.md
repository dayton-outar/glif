# 11. Sieve of Eratosthenes

The Sieve of Eratosthenes is a very simple and popular technique for ﬁnding all the prime numbers in the range from 2 to a given number $n$. The algorithm takes its name from the process of sieving — in a simple way we remove multiples of consecutive numbers.

Initially, we have the set of all the numbers {$2, 3, \ldots, n$}. At each step we choose the smallest number in the set and remove all its multiples. Notice that every composite number has a divisor of at most $\sqrt n$. In particular, it has a divisor which is a prime number. It is suﬃcient to remove only multiples of prime numbers not exceeding $\sqrt n$. In this way, all composite numbers will be removed.

![3 rows of sequences](/.attachments/3-rows-sequences.png)

The above illustration shows steps of sieving for $n = 17$. The elements of the processed set are in white, and removed composite numbers are in gray. First, we remove multiples of the smallest element in the set, which is 2. The next element remaining in the set is 3, and we also remove its multiples, and so on.

![Jumps in sequence](/.attachments/jumps-sequence.png)

The above algorithm can be slightly improved. Notice that we needn’t cross out multiples of $i$ which are less than $i^2$. Such multiples are of the form $k · i$, where $k < i$. These have already been removed by one of the prime divisors of $k$. After this improvement, we obtain the following implementation:

**11.1: Sieve of Eratosthenes.**
```js

```

Let’s analyse the time complexity of the above algorithm. For each prime number $p_j \leq \sqrt n$ we cross out at most $p \over n_j$ numbers, so we get the following number of operations:

$$\large
{ {n \over 2} + {n \over 3} + {n \over 5} + \ldots } = { \sum_{p_j \leq \sqrt n} { n \over p_j } }  = { \sum_{p_j \leq \sqrt n} { 1 \over p_j } } 
$$

The sum of the reciprocals of the primes $p_j \leq n$ equals asymptotically $O(log\text{ }log\text{ }n)$. So the overall time complexity of this algorithm is $O(n\text{ }log\text{ }log\text{ }n)$. The proof is not trivial, and is beyond the scope of this article. An example proof can be found here.

## 11.1. Factorization

Factorization is the process of decomposition into prime factors. More precisely, for a given number $x$ we want to ﬁnd primes $p_1 ,p_2 , \ldots, p_k$ whose product equals $x$.

Use of the sieve enables fast factorization. Let’s modify the sieve algorithm slightly. For every crossed number we will remember the smallest prime that divides this number.

**11.2: Preparing the array F for factorization.**
```js

```

For example, take an array $F$ with a value of $n = 20$:

With this approach we can factorize numbers very quickly. If we know that one of the prime factors of $x$ is $p$, then all the prime factors of $x$ are $p$ plus the decomposition of $x \over p$.

**11.3: Factorization of $x — O(log\text{ }x)$.**
```js

```

Number $x$ cannot have more than log x prime factors, because every prime factor is $\geq 2$. Factorization by the above method works in $O(log\text{ }x)$ time complexity. Note that consecutive factors will be presented in non-decreasing order.
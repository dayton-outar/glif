# 12. Euclidean Algorithm

The Euclidean algorithm is one of the oldest numerical algorithms still to be in common
use. It solves the problem of computing the greatest common divisor (gcd) of two positive
integers.

## 12. Euclidean algorithm by subtraction

The original version of Euclid’s algorithm is based on subtraction: we recursively subtract
the smaller number from the larger.

**12.1 Greatest common divisor by subtraction.**
```js

```

Let’s estimate this algorithm’s time complexity (based on n = a+b). The number of steps can
be linear, for e.g. gcd(x, 1), so the time complexity is O(n). This is the worst-case complexity,
because the value x + y decreases with every step.

## 12.2 Euclidean algorithm by division

Let’s start by understanding the algorithm and then go on to prove its correctness. For two
given numbers a and b, such that a � b:

- if b | a, then gcd(a, b) = b,
- otherwise gcd(a, b) = gcd(b, a mod b).

![Progression of GCD](/.attachments/gcd-progression.png)

Let’s prove that gcd(a, b) = gcd(b, r), where r = a mod b and a = b · t + r:

- Firstly, let d = gcd(a, b). We get d | (b · t + r) and d | b, so d | r. Therefore we get gcd(a, b) | gcd(b, r).
- Secondly, let c = gcd(b, r). We get c | b and c | r, so c | a. Therefore we get gcd(b, r) | gcd(a, b).

Hence gcd(a, b) = gcd(b, r). Notice that we can recursively call a function while a is not
divisible by b.

**12.2: Greatest common divisor by dividing.**
```js
```

Denote by (ai , bi ) pairs of values a and b, for which the above algorithm performs i steps.
Then bi � Fibi−1 (where Fibi is the i-th Fibonacci number). Inductive proof:

1. for one step, b1 = 0,
2. for two steps, b � 1,
3. for more steps, (ak+1 , bk+1 ) → (ak , bk ) → (ak−1 , bk−1 ), then ak = bk+1 , ak−1 = bk ,
bk−1 = ak mod bk , so ak = q · bk + bk−1 for some q � 1, so bk+1 � bk + bk−1 .

Fibonacci numbers can be approximated by:

$$\large
Fib_n \approx {({1 + \sqrt 5 \over 2})^n} \over \sqrt 5
$$

Thus, the time complexity is logarithmic based on the sum of a and b — O(log(a + b)).

## 12.3. Binary Euclidean algorithm

This algorithm ﬁnds the gcd using only subtraction, binary representation, shifting and parity
testing. We will use a divide and conquer technique.

The following function calculate gcd(a, b, res) = gcd(a, b, 1) · res. So to calculate
gcd(a, b) it suﬃces to call gcd(a, b, 1) = gcd(a, b).

**12.3: Greatest common divisor using binary Euclidean algorithm.**
```js
```

This algorithm is superior to the previous one for very large integers when it cannot be
assumed that all the arithmetic operations used here can be done in a constant time. Due
to the binary representation, operations are performed in linear time based on the length of
the binary representation, even for very big integers. On the other hand, modulo applied in
algorithm 10.2 has worse time complexity. It exceeds O(log n · log log n), where n = a + b.

We have ai+1 � ai , bi+1 � bi , b1 = a1 > 0. In the ﬁrst three cases, ai+1 · bi+1 � 2 · ai · bi . In the
fourth case, ai+1 · bi+1 � 2 · ai−1 · bi−1 , because a diﬀerence of two odd numbers is an even
number. By induction we get:

## References

1. [Codility Training Media - Euclidean Algorithm](https://codility.com/media/train/10-Gcd.pdf)
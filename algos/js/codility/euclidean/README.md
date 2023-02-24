# 12. Euclidean Algorithm

The Euclidean algorithm is one of the oldest numerical algorithms still to be in common use. It solves the problem of computing the greatest common divisor (gcd) of two positive integers.

## 12.1 Euclidean Algorithm by Subtraction

The original version of Euclid’s algorithm is based on subtraction: we recursively subtract the smaller number from the larger.

**12.1 Greatest common divisor by subtraction.**
```js
const gcd = (a, b) => (a == b) ? a : ((a > b) ? gcd(a - b, b) : gcd(a, b - a));
```

Let’s estimate this algorithm’s time complexity (based on $n = a + b$). The number of steps can be linear, for e.g. $gcd(x, 1)$, so the time complexity is $O(n)$. This is the worst-case complexity, because the value $x + y$ decreases with every step.

## 12.2 Euclidean Algorithm by Division

Let’s start by understanding the algorithm and then go on to prove its correctness. For two given numbers $a$ and $b$, such that $a \geq b$:

- if $b | a$[^1], then $gcd(a, b) = b$,
- otherwise $gcd(a, b) = gcd(b, a\text{ mod }b)$.

![Progression of GCD](/.attachments/gcd-progression.png)

Let’s prove that $gcd(a, b) = gcd(b, r)$, where $r = a$ mod $b$ and $a = b · t + r$:

- Firstly, let $d = gcd(a, b)$. We get $d | (b · t + r)$ and $d | b$, so $d | r$. Therefore we get $gcd(a, b) | gcd(b, r)$.
- Secondly, let $c = gcd(b, r)$. We get $c | b$ and $c | r$, so $c | a$. Therefore we get $gcd(b, r) | gcd(a, b)$.

Hence $gcd(a, b) = gcd(b, r)$. Notice that we can recursively call a function while $a$ is not divisible by $b$.

**12.2: Greatest common divisor by dividing.**
```js
const gcd = (a, b) => a % b == 0 ? b : gcd(b, a % b);
```

Denote by $(a_i , b_i)$ pairs of values $a$ and $b$, for which the above algorithm performs $i$ steps. Then $b_i \geq Fib_{i − 1}$ (where $Fib_i$ is the $i$-th Fibonacci number). Inductive proof:

1. for one step, $b_1 = 0$,
2. for two steps, $b \geq 1$,
3. for more steps, $(a_{k + 1} , b_{k + 1}) → (a_k , b_k ) → (a_{k − 1} , b_{k − 1} )$, then $a_k = b_{k + 1}$ , $a_{k − 1} = b_k$,
$b_{k − 1} = a_k$ mod $b_k$ , so $a_k = q · b_k + b_{k − 1}$ for some $q \geq 1$, so $b_{k + 1} \geq b_k + b_{k − 1}$.

Fibonacci numbers can be approximated by:

$$\large
Fib_n \approx { {({1 + \sqrt 5 \over 2})^n} \over \sqrt 5 }
$$

Thus, the time complexity is logarithmic based on the sum of $a$ and $b$ — $O(log(a + b))$.

## 12.3. Binary Euclidean Algorithm

This algorithm ﬁnds the $gcd$ using only subtraction, binary representation, shifting and parity testing. We will use a _divide and conquer_ technique.

The following function calculate $gcd(a, b, res) = gcd(a, b, 1) · res$. So to calculate $gcd(a, b)$ it suﬃces to call $gcd(a, b, 1) = gcd(a, b)$.

**12.3: Greatest common divisor using binary Euclidean algorithm.**
```js
const gcd = (a, b, res) => {
    if (a == b)
        return res * a;
    else if ((a % 2 == 0) && (b % 2 == 0))
        return gcd(Math.floor(a / 2), Math.floor(b / 2), 2 * res);
    else if ((a % 2 == 0))
        return gcd(Math.floor(a / 2), b, res);
    else if (b % 2 == 0)
        return gcd(a, Math.floor(b / 2), res);
    else if (a > b)
        return gcd(a - b, b, res);
    else
        return gcd(a, b - a, res);
}
```

This algorithm is superior to the previous one for very large integers when it cannot be assumed that all the arithmetic operations used here can be done in a constant time. Due to the binary representation, operations are performed in linear time based on the length of the binary representation, even for very big integers. On the other hand, modulo applied in algorithm 12.2 has worse time complexity. It exceeds $O(log\text{ }n · log\text{ }log\text{ }n)$, where $n = a + b$.

Denote by $(a_i , b_i)$ pairs of values $a$ and $b$, for which the above algorithm performs $i$ steps. We have $a_i + 1 \geq a_i$ , $b_i + 1 \geq bi$, $b_1 = a_1 > 0$. In the ﬁrst three cases, $a_i + 1 · b_i + 1 \geq 2 · a_i · b_i$. In the fourth case, $a_i + 1 · b_i + 1 \geq 2 · a_i − 1 · b_i − 1$, because a diﬀerence of two odd numbers is an even number. By induction we get:

$$\large
a_i · b_i \geq 2^{\lfloor{ {i - 1} \over 2 }\rfloor }
$$

## 12.4. Least Common Multiple

The least common multiple $(lcm)$ of two integers $a$ and $b$ is the smallest positive integer that is divisible by both $a$ and $b$. There is the following relation:

$$\large
lcm(a, b) = { {a · b} \over gcd(a, b) }
$$

Knowing how to compute the $gcd(a, b)$ in $O(log(a+b))$ time, we can also compute the $lcm(a, b)$ in the same time complexity.

## 12.5. Exercise

**Problem:** Michael, Mark and Matthew collect coins of consecutive face values $a$, $b$ and $c$ (each boy has only one kind of coins). The boys have to ﬁnd the minimum amount of money that each of them may spend by using only their own coins.

**Solution:** It is easy to note that we want to ﬁnd the least common multiple of the three integers, i.e. $lcm(a, b, c)$. The problem can be generalized for the $lcm$ of exactly $n$ integers. There is the following relation:

$$\large
lcm(a_1, a_2, \ldots , a_n) = lcm(a_1 , lcm(a_2 , a_3 , \ldots, a_n))
$$

We simply ﬁnd the $lcm$ $n$ times, and each step works in logarithmic time.

## Observations

This is basically a topic of great interest in algorithm design drawn from _Number Theory_. The lessons here are mostly mathematical and are mostly useful to apply to a problem that requires a _divide-and-conquer_ approach.

Also good point to mention is the usefulness of the formula in [12.4](#124-least-common-multiple) to deduce the _Least Common Multiple_.

## References

1. [Codility Training Media - Euclidean Algorithm](https://codility.com/media/train/10-Gcd.pdf)
2. [Euclidean Algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm)

## Videos

1. [GCD - Euclidean Algorithm (Method 1)](https://youtu.be/yHwneN6zJmU) - [Neso Academy](https://www.youtube.com/@nesoacademy)
2. [GCD - Euclidean Algorithm (Method 2)](https://youtu.be/svBx8u5bMEg) - [Neso Academy](https://www.youtube.com/@nesoacademy)

[^1]: [Vertical bar](https://en.wikipedia.org/wiki/Vertical_bar) represent divisibility. So b|a means _b divides a_.
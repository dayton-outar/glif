# 10. Prime and Composite Numbers

People have been analyzing prime numbers since time immemorial, but still we continue to search for fast new algorithms that can check the primality of numbers. A prime number is a natural number greater than 1 that has exactly two divisors (1 and itself). A composite number has more than two divisors.

> Every integer greater than 1 is either prime or composite, but not both.[^1]

![Primes highlighted in sequence from 2 to 14](/.attachments/non-prime-highlighted.png)

In the above picture the primes are highlighted in white and composite numbers are shown in gray.

## 10.1. Counting Divisors

Let’s count the number of divisors of $n$. The easiest approach is to iterate through all the numbers from 1 to $n$ and check whether or not each one is a divisor. The time complexity of this solution is $O(n)$.

There is a simple way to improve the above solution. Based on one divisor, we can ﬁnd the symmetric divisor. More precisely, if number $a$ is a divisor of $n$, then $n \over a$ is also a divisor. One of these two divisors is less than or equal to $\sqrt n$. (If that were not the case, $n$ would be a product of two numbers greater than $\sqrt n$, which is impossible.)

![Number mappings](/.attachments/number-mappings.png)

Thus, iterating through all the numbers from 1 to $\sqrt n$ allows us to ﬁnd all the divisors. If number $n$ is of the form $k^2$, then the symmetric divisor of $k$ is also $k$. This divisor should be counted just once.

**10.1: Counting the number of divisors - $O(\sqrt n)$.**
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

divisors(8); // 4
```

## 10.2. Primality Test

The primality test of $n$ can be performed in an analogous way to counting the divisors. If we ﬁnd a number between 2 and $n − 1$ that divides $n$ then $n$ is a composite number. Otherwise, $n$ is a prime number.

**10.2: Primality test - $O(n)$.**
```js
const primality = n => {
    let i = 2;

    while ( i * i <= n ) {
        if ( n % i == 0 ) return false;
        i++;
    }

    return true;
}

primality(7); // true
primality(9); // false
```

We assume that 1 is neither a prime nor a composite number, so the above algorithm works only for $n \geq 2$.

## 10.3 Exercise

**Problem:** Consider $n$ coins aligned in a row. Each coin is showing heads at the beginning.

![Coins 1 to 10](/.attachments/coins.png)

Then, $n$ people turn over corresponding coins as follows. Person $i$ reverses coins with numbers that are multiples of $i$. That is, person i ﬂips coins $i, 2 · i, 3 · i, \ldots$ until no more appropriate coins remain. The goal is to count the number of coins showing tails. In the above example, the ﬁnal conﬁguration is:

![Coins 1, 4, 9 flipped](/.attachments/coins-1-4-9.png)

**Solution $O(n\text{ }log\text{ }n)$:** We can simulate the results of each person reversing coins.

**10.3: Reversing coins - $O(n\text{ }log\text{ }n)$.**
```js
const coins = n => {
    let result = 0;
    let coin = Array(n + 1).fill(0);

    for ( let i = 1; i < (n + 1);i++ ) {
        let k = i;
        while ( k <= n ) {
            coin[k] = (coin[k] + 1) % 2;
            k++;
        }
        result += coin[i];
    }

    console.log( coin );

    return result;
}

coins(10); // 5
```

The number of operation can be estimated by ${n \over 1} + {n \over 2} + \ldots + {n \over n}$, what equals $n · ({1 \over 1} + {1 \over 2} + \ldots + {1 \over n})$. The sums of multiplicative inverses (reciprocals) of the ﬁrst $n$ numbers are called harmonic numbers, which asymptotically equal $O(log\text{ }n)$[^2]. In summary, the total time complexity is $O(n\text{ }log\text{ }n)$.

**Solution $O(n\text{ }log\text{ }n)$:** Notice that each coin will be turned over exactly as many times as the number of its divisors. The coins that are reversed an odd number of times show tails, meaning that it is suﬃcient to ﬁnd the coins with an odd number of divisors. 

We know that almost every number has a symmetric divisor (apart from divisors of the form $\sqrt n$). Thus, every number of the form $k^2$ has an odd number of divisors. There are exactly $\lfloor \sqrt n \rfloor$ such numbers between 1 and $n$. Finding the value of $\lfloor \sqrt n \rfloor$ takes logarithmic time (or constant time if we use operations on ﬂoating point numbers).

## Observations

The hardest thing to grasp is the problem in the Exercise. ...

[^1]: Page 105. 4.2 Primes. Concrete Mathematics by Donald Knuth.
[^2]: An explanation of this deduction can be found [here](https://math.stackexchange.com/questions/716/sum-of-the-alternating-harmonic-series-sum-k-1-infty-frac-1k1k). Basically, the integral of $1 \over n$ is $log_e\text{ }n$ (or $ln\text{ }n$), where $e$ is Euler's number.
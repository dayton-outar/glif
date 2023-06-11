# Chocolate by Numbers

## Problem

Two positive integers $N$ and $M$ are given. Integer $N$ represents the number of chocolates arranged in a circle, numbered from $0$ to $N − 1$.

You start to eat the chocolates. After eating a chocolate you leave only a wrapper.

You begin with eating chocolate number $0$. Then you omit the next $M − 1$ chocolates or wrappers on the circle, and eat the following one.

More precisely, if you ate chocolate number $X$, then you will next eat the chocolate with number $(X + M)$ modulo $N$ (remainder of division).

You stop eating when you encounter an empty wrapper.

For example, given integers $N = 10$ and $M = 4$. You will eat the following chocolates: 0, 4, 8, 2, 6.

The goal is to count the number of chocolates that you will eat, following the above rules.

Write a function:

```js
    function solution(N, M);
```

that, given two positive integers $N$ and $M$, returns the number of chocolates that you will eat.

For example, given integers $N = 10$ and $M = 4$. the function should return 5, as explained above.

Write an efficient algorithm for the following assumptions:

- $N$ and $M$ are integers within the range $[1 ... 1,000,000,000]$.


## Solution

I admit that it took me some re-reading before I could grasp this problem. What made it easier to grasp was the example.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23).

This solution can be found on Codility [here](https://app.codility.com/demo/results/trainingSXZ3KT-MV4/).

```js
function gcd(a, b) {
    if(a % b === 0) {
        return b;
    } else {
        return gcd(b, a % b);
    }
}

function solution(N, M) {    
    if(N === 1) {
        return 1;
    }
    
    if(M === 1) {
        return N;
    }
    
    return N / gcd(N, M);
}
```

Look at that solution! So simple. If you had known _Number Theory_, this would have been a walk in the park. This is just based on mathematical principles.

If we take the case that is provided and use the formula within the solution, which is `N / gcd(N, M)`, then we can see the magic of this solution. Given that `gcd` is the greatest common divisor, we can determine that the _gcd_ of 10 and 4 is 2. When 10 is divided by 2, we get 5.

Let's try a different case. Let's try $N = 12$ and $M = 3$. Starting at 0, the chocolates that can be eaten following the rule of using $(X + 3)$ modulo $12$ are 0, 3, 6, 9. So, only 4 chocolates can be eaten following this rule for this case. Given that the _gcd_ of 12 and 3 is 3. When 12 is divided by 3, we get 4.

Now that we have proven this solution with another case, the question we are left with is: Why does _gcd_ work for finding the number of possibilities with the restriction of the arithmetic modulo rule? A topic to consider studying is _Number Theory: Divisibility_. But maybe a better approach in understanding the reason for this mathematical approach is by a practical visualization demonstrated by CodeTrading YouTube Channel in [this video](https://www.youtube.com/watch?v=ryYelurbcMk&t=335s). Basically, his approach was to draw the circle and fill around the circle with the "chocolates" and work some of the cases to observe that the lowest common multiple can help to determine the number of possibilities.

![Chocolates in Circle](/.attachments/chocolates-circle.png)

The detected time complexity of this solution is $O(log(n + m))$.
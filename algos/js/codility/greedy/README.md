# 16. Greedy Algorithms

We consider problems in which a result comprises a sequence of steps or choices that have to be made to achieve the optimal solution. Greedy programming is a method by which a solution is determined based on making the locally optimal choice at any given moment. In other words, we choose the best decision from the viewpoint of the current stage of the solution.

Depending on the problem, the greedy method of solving a task may or may not be the best approach. If it is not the best approach, then it often returns a result which is approximately correct but suboptimal. In such cases dynamic programming or brute-force can be the optimal approach. On the other hand, if it works correctly, its running time is usually faster than those of dynamic programming or brute-force.

> For many problems, resorting to dynamic programming is overkill and a simpler algorithm will suffice. [^1]

## 16.1. The Coin Changing Problem

For a given set of denominations, you are asked to ﬁnd the minimum number of coins with which a given amount of money can be paid. That problem can be approached by a greedy algorithm that always selects the largest denomination not exceeding the remaining amount of money to be paid. As long as the remaining amount is greater than zero, the process is repeated.

A correct algorithm should always return the minimum number of coins. It turns out that the greedy algorithm is correct for only some denomination selections, but not for all. For example, for coins of values 1, 2 and 5 the algorithm returns the optimal number of coins for each amount of money, but for coins of values 1, 3 and 4 the algorithm may return a suboptimal result. An amount of 6 will be paid with three coins: 4, 1 and 1 by using the greedy algorithm. The optimal number of coins is actually only two: 3 and 3.

Consider $n$ denominations $0 < m0 \leq m1 \leq \ldots \leq m_{n − 1}$ and the amount $k$ to be paid.

**16.1: The greedy algorithm for ﬁnding change.**
```js
const greedyCoinChanging = (M, k) => {
    const n = M.length;
    let result = [];

    for ( let i = (n - 1); i > -1; i-- ) {
        result.push([M[i], Math.floor( k / M[i] ) ]);
        k %= M[i];
    }

    return result;
}

// Denominations: 1, 3, 4
greedyCoinChanging( [ 1, 3, 4 ], 6 ); // [ [ 4, 1 ], [ 3, 0 ], [ 1, 2 ] ] ... 1 "4" coin and 2 "1" coins
```

The function returns the list of pairs: denomination, number of coins. The time complexity of the above algorithm is $O(n)$ as the number of coins is added once for every denomination.

## 16.2. Proving Correctness

If we construct an optimal solution by making consecutive choices, then such a property can be proved by induction: if there exists an optimal solution consistent with the choices that have been made so far, then there also has to exist an optimal solution consistent with the next choice (including the situation when the ﬁrst choice is made).

## 16.3. Exercise

**Problem:** There are $n > 0$ canoeists weighing respectively $1 \leq w_0 \leq w_1 \leq \ldots \leq w_{n − 1} \leq 10^9$. The goal is to seat them in the minimum number of double canoes whose displacement (the maximum load) equals $k$. You may assume that $w_i \leq k$.

**Solution A $O(n)$:** The task can be solved by using a greedy algorithm. The heaviest canoeist is called _heavy_. Other canoeists who can be seated with _heavy_ in the canoe are called _light_. All the other remaining canoeists are also called _heavy_.

The idea is that, for the heaviest _heavy_, we should ﬁnd the heaviest _light_ who can be seated with him/her. So, we seat together the heaviest _heavy_ and the heaviest _light_. Let us note that the lighter the heaviest _heavy_ is, the heavier _light_ can be. Thus, the division between _heavy_ and _light_ will change over time — as the heaviest _heavy_ gets closer to the pool of _light_.

**16.2: Canoeist in $O(n)$ solution.**
```js
const greedyCanoeistA = (W, k) => {
    const n = W.length;
    let light = [];
    let heavy = [];

    for( let i = 0; i < (n - 1); i++ ) {
        if ( W[i] + W[n - 1] <= k ) {
            light.push( W[i] );
        } else {
            heavy.push( W[i] );
        }
    }

    heavy.push( W[n - 1] );
    let canoes = 0;

    while( light.length || heavy.length ) {
        if ( light.length > 0 ) {
            light.pop()
        }
        
        heavy.pop();
        canoes++;

        if ( !heavy.length && light.length ) {
            heavy.push( light.pop() );
        }

        while ( heavy.length > 1 && heavy[heavy.length - 1] + heavy[0] <= k ) {
            light.push( heavy.unshift() )
        }
    }

    return canoes;
}

let people = [2, 4, 5, 2, 1, 3, 1, 2, 5, 2, 3];
greedyCanoeistA( people, 5); // 6
```

**Proof of correctness:** There exists an optimal solution in which the heaviest _heavy_ $h$ and the heaviest _light_ $l$ are seated together. If there were a better solution in which $h$ sat alone then $l$ could be seated with him/her anyway. If _heavy_ $h$ were seated with some _light_ $x \leq l$, then $x$ and $l$ could just be swapped. If $l$ has any companion $y$, $x$ and $y$ would ﬁt together, as $y \leq h$.

The solution for the ﬁrst canoe is optimal, so the problem can be reduced to seat the remaining canoeists in the minimum number of canoes.

The total time complexity of this solution is $O(n)$. The outer `while` loop performs $O(n)$ steps since in each step one or two canoeists are seated in a canoe. The inner `while` loop in each step changes a _heavy_ into a _light_. As at the beginning there are $O(n)$ _heavy_ and with each step at the outer `while` loop only one _light_ become a _heavy_, the overall total number of steps of the inner `while` loop has to be $O(n)$.

**Solution B $O(n)$:** The heaviest canoeist is seated with the lightest, as long as their weight is less than or equal to $k$. If not, the heaviest canoeist is seated alone in the canoe.

**16.3: Canoeist in $O(n)$ solution.**
```js
const greedyCanoeistB = (W, k) => {
    let canoes = 0;
    let j = 0;
    let i = W.length - 1;

    while ( i >= j ) {
        if ( W[i] + W[j] <= k ) {
            j++;
        }
        canoes++;
        i--;
    }

    return canoes;
}

greedyCanoeistB( [2, 4, 5, 2, 1, 3, 1, 2, 5, 2, 3], 5); // 9
```

The time complexity is $O(n)$, because with each step of the loop, at least one canoeist is seated.

**Proof of correctness:** Analogically to solution A. If _light_ $l$ were seated with some _heavy_ $x < h$, then $x$ and $h$ could just be swapped.

If the heaviest canoeist is seated alone, it is not possible to seat anybody with him/her. If there exists a solution in which the heaviest canoeist $h$ is seated with some other $x$, we can swap $x$ with the lightest canoeist $l$, because $l$ can sit in place of $x$ since $x \geq l$. Also, $x$ can sit in place of $l$, since if $l$ has any companion $y$, we have $y \leq h$.

## Observations

The problem in the exercise is pretty straightforward: try to get as many canoeist to use the double-occupancy canoes. What I cannot understand is how code snippet 16.2 is $O(n)$. This must be a mistake. The inner nested loop reshuffles the _heavy_ queue onto the _light_ queue based on the weight of the first and last items in the _heavy_ queue if their combined weight is less than the maximum load that the canoe can take. Surely, it must be a $O(log\text{ }n)$ operation to reshuffle. Personally, I think the time complexity for 16.2 should be $O(n\text{ }log\text{ }n)$.

## References

1. [Codility Training Media - Greedy Algorithms](https://codility.com/media/train/14-GreedyAlgorithms.pdf)

[^1]: Page 217. Chapter 14: Advanced Algorithms. Data Structures and Algorithms with JavaScript by Michael McMillan.
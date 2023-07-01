# Number Solitaire

## Problem

A game for one player is played on a board consisting of $N$ consecutive squares, numbered from 0 to $N − 1$. There is a number written on each square. A non-empty array $A$ of $N$ integers contains the numbers written on the squares. Moreover, some squares can be marked during the game.

At the beginning of the game, there is a pebble on square number 0 and this is the only square on the board which is marked. The goal of the game is to move the pebble to square number $N − 1$.

During each turn we throw a six-sided die, with numbers from 1 to 6 on its faces, and consider the number $K$, which shows on the upper face after the die comes to rest. Then we move the pebble standing on square number $I$ to square number $I + K$, providing that square number $I + K$ exists. If square number $I + K$ does not exist, we throw the die again until we obtain a valid move. Finally, we mark square number $I + K$.

After the game finishes (when the pebble is standing on square number $N − 1$), we calculate the result. The result of the game is the sum of the numbers written on all marked squares.

For example, given the following array:

```js
    A[0] = 1
    A[1] = -2
    A[2] = 0
    A[3] = 9
    A[4] = -1
    A[5] = -2
```

one possible game could be as follows:

- the pebble is on square number 0, which is marked;
- we throw 3; the pebble moves from square number 0 to square number 3; we mark square number 3;
- we throw 5; the pebble does not move, since there is no square number 8 on the board;
- we throw 2; the pebble moves to square number 5; we mark this square and the game ends.

The marked squares are 0, 3 and 5, so the result of the game is 1 + 9 + (−2) = 8. This is the maximal possible result that can be achieved on this board.

Write a function:

```js
    function solution(A);
```

that, given a non-empty array $A$ of $N$ integers, returns the maximal result that can be achieved on the board represented by array $A$.

For example, given the array

```js
    A[0] = 1
    A[1] = -2
    A[2] = 0
    A[3] = 9
    A[4] = -1
    A[5] = -2
```

the function should return 8, as explained above.

Write an efficient algorithm for the following assumptions:

- $N$ is an integer within the range $[2 ... 100,000]$;
- each element of array $A$ is an integer within the range $[−10,000 ... 10,000]$.

## Solution

I think this problem is clearly outlined and expressed. There is very little room for misunderstanding.

This problem is based on the use of a dice, which has 6 faces and, hence, _6 possibilities in a throw (or toss of the dice)_.

In the use case provided there are 6 spots but the "pebble" starts from the first spot ("square number 0"). If the dice falls on 6, this cannot be used in moving the pebble forward because there is no spot available for the pebble that is 6 spots away from the first spot. So, from the first spot, the only numbers on the dice that are useful are from 5 downward: 5, 4, 3, 2, 1. Each spot has its value and the aim of this problem is to _find the maximum value possible from shifting the pebble from starting spot to ending spot_.

When the problem is fully grasped, the impression is that this requires a solution that determines every possible combination (as in some sort of _permutation and combination_ problem). This already sounds performantly expensive.

Let's take a look at a solution provided by Jonatas Walker.

Credit to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23).

```js
function solution(A) {
    let result = [];
    
    result[0] = A[0];
    for(let i = 1; i < A.length; i++) {
        result[i] = -Infinity;
    }
    
    for(let i = 1; i < A.length; i++) {
        // Checking for highest number in batches of 6. Math.max(0, i - 6)
        for(let j = Math.max(0, i - 6); j < i; j++) {
            result[i] = Math.max(result[i], result[j] + A[i]);
        }
    }

    return result[result.length - 1];
}

solution( [1, -2, 0, 9, -1, -2] ); // 8
```

Let's deconstruct this solution.

Since we are using [Dynamic Programming](./README.md), the idea is to _trade space for time_. For this reason an array was created with entries for six spots with teh idea to store the _maximum value possible for shifting the pebble from starting spot_ to the spot represented by the index of the array.

When visuals are created to demonstrate the solution, it can be more easily understood. See below visuals of the initial state of the "pebble" within the squares (anthe value associated with each square)

![Pebble at starting position within the 6 series of squares](/.attachments/number-solitaire.png)

So, the idea of this algorithm is to ***find the maximum value for the pebble to arrive at each spot leading up to the end spot by also going through all possibilities that the dice offers to reach that spot***. It sounds expensive at first but the genius is in managing the way how the nested loop performs this action. Let's start with a few iterations of this concept.

The assumption is already made that the pebble must start at position 0, so the value at _square 0_ is added to the running balance. Thus the running balance starts at 1. Remember as stated in the problem definition, the _result of the game is the gameis the sum of the numbers written on all marked squares_. Marked squares meaning the squares that the pebble visited in the aim to arrive at the _maximal possible result that can be achieved on the board_.

![Moving pebble to square 1](/.attachments/number-solitaire-2.png)

The position next to the starting spot (or square) is maintained in the nested loop through the variable `i`. The pebble is already at starting spot where `i` is 0. When the possibilities on the dice are considered to reach _square 1_, there is only one possibility on the dice and that is 1. If the dice is rolled and any other number is face up when the dice settles, the pebble cannot be moved. The running balance of adding _square 0_ and _square 1_ is -1. Since -1 is the only possible result of moving the pebble from _square 0_ to _square 1_, then -1 is kept as the _maximal possible result_ up to this point.

Before proceeding, there's an important point to note. Since negative numbers are part of the running balance, the program has to use negative infinity, `-Infinity`, because it makes use of the lowest possible number that can be had from the computer and stores this number when initiating the `result` array that keeps track of the _maximal possible result_ for each spot coming from the starting spot.

Now, as the program iterates to the next spot, _square 2_, the running balance must be calculated for each spot visited in order to reach to _square 2_ and the maximum value of the running balances must be chosen as the _maximal possible result_.

![Moving pebble to square 2](/.attachments/number-solitaire-3.png)



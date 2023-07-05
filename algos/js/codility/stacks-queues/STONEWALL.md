# Stone Wall

## Problem

You are going to build a stone wall. The wall should be straight and $N$ meters long, and its thickness should be constant; however, it should have different heights in different places. The height of the wall is specified by an array $H$ of $N$ positive integers. $H[I]$ is the height of the wall from $I$ to $I + 1$ meters to the right of its left end. In particular, $H[0]$ is the height of the wall's left end and $H[N − 1]$ is the height of the wall's right end.

The wall should be built of cuboid stone blocks (that is, all sides of such blocks are rectangular). Your task is to compute the minimum number of blocks needed to build the wall.

Write a function:

```js
  function solution(H);
```

that, given an array $H$ of $N$ positive integers specifying the height of the wall, returns the minimum number of blocks needed to build it.

For example, given array $H$ containing $N = 9$ integers:

```js
  H[0] = 8    H[1] = 8    H[2] = 5
  H[3] = 7    H[4] = 9    H[5] = 8
  H[6] = 7    H[7] = 4    H[8] = 8
```

the function should return 7. The figure shows one possible arrangement of seven blocks.

![Stone Wall](/.attachments/stone-wall.png)

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- each element of array $H$ is an integer within the range $[1 ... 1,000,000,000]$.

## Solution

Solving logical mathematical problems involves visualization. It's important to visualize the problem in order to arrive at a solution. The diagram of blocks can easily be misunderstood with the provided array in the use case within the problem definition. The stone wall gives the impression that the blocks in the diagram must match up to the numbers provided in the array (both indices and values). This confusion is expressed by [Straight Developer](http://straightdeveloper.com/) in his explanation of the problem[^1]. However, the first paragraph of the problem definition states that the indices of the array can be thought of as the values along the x-axis (the base of the wall) and the values of the array can be though of as the height level of the wall. The illustration below easily helps the reader to map the indices and values of the array to the _skyline_ or height level of the wall at particular points.

![Stone wall with vertical lines](/.attachments/stone-wall-better-diagram-v2.png)

Credit to CodeTrading YouTube channel for providing visualization[^2].

So, here's the point of confusion. Although the array speaks to the _skyline_ or height level that the stone wall should be built, the aim of the problem is to _use the least number of rectangles to achieve that same height level_. Using the illustration above, 9 blocks from the provided array is not the most optimal use of rectangular (cuboid) blocks. This is where the diagram comes in. The diagram _demonstrates the optimal solution_ to create the _skyline_ or height level dictated by the provided array in the use case stated in the problem definition.

Let's break down the solution.

![Stone Wall](/.attachments/stone-wall.png)

- For index 0 to 2 (2 meters), the height level is the same in the stone wall. The most optimal solution for the first two meters, is to use one block of 8 by 2.

- From index 2 to 6 (5 meters), the height levels are greater than or equal to 5. For this reason, a block of 5 by 4 (referred to as _block 5-4_) is used.

- From index 3 to 6 (4 meters), the height levels are greater than or equal to 7. For this reason, a block of 2 by 3 (referred to as _block 2-3_) is placed upon _block 5-4_ at index 3.

- From index 4 to 5 (1 meter), the height level is 9. A block of 2 by 1 is placed upon _block 2-3_, which lays on top of _block 4-5_.

- From index 5 to 6 (1 meter), the height level is 8. A block of 1 by 1 is placed upon _block 2-3_, which lays on top of _block 4-5_.

- Since the height level goes back down to 7 at index 6, there's no need to add a block since _block 2-3_ is at height level of 7.

- From index 7 to 8 (2 meters), the height levels are greater than or equal to 4. So, a block of 4 by 2 (referred to as _block 4-2_) is needed.

- At index 8, the height level is 8. So, a block is needed to sit on top of _block 4-2_ to reach that height level at index 8. Hence, a 4 by 1 is used.

Voila! The heigh level from the provided array is achieved using 7 blocks.

Maybe the diagram needed more explanation.

The detailed breakdown of the solution offers some hint into providing the most optimal algorithm to solve this problem.

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript).

```js
function solution(H) {
    let stack = [];
    let head = -1;
    let block = 0;
    let i = 0;
    
    while (i < H.length) {
        let h = H[i];
        if (head < 0) {
            ++head;
            stack[head] = h; //stack push
            ++i;
        } else if (stack[head] == h) {
            ++i;
        } else if (stack[head] < h) {
            ++head;
            stack[head] = h; //stack push
            ++i;
        } else { //stack[head] > h
            --head; //stack pop
            ++block;
        }
    }
    return block + head + 1
}
```

The control structures can be better simplified and narrowed down to 3 control structures within the loop by using the built-in array functions, `push()` and `pop()`. For this reason, attention is also drawn to [Jonatas Walker](https://gist.github.com/jonataswalker) for providing his solutions [here](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23). See his solution below.

```js
function solution(H) {
    let counter = 0;
    let height = 0;
    let blocks = [];
    let i = 0;
    
    while( i < H.length) {
        if(H[i] > height) {
            let newBlock = H[i] - height;
            blocks.push(newBlock);
            height += newBlock;
            counter++;
            i++;
        } else if(H[i] < height) {
            let lastBlock = blocks.pop();
            height -= lastBlock;
        } else {
            i++;
        }
    }
    
    return counter;
}

solution( [8, 8, 5, 7, 9, 8, 7, 4, 8] ); // 7
```

Let's deconstruct this solution by Jonatas Walker.

Basically, every height level in the array is visited with a few variables to keep track of the progression of the state of the loop, the height level and, importantly, the _minimal number of blocks needed_.

Based on the breakdown provided for the problem definition's use case, a few things are clear,

 - For a certain height level, new height level detected, a block is needed.

 - When adjacent indices are at the same height level, no new block is needed. For example, in the provided use case, indices 0 and 1, have same height level and, hence, use same block to achieve that height level.

Notice how Jonatas' solution,

 - Adds new block whenever the height level is greater than the current height level of new blocks by using the `height` variable
 - Pops the new block whenever the height level is lesser than the the current height level of new blocks by using the `height` variable
 - New blocks are only counted whenever height level becomes greater than the current height level of new blocks
 - Advances the loop if the height level is equal to the current height level of new blocks. If it's not greater than or lesser than, then it must be equal to when the program flows into the `else` clause.
 - Appropriate arithmetic is done to maintain track of the height of each new block laid, so that when they are popped, the current `height` level returns to the height level achieved by laying the previous "new block". (This is making crafty use of the stack data structure, Last-In-First-Out).

The solution for this problem is pretty simple and straightforward. The problem definition leaves too much room for misinterpretation. Hopefully, the added explanation of the problem and the breakdown of the use case and the diagram brings enlightenment to the reader.

The detected time complexity for the algorithm above is $O(n)$.

[^1]: [How to get 100% score on the Stone Wall exercise on Codility](http://straightdeveloper.com/how-to-get-100-score-on-the-stonewall-exercise-on-codility/)
[^2]: [StoneWall in Python and C++ Codility Solution Lesson 7](https://youtu.be/BhBJ7MqjF-s)
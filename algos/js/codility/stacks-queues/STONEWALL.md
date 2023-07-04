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

- For the first two meters, the height level is the same in the stone wall. The most optimal solution for the first two meters, is to use one block of 8 by 2.

- From index 2 to 6 (4 meters), the height levels are greater than or equal to 5. For this reason, a block of 5 by 4 (referred to as _block 5-4_) is used.

- From index 3 to 6 (3 meters), the height levels are greater than or equal to 7. For this reason, a block of 2 by 3 (referred to as _block 2-3_) is placed upon _block 5-4_ at index 3.

- From index 4 to 5 (1 meter), the height level is 9. A block of 2 by 1 is placed upon _block 2-3_, which lays on top of _block 4-5_.

- From index 5 to 6 (1 meter), the height level is 8. A block of 1 by 1 is placed upon _block 2-3_, which lays on top of _block 4-5_.

- Since the height level goes back down to 7 at index 6, there's no need to add a block since _block 2-3_ is at height level of 7.

- From index 7 to 8, the height levels are greater than or equal to 4. So, a block of 4 by 2 (referred to as _block 4-2_) is needed.

- At index 8, the height level is 8. So, a block is needed to sit on top of _block 4-2_ to reach that height level at index 8. Hence, a 4 by 1 is used.

Voila! The heigh level from the provided array is achieved using 7 blocks.

Maybe the diagram needed more explanation.

The detailed breakdown of the solution offers some hint into providing the most optimal algorithm to solve this problem.

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript). See his solution to this problem below.

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

Let's deconstruct this solution.

...

The detected time complexity for the algorithm above is $O(n)$.

[^1]: [How to get 100% score on the Stone Wall exercise on Codility](http://straightdeveloper.com/how-to-get-100-score-on-the-stonewall-exercise-on-codility/)
[^2]: [StoneWall in Python and C++ Codility Solution Lesson 7](https://youtu.be/BhBJ7MqjF-s)
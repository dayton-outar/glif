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

Solving logical mathematical problems involves visualization. It's important to visualize the problem in order to arrive at a solution. With that said, I find this problem difficult to understand because the accompanying diagram of blocks makes it easy to confuse the reader. The main cause of confusion comes from the horizontal lines drawn in the stone wall, which gives the impression that the blocks in the diagram must match up to the numbers provided in the array (both indices and values). This confusion is expressed by [Straight Developer](http://straightdeveloper.com/) in his explanation of the problem[^1].

Instead of drawing horizontal lines, it would have been better if vertical lines were drawn or the wall be placed within a graph but with no lines drawn within the wall. See below an illustration of what is intended by the authors of this problem definition.

![Stone wall with vertical lines](/.attachments/stone-wall-better-diagram-v2.png)

The illustration above provides an easier mental mapping to the provided array. Credit to CodeTrading YouTube channel for providing visualization[^2].

Credit should be given to [Yaseen Shaik](https://github.com/yaseenshaik) for the solution below provided from [this repo](https://github.com/yaseenshaik/codility-solutions-javascript). See his solution to this problem below.

```js
function solution(H) {
	var stack = [];
    var head = -1;
    var block = 0;
    var i = 0;
    while (i < H.length) {
        var h = H[i];
        if (head < 0) {
            ++head;
            stack[head] = h;//stack push
            ++i;
        } else if (stack[head] == h) {
            ++i;
        } else if (stack[head] < h) {
            ++head;
            stack[head] = h;//stack push
            ++i;
        } else { //stack[head] > h
            --head;//stack pop
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
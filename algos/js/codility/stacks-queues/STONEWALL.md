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

- $N$ is an integer within the range [1..100,000];
- each element of array $H$ is an integer within the range [1..1,000,000,000].

## Solution

Solving logical mathematical problems involves visualization. It's important to visualize the problem in order to arrive at a solution. With that said, I find this problem difficult to understand because I have a difficulty reconciling the narrative with the diagram of blocks provided. When I take a look at the array of numbers provided. For example, based on the case presented, $H$ has 4 blocks that are at a height of 8 but I cannot see that represented in the diagram. For this reason, I just opt straight for the solution without even attempting at a solution. (The reference provided below gives a good explanation of how to appreciate the problem).

Here are excerpts from the reference[^1] explaining the problem.

> I had to read the exercise description multiple times before understanding it and it was because of the figure when I saw it at the first time I had the wrong idea that those blocks are actually elements from the $H$ array (the heights) which led me to a confusion I got rid of as soon as I understood the origin of those blocks. the exercise is actually quite simple and the best way to explain is to take the same example given in the exercise description.
>
> In this example, the wall should be 9 meters long ( `H.length` ) and each meter of the wall can have a different height, for example the 3<sup>rd</sup> meter ($H[2]$) is a 5 meters height ( $H[2] = 5$ )
>
> Don’t forget that the array $H$ only contains the heights of each meter of the wall but what we actually need in order to get this exercise done is a way to calculate the blocks you see in the figure above which are still to be determined so let us first understand what are those blocks and why are they placed the way they are in the figure.
>
> If you take the first block on the left of the figure you may notice that it has a 2 meters width and 8 meters height, that’s because both $H[0]$ & $H[1]$ have the same value (8) and they have no other height that precede them since they’re the two first elements of the array H, now to explain this further, it is not necessary to place two blocks of the same height as it takes 1 single block to build the two first meters of the main wall.
> 
> Now if you look at the other blocks of the figure you might get confused because the wall could have contained a different configuration of blocks while keeping the same blocks number (in other words the minimum number of blocks needed to build the wall) and that’s correct and could be done too but if the blocks are placed the way they are in the figure it’s because they simply have been placed in compliance to a specific algorithm.
>
> Just think of it like if, each time we add a block to the wall, we try to make it as wide as possible, so if we take the last block and the one before.
>
> They corresponds to $H[7]$ & $H[8]$ (4 & 8 meters), they could have drawn a block of 4 meters height followed by a block of 8 meters height both having a width of 1 meter, but instead, the first block is 2 meters long and it in order to reach a 8 meters height in the last meter of the wall’s length they’ve added a second block of 4 meters placed above the previous one, so by doing so they made sure the first block has taken as much width as possible while respecting its initial height.
>
> So by following this rule you will ensure that each new block is going to take as much space as possible before a newer block is going to take place and by doing so each block isn’t only going to contribute to raise the wall’s height in its initial position but may contribute in the height of the following ones as well reducing so the number of block needed to meet the height of each column and in the end you’ll get the minimum number of blocks needed to build the wall.

Here's the solution provided by the author of the preceding explanation.

```js
function solution(H) {
    let blocks = 1;
    let previousWall = [H[0]];
    let previousHeight = H[0];

    for(let i = 1; i < H.length; i++) {
        let currentHeight = H[i];
        let heightDiff = currentHeight - previousHeight;

        if (heightDiff > 0){ //current wall heighter
            blocks++;
            previousHeight += heightDiff;
            previousWall.push(heightDiff);
        } else {
            while(previousHeight > currentHeight){
              let lastBlock=previousWall.pop();
              previousHeight-=lastBlock;
            }
            heightDiff = currentHeight - previousHeight;
            if(heightDiff > 0){ //current wall is highter
              blocks++;
              previousWall.push(heightDiff);
              previousHeight += heightDiff;
            }
        }
    }
    return blocks
}
```

The detected time complexity for the algorithm above is $O(n)$.

I must admit that I thought I would have grasped the problem up until paragraph 4 but I had a difficulty matching up the other blocks based on that explanation.

[^1]: [How to get 100% score on the Stone Wall exercise on Codility](http://straightdeveloper.com/how-to-get-100-score-on-the-stonewall-exercise-on-codility/)
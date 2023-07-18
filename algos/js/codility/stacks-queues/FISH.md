# Fish

## Problem

You are given two non-empty arrays $A$ and $B$ consisting of $N$ integers. Arrays $A$ and $B$ represent $N$ voracious fish in a river, ordered downstream along the flow of the river.

The fish are numbered from 0 to $N − 1$. If $P$ and $Q$ are two fish and $P < Q$, then fish $P$ is initially upstream of fish $Q$. Initially, each fish has a unique position.

Fish number $P$ is represented by $A[P]$ and $B[P]$. Array $A$ contains the sizes of the fish. All its elements are unique. Array $B$ contains the directions of the fish. It contains only 0s and/or 1s, where:

- 0 represents a fish flowing upstream,
- 1 represents a fish flowing downstream.

If two fish move in opposite directions and there are no other (living) fish between them, they will eventually meet each other. Then only one fish can stay alive − the larger fish eats the smaller one. More precisely, we say that two fish $P$ and $Q$ meet each other when $P < Q$, $B[P] = 1$ and $B[Q] = 0$, and there are no living fish between them. After they meet:

- If $A[P] > A[Q]$ then $P$ eats $Q$, and $P$ will still be flowing downstream,
- If $A[Q] > A[P]$ then $Q$ eats $P$, and $Q$ will still be flowing upstream.

We assume that all the fish are flowing at the same speed. That is, fish moving in the same direction never meet. The goal is to calculate the number of fish that will stay alive.

For example, consider arrays $A$ and $B$ such that:

```js
  A[0] = 4    B[0] = 0
  A[1] = 3    B[1] = 1
  A[2] = 2    B[2] = 0
  A[3] = 1    B[3] = 0
  A[4] = 5    B[4] = 0
```

Initially all the fish are alive and all except fish number 1 are moving upstream. Fish number 1 meets fish number 2 and eats it, then it meets fish number 3 and eats it too. Finally, it meets fish number 4 and is eaten by it. The remaining two fish, number 0 and 4, never meet and therefore stay alive.

Write a function:

```js
    function solution(A, B);
```

that, given two non-empty arrays $A$ and $B$ consisting of N integers, returns the number of fish that will stay alive.

For example, given the arrays shown above, the function should return 2, as explained above.

Write an **efficient** algorithm for the following assumptions:

- $N$ is an integer within the range $[1 ... 100,000]$;
- each element of array $A$ is an integer within the range $[0 ... 1,000,000,000]$;
- each element of array $B$ is an integer that can have one of the following values: 0, 1;
- the elements of $A$ are all distinct.

## Solution

I lost track of the source for the solution below but this is pretty basic logics given that the problem is properly thought through.

```js
function solution(A, B) {
    let downStream = [];
    let upStream = [];
    let direction;
    
    for (let i = 0; i < A.length; i++) {
        direction = B[i];
        
        if (direction === 0) {
            while (downStream.length > 0) {
                let d = downStream.pop();
                
                if (d > A[i]) {
                    downStream.push(d);
                    break;
                }
            }
        
            if (downStream.length === 0) {
                upStream.push(A[i]);
            }
        } else {
            downStream.push(A[i]);
        }
    }
    
    return downStream.length + upStream.length;
}

console.log( solution( [4, 3, 2, 1, 5], [0, 1, 0, 0, 0] ) );
```

Let's deconstruct this solution.

The main idea behind this solution is that all downstream items are pushed onto a stack until an upstream item is found and when that upstream item is found it pops every item in the downstream stack that fails to meet the condition of being bigger than the item going upstream. If the downstream stack is emptied, the upstream stack is filled up. Pretty simple.

I find it interesting that this solution has a loop within a loop, yet the detected time complexity on Codility is $O(n)$.

The inner loop that iterates through the `downStream` array (used as a stack) based on the condition that a number in the top of the stack is greater than the current number in $A$ (i.e. `A[i]`). Since the number of _fishes_ that will be swimming _downstream_ at any point in time is unpredictable and based on the elements provided in arrays, `A` and `B`, it's hard to calculate a worst case scenario involving number of elements, $n$, in those arrays. Maybe it is better to state that the worst case for the inner loop is represented by a term, $k$. From this we can derive at an expanded equation for the performance such as $O(n \cdot k)$. So, it's possible that $k$ is so negligible that Codility decides the time complexity should be $O(n)$.

## Videos

1. [Codility FISH in Python and C++ Codility Solutions Lesson 7](https://youtu.be/TzK5WOjUYgU)
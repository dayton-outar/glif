# Cyclic Rotation

## The Problem

An array $A$ consisting of $N$ integers is given. Rotation of the array means that each element is shifted right by one index, and the last element of the array is moved to the first place. For example, the rotation of array $A$ = [3, 8, 9, 7, 6] is [6, 3, 8, 9, 7] (elements are shifted right by one index and 6 is moved to the first place).

The goal is to rotate array $A$ $K$ times; that is, each element of $A$ will be shifted to the right $K$ times.

Write a function:

```js
function solution(A, K);
```

that, given an array $A$ consisting of $N$ integers and an integer $K$, returns the array $A$ rotated $K$ times.

For example, given

```js
    A = [3, 8, 9, 7, 6]
    K = 3
```

the function should return [9, 7, 6, 3, 8]. Three rotations were made:

```js
    [3, 8, 9, 7, 6] -> [6, 3, 8, 9, 7]
    [6, 3, 8, 9, 7] -> [7, 6, 3, 8, 9]
    [7, 6, 3, 8, 9] -> [9, 7, 6, 3, 8]
```

For another example, given

```js
    A = [0, 0, 0]
    K = 1
```

the function should return [0, 0, 0]

Given

```js
    A = [1, 2, 3, 4]
    K = 4
```

the function should return [1, 2, 3, 4]

Assume that:

- $N$ and $K$ are integers within the range $[0 ... 100]$;
- each element of array $A$ is an integer within the range $[−1,000 ... 1,000]$.

In your solution, focus on correctness. The performance of your solution will not be the focus of the assessment.

## Solutions

So, I arrived at the following code after submitting a few times. The overall approach with using the stack was satisfactory.

```js
function solution(A, K) { // N = 100 in 0.08 s
    //if (A.length == 0) // Can't rotate an empty string
    if (A.length === K || K === 0) // Made correction to bring up score from 87% to 100%
        return A;

    for (let x = 0; x < K; x++) {
        A.unshift(A.pop());
    }

    return A;
}
```

After getting 100% for correctness, I came across the following code,

```js
function solution(A, K) {
    K = K % A.length;
    const sliceIndex = A.length - K;
    return [...A.slice(sliceIndex), ...A.slice(0, sliceIndex)]
}

solution([5, 7, 1, 4, 9], 2); // [ 4, 9, 5, 7, 1 ]
```

## Observations

I'm impressed with the brevity of the syntax, the mathematics used and the use of the `slice` function. For a given array of length $N$, the array can only be rotated $N$ times before returning to its original state. So, `[5, 7, 1, 4, 9]` rotated 5 times is `[5, 7, 1, 4, 9]`. We could say that rotating an array of $N$, $N$ times is the same as rotating it 0 times. This is where the use of modulus (`%`) comes in. Of course, finishing it off with the spread operator is an obviously exquisite end to solving this problem.

The time complexity of my solution is $O(K)$, where $K$ is the number of rotations requested. For the second solution that was discovered online, the time complexity is probably the same. Since according a StackOverflow post[^1],

> The ECMA specification does not specify a bounding complexity, however, you can derive one from the specification's algorithms.
>
> `push` is $O(1)$, however, in practice it will encounter an $O(N)$ copy costs at engine defined boundaries as the slot array needs to be reallocated. These boundaries are typically logarithmic.
>
> `pop` is $O(1)$ with a similar caveat to `push` but the $O(N)$ copy is rarely encountered as it is often folded into garbage collection (e.g. a copying collector could only copy the used part of an array).
>
> `shift` is at worst $O(N)$ however it can, in specially cases, be implemented as $O(1)$ at the cost of slowing down indexing so your mileage may vary.
>
> `slice` is $O(N)$ where N is `end - start`. Not a tremendous amount of optimization opportunity here without significantly slowing down writes to both arrays.
> 
> `splice` is, worst case, $O(N)$. There are array storage techniques that divide $N$ by a constant but they significantly slow down indexing. If an engine uses such techniques you might notice unusually slow operations as it switches between storage techniques triggered by access pattern changes.
>
> One you didn't mention, is sort. It is, in the average case, $O(n \cdot \text{log n})$. However, depending on the algorithm chosen by the engine, you could get $O(N^2)$ in some cases. For example, if the engine uses QuickSort (even with an late out to InsertionSort), it has well-known $N^2$ cases. This could be a source of DoS for your application. If this is a concern either limit the size of the arrays you sort (maybe merging the sub-arrays) or bail-out to HeapSort.

Since `slice` is two times. The start and end parameters for the first slice would be $N - K$ and $N$, respectively. the start and end parameters for the second slice would be $0$ and $N - K$, respectively. The difference between start and end of the first slice would be $N - (N - K) = K$. The difference between start and end of the second slice would be $(N - K) - 0 = (N - K)$. If we time complexity of both slice function we get $K + (N - K) = N$. It would appear that the time complexity of the second solution is $O(N)$.

Just for further consideration, I took a look at Jonatas Walker's solution found [here](https://app.codility.com/demo/results/trainingSH2W5R-RP5/) from [his list of solutions](https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23),

```js
function solution(A, K) {
    // write your code in JavaScript (Node.js 4.0.0)
    
    var result = [];
    
    if(A.length === 1 || K === 0) {
        return A;
    }
    
    for(var i=0; i<A.length; i++) {
        var newPos = (i+K) % A.length;
        
        result[newPos] = A[i];
    }
    
    return result;
}
```

[^1]: [JavaScript runtime complexity of Array functions](https://stackoverflow.com/questions/22614237/javascript-runtime-complexity-of-array-functions). StackOverflow.
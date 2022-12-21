# 8. Leader

Let us consider a sequence $a_0, a_1 , \ldots, a_{n − 1}$. The leader of this sequence is the element whose value occurs more than $n \over 2$ times.

![Sequence highlighting all 6s](/.attachments/leader-sequence-1.png)

In the picture the leader is highlighted in gray. Notice that the sequence can have at most one leader. If there were two leaders then their total occurrences would be more than $2 · {n \over 2} = n$, but we only have $n$ elements.

The leader may be found in many ways. We describe some methods here, starting with trivial, slow ideas and ending with very creative, fast algorithms. The task is to ﬁnd the value of the leader of the sequence $a_0, a_1 , \ldots, a_{n − 1}$, such that $0 \leq ai \leq 10^9$. If there is no leader, the result should be -1.

## 8.1. Solution with $O(n^2)$ time complexity

We count the occurrences of every element:

**8.1: Leader - $O(n^2)$.**
```js
const slowLeader = A => {
    const n = A.length;
    let leader = -1;

    for ( let i = 0; i < n; i++ ) {
        let candidate = A[i];
        let count = 0;
        for ( let j = 0; j < n; j++) {
            if (A[i] == candidate) {
                count++;
            }
        }

        if (count > Math.floor( n / 2 )) {
            leader = candidate;
        }
    }

    return leader;
}

slowLeader( [6, 8, 4, 6, 8, 6, 6] ); // 6
```

## 8.2. Solution with $O(n\text{ }log\text{ }n)$ time complexity

If the sequence is presented in non-decreasing order, then identical values are adjacent to each other.

![Another sequence highlighting 6s in arranged beside each other](/.attachments/leader-sequence-2.png)

Having sorted the sequence, we can easily count slices of the same values and ﬁnd the leader in a smarter way. Notice that if the leader occurs somewhere in our sequence, then it must occur at index $n \over 2$ (the central element). This is because, given that the leader occurs in more than half the total values in the sequence, there are more leader values than will ﬁt on either side of the central element in the sequence.

**8.2: Leader - $O(n\text{ }log\text{ }n)$.**
```js
const fastLeader = A => {
    const n = A.length;
    let leader = -1;

    A.sort((a, b) => a - b);
    let mid = Math.floor(n / 2);
    let candidate = A[mid];
    let count = 0;
    
    for ( let i = 0; i < n; i++ ) {
        if (A[i] == candidate) {
            count++;
        }
    }

    if (count > mid) {
        leader = candidate;
    }

    return leader;
}

fastLeader( [6, 8, 4, 6, 8, 6, 6] ); // 6
```
The time complexity of the above algorithm is $O(n\text{ }log\text{ }n)$ due to the sorting time.

## 8.3. Solution with $O(n)$ time complexity

Notice that if the sequence ${a_0 , a_1 ,\ldots , a_{n − 1}}$ contains a leader, then after removing a pair of elements of diﬀerent values, the remaining sequence still has the same leader. Indeed, if we remove two diﬀerent elements then only one of them could be the leader. The leader in the new sequence occurs more than ${ n \over 2} − 1 = { {n − 2} \over 2 }$ times. Consequently, it is still the leader of the new sequence of $n − 2$ elements.

![Two sequences](/.attachments/leader-sequence-3.png)

Removing pairs of diﬀerent elements is not trivial. Let’s create an empty stack onto which we will be pushing consecutive elements. After each such operation we check whether the two elements at the top of the stack are diﬀerent. If they are, we remove them from the stack. This is equivalent to removing a pair of diﬀerent elements from the sequence (in the picture below, diﬀerent elements being removed are highlighted in gray).

![Stacks of the sequence](/.attachments/leader-sequence-4.png)

In fact, we don’t need to remember all the elements from the stack, because all the values below the top are always equal. It is suﬃcient to remember only the values of elements and the size of the stack.

**8.3: Leader — $O(n)$.**
```js
const goldenLeader = A => {
    const n = A.length;
    let size = 0;

    let value = 0;
    for ( let i = 0; i < n; i++ ) {
        if ( size == 0 ) {
            size++;
            value = A[i];
        } else {
            if ( value != A[i] ) {
                size--;
            } else {
                size++;
            }
        }
    }

    let candidate = -1;

    if (size > 0) {
        candidate = value;
    }

    let leader = -1;
    let count = 0;
    
    for ( let i = 0; i < n; i++ ) {
        if (A[i] == candidate) {
            count++;
        }
    }

    let mid = Math.floor(n / 2);
    if ( count > mid ) {
        leader = candidate;
    }

    return leader;
}

goldenLeader( [6, 8, 4, 6, 8, 6, 6] ); // 6
goldenLeader( [6, 8, 6, 4, 6, 8, 6] ); // 6
```

At the beginning we notice that if the sequence contains a leader, then after the removal of diﬀerent elements the leader will not have changed. After removing all pairs of diﬀerent elements, we end up with a sequence containing all the same values. This value is not necessarily the leader; it is only a candidate for the leader. Finally, we should iterate through all the elements and count the occurrences of the candidate; if it is greater than $n \over 2$ then we have found the leader; otherwise the sequence does not contain a leader.

The time complexity of this algorithm is $O(n)$ because every element is considered only once. The ﬁnal counting of occurrences of the candidate value also works in $O(n)$ time.

## Observations

The function `goldenLeader` is pretty straightforward. The first loop operates much like a stack that seeks to find a candidate that shows up more frequently than all other elements of an array. I thought the second loop was unnecessary. If `goldenLeader` was written as `platinumLeader` shown below,

```js
const platinumLeader = A => {
    const n = A.length;
    let size = 0;

    let value = 0;
    for ( let i = 0; i < n; i++ ) {
        if ( size == 0 ) {
            size++;
            value = A[i];
        } else {
            if ( value != A[i] ) {
                size--;
            } else {
                size++;
            }
        }
    }

    let candidate = -1;

    if (size > 0) {
        candidate = value;
    }

    return candidate;
}

platinumLeader( [6, 8, 6, 4, 6, 8, 6] ); // 6
platinumLeader( [6, 8, 6, 4, 6, 8] ); // -1
platinumLeader( [6, 8, 6, 4, 6, 8, 3, 3] ); // 3
```

Notice that if the array $[6, 8, 6, 4, 6, 8, 6]$ is used where 6's show up more than half the size of the array, the result from `platinumLeader` identifies the number, 6, as the leader. The same function, `platinumLeader`, returns -1 for $[6, 8, 6, 4, 6, 8]$, which means no leader exists within this array. But to hack or crash this function we just need to submit a test case that would fail the test such as $[6, 8, 6, 4, 6, 8, 3, 3]$. The number 3 is not the leader of $[6, 8, 6, 4, 6, 8, 3, 3]$. There are no leaders in that array and this is the reason for the second loop.

I believe that instead of using `size` variable, an array could have been used instead to achieve the same result. Since JavaScript arrays contain the `push` and `pop` method, that array could have been treated as a stack to get the same result.

## References

1. [Codility Training Media - Leader](https://codility.com/media/train/6-Leader.pdf)
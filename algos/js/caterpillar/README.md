# 15. Caterpillar Method

The Caterpillar method is a likeable name for a popular means of solving algorithmic tasks. The idea is to check elements in a way that’s reminiscent of movements of a caterpillar. The caterpillar crawls through the array. We remember the front and back positions of the caterpillar, and at every step either of them is moved forward.

## 15.1 Usage example

Let’s check whether a sequence ${a_0, a_1, \dots, a_{n − 1} (1 \leq a_i \leq 10^9)}$ contains a contiguous subsequence whose sum of elements equals $s$. For example, in the following sequence we are looking for a subsequence whose total equals $s = 12$.

![Sub-sequence in sequence](/.attachments/caterpillar-sequence.png)

Each position of the caterpillar will represent a different contiguous subsequence in which the total of the elements is not greater than $s$. Let’s initially set the caterpillar on the first element. Next we will perform the following steps:

 - if we can, we move the right end _(front)_ forward and increase the size of the caterpillar;
 - otherwise, we move the left end _(back)_ forward and decrease the size of the caterpillar.

 In this way, for every position of the left end we know the longest caterpillar that covers elements whose total is not greater than $s$. If there is a subsequence whose total of elements equals $s$, then there certainly is a moment when the caterpillar covers all its elements.

**15.1 Caterpillar in _O(n)_ time complexity.**
```js
const caterpillarMethod = (A, s) => {
    ...

    return false;
}
```

Let’s estimate the time complexity of the above algorithm. At the first glance we have two nested loops, what suggest quadratic time. However, notice that at every step we move the front or the back of the caterpillar, and their positions will never exceed $n$. Thus we actually get an _O(n)_ solution.

## 15.2 Exercise

...

## References

1. [Codility Training Media](https://codility.com/media/train/13-CaterpillarMethod.pdf)

## Videos

1. [Codility Count Distinct Slices solution](https://youtu.be/6CkGw6u0n9A)
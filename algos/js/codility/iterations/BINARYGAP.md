# Binary Gap

## The Problem

A _binary gap_ within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

```js
function solution(N);
```

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Write an **efficient** algorithm for the following assumptions:

- N is an integer within the range $[1 ... 2,147,483,647]$.

## Solutions

I used basic JS syntax and functions to achieve the code shown below.

```js
function solution(N) {
    if (N > 2147483647) return 0;

    const bin = N.toString(2);

    let ix = bin.indexOf('1');
    let longest = 0;
    while(ix > -1) {
        let nx = bin.indexOf('1', (ix + 1));
        let len = (nx - ix) - 1;
        if (longest < len) {
            longest = len;
        }
        ix = nx;
    }

    return longest;
}

solution(1041); // 5
solution(32); // 3
```

However, after completing my solution, which scored 100% for correctness, I encountered a solution posted at [Dev.to](https://dev.to/_algowhacks/solving-for-binary-gap-using-javascript-a1p) by Jon Randy shown below.

```js
const solution = i => Math.max(...i.toString(2).split(/^0+|1+|0+$/).map(s => s.length));


solution(1041); // 5
solution(32); // 3
```

## Observations

I was impressed by the brevity of the code. It was here I began to see that some lines of code could be translated for one line of code.

If I were to breakdown my solution into Jon's solution it would go as follows,

| My Code                                                                   | Jon's Code            |
|:--------------------------------------------------------------------------|:----------------------|
| <code>if (longest < len) {<br />&nbsp;&nbsp;longest = len;<br />}</code>  | `Math.max`            |
| <code>const bin = N.toString(2);</code>                                   | `...i.toString(2)`    |
| <code>let ix = bin.indexOf('1');<br />...<br />while(ix > -1) {<br />&nbsp;&nbsp;let nx = bin.indexOf('1', (ix + 1));<br />&nbsp;&nbsp;let len = (nx - ix) - 1;<br />&nbsp;&nbsp;ix = nx;<br />}</code> | <code>.split....map(s => s.length)</code> |

I think the time complexity of both solutions is $O(N)$ since both make use of a loop that iterates through the entire string.[^1]

The crafty use of regular expressions is noteworthy. The expression, `/^0+|1+|0+$/`, excludes the 0's that start or end the binary string (the `^0+` excludes 0's at the beginning and `0+$` excludes 0's at the end) and treats 1's as delimiters, since the expression is used in the `split` function. So, splitting 00011010000111000 would only pass an array containing two (2) elements to the `map` function: `['0', '0000']`. This can be demonstrated when the expression is entered in [regexr.com](https://regexr.com/) and the mentioned binary string is tested. When testing the binary string, make sure that the global flag is on.

[^1]: [The time complexity of the map function](https://stackoverflow.com/questions/50244343/the-time-complexity-of-the-map-function#:~:text=Array.,complexity%20of%20O(n).). StackOverflow.
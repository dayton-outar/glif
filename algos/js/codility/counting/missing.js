// This is a demo task.

// Write a function:

// function solution(A);

// that, given an array A of N integers, returns the smallest positive integer (greater than 0) that does not occur in A.

// For example, given A = [1, 3, 6, 4, 1, 2], the function should return 5.

// Given A = [1, 2, 3], the function should return 4.

// Given A = [−1, −3], the function should return 1.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−1,000,000..1,000,000].

function solution(A) {
    // write your code in JavaScript (Node.js 14)
    const elements = new Set(A.filter(l => l > 0));
    const items = Array.from(elements);
    const expected = (items.length + 1) * (items.length + 2) / 2;
    const actual = items.reduce((p, c) => p + c, 0);

    return expected - actual;
}

// Note: Took me too long to abandon mathematical approach to solving problem. Instead should have opted for O(n) solution sooner

function solution(A) { // Credit: https://gist.github.com/adicuco/d89e429d0acd0633fcde80b82b6e3346
    const set = new Set(A);
    let missing = 1;
    
    while(set.has(missing)) {
        missing++;
    }
    
    return missing;
}

// Another way ... review and attempting again after long time without looking at above solutions
const countNumbers = A => {
    let max = -Infinity
    for( let i = 0; i < A.length; i++ ) {
        max = Math.max(A[i], max);
    }

    if (max <= 0) return [ 0, 0];

    let numbers = Array(max + 1).fill(0);

    for( let i = 0; i < A.length; i++ ) {
        numbers[A[i]]++;
    }

    return numbers;
}

const solution = A => {
    let numbers = countNumbers(A);

    for( let i = 1; i < numbers.length; i++ ) {
        if (numbers[i] == 0) return i;
    }

    return numbers.length;
}
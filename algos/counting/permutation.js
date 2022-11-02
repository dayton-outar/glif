// A non-empty array A consisting of N integers is given.

// A permutation is a sequence containing each element from 1 to N once, and only once.

// For example, array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
//     A[3] = 2
// is a permutation, but array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
// is not a permutation, because value 2 is missing.

// The goal is to check whether array A is a permutation.

// Write a function:

// function solution(A);

// that, given an array A, returns 1 if array A is a permutation and 0 if it is not.

// For example, given array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
//     A[3] = 2
// the function should return 1.

// Given array A such that:

//     A[0] = 4
//     A[1] = 1
//     A[2] = 3
// the function should return 0.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [1..1,000,000,000].

function solution(A) {
    // write your code in JavaScript (Node.js 14)
    const elements = new Set(A);
    const items = Array.from(elements);
    const requiredSum = ((1 + A.length) * A.length) / 2; // Sum of arithmetic progression
    const actualSum = items.reduce((p, c) => p + c, 0); // O(n)

    return requiredSum === actualSum ? 1 : 0;
}

function solution(A) { // Credit: https://gist.github.com/NeuTrix/ef1558493a6c2fdbc0ebb57c8a55be31
    let set = new Set(A);
    let max = Math.max(...A); // O(n)
  
    let m = set.size; // size of set
  
    return A.length === m && max === m ? 1 : 0;
}
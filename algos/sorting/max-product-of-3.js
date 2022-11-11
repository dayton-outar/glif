// MaxProductOfThree
// ---
// A non-empty array A consisting of N integers is given. The product of triplet (P, Q, R) equates to A[P] * A[Q] * A[R] (0 ≤ P < Q < R < N).

// For example, array A such that:

//   A[0] = -3
//   A[1] = 1
//   A[2] = 2
//   A[3] = -2
//   A[4] = 5
//   A[5] = 6
// contains the following example triplets:

// (0, 1, 2), product is −3 * 1 * 2 = −6
// (1, 2, 4), product is 1 * 2 * 5 = 10
// (2, 4, 5), product is 2 * 5 * 6 = 60
// Your goal is to find the maximal product of any triplet.

// Write a function:

// function solution(A);

// that, given a non-empty array A, returns the value of the maximal product of any triplet.

// For example, given array A such that:

//   A[0] = -3
//   A[1] = 1
//   A[2] = 2
//   A[3] = -2
//   A[4] = 5
//   A[5] = 6
// the function should return 60, as the product of triplet (2, 4, 5) is maximal.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [3..100,000];
// each element of array A is an integer within the range [−1,000..1,000].

function solution(A) { // My first solution ... Score: 44%
    // write your code in JavaScript (Node.js 14)
    // Sort in ascending order
    A.sort((a, b) => a - b);

    return A[A.length - 3] * A[A.length - 2] * A[A.length - 1];
}

function solution(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/MaxProductOfThree.md
    A.sort((a, b) => (a - b));

    return Math.max(A[A.length - 1] * A[A.length - 2] * A[A.length - 3], A[A.length - 1] * A[0] * A[1]) ; // Covers edge case like [-5, 4, 5, -5] ... where sorting gives [-5, -5, 4, 5] ... Answer is 125 and not -100
}
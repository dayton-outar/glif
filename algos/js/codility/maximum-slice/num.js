// A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The sum of a slice (P, Q) is the total of A[P] + A[P+1] + ... + A[Q].

// Write a function:

// class Solution { public int solution(int[] A); }

// that, given an array A consisting of N integers, returns the maximum sum of any slice of A.

// For example, given array A such that:

// A[0] = 3  A[1] = 2  A[2] = -6
// A[3] = 4  A[4] = 0
// the function should return 5 because:

// (3, 4) is a slice of A that has sum 4,
// (2, 2) is a slice of A that has sum −6,
// (0, 1) is a slice of A that has sum 5,
// no other slice of A has sum greater than (0, 1).
// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..1,000,000];
// each element of array A is an integer within the range [−1,000,000..1,000,000];
// the result will be an integer within the range [−2,147,483,648..2,147,483,647].

function solution(A) { // My first solution ... 10 minutes ... Score: 30%
    // write your code in JavaScript (Node.js 14)

    let sum = 0;
    let maxSum = 0;
    for( let i = 0; i < A.length; i++) {
        sum += A[i];

        if (maxSum < sum) {
            maxSum = sum;
        }
    }

    return maxSum;
}

function solution2(A) { // My second solution ... 2 minutes ... Score: 53%
    // write your code in JavaScript (Node.js 14)
    if (A.length == 0) return 0;

    let sum = A[0];
    let maxSum = A[0];
    for( let i = 1; i < A.length; i++) {
        sum += A[i];

        if (maxSum < sum) {
            maxSum = sum;
        }
    }

    return maxSum;
}

function solution3(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/MaxSliceSum.md
    var meh = -Infinity; // Max End Here
    var msf = -Infinity; // Max So Far
    for (var ind in A) {
    	var i = A[ind]
        meh = Math.max(i, meh + i);
        msf = Math.max(msf, meh);
    }

    return parseInt(msf, 10);
}

console.log( solution3( [3, 2, -6, 4, 0] ) );

console.log( solution3( [ 1, 2, -1, 2, 2, 3, -2, 1] ) );
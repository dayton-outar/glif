// A non-empty array A consisting of N integers is given.

// A triplet (X, Y, Z), such that 0 ≤ X < Y < Z < N, is called a double slice.

// The sum of double slice (X, Y, Z) is the total of A[X + 1] + A[X + 2] + ... + A[Y − 1] + A[Y + 1] + A[Y + 2] + ... + A[Z − 1].

// For example, array A such that:

//     A[0] = 3
//     A[1] = 2
//     A[2] = 6
//     A[3] = -1
//     A[4] = 4
//     A[5] = 5
//     A[6] = -1
//     A[7] = 2
// contains the following example double slices:

// double slice (0, 3, 6), sum is 2 + 6 + 4 + 5 = 17,
// double slice (0, 3, 7), sum is 2 + 6 + 4 + 5 − 1 = 16,
// double slice (3, 4, 5), sum is 0.
// The goal is to find the maximal sum of any double slice.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the maximal sum of any double slice.

// For example, given:

//     A[0] = 3
//     A[1] = 2
//     A[2] = 6
//     A[3] = -1
//     A[4] = 4
//     A[5] = 5
//     A[6] = -1
//     A[7] = 2
// the function should return 17, because no double slice of array A has a sum of greater than 17.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [3..100,000];
// each element of array A is an integer within the range [−10,000..10,000].

function solutionF(A) { // DNF
    // write your code in JavaScript (Node.js 14)
    if (A.length == 3) return 0;

    let start = 0;
    let end = A.length - 1;

    let lowest = A[start + 1];
    let firstLowest = start + 1;
    for (let i = 1; i < end; i++) {
        if (A[i] < lowest) {
            lowest = A[i];
            firstLowest = i;
        }
    }

    let sum = 0;
    for (let i = 1; i < end; i++) {

        sumLeft += A[start];

        console.log( sumLeft, sumRight );

        let sum = sumLeft + sumRight;
        if (sum > max) {
            max = sum
        }
    }

    return max;
}


function solution(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/MaxDoubleSliceSum.md
    let sumsL = A.map(i => 0);
    let sumsR = A.map(i => 0);

    for (let iL = 1, iR = A.length - 2; iR >= 2; iL++, iR--) {
        sumsL[iL] = Math.max(0, sumsL[iL - 1] + A[iL]);
        sumsR[iR] = Math.max(0, sumsR[iR + 1] + A[iR]);
    }

    let max = sumsL[0] + sumsR[2];

    for (let i = 2; i < A.length - 1; i++) {
        max = Math.max(max, sumsL[i - 1] + sumsR[i + 1]);
        console.log('i', i - 1, i + 1);
        console.log('sum = ', sumsL[i - 1], ' + ', sumsR[i + 1], ' = ', sumsL[i - 1] + sumsR[i + 1]);
    }

    return max;
}

console.log( solution( [3, 2, 6, -1, 4, 5, -1, 2] ) );
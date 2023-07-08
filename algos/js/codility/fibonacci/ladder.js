// You have to climb up a ladder. The ladder has exactly N rungs, numbered from 1 to N. With each step, you can ascend by one or two rungs. More precisely:

// with your first step you can stand on rung 1 or 2,
// if you are on rung K, you can move to rungs K + 1 or K + 2,
// finally you have to stand on rung N.
// Your task is to count the number of different ways of climbing to the top of the ladder.

// For example, given N = 4, you have five different ways of climbing, ascending by:

// 1, 1, 1 and 1 rung,
// 1, 1 and 2 rungs,
// 1, 2 and 1 rung,
// 2, 1 and 1 rungs, and
// 2 and 2 rungs.
// Given N = 5, you have eight different ways of climbing, ascending by:

// 1, 1, 1, 1 and 1 rung,
// 1, 1, 1 and 2 rungs,
// 1, 1, 2 and 1 rung,
// 1, 2, 1 and 1 rung,
// 1, 2 and 2 rungs,
// 2, 1, 1 and 1 rungs,
// 2, 1 and 2 rungs, and
// 2, 2 and 1 rung.
// The number of different ways can be very large, so it is sufficient to return the result modulo 2P, for a given integer P.

// Write a function:

// function solution(A, B);

// that, given two non-empty arrays A and B of L integers, returns an array consisting of L integers specifying the consecutive answers; position I should contain the number of different ways of climbing the ladder with A[I] rungs modulo 2B[I].

// For example, given L = 5 and:

//     A[0] = 4   B[0] = 3
//     A[1] = 4   B[1] = 2
//     A[2] = 5   B[2] = 4
//     A[3] = 5   B[3] = 3
//     A[4] = 1   B[4] = 1
// the function should return the sequence [5, 1, 8, 0, 1], as explained above.

// Write an efficient algorithm for the following assumptions:

// L is an integer within the range [1..50,000];
// each element of array A is an integer within the range [1..L];
// each element of array B is an integer within the range [1..30].

// Credit: https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23    
function solution(A, B) {
    let i = 0;
    let result = [];
    let max = 0;
    let steps = [];
    let maxB = 0;

    steps[0] = 1;
    steps[1] = 1;

    for (i = 0; i < A.length; i++) {
        max = Math.max(max, A[i]);
        maxB = Math.max(maxB, B[i]);
    }

    i = 1;
    while (i++ <= max) {
        steps[i] = (steps[i - 1] + steps[i - 2]) % Math.pow(2, maxB);
    }

    console.log('steps', steps);

    for (i = 0; i < A.length; i++) {        
        result.push( steps[A[i]] & (Math.pow(2, B[i]) - 1) );
    }

    return result;
}

console.log( solution( [4, 4, 5, 5, 1], [3, 2, 4, 3, 1] ) );

console.log( solution( [4, 4, 5, 5, 1, 6, 7, 10, 12], [3, 2, 4, 3, 1, 3, 2, 4, 3] ) );
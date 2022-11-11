// An array A consisting of N integers is given. The dominator of array A is the value that occurs in more than half of the elements of A.

// For example, consider array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// The dominator of A is 3 because it occurs in 5 out of 8 elements of A (namely in those with indices 0, 2, 4, 6 and 7) and 5 is more than a half of 8.

// Write a function

// function solution(A);

// that, given an array A consisting of N integers, returns index of any element of array A in which the dominator of A occurs. The function should return −1 if array A does not have a dominator.

// For example, given array A such that

//  A[0] = 3    A[1] = 4    A[2] =  3
//  A[3] = 2    A[4] = 3    A[5] = -1
//  A[6] = 3    A[7] = 3
// the function may return 0, 2, 4, 6 or 7, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647].

function solution(A) { // My first solution ... 34 mins. ... Score: 91%
    // write your code in JavaScript (Node.js 14)
    const half = Math.floor( A.length / 2 );

    let numbers = {};
    let dominator = {
        val: 0,
        total: 0,
        index: -1
    };

    for ( let i = 0; i < A.length; i++ ){
        if (numbers[A[i]]) {
            numbers[A[i]]++;

            if (numbers[A[i]] > half &&
                numbers[A[i]] > dominator.total) {
                dominator.val = A[i];
                dominator.total = numbers[A[i]];
                dominator.index = i;
            }

        } else {
            numbers[A[i]] = 1;
        }
    }

    return dominator.index;
}

console.log( solution2( [ 3, 4, 3, 2, 3, -1, 3, 3] ) );

function solution2(A) { // My second solution ... Score: 100%
    // write your code in JavaScript (Node.js 14)
    const half = Math.floor( A.length / 2 );

    let numbers = {};
    let dominator = {
        val: 0,
        total: 0,
        index: -1
    };

    for ( let i = 0; i < A.length; i++ ){
        if (numbers[A[i]]) {
            numbers[A[i]]++;
        } else {
            numbers[A[i]] = 1;
        }

        if (numbers[A[i]] > half &&
            numbers[A[i]] > dominator.total) {
            dominator.val = A[i];
            dominator.total = numbers[A[i]];
            dominator.index = i;
        }
    }

    return dominator.index;
}

function solution(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Dominator.md
    if (A.length == 0) {
        return -1;
    }

    var pos = 0;
    var count = 0;

    for (var i = 0; i < A.length; i++) {
        if (A[pos] == A[i]) {
            count++;
        } else {
            count--;
            if (count == 0) {
                pos = i;
                count++;
            }
        }
    }

    count = 0;
    var cand = A[pos];
    
    for (var i in A) {
        if (A[i] == cand) {
            count++;
        }
    }

    if (count <= A.length / 2) {
        return -1;
    }

    return pos;
}
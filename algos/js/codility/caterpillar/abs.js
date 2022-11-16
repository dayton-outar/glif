// A non-empty array A consisting of N numbers is given. The array is sorted in non-decreasing order. The absolute distinct count of this array is the number of distinct absolute values among the elements of the array.

// For example, consider array A such that:

//   A[0] = -5
//   A[1] = -3
//   A[2] = -1
//   A[3] =  0
//   A[4] =  3
//   A[5] =  6
// The absolute distinct count of this array is 5, because there are 5 distinct absolute values among the elements of this array, namely 0, 1, 3, 5 and 6.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N numbers, returns absolute distinct count of array A.

// For example, given array A such that:

//   A[0] = -5
//   A[1] = -3
//   A[2] = -1
//   A[3] =  0
//   A[4] =  3
//   A[5] =  6
// the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−2,147,483,648..2,147,483,647];
// array A is sorted in non-decreasing order.

function solution(A) { // My first solution ... O(N) or O(N*log(N)) ... Score: 100%
    // write your code in JavaScript (Node.js 14)
    let set = new Set;

    for(let i = 0; i < A.length; i++) {
        if (!set.has(Math.abs(A[i]))) {
            set.add(Math.abs(A[i]));
        }
    }

    return set.size;
}

function solution2(A) { // Second solution ... O(N) or O(N*log(N)) ... Score: 
    let map = {};

    for(let i = 0; i < A.length; i++) {
        if (!map[Math.abs(A[i])]) {
            map[Math.abs(A[i])] = true;
        }
    }

    return Object.keys(map).length;
}
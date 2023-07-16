// Let A be a non-empty array consisting of N integers.

// The abs sum of two for a pair of indices (P, Q) is the absolute value |A[P] + A[Q]|, for 0 ≤ P ≤ Q < N.

// For example, the following array A:

//   A[0] =  1
//   A[1] =  4
//   A[2] = -3
// has pairs of indices (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2).
// The abs sum of two for the pair (0, 0) is A[0] + A[0] = |1 + 1| = 2.
// The abs sum of two for the pair (0, 1) is A[0] + A[1] = |1 + 4| = 5.
// The abs sum of two for the pair (0, 2) is A[0] + A[2] = |1 + (−3)| = 2.
// The abs sum of two for the pair (1, 1) is A[1] + A[1] = |4 + 4| = 8.
// The abs sum of two for the pair (1, 2) is A[1] + A[2] = |4 + (−3)| = 1.
// The abs sum of two for the pair (2, 2) is A[2] + A[2] = |(−3) + (−3)| = 6.
// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the minimal abs sum of two for any pair of indices in this array.

// For example, given the following array A:

//   A[0] =  1
//   A[1] =  4
//   A[2] = -3
// the function should return 1, as explained above.

// Given array A:

//   A[0] = -8
//   A[1] =  4
//   A[2] =  5
//   A[3] =-10
//   A[4] =  3
// the function should return |(−8) + 5| = 3.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer within the range [−1,000,000,000..1,000,000,000].

function solution1(A) { // My first solution ... 13 minutes ... Score: 36% ... O(n^2)
    // write your code in JavaScript (Node.js 14)
    const n = A.length - 1;
    let minimum = 0;

    for( let i = 0; i <= n; i++ ) {
        j = i;
        while(j <= n) {
            let sum = Math.abs(A[i] + A[j]);

            if (i == 0 && j == 0) {
                minimum = sum
            } else if (sum < minimum) {
                minimum = sum;
            }
            j++;
        }
    }

    return minimum;
}

function solution(A) {    
    let positives = [];
    let negatives = [];
    let i = 0;
    let min = 0;
    
    let start = 0;
    let end = 0;
    
    if ( A.length === 1 ) {
        return Math.abs(A[0] + A[0]);
    }
    
    A.sort(function(a, b) {
        return a - b;
    });

    console.log( A );
    
    for (i = 0; i < A.length; i++) {
        if(A[i] < 0) {
            negatives.push(A[i]);
        } else {
            positives.push(A[i]);
        }
    }
    
    negatives.sort(function(a, b) {
        return b - a;
    });
    
    if ( positives.length === 0 ) {
        return Math.abs(2 * negatives[0]);
    }
    
    if ( negatives.length === 0 ) {
        return 2 * positives[0];
    }
    
    if ( positives[0] === 0 ) {
        return 0;
    }
    
    min = positives[0] * 2;
    
    for( i = 0; i < negatives.length; i++ ) {
        start = 0;
        end = positives.length - 1;
        let neg = A[i];
        
        while ( start <= end ) {
            let mid = parseInt((start + end) / 2);
            let pos = positives[mid];
            let sum = Math.abs(neg + pos);
            
            min = Math.min(sum, min);

            if ( pos > Math.abs(neg) ) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        }
    }
    
    return min;
}

console.log( solution( [-8, 4, 5, -10, 3] ) );

console.log( solution( [1, 4, -3] ) );
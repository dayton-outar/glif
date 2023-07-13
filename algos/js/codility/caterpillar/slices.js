// An integer M and a non-empty array A consisting of N non-negative integers are given. All integers in array A are less than or equal to M.

// A pair of integers (P, Q), such that 0 ≤ P ≤ Q < N, is called a slice of array A. The slice consists of the elements A[P], A[P + 1], ..., A[Q]. A distinct slice is a slice consisting of only unique numbers. That is, no individual number occurs more than once in the slice.

// For example, consider integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// There are exactly nine distinct slices: (0, 0), (0, 1), (0, 2), (1, 1), (1, 2), (2, 2), (3, 3), (3, 4) and (4, 4).

// The goal is to calculate the number of distinct slices.

// Write a function:

// function solution(M, A);

// that, given an integer M and a non-empty array A consisting of N integers, returns the number of distinct slices.

// If the number of distinct slices is greater than 1,000,000,000, the function should return 1,000,000,000.

// For example, given integer M = 6 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 5
//     A[3] = 5
//     A[4] = 2
// the function should return 9, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// M is an integer within the range [0..100,000];
// each element of array A is an integer within the range [0..M].

function solution(M, A) { // Credit: https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23 ... O(N) ... Score: 100%
    // write your code in JavaScript (Node.js 4.0.0)
    
    const LIMIT = 1000000000;    
    
    if(A.length === 1) {
        return 1;
    }
    
    let lastPos = Array((M + 1)).fill(-1);

    console.log( lastPos );

    let count = 0;
    let start = 0;
    for(let i = 0; i < A.length; i++ ) {
        let item = A[i];
        
        // -- Important core logic
        if(lastPos[item] + 1 > start) {
            console.log('---%');
            start = lastPos[item] + 1;
        }

        lastPos[item] = i;
        // Count possible combination of slices
        count += i - start + 1;

        console.log(start, i, count);
        console.log( lastPos );
        
        if(count > LIMIT) break;
    }
    
    return count > LIMIT ? LIMIT : count;
}

console.log( solution( 6, [3, 4, 5, 5, 2] ) );
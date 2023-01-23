// // MinAbsSum
// For a given array A of N integers and a sequence S of N integers from the set {−1, 1}, we define val(A, S) as follows:

// val(A, S) = |sum{ A[i]*S[i] for i = 0..N−1 }|

// (Assume that the sum of zero elements equals zero.)

// For a given array A, we are looking for such a sequence S that minimizes val(A,S).

// Write a function:

// function solution(A);

// that, given an array A of N integers, computes the minimum value of val(A,S) from all possible values of val(A,S) for all possible sequences S of N integers from the set {−1, 1}.

// For example, given array:

//   A[0] =  1
//   A[1] =  5
//   A[2] =  2
//   A[3] = -2
// your function should return 0, since for S = [−1, 1, −1, 1], val(A, S) = 0, which is the minimum possible value.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..20,000];
// each element of array A is an integer within the range [−100..100].

// Credit: https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23
// Credit: https://codility.com/demo/results/trainingQ7CF2B-9XJ/
function solution(A) { // Score: 100% ... Time Complexity: O(N * max(abs(A))**2)
    
    let max = 0;
    let total = 0;
    let target = 0;
    let dp = [];
    let count = [];
    let minDiff = Infinity;
    
    if(A.length === 0) {
        return 0;
    }
    
    A.sort(function(a, b) {
        return Math.abs(a) - Math.abs(b);
    });
    
    max = Math.abs(A[A.length - 1]);
    
    for(let i = 0; i <= max; i++) {
        count[i] = 0;
    }
    
    for(let i = 0; i < A.length; i++) {
        A[i] = Math.abs(A[i]);
        count[A[i]]++;
        total += A[i];
    }
    
    dp[0] = 0;
    for(let i = 1; i <= total; i++) {
        dp[i] = -1;
    }

    target = total / 2; // We want to choose some of the numbers (absolute values) to make their sum as large as possible without exceeding this target value

    console.log( count );
    console.log( '----' );
    
    for(let i = 0; i < count.length; i++) {
        if(count[i] > 0) {
            let step = i;
            for(let j = 0; j < dp.length; j++) {
                console.log( 'j = ', j, 'i = ', i );
                if(dp[j] >= 0) {
                    console.log('>=');
                    dp[j] = count[i];
                } else if(j >= step && dp[j - step] > 0) {
                    console.log('step');
                    dp[j] = dp[j - step] - 1;
                }
                
                console.log( dp );             
                
                if(dp[j] >= 0) {
                    if(j === target) {
                        console.log('j = target -->', j, target);
                        return 0;
                    } else {
                        minDiff = Math.min(minDiff, Math.abs( total - 2 * j ));
                    }
                }

                console.log('min diff:', minDiff);
            }
        }
    }
    
    return minDiff;
}

// console.log( solution([ 1, 5, 2, -2 ]) );

console.log( solution([1, 3, 3]) );

const slowSolution = (A) => {
    const N = A.length;
    let M = 0;

    for(let i = 0; i < A.length; i++) {
        A[i] = Math.abs(A[i]);
        M = Math.max(A[i], M);
    }

    S = A.reduce( (p, c) => p + c );
    let dp = Array( S + 1).fill(0);
    dp[0] = 1;

    for(let j = 0; j < N; j++ ) {
        for(let i = S; i > -1; i-- ) {
            console.log(i, A[j]);
            if (dp[i] == 1 && (i + A[j] <= S) ) { // Why?
                dp[i + A[j]] = 1;
                console.log( dp );
            }
        }
    }

    result = S;

    for(let i = 0; i < Math.floor( S / 2 ) + 1 ; i++) {
        if (dp[i] == 1) {
            result = Math.min(result, S - 2 * i);
            console.log(i, 'result', result);
        }
    }

    return result;
}

// console.log( 'result', solution( [1, 5, 2, -2] ) );
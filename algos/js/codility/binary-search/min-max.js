// You are given integers K, M and a non-empty array A consisting of N integers. Every element of the array is not greater than M.

// You should divide this array into K blocks of consecutive elements. The size of the block is any integer between 0 and N. Every element of the array should belong to some block.

// The sum of the block from X to Y equals A[X] + A[X + 1] + ... + A[Y]. The sum of empty block equals 0.

// The large sum is the maximal sum of any block.

// For example, you are given integers K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// The array can be divided, for example, into the following blocks:

// [2, 1, 5, 1, 2, 2, 2], [], [] with a large sum of 15;
// [2], [1, 5, 1, 2], [2, 2] with a large sum of 9;
// [2, 1, 5], [], [1, 2, 2, 2] with a large sum of 8;
// [2, 1], [5, 1], [2, 2, 2] with a large sum of 6.
// The goal is to minimize the large sum. In the above example, 6 is the minimal large sum.

// Write a function:

// function solution(K, M, A);

// that, given integers K, M and a non-empty array A consisting of N integers, returns the minimal large sum.

// For example, given K = 3, M = 5 and array A such that:

//   A[0] = 2
//   A[1] = 1
//   A[2] = 5
//   A[3] = 1
//   A[4] = 2
//   A[5] = 2
//   A[6] = 2
// the function should return 6, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and K are integers within the range [1..100,000];
// M is an integer within the range [0..10,000];
// each element of array A is an integer within the range [0..M].

// Credit: https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23
// https://app.codility.com/demo/results/trainingHA5ZGD-H6G/ Time Complexity: O(N*log(N+M))
function solution(K, M, A) {
    let min = 0;
    let max = 0;
    let mid = 0;
    
    for (let i = 0; i < A.length; i++) {
        max += A[i];
        min = Math.max(min, A[i]);
    }
    
    if (K === 1) {
        return max;
    } else if (K >= A.length) {
        return min;
    }

    // console.log( min, max );
    
    while(min <= max) {
        let temp = mid;
        mid = parseInt((max + min) / 2);
        
        if(mid === temp) {
            break;
        }
        
        let blocks = neededBlocks(A, mid);
        
        console.log(`min: ${min}, max: ${max}, mid: ${mid}, blocks: ${blocks} < K: ${K}`);
        
        if(blocks > K) {
            min = mid + 1;
        } else {
            max = mid;
        }
    }
    
    return max;
}

function neededBlocks(arr, maxValue) {
    var countBlocks = 1;
    var sum = arr[0];
    
    for(var j = 1; j < arr.length; j++) {
        if(sum + arr[j] > maxValue) {
            sum = arr[j];
            countBlocks++;
        } else {
            sum += arr[j];
        }
    }
    
    return countBlocks;
}

console.log( solution(3, 5, [2, 1, 5, 1, 2, 2, 2]) );
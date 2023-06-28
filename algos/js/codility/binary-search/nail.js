// You are given two non-empty arrays A and B consisting of N integers. These arrays represent N planks. More precisely, A[K] is the start and B[K] the end of the K−th plank.

// Next, you are given a non-empty array C consisting of M integers. This array represents M nails. More precisely, C[I] is the position where you can hammer in the I−th nail.

// We say that a plank (A[K], B[K]) is nailed if there exists a nail C[I] such that A[K] ≤ C[I] ≤ B[K].

// The goal is to find the minimum number of nails that must be used until all the planks are nailed. In other words, you should find a value J such that all planks will be nailed after using only the first J nails. More precisely, for every plank (A[K], B[K]) such that 0 ≤ K < N, there should exist a nail C[I] such that I < J and A[K] ≤ C[I] ≤ B[K].

// For example, given arrays A, B such that:

//     A[0] = 1    B[0] = 4
//     A[1] = 4    B[1] = 5
//     A[2] = 5    B[2] = 9
//     A[3] = 8    B[3] = 10
// four planks are represented: [1, 4], [4, 5], [5, 9] and [8, 10].

// Given array C such that:

//     C[0] = 4
//     C[1] = 6
//     C[2] = 7
//     C[3] = 10
//     C[4] = 2
// if we use the following nails:

// 0, then planks [1, 4] and [4, 5] will both be nailed.
// 0, 1, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
// 0, 1, 2, then planks [1, 4], [4, 5] and [5, 9] will be nailed.
// 0, 1, 2, 3, then all the planks will be nailed.
// Thus, four is the minimum number of nails that, used sequentially, allow all the planks to be nailed.

// Write a function:

// function solution(A, B, C);

// that, given two non-empty arrays A and B consisting of N integers and a non-empty array C consisting of M integers, returns the minimum number of nails that, used sequentially, allow all the planks to be nailed.

// If it is not possible to nail all the planks, the function should return −1.

// For example, given arrays A, B, C such that:

//     A[0] = 1    B[0] = 4
//     A[1] = 4    B[1] = 5
//     A[2] = 5    B[2] = 9
//     A[3] = 8    B[3] = 10

//     C[0] = 4
//     C[1] = 6
//     C[2] = 7
//     C[3] = 10
//     C[4] = 2
// the function should return 4, as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..30,000];
// each element of arrays A, B and C is an integer within the range [1..2*M];
// A[K] ≤ B[K].

function brute(A, B, C) {
    const numberOfNails = C.length;
    let nailedPlanks = Array(A.length).fill(false);
    let count = 0;

    //for ( let i = 0; i < numberOfNails; i++ ) {
        let i = 3;
        for (let j = 0; j < A.length; j++ ) {
            if ( (A[j] <= C[i]) && (C[i] <= B[j]) ) {
                if (!nailedPlanks[j]) {
                    nailedPlanks[j] = true;
                    count++;
                }
            }
        }
    //}

    return count;
}

// Credit: https://gist.github.com/jonataswalker/08187f5457fac4af1e86cf8c86647e23
// https://app.codility.com/demo/results/trainingEW83KS-F3M/
function solution(A, B, C) {    
    let maxB = 0;
    let min = 0;
    let max = C.length;
    let atLeastOne = false;
    let i = 0;
    let totalNails = [];
    
    if(C.length === 1) {
        if(A[0] <= C[0] && C[0] <= B[0]) {
            return 1;
        } else {
            return -1;
        }
    }
    
    for(i = 0; i < A.length; i++) {
        maxB = Math.max(maxB, B[i]);
    }
    
    for(i = 0; i <= maxB; i++) {
        totalNails[i] = 0;
    }
    
    while(min <= max) {
        console.log(`min: ${min} .... max: ${max}`);
        let mid = parseInt((min + max) / 2);
        
        // Resetting array filling all positions with 0
        for(i = 0; i < totalNails.length; i++) {
            totalNails[i] = 0;
        }

        // Set the index in the array to 1 for nail position. If nail is 4, index 4 is set to 1
        // There exists a nail in the set between 0 and mid that can nail plan at x position
        for(i = 0; i < mid; i++) {
            totalNails[C[i]] = 1;
        }
        console.log(`------: ${mid}`);
        console.log(totalNails);
        // Increment value of current index based on number in previous index. Why?
        // This approach is almost like something borrowed from dynamic programming
        // Notice no comparison between the nails and planks were done like (A[i] <= C[j]) && (C[j] <= B[i])
        for(i = 1; i < totalNails.length; i++) {
            totalNails[i] += totalNails[i - 1];
        }
        console.log( totalNails );
        let result = allNailed(A, B, totalNails);
        
        if(result) {
            console.log( 'all' );
            atLeastOne = true;
            if(max === mid) {
                break;
            }
            
            max = mid;
        } else {
            min = mid + 1;
        }
    }
    
    if(!atLeastOne) {
        return -1;
    } else {    
        return min;
    }
}

function allNailed(arrA, arrB, totalNails) {
    console.log( '------' );
    for(let i = 0; i < arrA.length; i++ ) {

        // So, after passing in the array of totalNails, 
        // which is basically a rolling/running total in each increasing element.
        // ...
        // arrA is the lower bound of the planks as stated by the problem.
        // Since the array totalNails has all positions that nails can occupy over the planks (including 0),
        // if a nail or more than one nails can occupy between position A and B, the running total should
        // increase if nails are put anywhere between A and B.
        // If we compare the running total from A and B, they would be the same if only one nail was placed at A
        // between A and B. This would mean the plank is nailed down.
        // If just outside the range of A and B, like A - 1, no nail was added between A - 1 and B, it means that
        // no nail fills the positions between A and B.
        // Hope this is clear.
        // Again. This is a very crafty solution.
        if(totalNails[arrA[i] - 1] === totalNails[arrB[i]]) {
            console.log(`----> ${arrA[i] - 1} ... ${[arrB[i]]}`)
            return false;
        }

    }
    
    return true;
}

console.log( solution([1, 4, 5, 8], [4, 5, 9, 10], [4, 6, 7, 10, 2]) );
// A non-empty array A consisting of N integers is given.

// A peak is an array element which is larger than its neighbours. More precisely, it is an index P such that 0 < P < N − 1 and A[P − 1] < A[P] > A[P + 1].

// For example, the following array A:

//     A[0] = 1
//     A[1] = 5
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// has exactly four peaks: elements 1, 3, 5 and 10.

// You are going on a trip to a range of mountains whose relative heights are represented by array A, as shown in a figure below. You have to choose how many flags you should take with you. The goal is to set the maximum number of flags on the peaks, according to certain rules.



// Flags can only be set on peaks. What's more, if you take K flags, then the distance between any two flags should be greater than or equal to K. The distance between indices P and Q is the absolute value |P − Q|.

// For example, given the mountain range represented by array A, above, with N = 12, if you take:

// two flags, you can set them on peaks 1 and 5;
// three flags, you can set them on peaks 1, 5 and 10;
// four flags, you can set only three flags, on peaks 1, 5 and 10.
// You can therefore set a maximum of three flags in this case.

// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the maximum number of flags that can be set on the peaks of the array.

// For example, the following array A:

//     A[0] = 1
//     A[1] = 5
//     A[2] = 3
//     A[3] = 4
//     A[4] = 3
//     A[5] = 4
//     A[6] = 1
//     A[7] = 2
//     A[8] = 3
//     A[9] = 4
//     A[10] = 6
//     A[11] = 2
// the function should return 3, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..400,000];
// each element of array A is an integer within the range [0..1,000,000,000].

function solution(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Flags.md
    if (A.length <= 2) return 0;

    let peaks = [];
    for (let i = 1; i < A.length-1; ++i) {
        if (A[i] > A[i-1] && A[i] > A[i+1]) {
            peaks.push(i);
        }
    }
    
    let size = peaks.length;
    if (size <= 2) return size;
    
    const maxFlag = parseInt( Math.sqrt(peaks[size - 1] - peaks[0]) + 1);

    console.log( peaks[size - 1], peaks[0], maxFlag );

    for (let i = maxFlag; i >= 2; --i) {
        let count = 1;
        let curPos = peaks[0];
        for (let j = 1; j < size; ++j) {
            if (curPos + i <= peaks[j]) {
                curPos = peaks[j];
                ++count;
            }
        }
        if (count >= i) return i;
    }
    
    return 2;
}

console.log( solution( [1, 5, 3, 4, 3, 4, 1, 2, 3, 4, 6, 2] ) );
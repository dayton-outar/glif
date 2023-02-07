// A non-empty array A consisting of N integers is given. A pair of integers (P, Q), such that 0 ≤ P < Q < N, is called a slice of array A (notice that the slice contains at least two elements). The average of a slice (P, Q) is the sum of A[P] + A[P + 1] + ... + A[Q] divided by the length of the slice. To be precise, the average equals (A[P] + A[P + 1] + ... + A[Q]) / (Q − P + 1).

// For example, array A such that:

//     A[0] = 4
//     A[1] = 2
//     A[2] = 2
//     A[3] = 5
//     A[4] = 1
//     A[5] = 5
//     A[6] = 8
// contains the following example slices:

// slice (1, 2), whose average is (2 + 2) / 2 = 2;
// slice (3, 4), whose average is (5 + 1) / 2 = 3;
// slice (1, 4), whose average is (2 + 2 + 5 + 1) / 4 = 2.5.
// The goal is to find the starting position of a slice whose average is minimal.

// Write a function:

// function solution(A);

// that, given a non-empty array A consisting of N integers, returns the starting position of the slice with the minimal average. If there is more than one slice with a minimal average, you should return the smallest starting position of such a slice.

// For example, given array A such that:

//     A[0] = 4
//     A[1] = 2
//     A[2] = 2
//     A[3] = 5
//     A[4] = 1
//     A[5] = 5
//     A[6] = 8
// the function should return 1, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [2..100,000];
// each element of array A is an integer within the range [−10,000..10,000].

function solution(A) { // My first solution ... Score: 20%
    let slices = [];

    let i = 0;
    let j = 1;
    let maxI = A.length - 1;
    while(i < maxI) {
        slices.push([i, j]);

        if (j < maxI) {
            j++;
        } else {
            i++;
            j = i + 1;            
        }
    }

    let avgs = [];
    for(let x = 0; x < slices.length; x++) {
        let average = ( A[slices[x][0]] + A[slices[x][1]] ) / ( ( slices[x][1] - slices[x][0] ) + 1 );
        avgs.push({
            start: slices[x][0],
            end: slices[x][1],
            avg: average
        });
    }

    const jAvgs = avgs.map(l => l.avg);
    const minAvg = Math.min(...jAvgs);

    const minAvgs = avgs.filter(l => l.avg == minAvg);

    let ixMinAvg = 0;
    if (minAvgs.length > 1) {
        const jIx = minAvgs.map(l => l.start);
        const ixMin = Math.min(...jIx);
        ixMinAvg = minAvgs.filter(l => l.start == ixMin)[0].start;
    } else {
        ixMinAvg = minAvgs[0].start;
    }

    return ixMinAvg;
}

function solution(A) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/MinAvgTwoSlice.md // Score: 100%
    var start = 0;
 
    var currentSum = A[0] + A[1];
    var minAvgSlice = currentSum / 2;

    for (var i = 2; i < A.length; i++) {
       currentSum += A[i];
       var newAvg = currentSum / 3;

       if (newAvg < minAvgSlice) {
          minAvgSlice = newAvg;
          start = i - 2;
       }
 
       currentSum -= A[i-2];
       newAvg = currentSum / 2;

       if (newAvg < minAvgSlice) {
          minAvgSlice = newAvg;
          start = i - 1;
       }
    }
 
    return start;
 }


// Credit: https://danwritescode.com/min-average-slice-codility-100-correct-javascript-solution/
// The Min Average Slice problem gives more of a mathematical challenge than a coding one.
// The trick here is to figure out that you only need to find the minimum average of slices which are 2 or 3 in length. 
// That is because a slice of 4 or larger is basically a sum of slices with the length of 2 or 3 . A composed slice will never have an average sum lower than its components.
// Thus the solution is an efficient algorithm with O(N) complexity as shown below (solution in Javascript):

function solution(A) {
    // write your code in JavaScript (Node.js 8.9.4)
    let B = []
    let C = []
    let min = 10000
    let result = 0;
    for (let i = 0; i < A.length-1; i++){
        B[i] = (A[i]+A[i+1])/2
        if ((B[i]) < min){
            min = B[i]
            result = i
        }
    }

    let  = 0
    for (let i = 0; i < A.length-2; i++){
        C[i] = (A[i]+A[i+1]+A[i+2])/3
        if ((C[i]) < min){
            min = C[i]
            result = i
        }
    }


    return(result)
    
}

// Interesting discussions here: https://stackoverflow.com/questions/21635397/min-average-two-slice-codility

// Me: I just can't grasp the intuition of using 2 or 3 as denominators to slide along 2 or 3 throughout the array

// Great mathematical proof can be found here: https://math.stackexchange.com/questions/2682379/will-the-length-of-a-minimum-average-slice-of-a-numeric-array-ever-be-greater-th
// Approach based on the following statement,
// An average can't be lower than the lowest of any of its entries, so at least one of the two two-slice averages must be equal to or less than the four-slice average.
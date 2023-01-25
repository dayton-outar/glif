// A non-empty array A consisting of N integers is given. Array A represents numbers on a tape.

// Any integer P, such that 0 < P < N, splits this tape into two non-empty parts: A[0], A[1], ..., A[P − 1] and A[P], A[P + 1], ..., A[N − 1].

// The difference between the two parts is the value of: |(A[0] + A[1] + ... + A[P − 1]) − (A[P] + A[P + 1] + ... + A[N − 1])|

// In other words, it is the absolute difference between the sum of the first part and the sum of the second part.

// For example, consider array A such that:

//   A[0] = 3
//   A[1] = 1
//   A[2] = 2
//   A[3] = 4
//   A[4] = 3
// We can split this tape in four places:

// P = 1, difference = |3 − 10| = 7
// P = 2, difference = |4 − 9| = 5
// P = 3, difference = |6 − 7| = 1
// P = 4, difference = |10 − 3| = 7
// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the minimal difference that can be achieved.

// For example, given:

//   A[0] = 3
//   A[1] = 1
//   A[2] = 2
//   A[3] = 4
//   A[4] = 3
// the function should return 1, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [2..100,000];
// each element of array A is an integer within the range [−1,000..1,000].

function solution(A) { // Double with 2 elements failed ... Corrected loop limit: A.length to (A.length - 1) ... Got 100% once that change was made
    // write your code in JavaScript (Node.js 14)
    let sumRight = A.reduce((p, c) => p + c, 0);

    let sumLeft = 0;
    let difference = 0;
    for (let i = 0; i < (A.length - 1); i++) {
        sumLeft += A[i];
        sumRight -= A[i];
        const dif = Math.abs(sumLeft - sumRight);
        if (i === 0) {
            difference = dif;
        } else {
            if (dif < difference) {
                difference = dif;
            }
        }
    }

    return difference;
}

// Credit: https://gist.github.com/jeanlescure/797eef515cfa4a05830b
function solution2(A) {
    let sumRight = A.reduce((pv, cv, idx) => (idx > 0) ? (pv + cv) : (0), 0); // Ignoring the first index
    let sumLeft = 0;
    var substractions = [];
    let maxI = A.length - 1;
    
    for(var i = 0; i < maxI; i += 1){
        sumLeft += A[i];
        substractions.push(Math.abs(sumLeft - sumRight));
        if (i + 1 <= maxI) sumRight -= A[i + 1];
    }
    
    // console.log( substractions );

    return substractions.reduce((pv, cv, idx) => (idx > 0) ? ((pv < cv)? pv : cv) : (cv), 0);
}

console.log( solution2( [3, 1, 2, 4, 3] ) );
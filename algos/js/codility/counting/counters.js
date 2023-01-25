// You are given N counters, initially set to 0, and you have two possible operations on them:

// increase(X) − counter X is increased by 1,
// max counter − all counters are set to the maximum value of any counter.
// A non-empty array A of M integers is given. This array represents consecutive operations:

// if A[K] = X, such that 1 ≤ X ≤ N, then operation K is increase(X),
// if A[K] = N + 1 then operation K is max counter.
// For example, given integer N = 5 and array A such that:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 4
//     A[3] = 6
//     A[4] = 1
//     A[5] = 4
//     A[6] = 4
// the values of the counters after each consecutive operation will be:

//     (0, 0, 1, 0, 0)
//     (0, 0, 1, 1, 0)
//     (0, 0, 1, 2, 0)
//     (2, 2, 2, 2, 2)
//     (3, 2, 2, 2, 2)
//     (3, 2, 2, 3, 2)
//     (3, 2, 2, 4, 2)
// The goal is to calculate the value of every counter after all operations.

// Write a function:

// function solution(N, A);

// that, given an integer N and a non-empty array A consisting of M integers, returns a sequence of integers representing the values of the counters.

// Result array should be returned as an array of integers.

// For example, given:

//     A[0] = 3
//     A[1] = 4
//     A[2] = 4
//     A[3] = 6
//     A[4] = 1
//     A[5] = 4
//     A[6] = 4
// the function should return [3, 2, 2, 4, 2], as explained above.

// Write an efficient algorithm for the following assumptions:

// N and M are integers within the range [1..100,000];
// each element of array A is an integer within the range [1..N + 1].

function solution(N, A) {
    // write your code in JavaScript (Node.js 14)
    let counters = Array(N).fill(0);

    let max = 0;
    for(let i = 0; i < A.length; i++) {
        if (A[i] >= 1 && A[i] <= N) {
            counters[(A[i] - 1)] += 1;
            if (counters[(A[i] - 1)] > max) {
                max++;
            }
        } else if (A[i] == N + 1) {
            counters.fill(max); // Causes O(n^2)
        }
    }

    return counters;
}

function solution2(N, A) { // Credit: https://gist.github.com/jeanlescure/98542e1b40339445acc1
    // write your code in JavaScript (Node.js 14)
    let counters = Array(N).fill(0);

    let max = 0;
    let lastMax = 0;
    for(let i = 0; i < A.length; i++) {
        if (A[i] >= 1 && A[i] <= N) {
            if (lastMax > counters[(A[i] - 1)]) {
                counters[(A[i] - 1)] = lastMax;
            }
            counters[(A[i] - 1)]++;
            if (counters[(A[i] - 1)] > max) {
                max++;
            }
        } else if (A[i] == N + 1) {
            lastMax = max;
        }
    }

    for(j = 0; j < N; j++){ // j < N. Go through all the counters and update all below max to max
        if (counters[j] < lastMax) counters[j] = lastMax;
    }


    return counters;
}

// I did it again without looking back at solutions
const solution3 = (N, A) => {
    let counters = Array(N).fill(0);
    let maxCounter = 0;
    let lastMax = 0;

    for( let i = 0; i < A.length; i++ ) {
        if (A[i] >= 1 && A[i] <= N) {
            counters[A[i] - 1] = Math.max(counters[A[i] - 1], lastMax);
            counters[A[i] - 1]++;
            maxCounter = Math.max(maxCounter, counters[A[i] - 1]);
        }

        if (A[i] > N) {
            lastMax = maxCounter;
        }

    }

    for( let i = 0; i < counters.length; i++ ) {
        counters[i] = Math.max(counters[i], lastMax);
    }

    return counters;
}

console.log( solution( 5, [3, 4, 4, 6, 1, 4, 4] ) );
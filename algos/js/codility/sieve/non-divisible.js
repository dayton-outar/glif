// You are given an array A consisting of N integers.

// For each number A[i] such that 0 ≤ i < N, we want to count the number of elements of the array that are not the divisors of A[i]. We say that these elements are non-divisors.

// For example, consider integer N = 5 and array A such that:

//     A[0] = 3
//     A[1] = 1
//     A[2] = 2
//     A[3] = 3
//     A[4] = 6
// For the following elements:

// A[0] = 3, the non-divisors are: 2, 6,
// A[1] = 1, the non-divisors are: 3, 2, 3, 6,
// A[2] = 2, the non-divisors are: 3, 3, 6,
// A[3] = 3, the non-divisors are: 2, 6,
// A[4] = 6, there aren't any non-divisors.
// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns a sequence of integers representing the amount of non-divisors.

// Result array should be returned as an array of integers.

// For example, given:

//     A[0] = 3
//     A[1] = 1
//     A[2] = 2
//     A[3] = 3
//     A[4] = 6
// the function should return [2, 4, 3, 2, 0], as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..50,000];
// each element of array A is an integer within the range [1..2 * N].

function solution1(A) { // My first solution ... O(N^2)) ... 12 mins. ... Score: 66%
    // write your code in JavaScript (Node.js 14)
    let sequence = [];

    for (let i = 0; i < A.length; i++) {
        let count = 0;
        for (let j = 0; j < A.length; j++) {
            if (i != j) {
                count += ( (A[i] % A[j]) > 0 ) ? 1 : 0;
            }
        }
        sequence.push(count);
    }

    return sequence;
}

// Credit: https://app.codility.com/demo/results/trainingDWZVT3-E7U/
function solution2(A) { // O(N * log N) ... Score: 
    const lenOfA = A.length;
    const counters = Array(lenOfA * 2 + 1).fill(0);
    
    for(let j = 0; j < lenOfA; j++) counters[A[j]]++;

    return A.map(number=> {
        let nonDivisor = lenOfA;
        for(let i = 1; i * i <= number; i++) {
            if(number % i !== 0) continue;
            nonDivisor -= counters[i];
            if(i * i !== number) nonDivisor -= counters[ number / i];
        }
        return nonDivisor;
    })
}

function solution(A) { 
    const lenOfA = A.length;
    const max = Math.max(...A);
    const counters = Array(max + 1).fill(0);
    
    for(let j = 0; j < (max - 1); j++) counters[A[j]]++;

    return A.map(number => {
        let nonDivisor = lenOfA;
        for(let i = 1; i * i <= number; i++) {
            if(number % i !== 0) continue;
            nonDivisor -= counters[i];
            if(i * i !== number) nonDivisor -= counters[number / i];
        }
        return nonDivisor;
    })
}

console.log( solution( [3, 1, 2, 3, 12] ) );
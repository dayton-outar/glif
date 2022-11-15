// A positive integer D is a factor of a positive integer N if there exists an integer M such that N = D * M.

// For example, 6 is a factor of 24, because M = 4 satisfies the above condition (24 = 6 * 4).

// Write a function:

// function solution(N);

// that, given a positive integer N, returns the number of its factors.

// For example, given N = 24, the function should return 8, because 24 has 8 factors, namely 1, 2, 3, 4, 6, 8, 12, 24. There are no other factors of 24.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..2,147,483,647].

function solution1(N) { // My first solution ... Score: 57%
    let factors = 2; // Every number can be divided by 1 and itself;

    for( let i = 2; i < N; i++) {
        factors += ((N % i) === 0) ? 1 : 0;
    }

    return factors;
}

function solution(N) { // Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/CountFactors.md
    let i = 1;
    let factors = 0;

    for(; (i * i) < N; i++) {
        factors += ((N % i) === 0) ? 2 : 0;
    }

    factors += ((i * i) == N) ? 1 : 0;

    return factors;
}

console.log( solution(24) );
console.log( solution(21) );
console.log( solution(1) );
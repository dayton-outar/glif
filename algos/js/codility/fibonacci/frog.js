// The Fibonacci sequence is defined using the following recursive formula:

//     F(0) = 0
//     F(1) = 1
//     F(M) = F(M - 1) + F(M - 2) if M >= 2
// A small frog wants to get to the other side of a river. The frog is initially located at one bank of the river (position −1) and wants to get to the other bank (position N). The frog can jump over any distance F(K), where F(K) is the K-th Fibonacci number. Luckily, there are many leaves on the river, and the frog can jump between the leaves, but only in the direction of the bank at position N.

// The leaves on the river are represented in an array A consisting of N integers. Consecutive elements of array A represent consecutive positions from 0 to N − 1 on the river. Array A contains only 0s and/or 1s:

// 0 represents a position without a leaf;
// 1 represents a position containing a leaf.
// The goal is to count the minimum number of jumps in which the frog can get to the other side of the river (from position −1 to position N). The frog can jump between positions −1 and N (the banks of the river) and every position containing a leaf.

// For example, consider array A such that:

//     A[0] = 0
//     A[1] = 0
//     A[2] = 0
//     A[3] = 1
//     A[4] = 1
//     A[5] = 0
//     A[6] = 1
//     A[7] = 0
//     A[8] = 0
//     A[9] = 0
//     A[10] = 0
// The frog can make three jumps of length F(5) = 5, F(3) = 2 and F(5) = 5.

// Write a function:

// function solution(A);

// that, given an array A consisting of N integers, returns the minimum number of jumps by which the frog can get to the other side of the river. If the frog cannot reach the other side of the river, the function should return −1.

// For example, given:

//     A[0] = 0
//     A[1] = 0
//     A[2] = 0
//     A[3] = 1
//     A[4] = 1
//     A[5] = 0
//     A[6] = 1
//     A[7] = 0
//     A[8] = 0
//     A[9] = 0
//     A[10] = 0
// the function should return 3, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..100,000];
// each element of array A is an integer that can have one of the following values: 0, 1.

const binet = n => {
    return parseInt( ( Math.pow(( (1 + Math.sqrt(5)) / 2), n) - Math.pow(( (1 - Math.sqrt(5)) / 2), n) ) / Math.sqrt(5), 10 );
}

function solutionX(A) { // My incomplete solution
    const distance = A.length + 1;
    let possibilities = [];
    
    let i = 3; // fibonacci(3) = 2
    while (binet(i) <= distance) {
        possibilities.push(binet(i));
        i++;
    }

    if (possibilities.indexOf(distance) > 0) return 1;

    let jumps = [];

    return jumps;
}

function solution(A) {    
    let fib = [];
    let N = A.length + 1;
    let i = 1;
    let steps = [];
    let arr = [];
    
    arr[0] = 1; // jumping from start
    for( i = 1; i <= A.length; i++ ) {
        arr[i] = A[i - 1];
    }

    if(N < 3) {
        return 1;
    }
    
    fib[0] = 0;
    fib[1] = 1;
    
    i = 1;
    
    while( fib[i++] < N ) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    
    steps[0] = 1;
    for( i = 1; i <= N; i++ ) {
        steps[i] = 0;
    }
    
    let base = 0; // What is base?
    i = 2;
    
    let result = -1;
    
    while(i < fib.length && base <= N) {
        let nextPos = base + fib[i];
        
        console.log( '=========================');
        console.log( 'base\t', base );
        console.log( `fib[${i}]\t`, fib[i] );
        console.log( 'nextPos\t', nextPos );
        console.log( '-------------------------');

        if(steps[base] === 0) {
            console.log('steps[base] === 0');
            base++;
        } else if(nextPos > N) {
            console.log('nextPos > N');
            base++;
            i = 2;
        } else {
            console.log('else ...');
            if(nextPos === N) {
                console.log('nextPos === N');
                if(base === 0) {
                    console.log('base === 0');
                    return 1;
                } else {
                    console.log('base !== 0');
                    if(result < 0) {
                        console.log(`result (${result}) < 0`);
                        result = steps[base] + 1;
                    } else {
                        console.log('result >= 0');
                        result = Math.min(result, steps[base] + 1);
                    }
                    console.log(`result -- ${result}`);
                }
            } else if(arr[nextPos] === 1) {
                console.log(`arr[${nextPos}] === 1`);
                console.log(arr);
                
                if(steps[nextPos] === 0) {
                    console.log(`steps[${nextPos}] === 0`);
                    if(base === 0) {
                        console.log('base === 0');
                        steps[nextPos] = 1;
                    } else {
                        console.log('base !== 0');
                        steps[nextPos] = steps[base] + 1;
                    }
                } else {
                    console.log(`steps[${nextPos}] !== 0`);
                    steps[nextPos] = Math.min(steps[nextPos], steps[base] + 1);
                }
            }
            
            i++;
        }
        
        console.log( '-------------------------');
        console.log('steps:', steps);
    }
    
    return result;
}

console.log( solution( [0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0] ) );
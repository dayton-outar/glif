// A = [10, 2, 5, 1, 8, 20];

// console.log( A );

// A.sort((a, b) => (a - b));

// console.log( A );

function solution(A) {
    A.sort((a, b) => (a - b));

    for (var i = 0; i < A.length - 2; i++) {
        var p = A[i],
            q = A[i + 1],
            r = A[i + 2];

        if (p + q > r &&
            q + r > p &&
            r + p > q) {
            console.log(p, q, r);
            return 1;
        }
    }
    
    return 0;
}

console.log( solution([10, 2, 5, 1, 8, 20]) );
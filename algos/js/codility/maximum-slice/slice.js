const slowMaxSlice = A => {
    const n = A.length;
    let result = 0;

    for ( let i = 0; i < n; i++ ) {
        for ( let j = i; j < n; j++ ) {
            let sum = 0;
            for ( let k = i; k < (j + 1); k++ ) {
                sum += A[k];
                console.log( `i: ${i}, j: ${j}, k: ${k} ... A[k]: ${A[k]} ... sum: ${sum}` );
            }
            result = Math.max(result, sum);
        }
    }

    return result;
}

let elements = [5, -7, 3, 5, -2, 4, -1];

// console.log( elements );
// console.log( slowMaxSlice( elements ) );

// const prefixSums = (A) => {
//     const n = A.length;
//     let P = Array(n + 1).fill(0);

//     for ( let i = 1; i < (n + 1); i++ ) {
//         P[i] = P[i - 1] + A[i - 1];
//     }

//     return P;
// }

// const quadraticMaxSlice = (A, pref) => {
//     const n = A.length;
//     let result = 0;

//     for ( let i = 0; i < n; i++ ) {
//         for ( let j = i; j < n; j++ ) {
//             let sum = pref[j + 1] - pref[i];
//             result = Math.max(result, sum);
//         }
//     }

//     return result;
// }

const quadraticMaxSlice = (A) => {
    const n = A.length;
    let result = 0;

    for ( let i = 0; i < n; i++ ) {
        let sum = 0;
        for ( let j = i; j < n; j++ ) {
            sum += A[j];
            result = Math.max(result, sum);
        }
    }

    return result;
}

console.log( quadraticMaxSlice( elements ) );

const goldenMaxSlice = A => {
    let maxEnding = 0,
        maxSlice = 0;
    
    for ( let i = 0; i < A.length; i++ ) {
        maxEnding = Math.max(0, maxEnding + A[i]);
        maxSlice = Math.max(maxSlice, maxEnding);
    }

    return maxSlice;
}

console.log( goldenMaxSlice( elements ) );
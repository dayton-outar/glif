const caterpillarMethod = (A, s) => {
    console.log( A );
    const n = A.length;
    let front = 0, total = 0;

    for ( let i = 0; i < n; i++ ) {
        while (front < n && total + A[front] <= s) {
            console.log('before', front, total, A[front]);
            total += A[front];
            front ++;
            console.log('after', front, total, A[front]);
        }

        console.log('outer', i, total, A[i])
        if (total == s) return true;

        total -= A[i];
    }

    return false;
}

// console.log( caterpillarMethod( [6, 2, 7, 4, 1, 3, 6], 12 ) );

const triangles = A => {
    const n = A.length;
    let result  = 0;

    for ( let i = 0; i < n; i++ ) {
        k = i + 2;
        for ( let j = i + 1; j < n; j++ ) {
            while ( k < n && A[i] + A[j] > A[k] ) {
                k++;
            }
            result += k - j - 1;
        }
    }

    return result;
}

console.log( triangles( [1, 3, 1, 2, 2, 5, 4, 6, 1] ) );
const caterpillarMethod = (A, s) => {
    console.log( A );
    const n = A.length;
    let front = 0, total = 0;

    for ( let i = 0; i < n; i++ ) {
        while (front < n && total + A[front] <= s) {
            console.log('before', front, total, A[front]);
            total += A[front];
            front += 1;
            console.log('after', front, total, A[front]);
        }

        console.log('outer', i, total, A[i])
        if (total == s) return true;

        total -= A[i];
    }

    return false;
}

console.log( caterpillarMethod( [6, 2, 7, 4, 1, 3, 6], 12 ) );

const triangles = A => {
    const n = A.length;
    let result  = 0;

    for ( let i = 0; i < n; i++ ) {
        z = i + 2;
        for ( let j = i + 1; i < n; j++ )
            while (z < n && A[i] + A[j] > A[z]) {
                z++;
            }
            result += z - y - 1;
    }

    return result;
}
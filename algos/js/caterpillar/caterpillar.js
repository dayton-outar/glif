let range = n => Array.from(Array(n).keys());

const caterpillarMethod = (A, s) => {
    console.log( A );
    const n = A.length;
    let front = 0, total = 0;

    for ( const back in range(n) ) {
        while (front < n && total + A[front] <= s) {
            console.log('before', front, total, A[front]);
            total += A[front];
            front += 1;
            console.log('after', front, total, A[front]);
        }

        console.log('outer', back, total, A[back])
        if (total == s) return true;

        total -= A[back];
    }

    return false;
}

console.log( caterpillarMethod( [6, 2, 7, 4, 1, 3, 6], 12 ) );
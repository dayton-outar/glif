const slowLeader = A => {
    const n = A.length;
    let leader = -1;

    for ( let i = 0; i < n; i++ ) {
        let candidate = A[i];
        let count = 0;
        for ( let j = 0; j < n; j++) {
            if (A[i] == candidate) {
                count++;
            }
        }

        if (count > Math.floor( n / 2 )) {
            leader = candidate;
        }
    }

    return leader;
}

// console.log( slowLeader( [6, 8, 4, 6, 8, 6, 6] ) );

const fastLeader = A => {
    const n = A.length;
    let leader = -1;

    A.sort((a, b) => a - b);
    let mid = Math.floor(n / 2);
    let candidate = A[mid];
    let count = 0;
    
    for ( let i = 0; i < n; i++ ) {
        if (A[i] == candidate) {
            count++;
        }
    }

    if (count > mid) {
        leader = candidate;
    }

    return leader;
}

const goldenLeader = A => {
    const n = A.length;
    let size = 0;

    let value = 0;
    for ( let i = 0; i < n; i++ ) {
        if ( size == 0 ) {
            size++;
            value = A[i];
        } else {
            if ( value != A[i] ) {
                size--;
            } else {
                size++;
            }
        }
    }

    let candidate = -1;

    if (size > 0) {
        candidate = value;
    }

    let leader = -1;
    let count = 0;
    
    for ( let i = 0; i < n; i++ ) {
        if (A[i] == candidate) {
            count++;
        }
    }

    let mid = Math.floor(n / 2);
    if ( count > mid ) {
        leader = candidate;
    }

    return leader;
}

const platinumLeader = A => {
    const n = A.length;
    let size = 0;

    let value = 0;
    for ( let i = 0; i < n; i++ ) {
        if ( size == 0 ) {
            size++;
            value = A[i];
        } else {
            if ( value != A[i] ) {
                size--;
            } else {
                size++;
            }
        }
    }

    let candidate = -1;

    if (size > 0) {
        candidate = value;
    }

    return candidate;
}

console.log( platinumLeader( [6, 8, 6, 4, 6, 8, 6, 3, 3] ) );
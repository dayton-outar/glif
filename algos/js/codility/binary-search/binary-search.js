const binarySearch = (A, x) => {
    const n = A.length;
    let beg = 0;
    let end = n - 1;
    let result = -1;

    while ( beg <= end ) {
        let mid = Math.floor( ((beg + end) / 2) );
        //console.log(`==${beg}, ${mid}, ${end}==`);
        if ( A[mid] <= x ) {
            console.log('<=', beg, mid, A[mid]);
            beg = mid + 1;
            result = mid;
        } else {
            console.log('>', mid, end, A[mid]);
            end = mid - 1;
        }
    }

    return result;
}

//binarySearch( [12, 15, 15, 19, 24, 31, 53, 59, 60], 31 );

const boards = (A, k) => {
    const n = A.length;
    let result = -1;
    let beg = 1;
    let end = n;

    while( beg <= end ) {
        let mid = Math.floor( ((beg + end) / 2) );

        if (check(A, mid) <= k) {
            end = mid - 1;
            result = mid;
        } else {
            beg = mid + 1;
        }
    }

    return result;
}

let range = n => Array.from(Array(n).keys());

const check = (A, k) => {
    const n = A.length;
    let boards = 0;
    let last = -1;

    for ( const i in range(n) ) {
        if ( A[i] == 1 && last < i ) {
            boards += 1;
            last = i + k - 1;
        }
    }
    
    return boards;
}

console.log( boards( [0, 0, 1, 0, 0, 1, 1, 0, 0, 1], 10 ) ); // Output: 1
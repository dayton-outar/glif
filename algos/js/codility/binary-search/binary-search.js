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

binarySearch( [12, 15, 15, 19, 24, 31, 53, 59, 60], 31 );
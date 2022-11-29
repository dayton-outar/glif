const greedyCoinChanging = (M, k) => {
    const n = M.length;
    let result = [];

    for ( let i = (n - 1); i > -1; i-- ) {
        result.push([M[i], Math.floor( k / M[i] ) ]);
        k %= M[i];
    }

    return result;
}

console.log( greedyCoinChanging( [ 1, 3, 4 ], 6 ) );

const greedyCanoeistA = (W, k) => {
    const n = W.length;
    let light = [];
    let heavy = [];

    for( let i = 0; i < (n - 1); i++ ) {
        if ( W[i] + W[-1] <= k ) {
            light.push( W[i] );
        } else {
            heavy.push( W[i] );
        }
    }

    heavy.push( W[-1] );
    let canoes = 0;

    while( light.length || heavy.length ) {
        if ( light.length > 0 ) {
            light.pop()
        }
        
        heavy.pop();
        canoes++;

        if ( !heavy.length && light.length ) {
            heavy.push( light.pop() );
        }

        while ( heavy.length > 1 && heavy[-1] + heavy[0] <= k ) {
            light.push( heavy.unshift() )
        }
    }

    return canoes;
}

console.log( greedyCanoeistA( [2, 4, 5, 2, 1, 5, 6, 7, 8, 9, 7], 5) );

const greedyCanoeistB = (W, k) => {
    let canoes = 0;
    let j = 0;
    let i = W.length - 1;

    while ( i >= j ) {
        if ( W[i] + W[j] <= k ) {
            j++;
        }
        canoes++;
        i--;
    }

    return canoes;
}

console.log( greedyCanoeistA( [2, 4, 5, 2, 1, 5, 6, 7, 8, 9, 7], 5) );
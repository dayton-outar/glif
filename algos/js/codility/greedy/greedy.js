const range = (start, end, step = 1) => {
    let output = [];    
    for (let i = start; i < end; i += step) {
        output.push(i);
    }
    return output;
};

const greedy = (M, k) => {
    const n = M.length;
    let result = [];

    const R = range(n - 1, -1, -1);
    // for ( const i in R) {
    //     result += 
    // }

}
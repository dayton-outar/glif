const matrix = [[1, 2, 3], [4, 5, 6], [9, 8, 9]];

const ltr = matrix.reduce((p, c, ix) => c[ix] + p, 0);

console.log(ltr);

const rtl = matrix.reduce((p, c, ix, array) => c[(array.length - 1) - ix] + p, 0);

console.log(rtl);
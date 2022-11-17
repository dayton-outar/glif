const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);

console.log( fibonacci(11) ); // 89

let range = (n, m) => Array.from(Array((m - n)).keys()).map(e => e + n);

console.log( range(2, 6) );
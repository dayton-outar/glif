const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);

console.log( fibonacci(11) ); // 89

let range = (n, m) => Array.from(Array((m - n)).keys()).map(e => e + n);

const fibonacciDynamics = n => {
    let fib = Array(n + 2).fill(0);
    fib[1] = 1; // So, starting with 0, 1, ... sets the basis
    const R = range(2, n + 1 );
    for ( let i in R ) {
        fib[R[i]] = fib[R[i] - 1] + fib[R[i] - 2];
    }

    return fib[n];
}

console.log( fibonacciDynamics(11) ); // 89
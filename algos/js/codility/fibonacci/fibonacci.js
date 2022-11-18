const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);

console.log(fibonacci(5)); // 89

let range = (n, m) => Array.from(Array((m - n)).keys()).map(e => e + n);

const fibonacciDynamics = n => {
    let fib = Array(n + 2).fill(0);
    fib[1] = 1; // So, starting with 0, 1, ... sets the basis
    const R = range(2, n + 1);
    for (let i in R) {
        fib[R[i]] = fib[R[i] - 1] + fib[R[i] - 2];
    }

    return fib[n];
}

const binet = n => {
    return parseInt((Math.pow(((1 + Math.sqrt(5)) / 2), n) - Math.pow(((1 - Math.sqrt(5)) / 2), n)) / Math.sqrt(5), 10);
}

console.log(binet(2)); // 1
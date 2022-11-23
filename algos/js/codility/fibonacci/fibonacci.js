const fibonacci = n => (n <= 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);

console.log( fibonacci(11) );

const fibonacciDynamics = n => {
    let fib = Array(n + 2).fill(0);
    fib[1] = 1; // So, starting with 0, 1, ... sets the basis
    for ( let i = 2; i < fib.length; i++ ) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib[n];
}

console.log(fibonacciDynamics(11));

const binet = n => {
    return parseInt((Math.pow(((1 + Math.sqrt(5)) / 2), n) - Math.pow(((1 - Math.sqrt(5)) / 2), n)) / Math.sqrt(5), 10);
}

console.log(binet(2)); // 1
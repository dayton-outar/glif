// An integer N is given, representing the area of some rectangle.

// The area of a rectangle whose sides are of length A and B is A * B, and the perimeter is 2 * (A + B).

// The goal is to find the minimal perimeter of any rectangle whose area equals N. The sides of this rectangle should be only integers.

// For example, given integer N = 30, rectangles of area 30 are:

// (1, 30), with a perimeter of 62,
// (2, 15), with a perimeter of 34,
// (3, 10), with a perimeter of 26,
// (5, 6), with a perimeter of 22.
// Write a function:

// function solution(N);

// that, given an integer N, returns the minimal perimeter of any rectangle whose area is exactly equal to N.

// For example, given an integer N = 30, the function should return 22, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..1,000,000,000].

calculatePerimeter = (a, b) => 2 * (a + b)

function solution1(N) { // My first solution ... Score: 80%
    // write your code in JavaScript (Node.js 14)
    let mp = calculatePerimeter(1, N);

    for (let i = 2; (i * i) < N; i++) { // O(sqrt(N))
        if ( ( N % i ) == 0 ) {
            let perimeter = calculatePerimeter(i, (N / i));
            mp = Math.min(mp, perimeter);
        }
    }

    return mp;
}

// The principle here is that the two numbers that have the smallest difference between them will be the rectangle will the smallest perimeter.
function solution(N) { // https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/MinPerimeterRectangle.md
    for (var i = parseInt(Math.sqrt(N), 10); true ; i--) {
        if (N % i == 0) return calculatePerimeter(i, (N / i));
    }
}

console.log(solution(30));
console.log(solution(49));
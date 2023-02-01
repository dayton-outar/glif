// A non-empty array A consisting of N integers is given. The consecutive elements of array A represent consecutive cars on a road.

// Array A contains only 0s and/or 1s:

// 0 represents a car traveling east,
// 1 represents a car traveling west.
// The goal is to count passing cars. We say that a pair of cars (P, Q), where 0 ≤ P < Q < N, is passing when P is traveling to the east and Q is traveling to the west.

// For example, consider array A such that:

//   A[0] = 0
//   A[1] = 1
//   A[2] = 0
//   A[3] = 1
//   A[4] = 1
// We have five pairs of passing cars: (0, 1), (0, 3), (0, 4), (2, 3), (2, 4).

// Write a function:

// function solution(A);

// that, given a non-empty array A of N integers, returns the number of pairs of passing cars.

// The function should return −1 if the number of pairs of passing cars exceeds 1,000,000,000.

// For example, given:

//   A[0] = 0
//   A[1] = 1
//   A[2] = 0
//   A[3] = 1
//   A[4] = 1
// the function should return 5, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..100,000];
// each element of array A is an integer that can have one of the following values: 0, 1.

function solution(A) { // Credit: https://danwritescode.com/passing-cars-codility-100-correct-javascript-solution/
    var zero = 0;
    var count = 0;
  
    for (var i = 0; i < A.length; i++) {
      if (A[i] == 0) zero++;
      else {
        count += 1 * zero;
        if (count > 1000000000) return -1;
      }
    }
  
    return count;
}

// Could not understand the question. Just went straight for a solution: https://youtu.be/HAfrXIE5QDY

// Another attempt a few weeks later
const prefixSum = A => {
  let P = Array(A.length + 1).fill(0);

  for( let i = 1; i < ( A.length + 1); i++ ) {
      P[i] = P[i - 1] + A[i - 1];
  }

  return P;
}

const countTotal = (P, x, y) => P[y + 1] - P[x];

const solution2 = A => {
  let prefixes = prefixSum( A );
  let sumPairs = 0;

  for( let i = 0; i < A.length; i++ ) {
      if (A[i] == 0) {
          sumPairs += countTotal(prefixes, i, (A.length - 1 ) )
      }
  }

  if (sumPairs > 1000000000) {
      sumPairs = -1;
  }

  return sumPairs;
}

// let prefixes = prefixSum( [0, 1, 0, 1, 1] );
// console.log( prefixes );
// console.log( countTotal(prefixes, 2, 4) );

console.log( solution2( [0, 1, 0, 1, 1] ) );
// A non-empty array A consisting of N integers is given. The array contains an odd number of elements, and each element of the array can be paired with another element that has the same value, except for one element that is left unpaired.

// For example, in array A such that:

//   A[0] = 9  A[1] = 3  A[2] = 9
//   A[3] = 3  A[4] = 9  A[5] = 7
//   A[6] = 9
// the elements at indexes 0 and 2 have value 9,
// the elements at indexes 1 and 3 have value 3,
// the elements at indexes 4 and 6 have value 9,
// the element at index 5 has value 7 and is unpaired.
// Write a function:

// function solution(A);

// that, given an array A consisting of N integers fulfilling the above conditions, returns the value of the unpaired element.

// For example, given array A such that:

//   A[0] = 9  A[1] = 3  A[2] = 9
//   A[3] = 3  A[4] = 9  A[5] = 7
//   A[6] = 9
// the function should return 7, as explained in the example above.

// Write an efficient algorithm for the following assumptions:

// N is an odd integer within the range [1..1,000,000];
// each element of array A is an integer within the range [1..1,000,000,000];
// all but one of the values in A occur an even number of times.

function solution(A) {
    if (A.length % 2 === 0)
        return A;

    let x = 0;
    let pairs = [];
    while(x < A.length) {
        const ix = pairs.findIndex(p => p.length < 2 && p.indexOf(A[x]) > -1)
        if (ix > -1) {
            pairs[ix].push(A[x]);
        } else {
            pairs.push([A[x]]);
        }

        x++;
    }

    const ux = pairs.findIndex(p => p.length == 1)

    return pairs[ux][0];
}

//console.log(solution([9, 3, 9, 3, 9, 7, 9]));
// 3, 3, 7, 9, 9, 9, 9
// 1, 1, 2, 2, 2

function solution2(A) { // Completed n = 100,003 in 0.232 s
    if (A.length % 2 === 0)
        return A;

    A.sort((a, b) => a - b);
    const result = A.reduce((p, v) => {
        if (p.length == 0 || p[p.length - 1].length === 2) {
            p.push([v]);
        } else if (p[p.length - 1][0] == v) {
            p[p.length - 1].push(v);
        } else {
            p.push([v]);
        }

        return p;
    }, []);

    const ux = result.findIndex(p => p.length == 1)

    return result[ux][0];
}

function solution3(A) { // Completed n = 100,003 in 0.168 s
    // write your code in JavaScript (Node.js 8.9.4)
    const array = A;
    const sortedArray = array.sort();

    let oddElement;
    
    for(let elementIndex = 0; elementIndex < sortedArray.length; elementIndex++) {
        const thisElement = sortedArray[elementIndex];
        const elementAhead = sortedArray[elementIndex + 1]
        
        if(thisElement === elementAhead) {
            // if it's the same value skip the next element.
            elementIndex++;
        } else {
            oddElement = thisElement;
        }
    }
    return oddElement;
}

function solution4(array) { // Completed n = 100,003 in 0.168 s
    let i = 0;
    const sorted = array.sort();
    const limit = array.length;
  
    while (i <= limit) {
      const current = sorted[i];
      const next = sorted[i + 1];
  
      if (current !== next) return current;
  
      i += 2;
    }
  }

console.log(
    solution4([9, 3, 9, 3, 9, 7, 9]));

console.log(
    solution4([1, 1, 2, 2, 2]));

// Both solution3 and solution4 scored 100%
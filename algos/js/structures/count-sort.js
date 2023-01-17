// Credit Sammie Bae in JavaScript Data Structures and Algorithms
function countSort(array) {
    let hash = {};
    let countArr = [];

    for( let i = 0; i < array.length; i++ ) {
        if (!hash[array[i]]) {
            hash[array[i]] = 1;
        } else {
            hash[array[i]]++;
        }
    }

    for(const key in hash) {
        // for any number of _ element, add it to array
        for ( let i = 0; i < hash[key]; i++ ) {
            countArr.push(parseInt(key));
        }
    }

    return countArr;
}

// console.log( countSort([6, 1, 23, 2, 3, 2, 1, 2, 2, 3, 3, 1, 123, 123, 4, 23]) );

// Credit: GeeksForGeeks
// Javascript implementation of Counting Sort
function sort(arr)
{
    var n = arr.length;
 
    // The output character array that will have sorted arr
    var output = Array.from({length: n}, (_, i) => 0);
 
    // Create a count array to store count of individual
    // characters and initialize count array as 0
    var count = Array.from({length: 256}, (_, i) => 0);
 
 
    // store count of each character
    for (var i = 0; i < n; ++i)
        ++count[arr[i].charCodeAt(0)];
    // Change count[i] so that count[i] now contains actual
    // position of this character in output array
    for (var i = 1; i <= 255; ++i)
        count[i] += count[i - 1];
 
    // Build the output character array
    // To make it stable we are operating in reverse order.
    for (var i = n - 1; i >= 0; i--) {
        output[count[arr[i].charCodeAt(0)] - 1] = arr[i];
        --count[arr[i].charCodeAt(0)];
    }
 
    // Copy the output array to arr, so that arr now
    // contains sorted characters
    for (var i = 0; i < n; ++i)
        arr[i] = output[i];
     return arr;
}

// console.log( sort([ 'g', 'e', 'e', 'k', 's', 'f', 'o', 'r', 'g', 'e', 'e', 'k', 's' ]) );

function swap(array, index1, index2) {
    var temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
}

let arr = [3, 7, 6];
console.log( arr );
swap(arr, 0, 2);
console.log( arr );
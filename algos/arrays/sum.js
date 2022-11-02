// Given an unordered array of integers and a value sum, return true if any two items may be added such that they equal the value of sum . Otherwise, return false.

// So, if we were given the array [3, 5, 1, 4] and the value 9 , our function should return true , because 4 + 5 = 9 .

// Credit: https://bretcameron.medium.com/how-to-make-your-code-faster-using-javascript-sets-b432457a4a77
// const solution = (items, val) => {
//     let track = new Set();
//     track.add(val - items[0]);
//     for(let i = 1; i < items.length; i++) {
//         let diff = val - items[i];
//         if (track.has(items[i])) {
//             return true;
//         } else {
//             track.add(diff);
//         }
//     }

//     return false;
// };

// IIFE inside array callback sends new Set into array callback. Interesting how callbacks can be nested.
const solution = (items, val) => items.some((set => n => set.has(n) || !set.add(val - n))(new Set));

console.log(solution([3, 5, 1, 4], 9));
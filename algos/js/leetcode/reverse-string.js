// https://leetcode.com/problems/reverse-only-letters/
// 917. Reverse Only Letters

// Given a string S, return the "reversed" string where all characters that are not a letter stay in the same place, and all letters reverse their positions.

// Example 1:

// Input: "ab-cd"
// Output: "dc-ba"



// Example 2:

// Input: "a-bC-dEf=ghIj!!"
// Output: "j-Ih-gfE=dCba!!"

const reverse = S => {
    let A = [];
    let N = '';

    for (let i = 0; i < S.length; i++ ) {
        if (/[a-zA-Z]/.test(S[i])) {
            A.push(S[i]);
        }
    }

    for (let i = 0; i < S.length; i++ ) {
        if (/[a-zA-Z]/.test(S[i])) {
            N += A.pop();
        } else {
            N += S[i];
        }
    }

    return N;
}

console.log( reverse('a-bC-dEf=ghIj!!') );
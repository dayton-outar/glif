

// A string S consisting of N characters is called properly nested if:

// S is empty;
// S has the form "(U)" where U is a properly nested string;
// S has the form "VW" where V and W are properly nested strings.
// For example, string "(()(())())" is properly nested but string "())" isn't.

// Write a function:

// function solution(S);

// that, given a string S consisting of N characters, returns 1 if string S is properly nested and 0 otherwise.

// For example, given S = "(()(())())", the function should return 1 and given S = "())", the function should return 0, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..1,000,000];
// string S is made only of the characters "(" and/or ")".

function solution(S) { // My first solution ... 12 minutes ... Score: 100%
    // write your code in JavaScript (Node.js 14)
    const parentheses = {
        "(": ")"
    };

    let stack = [];
    for( let i = 0; i < S.length; i++) {
        if (stack.length > 0) {
            if (parentheses[stack[stack.length - 1]] == S[i]) {
                stack.pop();
            } else {
                stack.push(S[i]);
            }
        } else {
            stack.push(S[i]);
        }
    }

    return stack.length === 0 ? 1 : 0;
}
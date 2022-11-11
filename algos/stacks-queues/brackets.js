// A string S consisting of N characters is considered to be properly nested if any of the following conditions is true:

// S is empty;
// S has the form "(U)" or "[U]" or "{U}" where U is a properly nested string;
// S has the form "VW" where V and W are properly nested strings.
// For example, the string "{[()()]}" is properly nested but "([)()]" is not.

// Write a function:

// function solution(S);

// that, given a string S consisting of N characters, returns 1 if S is properly nested and 0 otherwise.

// For example, given S = "{[()()]}", the function should return 1 and given S = "([)()]", the function should return 0, as explained above.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [0..200,000];
// string S is made only of the following characters: "(", "{", "[", "]", "}" and/or ")".

function solution(S) { // My first solution ... Score: 87%
    let stack = [];

    if (S[0] === '}' ||
        S[0] === ']' ||
        S[0] === ')') {
            return 0;
    }

    for( let i = 0; i < S.length; i++ ) {        
        if (S[i] === '{' ||
            S[i] === '[' ||
            S[i] === '(') {
            stack.push( S[i] );
        }

        if (i > 0) {
            if (stack[stack.length - 1] === '{' && S[i] === '}' ||
                stack[stack.length - 1] === '[' && S[i] === ']' ||
                stack[stack.length - 1] === '(' && S[i] === ')') {
                stack.pop( S[i] );
            }
        }
    }

    return stack.length === 0 ? 1 : 0;
}

// Can't understand the reason for not getting 100%

// Credit: https://github.com/yaseenshaik/codility-solutions-javascript/blob/master/Brackets.md
function solution(S) { // Score: 100%
    var brackets = {
        "{": "}",
        "(": ")",
        "[": "]"
    }

    var closedBrackets = ["}", ")", "]"]
    
    var stack = [];
    
    for (var i =0; i < S.length; i++) {
        if (brackets.hasOwnProperty(S[i])) {
            stack.push(S[i])
        } else if (brackets[stack[stack.length - 1]] == S[i]) {
            stack.pop()
        } else if (closedBrackets.indexOf(S[i]) !== -1) {
        	return 0
        }
    }
    
    return stack.length === 0 ? 1 : 0
}
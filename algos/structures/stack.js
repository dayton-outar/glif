function Stack() {
    this.dataStore = [];
    this.top = 0;
    this.push = push;
    this.pop = pop;
    this.peek = peek;
    this.clear = clear;
    this.length = length;
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function peek() {
    return this.dataStore[this.top - 1];
}

function pop() {
    return this.dataStore[--this.top];
}

function clear() {
    this.top = 0;
}

function length() {
    return this.top;
}

// A stack can be used to convert a number from one base to another base. Given a number,
// n, which we want to convert to a base, b, here is the algorithm for performing the
// conversion:
// 1. The rightmost digit of n is n % b. Push this digit onto the stack.
// 2. Replace n with n / b.
// 3. Repeat steps 1 and 2 until n = 0 and there are no significant digits remaining.
// 4. Build the converted number string by popping the stack until the stack is empty.

function convert(num, base) {
    const stck = new Stack;

    while (num > 0) {
        stck.push(num % base);
        num = Math.floor(num /= base);
    }

    let str = "";
    while (stck.length()) {
        str += stck.pop();
    }

    return str;
}

console.log(convert(9, 2));

function isPalindrome(word) {
    var s = new Stack;
    for (var i = 0; i < word.length; ++i) {
        s.push(word[i]);
    }
    var rword = "";
    while (s.length() > 0) {
        rword += s.pop();
    }
    if (word == rword) {
        return true;
    } else {
        return false;
    }
}

var word = "hello";
if (isPalindrome(word)) {
    console.log(word + " is a palindrome.");
} else {
    console.log(word + " is not a palindrome.");
}
word = "racecar"
if (isPalindrome(word)) {
    console.log(word + " is a palindrome.");
} else {
    console.log(word + " is not a palindrome.");
}

// Factorial without recursion
function fact(n) {
    var s = new Stack();
    while (n > 1) {
        s.push(n--);
    }
    var product = 1;
    while (s.length() > 0) {
        product *= s.pop();
    }
    return product;
}

console.log( fact( 5 ) );
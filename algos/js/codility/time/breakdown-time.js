// https://codereview.stackexchange.com/questions/281183/function-to-format-time-from-seconds-to-a-particular-expresion

// From an integer X representing a time duration in seconds produce a simplified string representation. For example, given X=100, you should output: "1m40s"

// Use the following abbreviations w,d,h,m,s to represent : *1w is 1 week

// 1d is 1 day
// 1h is 1 hour
// 1m is 1 minute
// 1s is 1 second
// Only the two largest non-zero units should be used. Round up the second unit if necessary so that the output only has two units even though this might mean the output represents slightly more time than X seconds. Write a function: function solution (X); that, given an integer X, returns a string representing the duration.

// Examples:

// Given X=100, return "1m40s"
// Given X=7263, return "2h2m". (7263s=2h1m3s, but this uses too many units, so we round the second largest unit up to 2h2m)
// Given X=3605, return "1h5s"
// Notes:

// If a single unit is sufficient, then the output should only include one unit. ex. X=3600 outputs "1h", not "1h0s".

// The output should be as close as possible to the real time without being less than X. Ex.: X=86461 is "1d1m1s" so the output would be "1d2m". Not "1d1h".

// There should always be some output. The empty string() is not the outcome of any X.

function solution(X) {
    const minute = 60;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;

    let timeLeft = X
    const numberOfWeeks = Math.floor( timeLeft / week );
    timeLeft = timeLeft - ( numberOfWeeks * week );
    const numberOfDays = Math.floor( timeLeft / day );
    timeLeft = timeLeft - ( numberOfDays * day );
    const numberOfHours = Math.floor( timeLeft / hour );
    timeLeft = timeLeft - ( numberOfHours * hour );
    const numberOfMinutes = Math.floor( timeLeft / minute );
    timeLeft = timeLeft - ( numberOfMinutes * minute );
    const numberOfSeconds = timeLeft;

    let abv = [];

    if (numberOfWeeks > 0) {
        abv.push(`${numberOfWeeks}w`);
    }

    if (numberOfDays > 0 && abv.length < 2) {
        abv.push(`${numberOfDays}d`);
    }

    if (numberOfHours > 0 && abv.length < 2) {
        abv.push(`${numberOfHours}h`);
    }

    if (numberOfMinutes > 0 && abv.length < 2) {
        abv.push(`${numberOfMinutes}m`);
    }

    if (numberOfSeconds > 0 && abv.length < 2) {
        abv.push(`${numberOfSeconds}s`);
    }

    return abv.join('');
}

console.log( solution(612060) ); // 1 week 2 hours

console.log( solution(604800) ); // 1 week

console.log( solution(604862) ); // 1 week 1 minute

console.log( solution(604840) ); // 1 week 40 seconds
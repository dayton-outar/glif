function solution(X) {
    // write your code in JavaScript (Node.js 8.9.4)
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
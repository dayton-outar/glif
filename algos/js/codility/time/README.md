# 0. Time

Time is a fundamental concept that helps us measure and quantify the duration and sequence of events. It provides a way to understand the order in which events occur and allows us to organize and plan our activities.

## 0.1 Units of Time

There are various units of time used to measure different durations. The most commonly used units of time include:

 - Second: The second is the base unit of time in the International System of Units (SI). It is defined as the duration of 9,192,631,770 periods of the radiation corresponding to the transition between two hyperfine levels of the ground state of the cesium-133 atom.
 - Minute: A minute is equal to 60 seconds.
 - Hour: An hour is equal to 60 minutes or 3,600 seconds.
 - Day: A day consists of 24 hours or 1,440 minutes or 86,400 seconds.
 - Week: A week consists of 7 days or 168 hours or 10,080 minutes or 604,800 seconds.
 - Month: A month is a unit of time used in calendars, and its length varies depending on the specific calendar system. Commonly, months have around 28 to 31 days.
 - Year: A year is the time it takes for the Earth to complete one orbit around the sun. It is approximately 365.25 days or 12 months.

## 0.2 Breaking down time from seconds

When provided time in seconds it can be broken down and categorized into weeks, days, hours, and minutes.

Here's a lesson on categorizing seconds into weeks, days, hours, and minutes using impersonal language.

When categorizing seconds into weeks, days, hours, and minutes, it's important to understand their respective relationships:

1. Weeks:
   
   To determine the number of weeks, divide the given number of seconds by 604,800.

   Number of weeks = (Given number of seconds) / 604,800

2. Days:
   
   After calculating the number of weeks, find the remaining seconds by subtracting the total seconds in weeks from the given number of seconds. Then, divide this value by 86,400 (the number of seconds in a day).

   Number of days = (Remaining seconds) / 86,400

3. Hours:
   
   Next, calculate the remaining seconds by subtracting the total seconds in days from the previous remaining seconds. Divide this value by 3,600 (the number of seconds in an hour).

   Number of hours = (Remaining seconds) / 3,600

4. Minutes:
   
   Finally, determine the number of minutes by subtracting the total seconds in hours from the remaining seconds. Divide this value by 60 (the number of seconds in a minute).

   Number of minutes = (Remaining seconds) / 60

By following these steps, it is possible to categorize any given number of seconds into weeks, days, hours, and minutes. Remember to round down the values when working with integers, as these conversions involve division.

In summary, the relationship between these units of time using seconds as a baseline are as follows:

 - 1 minute = 60 seconds
 - 1 hour = 60 minutes = 3,600 seconds
 - 1 day = 24 hours = 1,440 minutes = 86,400 seconds
 - 1 week = 7 days = 168 hours = 10,080 minutes = 604,800 seconds

<small>Credit to Chat GPT for this Lesson. <image src="/.attachments/chatgpt-logo.png" alt="Chat GPT Logo" width="16" height="16" /></small>

## 0.3 Exercise

### Problem

From an integer $X$ representing a time duration in seconds produce a simplified string representation. For example, given $X = 100$, you should output: "1m40s"

Use the following abbreviations w,d,h,m,s to represent: 

 - 1w is 1 week
 - 1d is 1 day
 - 1h is 1 hour
 - 1m is 1 minute
 - 1s is 1 second

Only the two largest non-zero units should be used. Round up the second unit if necessary so that the output only has two units even though this might mean the output represents slightly more time than $X$ seconds.

Write a function:

```js
    function solution(X);
```

that, given an integer $X$, returns a string representing the duration.

Examples:
 - Given $X = 100$, return "1m40s"
 - Given $X = 7263$, return "2h2m". (7263s = 2h1m3s, but this uses too many units, so we round the second largest unit up to 2h2m)
 - Given $X = 3605$, return "1h5s"

Notes:
 - If a single unit is sufficient, then the output should only include one unit. ex. $X = 3600$ outputs "1h", not "1h0s".
 - The output should be as close as possible to the real time without being less than $X$. ex.: $X = 86461$ is "1d1m1s" so the output would be "1d2m". Not "1d1h".
 - There should always be some output. The empty string() is not the outcome of any $X$.

### Solution

The lesson provided above already gives the pseudocode of how to breakdown and categorize time from seconds.

The snippet of code shown below only realizes the instructions in JavaScript.

```js
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

solution(612060); // 1 week 2 hours

solution(604800); // 1 week

solution(604862); // 1 week 1 minute

solution(604840); // 1 week 40 seconds
```
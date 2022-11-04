let x = 612000;

// TODO: Fix this. Not correct
function solution(X) {
    // write your code in JavaScript (Node.js 8.9.4)
    const week = 604800;
    const day = 86400;
    const hour = 3600;
    const minute = 60;

    let timeAbv = '';
    if (X >= week) {
        timeAbv = `${parseInt(X / week, 10)}w${parseInt((X % week) / day, 10) === 0 ? `${parseInt(Math.ceil((X % week) / hour), 10)}h` : `${parseInt(Math.ceil((X % week)/day, 10))}d`}`;
    } else if (X >= day) {
        timeAbv = `${parseInt(X / day, 10)}d${parseInt((X % day) / hour, 10) === 0 ? `${parseInt(Math.ceil((X % day) / minute), 10)}m` : `${parseInt(Math.ceil((X % day)/hour, 10))}h`}`;
    } else if (X >= hour) {
        timeAbv = `${parseInt(X / hour, 10)}h${parseInt((X % hour) / minute, 10) === 0 ? `${parseInt(Math.ceil((X % hour) % minute), 10)}s` : `${parseInt(Math.ceil((X % hour) / minute, 10))}m`}`;
    } else {
        timeAbv = `${parseInt(X / minute, 10)}m${(X % minute) === 0 ? '' : `${parseInt(Math.ceil((X % minute), 10))}s`}`;
    }

    return timeAbv;
}

console.log( solution(x) );
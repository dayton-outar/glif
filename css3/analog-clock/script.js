var deg = 6;
var hr = document.querySelector('#hr');
var mn = document.querySelector('#mn');
var sc = document.querySelector('#sc');

setInterval(function(){
    var day = new Date();
    var hh = day.getHours() * 30;
    var mm = day.getMinutes() * deg;
    var ss = day.getSeconds() * deg;

    hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
    mn.style.transform = `rotateZ(${(mm)}deg)`;
    sc.style.transform = `rotateZ(${(ss)}deg)`;
});
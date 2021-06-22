window.addEventListener("load", windowLoadHandler, false);

//for debug messages while testing code
var Debugger = function () {};
Debugger.log = function (message) {
    try {
        console.log(message);
    } catch (exception) {
        return;
    }
}

function windowLoadHandler() {
    canvasApp();
}

function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport()) {
        return;
    }

    var displayCanvas = document.getElementById("displayCanvas");
    var context = displayCanvas.getContext("2d");
    var displayWidth = displayCanvas.width;
    var displayHeight = displayCanvas.height;

    //off screen canvas used only when exporting image
    var exportCanvas = document.createElement('canvas');
    exportCanvas.width = displayWidth;
    exportCanvas.height = displayHeight;
    var exportCanvasContext = exportCanvas.getContext("2d");

    //var exportImage = document.createElement('img');

    //buttons
    var btnExport = document.getElementById("btnExport");
    btnExport.addEventListener("click", exportPressed, false);

    var btnRegenerate = document.getElementById("btnRegenerate");
    btnRegenerate.addEventListener("click", regeneratePressed, false);

    var numCircles;
    var maxMaxRad;
    var minMaxRad;
    var minRadFactor;
    var circles;
    var iterations;
    var numPoints;
    var timer;
    var drawsPerFrame;
    var drawCount;
    var bgColor, urlColor;
    var lineWidth;
    var colorParamArray;
    var colorArray;
    var dataLists;
    var minX, maxX, minY, maxY;
    var xSpace, ySpace;
    var lineNumber;
    var twistAmount;
    var fullTurn;
    var lineAlpha;
    var maxColorValue;
    var minColorValue;

    init();

    function init() {
        numCircles = 15; //35
        maxMaxRad = 200;
        minMaxRad = 200;
        minRadFactor = 0;
        iterations = 11;
        numPoints = Math.pow(2, iterations) + 1;
        drawsPerFrame = 4;

        fullTurn = Math.PI * 2 * numPoints / (1 + numPoints);

        minX = -maxMaxRad;
        maxX = displayWidth + maxMaxRad;
        minY = displayHeight / 2 - 50;
        maxY = displayHeight / 2 + 50;

        twistAmount = 0.67 * Math.PI * 2;

        stepsPerSegment = Math.floor(800 / numCircles);

        maxColorValue = 100;
        minColorValue = 20;
        lineAlpha = 0.10;

        bgColor = "#000000";
        urlColor = "#333333";

        lineWidth = 1.01;

        startGenerate();
    }

    function startGenerate() {
        drawCount = 0;
        context.setTransform(1, 0, 0, 1, 0, 0);

        context.clearRect(0, 0, displayWidth, displayHeight);

        setCircles();

        colorArray = setColorList(iterations);

        lineNumber = 0;

        if (timer) {
            clearInterval(timer);
        }
        timer = setInterval(onTimer, 1000 / 60);

    }

    function setColorList(iter) {
        var r0, g0, b0;
        var r1, g1, b1;
        var r2, g2, b2;
        var param;
        var colorArray;
        var lastColorObject;
        var i, len;

        var maxComponentDistance = 32;
        var maxComponentFactor = 0.5;


        r0 = minColorValue + Math.random() * (maxColorValue - minColorValue);
        g0 = minColorValue + Math.random() * (maxColorValue - minColorValue);
        b0 = minColorValue + Math.random() * (maxColorValue - minColorValue);;

        r1 = minColorValue + Math.random() * (maxColorValue - minColorValue);
        g1 = minColorValue + Math.random() * (maxColorValue - minColorValue);
        b1 = minColorValue + Math.random() * (maxColorValue - minColorValue);


        /*
        //can also set colors explicitly here if you like.
        r1 = 90;
        g1 = 60;
        b1 = 20;
        
        r0 = 30;
        g0 = 77;
        b0 = 66;
        */

        a = lineAlpha;

        var colorParamArray = setLinePoints(iter);
        colorArray = [];

        len = colorParamArray.length;

        for (i = 0; i < len; i++) {
            param = colorParamArray[i];

            r = Math.floor(r0 + param * (r1 - r0));
            g = Math.floor(g0 + param * (g1 - g0));
            b = Math.floor(b0 + param * (b1 - b0));

            var newColor = "rgba(" + r + "," + g + "," + b + "," + a + ")";

            colorArray.push(newColor);
        }

        return colorArray;

    }

    function setCircles() {
        var i;
        var r, g, b, a;
        var grad;

        circles = [];

        for (i = 0; i < numCircles; i++) {
            maxR = minMaxRad + Math.random() * (maxMaxRad - minMaxRad);
            minR = minRadFactor * maxR;

            var newCircle = {
                centerX: minX + i / (numCircles - 1) * (maxX - minX),
                centerY: minY + i / (numCircles - 1) * (maxY - minY),
                //centerY: minY + Math.random()*(maxY - minY),
                maxRad: maxR,
                minRad: minR,
                phase: i / (numCircles - 1) * twistAmount,
                pointArray: setLinePoints(iterations)
            };
            circles.push(newCircle);
        }
    }

    function onTimer() {
        var i;
        var cosTheta, sinTheta;
        var theta;

        var numCircles = circles.length;

        var linParam;
        var cosParam;
        var centerX, centerY;
        var xSqueeze = 0.75;
        var x0, y0;
        var rad, rad0, rad1;
        var phase, phase0, phase1;

        for (var k = 0; k < drawsPerFrame; k++) {

            theta = lineNumber / (numPoints - 1) * fullTurn;

            context.globalCompositeOperation = "lighter";

            context.lineJoin = "miter";

            context.strokeStyle = colorArray[lineNumber];
            context.lineWidth = lineWidth;
            context.beginPath();

            //move to first point
            centerX = circles[0].centerX;
            centerY = circles[0].centerY;
            rad = circles[0].minRad + circles[0].pointArray[lineNumber] * (circles[0].maxRad - circles[0].minRad);
            phase = circles[0].phase;
            x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
            y0 = centerY + rad * Math.sin(theta + phase);
            context.moveTo(x0, y0);

            for (i = 0; i < numCircles - 1; i++) {
                //draw between i and i+1 circle
                rad0 = circles[i].minRad + circles[i].pointArray[lineNumber] * (circles[i].maxRad - circles[i].minRad);
                rad1 = circles[i + 1].minRad + circles[i + 1].pointArray[lineNumber] * (circles[i + 1].maxRad - circles[i + 1].minRad);
                phase0 = circles[i].phase;
                phase1 = circles[i + 1].phase;

                for (j = 0; j < stepsPerSegment; j++) {
                    linParam = j / (stepsPerSegment - 1);
                    cosParam = 0.5 - 0.5 * Math.cos(linParam * Math.PI);

                    //interpolate center
                    centerX = circles[i].centerX + linParam * (circles[i + 1].centerX - circles[i].centerX);
                    centerY = circles[i].centerY + cosParam * (circles[i + 1].centerY - circles[i].centerY);

                    //interpolate radius
                    rad = rad0 + cosParam * (rad1 - rad0);

                    //interpolate phase
                    phase = phase0 + cosParam * (phase1 - phase0);

                    x0 = centerX + xSqueeze * rad * Math.cos(theta + phase);
                    y0 = centerY + rad * Math.sin(theta + phase);

                    context.lineTo(x0, y0);

                }

            }

            context.stroke();

            lineNumber++;
            if (lineNumber > numPoints - 1) {
                clearInterval(timer);
                timer = null;
                break;
            }
        }
    }

    //Here is the function that defines a noisy (but not wildly varying) data set which we will use to draw the curves.
    //We first define the points in a linked list, but then store the values in an array.
    function setLinePoints(iterations) {
        var pointList = {};
        var pointArray = [];
        pointList.first = {
            x: 0,
            y: 1
        };
        var lastPoint = {
            x: 1,
            y: 1
        }
        var minY = 1;
        var maxY = 1;
        var point;
        var nextPoint;
        var dx, newX, newY;
        var ratio;

        var minRatio = 0.5;

        pointList.first.next = lastPoint;
        for (var i = 0; i < iterations; i++) {
            point = pointList.first;
            while (point.next != null) {
                nextPoint = point.next;

                dx = nextPoint.x - point.x;
                newX = 0.5 * (point.x + nextPoint.x);
                newY = 0.5 * (point.y + nextPoint.y);
                newY += dx * (Math.random() * 2 - 1);

                var newPoint = {
                    x: newX,
                    y: newY
                };

                //min, max
                if (newY < minY) {
                    minY = newY;
                } else if (newY > maxY) {
                    maxY = newY;
                }

                //put between points
                newPoint.next = nextPoint;
                point.next = newPoint;

                point = nextPoint;
            }
        }

        //normalize to values between 0 and 1
        //Also store y values in array here.
        if (maxY != minY) {
            var normalizeRate = 1 / (maxY - minY);
            point = pointList.first;
            while (point != null) {
                point.y = normalizeRate * (point.y - minY);
                pointArray.push(point.y);
                point = point.next;
            }
        }
        //unlikely that max = min, but could happen if using zero iterations. In this case, set all points equal to 1.
        else {
            point = pointList.first;
            while (point != null) {
                point.y = 1;
                pointArray.push(point.y);
                point = point.next;
            }
        }

        return pointArray;
    }

    function exportPressed(evt) {
        //background - otherwise background will be transparent.
        exportCanvasContext.fillStyle = bgColor;
        exportCanvasContext.fillRect(0, 0, displayWidth, displayHeight);

        //draw
        exportCanvasContext.drawImage(displayCanvas, 0, 0, displayWidth, displayHeight, 0, 0, displayWidth, displayHeight);

        //add printed url to image
        exportCanvasContext.fillStyle = urlColor;
        exportCanvasContext.font = 'bold italic 16px Helvetica, Arial, sans-serif';
        exportCanvasContext.textBaseline = "top";
        var metrics = exportCanvasContext.measureText("rectangleworld.com");
        exportCanvasContext.fillText("rectangleworld.com", displayWidth - metrics.width - 10, 5);

        //we will open a new window with the image contained within:    
        //retrieve canvas image as data URL:
        var dataURL = exportCanvas.toDataURL("image/png");
        //open a new window of appropriate size to hold the image:
        var imageWindow = window.open("", "fractalLineImage", "left=0,top=0,width=" + displayWidth + ",height=" + displayHeight + ",toolbar=0,resizable=0");
        //write some html into the new window, creating an empty image:
        imageWindow.document.write("<title>Export Image</title>")
        imageWindow.document.write("<img id='exportImage'" +
            " alt=''" +
            " height='" + displayHeight + "'" +
            " width='" + displayWidth + "'" +
            " style='position:absolute;left:0;top:0'/>");
        imageWindow.document.close();
        //copy the image into the empty img in the newly opened window:
        var exportImage = imageWindow.document.getElementById("exportImage");
        exportImage.src = dataURL;
    }

    function regeneratePressed(evt) {
        startGenerate();
    }

}
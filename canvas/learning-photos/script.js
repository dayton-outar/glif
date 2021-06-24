var SIZE = 300;
var CANVAS = null;
var INTERVAL = 42;
var THRESHOLD = 105;
var OBJECT_PROP = null;

function main() {
    CANVAS = document.getElementById('camera');
    CANVAS.width = SIZE;
    CANVAS.height = SIZE;

    var permission= navigator.mediaDevices.getUserMedia({ video: true });

    permission.then(function (stream) {
        var video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        setInterval(updateImage, INTERVAL, video);
    }).catch(
        function(err) {
            console.error('Camera error');
        }
    )
}

function updateImage(video) {
    var context = CANVAS.getContext('2d');
    var minSize = Math.min(video.videoWidth, video.videoHeight);
    var startX = (video.videoWidth - minSize) / 2;
    var startY = (video.videoHeight - minSize) / 2;

    context.drawImage(video, startX, startY, minSize, minSize, 0, 0, SIZE, SIZE);

    var image = context.getImageData(0, 0, SIZE, SIZE);
    var matrix = getPixelMatrix(image.data);
    processMatrix(matrix);
}

function getPixelMatrix(dataArray) {
    var matrix = [];
    for (var i = 1; i <= SIZE; i++) {
        matrix[i] = [];
        for (var j = 1; j <= SIZE; j++) {
            var groupIndex = (i - 1) * SIZE * 4 + (j - 1) * 4; // The data array stores four values for each pixel
            var red      = dataArray[groupIndex + 0];
            var green    = dataArray[groupIndex + 1];
            var blue     = dataArray[groupIndex + 2];
            matrix[i][j] = (red + green + blue) / 3;
        }
    }

    return matrix;
}

function processMatrix(matrix) {
    isolateObject(matrix);
    var box = getBoundingBox(matrix);
    var boxProp = getBoxProperties(box);

    OBJECT_PROP = boxProp.aspectRatio;
    document.getElementById('output').innerHTML =
        `Aspect Ratio: ${ OBJECT_PROP.toFixed(2) }`

    updateCanvas(matrix);
    drawBox(box);
}

function recognize(currentObject) {
    var name;
    if (OBS_COUNT == 0) {
        name = '?';
    } else {
        var neighbour = getNearestNeighbour(currentObject);
        name = neighbour.name;
    }
    document.getElementById('output').innerHTML = name;
}

function getNearestNeighbour(currentObject) {
    var neighbour = null;
    var minDist = null;

    for (var i = 1; i <= OBS_COUNT; i++) {
        var dist = Math.abs(currentObject - OBSERVATIONS[i].prop);
        if (minDist == null || minDist > dist) {
            minDist = dist;
            neighbour = OBSERVATIONS[i];
        }
    }
    return neighbour;
}

function updateCanvas(matrix) {
    var context = CANVAS.getContext('2d');
    var image = context.getImageData(0, 0, SIZE, SIZE);
    for (var i = 1; i <= SIZE; i++) {
        for (var j = 1; j <= SIZE; j++) {
            var groupIndex = (i - 1) * SIZE * 4 + (j - 1) * 4;
            image.data[groupIndex + 0] = matrix[i][j];
            image.data[groupIndex + 1] = matrix[i][j];
            image.data[groupIndex + 2] = matrix[i][j];
        }
    }
    context.putImageData(image, 0, 0);
}

function isolateObject(matrix) {
    for (var i = 1; i <= SIZE; i++) {
        for (var j = 1; j <= SIZE; j++) {
            if (matrix[i][j] < THRESHOLD) {
                matrix[i][j] = 0;
            } else {
                matrix[i][j] = 255;
            }
        }
    }
}

function getBoxProperties(box) {
    var prop = {
        length: 0,
        width: 0,
        aspectRatio: 0
    }

    var deltaX = box.xMax - box.xMin + 1;
    var deltaY = box.yMax - box.yMin + 1;

    prop.length = Math.max(deltaX, deltaY);
    prop.width = Math.min(deltaX, deltaY);
    prop.aspectRatio = prop.width / prop.length;

    return prop;
}

function getBoundingBox(matrix) {
    var bbox = {
        xMin: SIZE + 1,
        xMax: 0,
        yMin: SIZE + 1,
        yMax: 0
    }

    for (var y = 1; y <= SIZE; y++) {
        for (var x = 1; x <= SIZE; x++) {
            if (matrix[y][x] == 0) {
                bbox.yMin = Math.min(y, bbox.yMin);
                bbox.yMax = Math.max(y, bbox.yMax);
                bbox.xMin = Math.min(x, bbox.xMin);
                bbox.xMax = Math.max(x, bbox.xMax);
            }
        }
    }
    return bbox;
}

function drawBox(box) {
    var context = CANVAS.getContext('2d');
    context.strokeStyle = 'red';
    context.beginPath();
    var deltaX = box.xMax - box.xMin;
    var deltaY = box.yMax - box.yMin;
    context.rect(box.xMin, box.yMin, deltaX, deltaY);
    context.stroke();
}

var OBSERVATIONS = [];
var OBS_COUNT = 0;

function learn() {
    var name = document.getElementById('objectName').value;
    if (name == '') {
        alert('Enter name for this object');
        return;
    }

    OBS_COUNT++;
    OBSERVATIONS[OBS_COUNT] = {
        name: name,
        prop: OBJECT_PROP
    }

    document.getElementById('objectName').value = '';
}

function checkKeyPress(event) {
    if (event.key == 'Enter') {
        learn();
    }
}
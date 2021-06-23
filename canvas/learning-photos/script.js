var SIZE = 300;
var CANVAS = null;
var INTERVAL = 42;

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
            var groupIndex = (i - 1) * SIZE * 4 + (j - 1) * 4;
            var red      = dataArray[groupIndex + 0];
            var green    = dataArray[groupIndex + 1];
            var blue     = dataArray[groupIndex + 2];
            matrix[i][j] = (red + green + blue) / 3;
        }
    }

    return matrix;
}

function processMatrix(matrix) {
    updateCanvas(matrix);
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
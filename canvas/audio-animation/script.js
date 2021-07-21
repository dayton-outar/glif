let audio = new Audio();

const audioCtx = new AudioContext();

const canvas = document.getElementsByTagName('canvas')[0];
const file = document.getElementById('fileUpload');

const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioSrc;
let analyser;

canvas.addEventListener('click', function () {
    if (audio.paused) {
        audio.play();

        if (!audioSrc) {
            audioSrc = audioCtx.createMediaElementSource(audio);
            analyser = audioCtx.createAnalyser();
            audioSrc.connect(analyser);
            analyser.fftSize = 64;
        }
        
        const bufferLength = analyser.frequencyBinCount;
        const data = new Uint8Array(bufferLength);

        const barWidth = canvas.width / bufferLength;
        let barHeight;
        let x = 0;

        function animate() {
            x = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            analyser.getByteFrequencyData(data);

            for (let i = 0; i < bufferLength; i++) {
                barHeight = data[i];
                ctx.fillStyle = '#fff';
                ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                x += barWidth;
            }
            requestAnimationFrame(animate);
        }
        animate();
    } else {
        audio.pause();
    }
});

file.addEventListener('change', function() {
    const files = this.files;
    audio.src = URL.createObjectURL(files[0]);
});
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let radius = canvas.height / 2;

context.translate(radius, radius);
radius *= 0.9;

function drawClock() {
    drawFace(context, radius);
    drawNumbers(context, radius);
    drawTime(context, radius);
}

// Color definitions
let colorBlacka = '#333';
let colorBlackb = '#222';
let colorBlue = '#2cc';
let colorVoilet = '#3a0057';
let colorGray = '#555';

function drawFace(context, radius) {
    let gradient;

    // Outer clock face
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = colorBlackb;
    context.fill();

    // Create gradient for border effect
    gradient = context.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    gradient.addColorStop(0, colorBlacka);
    gradient.addColorStop(0.5, colorGray);
    gradient.addColorStop(1, colorBlacka);
    
    context.strokeStyle = gradient;
    context.lineWidth = radius * 0.1;
    context.stroke();

    // Clock center
    context.beginPath();
    context.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    context.fillStyle = colorBlue;
    context.fill();
}

function drawNumbers(context, radius) {
    let angle;
    let num;
    context.font = radius * 0.15 + "px arial";
    context.textBaseline = "middle";
    context.textAlign = "center";

    for (num = 1; num <= 12; num++) {
        angle = (num * Math.PI) / 6;
        context.rotate(angle);
        context.translate(0, -radius * 0.85);
        context.rotate(-angle);
        context.fillText(num.toString(), 0, 0);
        context.rotate(angle);
        context.translate(0, radius * 0.85);
        context.rotate(-angle);
    }
}

function drawHand(context, angle, length, width) {
    context.beginPath();
    context.lineWidth = width;
    context.lineCap = "round";

    context.moveTo(0, 0);
    context.rotate(angle);
    context.lineTo(0, -length);
    context.stroke();
    context.rotate(-angle);
}

function drawTime(context, radius) {
    let now = new Date();
    let hours = now.getHours() % 12;
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Convert time to angles
    let hourAngle = (hours * Math.PI) / 6 + (minutes * Math.PI) / 360;
    let minuteAngle = (minutes * Math.PI) / 30 + (seconds * Math.PI) / 1800;
    let secondAngle = (seconds * Math.PI) / 30;

    // Draw hands
    drawHand(context, hourAngle, radius * 0.5, 8);
    drawHand(context, minuteAngle, radius * 0.7, 5);
    drawHand(context, secondAngle, radius * 0.9, 2);
}

// Run the clock every second
setInterval(drawClock, 1000);
drawClock();

const canvas = document.getElementById('abmCanvas');
const ctx = canvas.getContext('2d');

// Parametri simulazione
const n = 1000;       // Incremento suddivisione (passi)
const T = 1;          // Tempo totale
const dt = T / n;
const mu = 20;        // Drift (tendenza)
const sigma = 50;     // Volatilità (rumore)
let x = 200;          // Punto di partenza (asse Y)

// Impostazioni Canvas
canvas.width = 800;
canvas.height = 400;
ctx.beginPath();
ctx.moveTo(0, x);
ctx.strokeStyle = '#007bff';
ctx.lineWidth = 2;

for (let i = 1; i <= n; i++) {
    // Generatore numeri casuali (Box-Muller)
    let u1 = Math.random();
    let u2 = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);

    // Formula ABM: dX = mu*dt + sigma*sqrt(dt)*Z
    let dx = (mu * dt) + (sigma * Math.sqrt(dt) * z);
    x += dx;

    // Disegno sul canvas
    let posX = (i / n) * canvas.width;
    let posY = canvas.height - x; // Invertiamo Y perché il canvas parte dall'alto
    
    ctx.lineTo(posX, posY);
}

ctx.stroke();

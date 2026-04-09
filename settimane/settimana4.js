function boxMuller() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function runSimulation() {
    const canvas = document.getElementById('abmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Parametri
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const T = parseFloat(document.getElementById('T').value);
    const dt = T / n;
    const sqrtDt = Math.sqrt(dt);

    // Reset Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    let x = 0; // Punto di partenza X(0)
    let currentX = 0;
    let currentY = canvas.height / 2;

    ctx.beginPath();
    ctx.moveTo(0, currentY);
    ctx.strokeStyle = '#2ecc71';

    for (let i = 1; i <= n; i++) {
        // Equazione ABM: dX = mu*dt + sigma*dW
        let dW = boxMuller() * sqrtDt;
        x += mu * dt + sigma * dW;

        // Disegno (proporzionato al canvas)
        let posX = (i / n) * canvas.width;
        let posY = (canvas.height / 2) - (x * 50); // Scalato per visibilità
        
        ctx.lineTo(posX, posY);
    }
    ctx.stroke();
}

// Avvio iniziale
window.onload = runSimulation;

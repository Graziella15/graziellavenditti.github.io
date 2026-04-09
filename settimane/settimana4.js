// Generatore Gaussiano (Box-Muller) per l'incremento di Wiener
function gaussianRandom() {
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
    const sqrtDt = Math.sqrt(dt); // Cruciale per il Teorema di Donsker

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Linea dello zero
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Disegno Traiettoria
    let x = 0; // Valore iniziale X(0)
    ctx.beginPath();
    ctx.strokeStyle = '#0074D9';
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 1; i <= n; i++) {
        let dW = gaussianRandom() * sqrtDt; // Incremento di Wiener riscalato
        x += (mu * dt) + (sigma * dW);     // Formula ABM

        let canvasX = (i / n) * canvas.width;
        // Scaliamo x per la visualizzazione (moltiplicato per 100)
        let canvasY = (canvas.height / 2) - (x * 100); 
        
        ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
}

// Avvio automatico al caricamento
window.onload = runSimulation;

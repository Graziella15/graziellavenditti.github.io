/**
 * Generatore di numeri casuali con distribuzione Normale Standard (Z ~ N(0,1))
 * Metodo di Box-Muller
 */
function gaussianRandom() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function runSimulation() {
    const canvas = document.getElementById('abmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Recupero parametri
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const T = parseFloat(document.getElementById('T').value);
    
    // Calcolo dt e riscalamento per la componente stocastica
    const dt = T / n;
    const sqrtDt = Math.sqrt(dt);

    // Pulizia e Setup Grafico
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegno asse zero
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]); // Reset tratteggio

    // Inizio simulazione traiettoria
    let x = 0; 
    ctx.beginPath();
    ctx.strokeStyle = '#0074D9';
    ctx.lineWidth = 2.5;
    ctx.lineJoin = 'round';
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 1; i <= n; i++) {
        // Equazione ABM discretizzata: X = X + mu*dt + sigma*Z*sqrt(dt)
        let dW = gaussianRandom() * sqrtDt;
        x += (mu * dt) + (sigma * dW);

        // Mapping su canvas (moltiplico x per 100 per lo scaling verticale)
        let canvasX = (i / n) * canvas.width;
        let canvasY = (canvas.height / 2) - (x * 120); 
        
        ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
}

// Avvio automatico al caricamento della pagina
window.onload = runSimulation;

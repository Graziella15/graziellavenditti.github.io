// Generatore di numeri casuali con distribuzione Normale (Box-Muller)
function gaussianRandom() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function runSimulation() {
    const canvas = document.getElementById('abmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Recupero parametri dall'interfaccia
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const T = parseFloat(document.getElementById('T').value);
    
    // Calcolo dt (suddivisione dell'intervallo continuo)
    const dt = T / n;
    const sqrtDt = Math.sqrt(dt);

    // Pulizia canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Disegno asse centrale (punto zero)
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Inizio traiettoria
    let x = 0; 
    ctx.beginPath();
    ctx.strokeStyle = '#0074D9'; // Colore dell'onda
    ctx.lineWidth = 2;
    ctx.moveTo(0, canvas.height / 2);

    for (let i = 1; i <= n; i++) {
        // Equazione ABM: dXt = mu*dt + sigma*dWt
        // dWt è modellato come Z * sqrt(dt)
        let dW = gaussianRandom() * sqrtDt;
        x += (mu * dt) + (sigma * dW);

        // Coordinate per il disegno
        let canvasX = (i / n) * canvas.width;
        // Scaliamo il valore di x per renderlo visibile sul canvas (es. * 100)
        let canvasY = (canvas.height / 2) - (x * 100); 
        
        ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();
}

// Avvia una simulazione al caricamento della pagina
window.onload = runSimulation;

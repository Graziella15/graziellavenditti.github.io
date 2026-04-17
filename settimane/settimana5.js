function generateGBM() {
    const canvas = document.getElementById('gbmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Reset canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Parametri
    const S0 = parseFloat(document.getElementById('s0').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const m = parseInt(document.getElementById('paths').value);
    
    const T = 1.0; // Tempo totale
    const dt = T / n;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Colori per le traiettorie
    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c'];

    // Funzione per generare Random Normal (Box-Muller)
    function randomNormal() {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    let allPaths = [];
    let maxS = 0;
    let minS = S0;

    // Calcolo preventivo per trovare i limiti del grafico
    for (let i = 0; i < m; i++) {
        let path = [S0];
        let currentS = S0;
        for (let j = 0; j < n; j++) {
            let drift = (mu - 0.5 * Math.pow(sigma, 2)) * dt;
            let diffusion = sigma * Math.sqrt(dt) * randomNormal();
            currentS = currentS * Math.exp(drift + diffusion);
            path.push(currentS);
            if (currentS > maxS) maxS = currentS;
            if (currentS < minS) minS = currentS;
        }
        allPaths.push(path);
    }

    // Disegno delle traiettorie
    allPaths.forEach((path, index) => {
        ctx.beginPath();
        ctx.strokeStyle = colors[index % colors.length];
        ctx.lineWidth = 2;

        for (let j = 0; j < path.length; j++) {
            let x = (j / n) * canvas.width;
            // Normalizzazione Y: (S - min) / (max - min)
            let y = canvas.height - ((path[j] - minS) / (maxS - minS) * (canvas.height * 0.8) + canvas.height * 0.1);
            
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    });

    // Disegno asse zero (opzionale per GBM poiché S è sempre > 0)
    ctx.strokeStyle = "#ccc";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - 20);
    ctx.lineTo(canvas.width, canvas.height - 20);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Genera una simulazione all'avvio
window.onload = generateGBM;

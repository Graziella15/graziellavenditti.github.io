function generateSimulation() {
    const abmCanvas = document.getElementById('abmCanvas');
    const gbmCanvas = document.getElementById('gbmCanvas');
    
    const ctxABM = abmCanvas.getContext('2d');
    const ctxGBM = gbmCanvas.getContext('2d');
    
    // Configurazione dimensioni per alta definizione (basata sullo spazio CSS reale)
    abmCanvas.width = abmCanvas.offsetWidth;
    abmCanvas.height = abmCanvas.offsetHeight;
    gbmCanvas.width = gbmCanvas.offsetWidth;
    gbmCanvas.height = gbmCanvas.offsetHeight;

    // Recupero dei parametri di input
    const S0 = parseFloat(document.getElementById('s0').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const m = parseInt(document.getElementById('paths').value);
    
    const dt = 1.0 / n; // Orizzonte temporale T = 1 anno
    
    // Pulizia dei canvas
    ctxABM.clearRect(0, 0, abmCanvas.width, abmCanvas.height);
    ctxGBM.clearRect(0, 0, gbmCanvas.width, gbmCanvas.height);

    const colors = ['#0984e3', '#e17055', '#00b894', '#6c5ce7', '#d63031'];

    // Algoritmo di Box-Muller per estrarre campioni da una Normale Standard Z ~ N(0,1)
    function boxMuller() {
        let u = Math.random(), v = Math.random();
        while(u === 0) u = Math.random(); // Evita il logaritmo di zero
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    let abmTrajectories = [];
    let gbmTrajectories = [];
    
    // Variabili per tracciare i massimi e minimi di ciascun grafico (servono alla riscalatura dell'asse Y)
    let abmMax = -Infinity, abmMin = Infinity;
    let gbmMax = -Infinity, gbmMin = Infinity;

    // Generazione delle traiettorie accoppiate
    for (let i = 0; i < m; i++) {
        let abmPath = [S0];
        let gbmPath = [S0];
        
        let currentX = 0; // Componente dell'esponente stocastico (ABM normalizzato a 0)
        let currentS = S0; // Prezzo di partenza del GBM
        
        // Drift lineare dell'ABM corretto per il lemma di Itô
        const alpha = mu - 0.5 * sigma * sigma;

        for (let j = 0; j < n; j++) {
            let z = boxMuller(); // Generazione dell'unico shock stocastico del passo
            
            // 1. Avanzamento dell'esponente (Aritmetico puro nell'esponente)
            currentX += alpha * dt + sigma * Math.sqrt(dt) * z;
            
            // 2. Calcolo dell'ABM riscalato per il grafico (parte da S0 in modo additivo)
            // Serve a confrontarlo sulla stessa scala lineare dei prezzi dell'asset
            let abmVal = S0 + currentX * S0; 
            abmPath.push(abmVal);
            
            // 3. Calcolo del GBM (Passaggio Geometrico puro / Esponenziale dello stesso esponente stocastico)
            currentS = S0 * Math.exp(currentX);
            gbmPath.push(currentS);
            
            // Tracciamento estremi per ABM
            if (abmVal > abmMax) abmMax = abmVal;
            if (abmVal < abmMin) abmMin = abmVal;
            
            // Tracciamento estremi per GBM
            if (currentS > gbmMax) gbmMax = currentS;
            if (currentS < gbmMin) gbmMin = currentS;
        }
        abmTrajectories.push(abmPath);
        gbmTrajectories.push(gbmPath);
    }

    // Assicuriamo un minimo di margine se i calcoli generano valori stabili
    if (abmMax === abmMin) { abmMax += 1; abmMin -= 1; }
    if (gbmMax === gbmMin) { gbmMax += 1; gbmMin -= 1; }

    // --- DISEGNO SUL CANVAS DEL MOTO BROWNIANO ARITMETICO (ABM) ---
    abmTrajectories.forEach((path, idx) => {
        ctxABM.beginPath();
        ctxABM.strokeStyle = colors[idx % colors.length];
        ctxABM.lineWidth = 2;

        for (let j = 0; j < path.length; j++) {
            let x = (j / n) * abmCanvas.width;
            // Scalatura Y con margine simmetrico del 10%
            let y = abmCanvas.height - ((path[j] - abmMin) / (abmMax - abmMin) * (abmCanvas.height * 0.8) + abmCanvas.height * 0.1);
            
            if (j === 0) ctxABM.moveTo(x, y);
            else ctxABM.lineTo(x, y);
        }
        ctxABM.stroke();
    });

    // --- DISEGNO SUL CANVAS DEL MOTO BROWNIANO GEOMETRICO (GBM) ---
    gbmTrajectories.forEach((path, idx) => {
        ctxGBM.beginPath();
        ctxGBM.strokeStyle = colors[idx % colors.length];
        ctxGBM.lineWidth = 2;

        for (let j = 0; j < path.length; j++) {
            let x = (j / n) * gbmCanvas.width;
            // Scalatura Y con margine simmetrico del 10%
            let y = gbmCanvas.height - ((path[j] - gbmMin) / (gbmMax - gbmMin) * (gbmCanvas.height * 0.8) + gbmCanvas.height * 0.1);
            
            if (j === 0) ctxGBM.moveTo(x, y);
            else ctxGBM.lineTo(x, y);
        }
        ctxGBM.stroke();
    });
}

// Avvio automatico al caricamento della pagina web
window.onload = generateSimulation;

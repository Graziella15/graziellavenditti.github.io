const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const desc = document.getElementById('description');

function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 1. Weak/Strong Law of Large Numbers (LLN)
function runLLN() {
    initCanvas();
    let sum = 0;
    let points = [];
    ctx.strokeStyle = '#64ffda';
    ctx.beginPath();

    for (let n = 1; n <= 1000; n++) {
        sum += Math.random(); // Uniforme (0,1), media = 0.5
        let average = sum / n;
        let x = (n / 1000) * canvas.width;
        let y = canvas.height - (average * canvas.height);
        
        if (n === 1) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Linea del Valore Atteso
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#ff5555';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
    ctx.setLineDash([]);
    
    desc.innerText = "LLN: La media campionaria converge quasi certamente al valore atteso E[X] = 0.5.";
}

// 2. Central Limit Theorem (CLT)
function runCLT() {
    initCanvas();
    let sums = new Array(100).fill(0);
    const iterations = 5000;
    const nVariables = 10;

    for (let i = 0; i < iterations; i++) {
        let currentSum = 0;
        for (let j = 0; j < nVariables; j++) currentSum += Math.random();
        let bucket = Math.floor((currentSum / nVariables) * 100);
        if (sums[bucket] !== undefined) sums[bucket]++;
    }

    ctx.fillStyle = '#64ffda';
    sums.forEach((count, i) => {
        let x = (i / 100) * canvas.width;
        let h = (count / iterations) * canvas.height * 10;
        ctx.fillRect(x, canvas.height - h, canvas.width/100, h);
    });
    
    desc.innerText = "CLT: La somma di variabili i.i.d. converge a una distribuzione Normale.";
}

// 3. Invariance Principle & Wiener Process (BM)
function runWiener() {
    initCanvas();
    ctx.strokeStyle = '#64ffda';
    ctx.lineWidth = 1.5;
    
    let x = 0;
    let y = canvas.height / 2;
    ctx.beginPath();
    ctx.moveTo(x, y);

    const steps = 1000;
    const dx = canvas.width / steps;
    
    for (let i = 0; i < steps; i++) {
        x += dx;
        // Incrementi normali approssimati (Random Walk -> BM)
        y += (Math.random() - 0.5) * 15; 
        ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    desc.innerText = "Invariance Principle: Una random walk riscalata converge debolmente al moto browniano (W_t).";
}

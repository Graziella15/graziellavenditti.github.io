function generateGBM() {
    const canvas = document.getElementById('gbmCanvas');
    const ctx = canvas.getContext('2d');
    
    // Resize per alta definizione
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const S0 = parseFloat(document.getElementById('s0').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const m = parseInt(document.getElementById('paths').value);
    
    const dt = 1.0 / n; // Assumiamo T = 1 anno
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const colors = ['#0984e3', '#e17055', '#00b894', '#6c5ce7', '#d63031'];

    // Box-Muller per Normale Standard
    function boxMuller() {
        let u = Math.random(), v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    let trajectories = [];
    let globalMax = 0;
    let globalMin = S0;

    // Generazione traiettorie
    for (let i = 0; i < m; i++) {
        let path = [S0];
        let currentS = S0;
        for (let j = 0; j < n; j++) {
            let z = boxMuller();
            // Formula risolutiva GBM: S(t+dt) = S(t) * exp((mu - 0.5*sigma^2)dt + sigma*sqrt(dt)*z)
            currentS *= Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * Math.sqrt(dt) * z);
            path.push(currentS);
            if (currentS > globalMax) globalMax = currentS;
            if (currentS < globalMin) globalMin = currentS;
        }
        trajectories.push(path);
    }

    // Disegno
    trajectories.forEach((path, idx) => {
        ctx.beginPath();
        ctx.strokeStyle = colors[idx % colors.length];
        ctx.lineWidth = 2;

        for (let j = 0; j < path.length; j++) {
            let x = (j / n) * canvas.width;
            // Scalatura Y con margine del 10%
            let y = canvas.height - ((path[j] - globalMin) / (globalMax - globalMin) * (canvas.height * 0.8) + canvas.height * 0.1);
            
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
    });
}

// Avvio automatico
window.onload = generateGBM;

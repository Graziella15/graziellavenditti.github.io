const canvas = document.getElementById('chartCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('btnSimula');
const inputN = document.getElementById('nSteps');

function draw() {
    const n = parseInt(inputN.value);
    
    // Setup dimensioni canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const w = canvas.width;
    const h = canvas.height;
    const midY = h / 2;
    
    ctx.clearRect(0, 0, w, h);
    
    // Disegno asse zero
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(0, midY); ctx.lineTo(w, midY);
    ctx.stroke();

    // Calcolo Random Walk
    let currentY = 0;
    const dx = w / n;
    
    // Lo scaling verticale dinamico basato su 1/sqrt(n)
    // Usiamo un moltiplicatore costante (es. 200) per la visibilità
    const verticalScale = 200; 

    ctx.beginPath();
    ctx.strokeStyle = '#d93025'; // Rosso
    ctx.lineWidth = 1.5;
    ctx.moveTo(0, midY);

    for (let i = 1; i <= n; i++) {
        const step = Math.random() < 0.5 ? 1 : -1;
        currentY += step;
        
        const x = i * dx;
        // Formula di Donsker: somma / sqrt(n)
        const y = midY - (currentY / Math.sqrt(n)) * verticalScale;
        
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
}

btn.addEventListener('click', draw);
window.onload = draw;

 


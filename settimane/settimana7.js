function simulate() {
    const canvas = document.getElementById('wienerCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = '#1e3a34';
    ctx.lineWidth = 2;
    
    let x = 0;
    let y = canvas.height / 2;
    ctx.moveTo(x, y);
    
    for (let i = 0; i < canvas.width; i++) {
        y += (Math.random() - 0.5) * 7;
        ctx.lineTo(i, y);
    }
    ctx.stroke();
}

// Avvia la prima volta al caricamento
window.onload = simulate;

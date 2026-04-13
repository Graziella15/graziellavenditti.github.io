document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('btnSimula');

    function draw() {
        const n = parseInt(document.getElementById('stepsN').value) || 1000;
        const m = parseInt(document.getElementById('pathsM').value) || 5;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const w = canvas.width;
        const h = canvas.height;
        const midY = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Asse centrale
        ctx.strokeStyle = '#ddd';
        ctx.beginPath();
        ctx.moveTo(0, midY); ctx.lineTo(w, midY);
        ctx.stroke();

        const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f1c40f', '#9b59b6'];

        for (let j = 0; j < m; j++) {
            let currentSum = 0;
            const dx = w / n;
            // Scaling verticale basato su 1/sqrt(n) + ampiezza visiva
            const visualScale = 150; 

            ctx.beginPath();
            ctx.strokeStyle = colors[j % colors.length];
            ctx.lineWidth = 1;
            ctx.moveTo(0, midY);

            for (let i = 1; i <= n; i++) {
                const step = Math.random() < 0.5 ? 1 : -1;
                currentSum += step;
                
                const x = i * dx;
                // FORMULA: S_k / sqrt(n)
                const y = midY - (currentSum / Math.sqrt(n)) * visualScale;
                
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }

    btn.addEventListener('click', draw);
    draw(); // Esegue alla ricarica
});



 


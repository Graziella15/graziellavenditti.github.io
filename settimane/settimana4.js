document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('brownianCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('runBtn');

    function simulate() {
        const n = parseInt(document.getElementById('stepsN').value) || 1000;
        const m = parseInt(document.getElementById('pathsM').value) || 5;

        // Adatta dimensioni canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const w = canvas.width;
        const h = canvas.height;
        const midY = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Disegno asse zero
        ctx.strokeStyle = '#e1e4e8';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, midY); ctx.lineTo(w, midY);
        ctx.stroke();
        ctx.setLineDash([]); // Reset tratteggio

        const colors = ['#4267B2', '#DB4437', '#0F9D58', '#F4B400', '#AB47BC'];

        for (let j = 0; j < m; j++) {
            let currentSum = 0;
            const dx = w / n;
            
            // Scaling verticale: ampiezza visiva per vedere bene i movimenti
            // Il fattore critico è 1/Math.sqrt(n)
            const visualHeight = h * 0.4; 

            ctx.beginPath();
            ctx.strokeStyle = colors[j % colors.length];
            ctx.lineWidth = 1.5;
            ctx.moveTo(0, midY);

            for (let i = 1; i <= n; i++) {
                // Variabile di Rademacher
                const step = Math.random() < 0.5 ? 1 : -1;
                currentSum += step;
                
                const x = i * dx;
                // APPLICAZIONE DELLO SCALING 1/sqrt(n)
                const y = midY - (currentSum / Math.sqrt(n)) * visualHeight;
                
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }

    btn.addEventListener('click', simulate);
    simulate(); // Avvia simulazione al caricamento
});


 


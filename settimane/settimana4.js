document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('brownianCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('runBtn');

    function simulate() {
        const n = parseInt(document.getElementById('stepsN').value) || 1000;
        const m = parseInt(document.getElementById('pathsM').value) || 5;

        // Reset dimensioni canvas per alta risoluzione
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const w = canvas.width;
        const h = canvas.height;
        const midY = h / 2;

        ctx.clearRect(0, 0, w, h);

        // Disegno asse orizzontale di riferimento
        ctx.strokeStyle = '#ecf0f1';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        ctx.stroke();

        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];

        // Simulazione delle traiettorie
        for (let j = 0; j < m; j++) {
            let currentSum = 0;
            const dx = w / n;
            
            // Ampiezza visiva verticale: 
            // Scaliamo il grafico in modo che la deviazione standard occupi una buona parte del canvas
            const visualHeight = h * 0.35; 

            ctx.beginPath();
            ctx.strokeStyle = colors[j % colors.length];
            ctx.lineWidth = 1.2;
            ctx.moveTo(0, midY);

            for (let i = 1; i <= n; i++) {
                // Passo di Rademacher: +1 o -1
                const step = Math.random() < 0.5 ? 1 : -1;
                currentSum += step;
                
                const x = i * dx;
                // FORMULA DI DONSKER: scaling spaziale per 1/sqrt(n)
                const y = midY - (currentSum / Math.sqrt(n)) * visualHeight;
                
                ctx.lineTo(x, y);
            }
            ctx.stroke();
        }
    }

    // Listener per il pulsante
    btn.addEventListener('click', simulate);

    // Esegui una simulazione iniziale all'avvio
    simulate();
});

 


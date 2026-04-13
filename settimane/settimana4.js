document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('brownianCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('runBtn');
    const inputSteps = document.getElementById('stepsInput');

    function drawSimulation() {
        const n = parseInt(inputSteps.value) || 1000;
        
        // Adatta il canvas alla larghezza del contenitore
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;
        
        // Pulizia canvas
        ctx.clearRect(0, 0, width, height);

        // Disegno asse orizzontale (Media)
        ctx.strokeStyle = '#eee';
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Parametri Random Walk
        let currentSum = 0;
        const stepX = width / n;
        
        // Scaling factor: 1/sqrt(n)
        // Aggiungiamo un moltiplicatore visivo (es. 150) per rendere i movimenti visibili sul canvas
        const visualScaling = 150 * (Math.sqrt(2000) / Math.sqrt(n)); 

        ctx.beginPath();
        ctx.strokeStyle = '#e67e22'; // Arancione per la traiettoria
        ctx.lineWidth = 1.5;
        ctx.moveTo(0, centerY);

        for (let k = 1; k <= n; k++) {
            // Variabile di Rademacher (-1 o +1)
            const rademacher = Math.random() < 0.5 ? 1 : -1;
            currentSum += rademacher;

            // Coordinate: X è il tempo (k/n), Y è la somma riscalata per 1/sqrt(n)
            const x = k * stepX;
            const y = centerY - (currentSum / Math.sqrt(n)) * visualScaling;

            ctx.lineTo(x, y);
        }

        ctx.stroke();
    }

    // Event listener per il bottone
    btn.addEventListener('click', drawSimulation);

    // Esegui una prima simulazione all'avvio
    drawSimulation();
});


document.addEventListener('DOMContentLoaded', () => {
    // Inizializzazione degli elementi HTML
    const canvas = document.getElementById('simulationCanvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('generateBtn');
    
    // Inputs
    const inputStepsN = document.getElementById('stepsN');
    const inputPathsM = document.getElementById('pathsM');
    const inputTimeT = document.getElementById('timeT');
    
    // Displays nelle etichette
    const displaysN = [document.getElementById('nValueDisplay'), document.getElementById('nValueDisplay2')];

    // Colori per le traiettorie
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e'];

    // Funzione principale di disegno
    function drawSimulation() {
        const n = parseInt(inputStepsN.value) || 200;
        const m = parseInt(inputPathsM.value) || 3;
        const T = parseFloat(inputTimeT.value) || 1;

        // Aggiorna i testi nella pagina
        displaysN.forEach(el => el.textContent = n);

        // Adatta il canvas alla larghezza del contenitore mantenedo l'altezza definita nel CSS
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        const width = canvas.width;
        const height = canvas.height;
        const padding = 30; // Spazio per le etichette degli assi

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, width, height);

        // --- Disegno degli Assi ---
        const centerY = height / 2;
        const xAxisStart = padding;
        const xAxisEnd = width - padding;
        const yAxisTop = padding;
        const yAxisBottom = height - padding;

        // Disegno asse X e Y base
        ctx.beginPath();
        ctx.strokeStyle = '#dfe6e9';
        ctx.lineWidth = 1.5;
        // Asse X a y=0
        ctx.moveTo(xAxisStart, centerY); ctx.lineTo(xAxisEnd, centerY);
        // Asse Y principale
        ctx.moveTo(xAxisStart, yAxisTop); ctx.lineTo(xAxisStart, yAxisBottom);
        ctx.stroke();

        // Disegno la griglia verticale (Asse t)
        ctx.lineWidth = 0.5;
        ctx.font = '10px Segoe UI';
        ctx.fillStyle = '#666';
        for (let i = 0; i <= 5; i++) {
            const timeVal = (T / 5) * i;
            const x = xAxisStart + (width - 2 * padding) * (i / 5);
            ctx.beginPath();
            ctx.moveTo(x, yAxisTop);
            ctx.lineTo(x, yAxisBottom);
            ctx.stroke();
            // Etichetta t
            ctx.fillText(timeVal.toFixed(2), x - 10, yAxisBottom + 12);
        }
        ctx.fillText('t', width - 20, yAxisBottom + 12);

        // --- Logica Matematica (Random Walk) ---
        const dx = (width - 2 * padding) / n; // Spostamento orizzontale per passo
        
        // Calcoliamo la somma massima potenziale per lo scaling visivo sull'asse Y
        // La deviazione standard del Moto Browniano è sqrt(T).
        // Per visualizzare bene, scaliamo l'asse Y per coprire +/- 2.5 * sqrt(T)
        const yMaxAbsVal = 2.5 * Math.sqrt(T);
        const yMaxValInPixels = (height - 2 * padding) / 2;
        
        // Funzione per mappare il valore matematico della simulazione ai pixel del canvas
        function mapToCanvasY(value) {
            // Mappa valore matematica -> pixel, invertendo l'asse Y (canvas 0 è in alto)
            return centerY - (value / yMaxAbsVal) * yMaxValInPixels;
        }

        // --- Disegno delle Traiettorie (m percorsi) ---
        for (let j = 0; j < m; j++) {
            let currentSum = 0; // S_k
            
            ctx.beginPath();
            ctx.strokeStyle = colors[j % colors.length]; // Usa colori diversi
            ctx.lineWidth = 1;
            ctx.moveTo(xAxisStart, centerY); // Inizio a (0,0)

            for (let k = 1; k <= n; k++) {
                // Generazione variabile di Rademacher (-1 o +1)
                const rademacherStep = Math.random() < 0.5 ? 1 : -1;
                currentSum += rademacherStep;

                // Calcolo coordinate matematiche
                // Donsker scaling: W_n(t) = (1/sqrt(n)) * S_k
                const mathematicalY = currentSum / Math.sqrt(n);
                
                // Mappatura a pixel
                const pixelX = xAxisStart + k * dx;
                const pixelY = mapToCanvasY(mathematicalY);

                // Disegno il segmento solo se all'interno del grafico
                if (pixelY > yAxisTop && pixelY < yAxisBottom) {
                    ctx.lineTo(pixelX, pixelY);
                } else if (pixelY <= yAxisTop) {
                    ctx.lineTo(pixelX, yAxisTop);
                } else if (pixelY >= yAxisBottom) {
                    ctx.lineTo(pixelX, yAxisBottom);
                }
            }
            ctx.stroke();
        }
        
        // Disegno le etichette per l'asse Y (massimi e minimi visibili)
        ctx.fillStyle = '#666';
        ctx.fillText(yMaxAbsVal.toFixed(2), padding + 5, yAxisTop + 10);
        ctx.fillText("-" + yMaxAbsVal.toFixed(2), padding + 5, yAxisBottom - 5);
        ctx.fillText('S_n(t)', padding + 5, padding - 5);
    }

    // Listener per il bottone e inizializzazione
    btn.addEventListener('click', drawSimulation);
    drawSimulation(); // Disegna subito all'avvio
});



 


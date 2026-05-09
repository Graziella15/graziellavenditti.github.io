/**
 * Simulazione del Principio di Invarianza (Teorema di Donsker)
 * Mostra come una somma di variabili i.i.d. riscalata converge a un processo di Wiener.
 */

function simulate() {
    const canvas = document.getElementById('wienerCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Adatta il canvas alla larghezza del contenitore
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Pulizia
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Parametri
    const steps = 1000;         // Numero di passi (n)
    const dt = canvas.width / steps;
    const scaleFactor = 30;     // Riscalamento visivo per la varianza
    
    // Punto di partenza (Origine: t=0, W(0)=0)
    let x = 0;
    let y = canvas.height / 2;
    let currentW = 0;           // Valore del processo di Wiener
    
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#007bff';
    ctx.moveTo(x, y);

    for (let i = 0; i < steps; i++) {
        // Generazione incremento: secondo la teoria, 
        // gli incrementi devono avere Media 0 e Varianza proporzionale a dt.
        // Qui usiamo una distribuzione uniforme riscalata per approssimare la normale.
        const increment = (Math.random() - 0.5) * 2; 
        
        // Accumuliamo (Somma parziale)
        currentW += increment;
        
        // Calcoliamo le coordinate
        x += dt;
        // Invarianza: W(t) ~ sqrt(n). Qui applichiamo un riscalamento grafico.
        const drawY = (canvas.height / 2) - (currentW * scaleFactor / Math.sqrt(steps / 10));
        
        ctx.lineTo(x, drawY);
    }
    
    ctx.stroke();
    
    // Aggiungiamo una linea di base per lo zero
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = '#ccc';
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
    ctx.setLineDash([]);
}

// Avvia la simulazione al caricamento della pagina
window.addEventListener('load', simulate);

// Rendi disponibile la funzione per il bottone
window.runSimulation = simulate;

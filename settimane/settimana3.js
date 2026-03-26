let myChart;

function generaRandomWalk() {
    const n = 200; // Numero di passi nella simulazione
    let x = 1000;  // Valore iniziale x(0)
    let dati = [x];
    let etichette = [0];

    for (let i = 1; i <= n; i++) {
        // Generazione del salto casuale +1 o -1
        const salto = Math.random() < 0.5 ? 1 : -1;
        x = x + salto;
        
        dati.push(x);
        etichette.push(i);
    }

    const ctx = document.getElementById('walkChart').getContext('2d');
    
    // Reset del grafico se già esistente
    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: etichette,
            datasets: [{
                label: 'Prezzo Simulato x(i)',
                data: dati,
                borderColor: '#2ecc71',
                backgroundColor: 'rgba(46, 204, 113, 0.1)',
                borderWidth: 2,
                fill: true,
                pointRadius: 0,
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    ticks: { color: '#2c3e50' },
                    grid: { color: '#ecf0f1' }
                },
                x: { 
                    grid: { display: false }
                }
            }
        }
    });
}

// Avvio al caricamento della pagina
window.onload = generaRandomWalk;
    


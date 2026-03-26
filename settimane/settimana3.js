let myChart;

function generaRandomWalk() {
    const passi = 100; // Quanti salti vogliamo fare
    let x = 1000;      // Valore iniziale x(0)
    let dati = [x];
    let etichette = [0];

    for (let i = 1; i <= passi; i++) {
        // Genera +1 o -1 in modo casuale
        const salto = Math.random() < 0.5 ? 1 : -1;
        x = x + salto;
        
        dati.push(x);
        etichette.push(i);
    }

    renderGrafico(etichette, dati);
}

function renderGrafico(labels, data) {
    const ctx = document.getElementById('walkChart').getContext('2d');
    
    // Se il grafico esiste già, lo distruggiamo per crearne uno nuovo
    if (myChart) myChart.destroy();

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Prezzo Simulato (Random Walk)',
                data: data,
                borderColor: '#2ecc71',
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }]
        }
    });
}

// Avvia la prima simulazione all'apertura
window.onload = generaRandomWalk;

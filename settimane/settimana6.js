let chart;

// Funzione per generare numeri casuali con distribuzione Normale (Gaussiana)
// Essenziale per vedere oscillazioni realistiche e quindi il Drawdown
function gaussianRandom() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function runSimulation() {
    const steps = 100;
    let price = 100;      
    let mu = 0.1;         // Drift (Rendimento annuo)
    let sigma = 0.3;      // Volatilità (Aumentata per vedere il DD)
    let dt = 1/steps;
    
    let prices = [price];
    let pnl = [0];
    let currentPnl = 0;
    let maxPnlSoFar = 0;
    let maxDD = 0;

    for (let i = 1; i < steps; i++) {
        // 1. GBM Corretto: dP = P * (mu*dt + sigma*W)
        let Wiener = gaussianRandom();
        let change = price * (mu * dt + sigma * Math.sqrt(dt) * Wiener);
        let nextPrice = price + change;

        // 2. Strategia: "Trend Following"
        // Se il prezzo dell'ultimo step è salito, scommetto che salirà ancora (Long)
        // Se è sceso, scommetto che scenderà (Short)
        let lastReturn = nextPrice - price;
        let signal = (prices[i-1] < price) ? 1 : -1; 
        let gainLoss = signal * lastReturn;
        
        currentPnl += gainLoss;
        
        prices.push(nextPrice);
        pnl.push(currentPnl);

        // 3. LOGICA DRAWDOWN (Corretta)
        // Il DD esiste solo se il PnL attuale è SOTTO il massimo storico raggiunto
        if (currentPnl > maxPnlSoFar) {
            maxPnlSoFar = currentPnl;
        }

        let currentDD = maxPnlSoFar - currentPnl;

        if (currentDD > maxDD) {
            maxDD = currentDD;
        }

        price = nextPrice;
    }

    updateUI(prices, pnl, currentPnl, maxDD);
}

function updateUI(prices, pnl, finalPnl, maxDD) {
    // Usiamo toFixed(2) per vedere i decimali, se è molto piccolo vedrai comunque cifre diverse da 0
    document.getElementById('pnl-value').innerText = `€ ${finalPnl.toFixed(2)}`;
    document.getElementById('dd-value').innerText = `€ ${maxDD.toFixed(2)}`;

    const ctx = document.getElementById('tradingChart').getContext('2d');
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: prices.length}, (_, i) => i),
            datasets: [{
                label: 'Prezzo Asset (GBM)',
                data: prices,
                borderColor: '#3498db',
                borderWidth: 2,
                pointRadius: 0,
                yAxisID: 'y',
            }, {
                label: 'PnL Strategia',
                data: pnl,
                borderColor: '#e67e22', // Arancione per distinguere
                borderWidth: 2,
                pointRadius: 0,
                yAxisID: 'y1',
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { type: 'linear', position: 'left', title: { display: true, text: 'Prezzo Asset' } },
                y1: { type: 'linear', position: 'right', title: { display: true, text: 'PnL Accumulato' }, grid: { drawOnChartArea: false } }
            }
        }
    });
}

let chart;

function runSimulation() {
    const steps = 100;
    let price = 100;      // Prezzo iniziale
    let mu = 0.05;        // Drift (rendimento atteso)
    let sigma = 0.2;      // Volatilità
    let dt = 1/steps;
    
    let prices = [price];
    let pnl = [0];
    let currentPnl = 0;
    let maxPnl = 0;
    let maxDD = 0;

    for (let i = 1; i < steps; i++) {
        // 1. Calcolo Geometric Brownian Motion
        let drift = mu * price * dt;
        let diffusion = sigma * price * Math.sqrt(dt) * (Math.random() * 2 - 1); 
        let nextPrice = price + drift + diffusion;

        // 2. Strategia: Buy if price > previous price, else Sell
        let returns = (nextPrice - price);
        let strategySignal = nextPrice > price ? 1 : -1;
        let gainLoss = strategySignal * returns;
        
        currentPnl += gainLoss;
        prices.push(nextPrice);
        pnl.push(currentPnl);

        // 3. Calcolo Massimo Drawdown
        if (currentPnl > maxPnl) maxPnl = currentPnl;
        let dd = maxPnl - currentPnl;
        if (dd > maxDD) maxDD = dd;

        price = nextPrice;
    }

    updateUI(prices, pnl, currentPnl, maxDD);
}

function updateUI(prices, pnl, finalPnl, maxDD) {
    document.getElementById('pnl-value').innerText = `€ ${finalPnl.toFixed(2)}`;
    document.getElementById('dd-value').innerText = `${maxDD.toFixed(2)} %`;

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
                yAxisID: 'y',
            }, {
                label: 'PnL Strategia',
                data: pnl,
                borderColor: '#2ecc71',
                yAxisID: 'y1',
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { type: 'linear', position: 'left', title: { display: true, text: 'Prezzo' } },
                y1: { type: 'linear', position: 'right', title: { display: true, text: 'Profit/Loss' }, grid: { drawOnChartArea: false } }
            }
        }
    });
}

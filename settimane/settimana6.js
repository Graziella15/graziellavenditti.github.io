let priceChart;
let pnlChart;

function randomNormal() {

    let u = 0;
    let v = 0;

    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();

    return Math.sqrt(-2.0 * Math.log(u)) *
           Math.cos(2.0 * Math.PI * v);
}

function movingAverage(data, window) {

    let ma = [];

    for (let i = 0; i < data.length; i++) {

        if (i < window) {
            ma.push(null);
        } else {

            let sum = 0;

            for (let j = i - window; j < i; j++) {
                sum += data[j];
            }

            ma.push(sum / window);
        }
    }

    return ma;
}

function simulate() {

    const S0 = parseFloat(document.getElementById("S0").value);
    const mu = parseFloat(document.getElementById("mu").value);
    const sigma = parseFloat(document.getElementById("sigma").value);
    const steps = parseInt(document.getElementById("steps").value);
    const maWindow = parseInt(document.getElementById("maWindow").value);

    const dt = 1 / 252;

    let prices = [S0];

    for (let i = 1; i < steps; i++) {

        const Z = randomNormal();

        const prev = prices[i - 1];

        const next =
            prev *
            Math.exp(
                (mu - 0.5 * sigma * sigma) * dt +
                sigma * Math.sqrt(dt) * Z
            );

        prices.push(next);
    }

    const ma = movingAverage(prices, maWindow);

    let pnl = [0];
    let drawdown = [0];

    let position = 0;

    let maxPnL = 0;

    for (let i = 1; i < prices.length; i++) {

        if (ma[i] !== null) {

            if (prices[i] > ma[i]) {
                position = 1;
            } else {
                position = 0;
            }
        }

        const dailyPnL =
            pnl[i - 1] +
            position * (prices[i] - prices[i - 1]);

        pnl.push(dailyPnL);

        maxPnL = Math.max(maxPnL, dailyPnL);

        drawdown.push(dailyPnL - maxPnL);
    }

    const maxDD = Math.min(...drawdown);

    document.getElementById("finalPnL").innerText =
        pnl[pnl.length - 1].toFixed(2);

    document.getElementById("maxDD").innerText =
        maxDD.toFixed(2);

    const labels = Array.from({ length: steps }, (_, i) => i);

    if (priceChart) priceChart.destroy();
    if (pnlChart) pnlChart.destroy();

    const ctx1 = document
        .getElementById("priceChart")
        .getContext("2d");

    priceChart = new Chart(ctx1, {

        type: "line",

        data: {

            labels: labels,

            datasets: [
                {
                    label: "Prezzo GBM",
                    data: prices,
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Media Mobile",
                    data: ma,
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                }
            ]
        },

        options: {

            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "Processo GBM e Strategia"
                }
            },

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Tempo"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Prezzo"
                    }
                }
            }
        }
    });

    const ctx2 = document
        .getElementById("pnlChart")
        .getContext("2d");

    pnlChart = new Chart(ctx2, {

        type: "line",

        data: {

            labels: labels,

            datasets: [
                {
                    label: "PnL",
                    data: pnl,
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Drawdown",
                    data: drawdown,
                    borderWidth: 2,
                    borderDash: [10, 5],
                    fill: false
                }
            ]
        },

        options: {

            responsive: true,

            plugins: {
                title: {
                    display: true,
                    text: "PnL e Drawdown"
                }
            },

            scales: {

                x: {
                    title: {
                        display: true,
                        text: "Tempo"
                    }
                },

                y: {
                    title: {
                        display: true,
                        text: "Valore"
                    }
                }
            }
        }
    });
}

document
    .getElementById("simulateBtn")
    .addEventListener("click", simulate);

simulate();

document.getElementById('runAnalysis').addEventListener('click', () => {
    const n = 10000; // Numero di campioni
    const data = Array.from({ length: n }, () => Math.random() * 100);

    // --- 1. Algoritmo Naive ---
    const calculateNaive = (arr) => {
        const n = arr.length;
        const mean = arr.reduce((a, b) => a + b, 0) / n;
        const squareSum = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0);
        return { mean, variance: squareSum / n };
    };

    // --- 2. Algoritmo Online (Welford) ---
    const calculateOnline = (arr) => {
        let n = 0;
        let mean = 0;
        let M2 = 0;

        for (let x of arr) {
            n++;
            let delta = x - mean;
            mean += delta / n;
            let delta2 = x - mean;
            M2 += delta * delta2;
        }
        return { mean, variance: M2 / n };
    };

    const naive = calculateNaive(data);
    const online = calculateOnline(data);

    // Visualizzazione Risultati
    const display = document.getElementById('results');
    display.innerHTML = `
        <table>
            <tr><th>Metodo</th><th>Media</th><th>Varianza</th></tr>
            <tr><td>Naive</td><td>${naive.mean.toFixed(10)}</td><td>${naive.variance.toFixed(10)}</td></tr>
            <tr><td>Online</td><td>${online.mean.toFixed(10)}</td><td>${online.variance.toFixed(10)}</td></tr>
        </table>
        <p class="match">I risultati sono identici (al netto di minime imprecisioni di floating point)? 
        ${(Math.abs(naive.variance - online.variance) < 1e-10) ? "SÌ" : "NO"}</p>
    `;
});

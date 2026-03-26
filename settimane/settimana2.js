document.getElementById('runBtn').addEventListener('click', () => {
    // 1. Generazione dati (10.000 campioni tra 0 e 100)
    const data = Array.from({ length: 10000 }, () => Math.random() * 100);
    
    // 2. Algoritmo Naive (Two-pass)
    const startNaive = performance.now();
    const n = data.length;
    const meanNaive = data.reduce((a, b) => a + b) / n;
    const varianceNaive = data.reduce((a, b) => a + Math.pow(b - meanNaive, 2), 0) / n;
    const endNaive = performance.now();

    // 3. Algoritmo Online (Welford)
    const startOnline = performance.now();
    let meanOnline = 0;
    let M2 = 0;
    for (let i = 0; i < data.length; i++) {
        let x = data[i];
        let count = i + 1;
        let delta = x - meanOnline;
        meanOnline += delta / count;
        let delta2 = x - meanOnline;
        M2 += delta * delta2;
    }
    const varianceOnline = M2 / n;
    const endOnline = performance.now();

    // 4. Visualizzazione Risultati
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = `
        <tr>
            <td><strong>Naive</strong></td>
            <td>${meanNaive.toFixed(6)}</td>
            <td>${varianceNaive.toFixed(6)}</td>
        </tr>
        <tr>
            <td><strong>Online (Welford)</strong></td>
            <td>${meanOnline.toFixed(6)}</td>
            <td>${varianceOnline.toFixed(6)}</td>
        </tr>
    `;
});

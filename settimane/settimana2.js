document.getElementById('runAnalysis').addEventListener('click', () => {
    const n = 10000;
    const data = Array.from({ length: n }, () => Math.random() * 100);

    // --- ALGORITMO NAIVE ---
    let sum = 0;
    let sumSq = 0;
    data.forEach(x => {
        sum += x;
        sumSq += x * x;
    });
    const meanNaive = sum / n;
    const varianceNaive = (sumSq / n) - (meanNaive * meanNaive);

    // --- ALGORITMO ONLINE (Welford) ---
    let count = 0;
    let meanOnline = 0;
    let M2 = 0;
    data.forEach(x => {
        count++;
        let delta = x - meanOnline;
        meanOnline += delta / count;
        let delta2 = x - meanOnline;
        M2 += delta * delta2;
    });
    const varianceOnline = M2 / count;

    displayResults(meanNaive, varianceNaive, meanOnline, varianceOnline);
});

function displayResults(mN, vN, mO, vO) {
    const container = document.getElementById('results');
    container.innerHTML = `
        <div class="result-grid">
            <div class="card">
                <h3>Algoritmo Naive</h3>
                <p>Media: <b>${mN.toFixed(6)}</b></p>
                <p>Varianza: <b>${vN.toFixed(6)}</b></p>
            </div>
            <div class="card">
                <h3>Algoritmo Online</h3>
                <p>Media: <b>${mO.toFixed(6)}</b></p>
                <p>Varianza: <b>${vO.toFixed(6)}</b></p>
            </div>
        </div>
        <p style="margin-top:20px"><i>Nota: La differenza tra i due è minima con numeri piccoli, ma l'algoritmo Online è più stabile con dataset enormi.</i></p>
    `;
}

document.getElementById('runBtn').addEventListener('click', () => {
    const n = parseInt(document.getElementById('sampleSize').value);
    
    // 1. Generazione dati con Math.random()
    const dati = Array.from({ length: n }, () => Math.random());

    // 2. Calcolo Naive
    const t0 = performance.now();
    const resNaive = calcolaNaive(dati);
    const t1 = performance.now();

    // 3. Calcolo Online (Welford)
    const t2 = performance.now();
    const resOnline = calcolaOnline(dati);
    const t3 = performance.now();

    renderTable(resNaive, resOnline, (t1 - t0), (t3 - t2));
});

function calcolaNaive(data) {
    const n = data.length;
    const media = data.reduce((a, b) => a + b, 0) / n;
    const varianza = data.reduce((acc, x) => acc + Math.pow(x - media, 2), 0) / n;
    return { media, varianza };
}

function calcolaOnline(data) {
    let n = 0, media = 0, M2 = 0;
    for (let x of data) {
        n++;
        let delta = x - media;
        media += delta / n;
        M2 += delta * (x - media);
    }
    return { media, varianza: M2 / n };
}

function renderTable(naive, online, timeN, timeO) {
    const body = document.getElementById('resultBody');
    body.innerHTML = `
        <tr>
            <td><strong>Naive</strong></td>
            <td>${naive.media.toFixed(6)}</td>
            <td>${naive.varianza.toFixed(6)}</td>
            <td>${timeN.toFixed(2)} ms</td>
        </tr>
        <tr>
            <td><strong>Online</strong></td>
            <td>${online.media.toFixed(6)}</td>
            <td>${online.varianza.toFixed(6)}</td>
            <td>${timeO.toFixed(2)} ms</td>
        </tr>
    `;
}

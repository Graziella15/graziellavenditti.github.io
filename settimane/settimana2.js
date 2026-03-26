let interval = null;
let n = 0;

// Variabili Naive
let sum = 0;
let sumSq = 0;

// Variabili Online (Welford)
let meanOnline = 0;
let M2 = 0;

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const tbody = document.getElementById('results-body');

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    stopBtn.disabled = false;

    interval = setInterval(() => {
        n++;
        // Generiamo un numero random tra 1 e 100
        const x = Math.random() * 100;

        // --- CALCOLO NAIVE ---
        sum += x;
        sumSq += x * x;
        const meanNaive = sum / n;
        // Varianza Naive: (Somma dei quadrati / n) - (media al quadrato)
        const varNaive = n > 1 ? (sumSq / n) - (meanNaive * meanNaive) : 0;

        // --- CALCOLO ONLINE (Welford) ---
        const delta = x - meanOnline;
        meanOnline += delta / n;
        const delta2 = x - meanOnline;
        M2 += delta * delta2;
        // Varianza Online: M2 / n (varianza di popolazione)
        const varOnline = n > 1 ? M2 / n : 0;

        // Aggiunta riga in cima alla tabella
        const row = tbody.insertRow(0);
        row.innerHTML = `
            <td>${n}</td>
            <td>${x.toFixed(2)}</td>
            <td>${meanNaive.toFixed(4)}</td>
            <td>${meanOnline.toFixed(4)}</td>
            <td style="color: #d9534f">${varNaive.toFixed(4)}</td>
            <td style="color: #5cb85c">${varOnline.toFixed(4)}</td>
        `;

        // Fermati automaticamente dopo 100 righe per non appesantire il browser
        if (n >= 100) stopAnalysis();
        
    }, 300);
});

stopBtn.addEventListener('click', stopAnalysis);

function stopAnalysis() {
    clearInterval(interval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

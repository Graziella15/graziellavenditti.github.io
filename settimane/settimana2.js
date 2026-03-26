document.getElementById('generateBtn').addEventListener('click', () => {
    const n = parseInt(document.getElementById('count').value);
    if (isNaN(n) || n <= 0) return alert("Inserisci un numero valido");

    const data = Array.from({ length: n }, () => Math.random() * 100);

    // --- ALGORITMO NAIVE ---
    // Formula: Var = (Σx² / n) - (Σx / n)²
    const naiveResults = (nums) => {
        const n = nums.length;
        let sum = 0;
        let sumSq = 0;
        
        for (let x of nums) {
            sum += x;
            sumSq += x * x;
        }
        
        const mean = sum / n;
        const variance = (sumSq / n) - (mean * mean);
        return { mean, variance };
    };

    // --- ALGORITMO ONLINE (Welford) ---
    // Aggiorna la media e la somma dei quadrati delle differenze passo dopo passo
    const onlineResults = (nums) => {
        let n = 0;
        let mean = 0;
        let M2 = 0;

        for (let x of nums) {
            n++;
            let delta = x - mean;
            mean += delta / n;
            let delta2 = x - mean;
            M2 += delta * delta2;
        }
        
        // Varianza della popolazione (per confronto diretto col naive)
        const variance = M2 / n; 
        return { mean, variance };
    };

    const resNaive = naiveResults(data);
    const resOnline = onlineResults(data);

    // Visualizzazione
    document.getElementById('naiveMean').textContent = resNaive.mean.toFixed(6);
    document.getElementById('naiveVar').textContent = resNaive.variance.toFixed(6);
    document.getElementById('onlineMean').textContent = resOnline.mean.toFixed(6);
    document.getElementById('onlineVar').textContent = resOnline.variance.toFixed(6);
    
    document.getElementById('status').textContent = `Confronto completato su ${n} campioni.`;
});

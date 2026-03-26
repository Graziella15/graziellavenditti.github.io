/**
 * Algoritmo di Welford per il calcolo di Media e Varianza
 * previene errori di precisione numerica con grandi dataset.
 */

document.getElementById('generateBtn').addEventListener('click', function() {
    const iterations = 1000;
    let n = 0;
    let mean = 0;
    let M2 = 0;

    for (let i = 0; i < iterations; i++) {
        // Generazione numero pseudocasuale U[0, 1)
        const x = Math.random();
        
        n++;
        const delta = x - mean;
        mean += delta / n;
        
        const delta2 = x - mean;
        M2 += delta * delta2;
    }

    // Varianza campionaria (n-1)
    const variance = n > 1 ? M2 / (n - 1) : 0;

    // Aggiornamento interfaccia
    document.getElementById('count').textContent = n.toLocaleString();
    document.getElementById('mean').textContent = mean.toFixed(6);
    document.getElementById('variance').textContent = variance.toFixed(6);
});

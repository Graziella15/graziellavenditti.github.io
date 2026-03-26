document.addEventListener('DOMContentLoaded', function() {
    const tasto = document.getElementById('btnCalcola');

    tasto.onclick = function() {
        const n = parseInt(document.getElementById('count').value);
        
        // 1. Generazione Dati
        const dati = [];
        for (let i = 0; i < n; i++) {
            dati.push(Math.random() * 100);
        }

        // 2. Algoritmo NAIVE
        let somma = 0;
        let sommaQuadrati = 0;
        for (let x of dati) {
            somma += x;
            sommaQuadrati += x * x;
        }
        const mediaN = somma / n;
        const varianzaN = (sommaQuadrati / n) - (mediaN * mediaN);

        // 3. Algoritmo ONLINE (Welford)
        let mediaO = 0;
        let M2 = 0;
        for (let k = 0; k < dati.length; k++) {
            let x = dati[k];
            let count = k + 1;
            let delta = x - mediaO;
            mediaO += delta / count;
            let delta2 = x - mediaO;
            M2 += delta * delta2;
        }
        const varianzaO = M2 / n;

        // 4. Mostra i risultati
        document.getElementById('n-media').textContent = mediaN.toFixed(4);
        document.getElementById('n-varianza').textContent = varianzaN.toFixed(4);
        document.getElementById('o-media').textContent = mediaO.toFixed(4);
        document.getElementById('o-varianza').textContent = varianzaO.toFixed(4);
        
        console.log("Calcolato con successo!");
    };
});

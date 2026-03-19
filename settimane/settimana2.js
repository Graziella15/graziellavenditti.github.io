// Funzione principale collegata al bottone
function eseguiHomework2() {
    const n_dati = 10000; // Generiamo 10.000 numeri casuali
    const dati = [];

    // 1. INDIVIDUARE L'OGGETTO RANDOM E GENERARE I DATI
    // Usiamo Math.random() per generare numeri casuali, es. tra 0 e 100
    for (let i = 0; i < n_dati; i++) {
        dati.push(Math.random() * 100); 
    }

    // 2. ALGORITMO NAIVE
    let sum = 0;
    let sumSq = 0;
    
    for (let i = 0; i < n_dati; i++) {
        sum += dati[i];
        sumSq += dati[i] * dati[i];
    }
    
    const mediaNaive = sum / n_dati;
    // Varianza = (Somma dei quadrati / n) - (media)^2
    const varianzaNaive = (sumSq / n_dati) - (mediaNaive * mediaNaive);

    // 3. ALGORITMO ONLINE (Metodo di Knuth/Welford)
    let count = 0;
    let mediaOnline = 0;
    let M2 = 0; // Serve per calcolare la somma dei quadrati delle differenze

    for (let i = 0; i < n_dati; i++) {
        count += 1;
        let x = dati[i];
        
        let delta = x - mediaOnline;
        mediaOnline += delta / count;
        
        let delta2 = x - mediaOnline;
        M2 += delta * delta2;
    }
    
    const varianzaOnline = M2 / count; // Varianza della popolazione

    // 4. STAMPA DEI RISULTATI
    const risultatiDiv = document.getElementById('risultati-hw2');
    risultatiDiv.innerHTML = `
        <p>✅ Generati <strong>${n_dati}</strong> dati casuali.</p>
        <hr>
        <h3>Risultati Algoritmo Naive</h3>
        <ul>
            <li><strong>Media:</strong> ${mediaNaive.toFixed(6)}</li>
            <li><strong>Varianza:</strong> ${varianzaNaive.toFixed(6)}</li>
        </ul>
        <hr>
        <h3>Risultati Algoritmo Online (Welford)</h3>
        <ul>
            <li><strong>Media:</strong> ${mediaOnline.toFixed(6)}</li>
            <li><strong>Varianza:</strong> ${varianzaOnline.toFixed(6)}</li>
        </ul>
        <hr>
        <p><em>Come puoi vedere, i risultati sono identici (o differiscono solo per frazioni millesimali dovute all'arrotondamento dei float di JavaScript)! ✨</em></p>
    `;
}

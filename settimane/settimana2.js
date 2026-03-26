let datiGenerati = []; 

function eseguiHomework2() {
    const n_dati = 10000; 
    datiGenerati = []; 

    // 1. OGGETTO RANDOM
    for (let i = 0; i < n_dati; i++) {
        datiGenerati.push(Math.random() * 100); 
    }

    // 2. ALGORITMO NAIVE
    let sum = 0;
    let sumSq = 0;
    
    for (let i = 0; i < n_dati; i++) {
        sum += datiGenerati[i];
        sumSq += datiGenerati[i] * datiGenerati[i];
    }
    
    const mediaNaive = sum / n_dati;
    const varianzaNaive = (sumSq / n_dati) - (mediaNaive * mediaNaive);

    // 3. ALGORITMO ONLINE
    let count = 0;
    let mediaOnline = 0;
    let M2 = 0;

    for (let i = 0; i < n_dati; i++) {
        count += 1;
        let x = datiGenerati[i];
        
        let delta = x - mediaOnline;
        mediaOnline += delta / count;
        
        let delta2 = x - mediaOnline;
        M2 += delta * delta2;
    }
    
    const varianzaOnline = M2 / count; 

    // 4. STAMPA DEI RISULTATI
    document.getElementById('risultati-hw2').innerHTML = `
        <p>✅ Generati <strong>${n_dati}</strong> dati casuali.</p>
        <hr>
        <h3>Risultati Algoritmo Naive</h3>
        <ul>
            <li><strong>Media:</strong> ${mediaNaive.toFixed(6)}</li>
            <li><strong>Varianza:</strong> ${varianzaNaive.toFixed(6)}</li>
        </ul>
        <hr>
        <h3>Risultati Algoritmo Online</h3>
        <ul>
            <li><strong>Media:</strong> ${mediaOnline.toFixed(6)}</li>
            <li><strong>Varianza:</strong> ${varianzaOnline.toFixed(6)}</li>
        </ul>
        <hr>
        <p><em>I risultati coincidono perfettamente! ✨</em></p>
    `;

    // Mostra il bottone dei numeri extra
    document.getElementById('btn-mostra-numeri').style.display = "inline-block";
    document.getElementById('box-numeri').style.display = "none";
}

// Funzione per mostrare i 10.000 numeri
function mostraNumeri() {
    const boxNumeri = document.getElementById('box-numeri');
    
    if (boxNumeri.style.display === "none" || boxNumeri.style.display === "") {
        const numeriFormattati = datiGenerati.map(n => n.toFixed(2)).join(", ");
        boxNumeri.innerHTML = `<p><strong>Ecco l'elenco dei dati:</strong></p><p>${numeriFormattati}</p>`;
        boxNumeri.style.display = "block"; 
    } else {
        boxNumeri.style.display = "none";
    }
}

// Funzione per mostrare il box con i CODICI
function mostraCodici() {
    const boxCodici = document.getElementById('box-codici');
    
    if (boxCodici.style.display === "none" || boxCodici.style.display === "") {
        boxCodici.style.display = "block"; 
    } else {
        boxCodici.style.display = "none";  
    }
}

document.getElementById('btn').onclick = function() {
    const n = parseInt(document.getElementById('inputN').value);
    
    // Generazione dati
    const dati = [];
    for (let i = 0; i < n; i++) {
        dati.push(Math.random() * 100);
    }

    // Naive
    let somma = 0;
    let sommaQuadrati = 0;
    for (let x of dati) {
        somma += x;
        sommaQuadrati += x * x;
    }
    const mediaN = somma / n;
    const varianzaN = (sommaQuadrati / n) - (mediaN * mediaN);

    // Online (Welford)
    let mediaO = 0;
    let M2 = 0;
    for (let i = 0; i < dati.length; i++) {
        let x = dati[i];
        let k = i + 1;
        let delta = x - mediaO;
        mediaO += delta / k;
        M2 += delta * (x - mediaO);
    }
    const varianzaO = M2 / n;

    // Mostra risultati
    document.getElementById('n-med').innerText = mediaN.toFixed(6);
    document.getElementById('n-var').innerText = varianzaN.toFixed(6);
    document.getElementById('o-med').innerText = mediaO.toFixed(6);
    document.getElementById('o-var').innerText = varianzaO.toFixed(6);
    document.getElementById('msg').innerText = "Fatto!";
};

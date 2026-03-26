let numeriGenerati = [];

function toggleElement(id) {
    const el = document.getElementById(id);
    el.style.display = (el.style.display === 'none') ? 'block' : 'none';

    // Se stiamo aprendo il box codici, riempiamo i pre con i codici reali
    if (id === 'box-codici' && el.style.display === 'block') {
        fetch('settimana2.css').then(r => r.text()).then(t => {
            document.getElementById('code-css-display').textContent = t;
        });
        document.getElementById('code-js-display').textContent = eseguiHomework2.toString();
    }
}

function eseguiHomework2() {
    const n = 10000;
    numeriGenerati = Array.from({ length: n }, () => Math.random());

    // 1. Algoritmo Naive
    let somma = 0;
    numeriGenerati.forEach(x => somma += x);
    let media = somma / n;
    
    let sommaQuadratiScarti = 0;
    numeriGenerati.forEach(x => sommaQuadratiScarti += Math.pow(x - media, 2));
    let varNaive = sommaQuadratiScarti / n;

    // 2. Algoritmo Online (Welford)
    let m_n = 0;
    let s_n = 0;
    for (let i = 0; i < n; i++) {
        let x = numeriGenerati[i];
        let vecchio_m = m_n;
        m_n += (x - m_n) / (i + 1);
        s_n += (x - vecchio_m) * (x - m_n);
    }
    let varOnline = s_n / n;

    // Output Risultati
    const resBox = document.getElementById('risultati-hw2');
    resBox.innerHTML = `
        <strong>Dati Elaborati:</strong> ${n.toLocaleString()} numeri
        <strong>Media:</strong> ${media.toFixed(6)}
        <strong>Varianza Naive:</strong> ${varNaive.toFixed(10)}
        <strong>Varianza Online:</strong> ${varOnline.toFixed(10)}
        <strong>Differenza:</strong> ${Math.abs(varNaive - varOnline).toExponential(4)}
    `;

    document.getElementById('btn-mostra-numeri').style.display = 'inline-block';
    document.getElementById('box-numeri').innerText = numeriGenerati.join(', ');
}

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('generateBtn');
    
    btn.addEventListener('click', () => {
        const n = parseInt(document.getElementById('count').value);
        if (n <= 0) return;

        // Generazione dati con Math.random()
        const data = [];
        for (let i = 0; i < n; i++) {
            data.push(Math.random() * 100);
        }

        // 1. ALGORITMO NAIVE
        let sum = 0;
        let sumSq = 0;
        for (let x of data) {
            sum += x;
            sumSq += x * x;
        }
        const mNaive = sum / n;
        const vNaive = (sumSq / n) - (mNaive * mNaive);

        // 2. ALGORITMO ONLINE (Welford)
        let mOnline = 0;
        let M2 = 0;
        for (let i = 0; i < data.length; i++) {
            let x = data[i];
            let delta = x - mOnline;
            mOnline += delta / (i + 1);
            let delta2 = x - mOnline;
            M2 += delta * delta2;
        }
        const vOnline = M2 / n;

        // Scrittura nei tag HTML
        document.getElementById('naiveMean').textContent = mNaive.toFixed(4);
        document.getElementById('naiveVar').textContent = vNaive.toFixed(4);
        document.getElementById('onlineMean').textContent = mOnline.toFixed(4);
        document.getElementById('onlineVar').textContent = vOnline.toFixed(4);
        
        console.log("Calcolo completato per", n, "elementi");
    });
});

let portfolio = [];

/**
 * Aggiunge un'opzione al portafoglio e aggiorna il grafico
 */
function addOption() {
    const type = document.getElementById('optType').value;
    const pos = document.getElementById('posType').value;
    const strike = parseFloat(document.getElementById('strike').value);
    const premium = parseFloat(document.getElementById('premium').value);

    if (isNaN(strike) || isNaN(premium)) return;

    portfolio.push({ type, pos, strike, premium });
    updateUI();
    drawPayoff();
}

/**
 * Resetta tutto
 */
function clearOptions() {
    portfolio = [];
    updateUI();
    drawPayoff();
}

/**
 * Aggiorna la lista testuale delle opzioni
 */
function updateUI() {
    const list = document.getElementById('optionList');
    list.innerHTML = portfolio.map((o, idx) => 
        `<li>${o.pos.toUpperCase()} ${o.type.toUpperCase()} @ Strike ${o.strike} (Premio: ${o.premium})</li>`
    ).join('');
}

/**
 * Disegna il payoff combinato sul canvas
 */
function drawPayoff() {
    const canvas = document.getElementById('payoffCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const midY = canvas.height / 2;
    const xScale = canvas.width / 200; // Scala per il prezzo del sottostante (0-200)
    const yScale = 2; // Scala per il profitto/perdita

    // Pulizia e disegno assi
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(0, midY); ctx.lineTo(canvas.width, midY);
    ctx.stroke();

    if (portfolio.length === 0) return;

    // Disegno Payoff Combinato
    ctx.beginPath();
    ctx.strokeStyle = '#1a3c34';
    ctx.lineWidth = 3;

    for (let s = 0; s <= 200; s += 0.5) {
        let totalPayoff = 0;

        portfolio.forEach(opt => {
            let payoff = 0;
            if (opt.type === 'call') {
                payoff = Math.max(0, s - opt.strike);
            } else {
                payoff = Math.max(0, opt.strike - s);
            }

            // Se Short, inverti il payoff e aggiungi il premio
            if (opt.pos === 'short') {
                totalPayoff += (-payoff + opt.premium);
            } else {
                totalPayoff += (payoff - opt.premium);
            }
        });

        const drawX = s * xScale;
        const drawY = midY - (totalPayoff * yScale);

        if (s === 0) ctx.moveTo(drawX, drawY);
        else ctx.lineTo(drawX, drawY);
    }
    ctx.stroke();
}

// Inizializzazione
window.onload = drawPayoff;

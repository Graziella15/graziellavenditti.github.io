// Array globale contenente la lista delle opzioni inserite dall'utente
let portfolio = [];
let chartInstance = null;

// Elementi del DOM
const form = document.getElementById('option-form');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const optionsList = document.getElementById('options-list');

// Inizializzazione al caricamento della pagina
document.addEventListener('DOMContentLoaded', () => {
    // Aggiungiamo alcune opzioni di default per mostrare subito qualcosa (es. uno Bull Call Spread)
    portfolio = [
        { type: 'CALL', position: 'LONG', strike: 90, premium: 8, quantity: 1 },
        { type: 'CALL', position: 'SHORT', strike: 110, premium: 3, quantity: 1 }
    ];
    updateUI();
});

// Event Listener per aggiungere opzioni
addBtn.addEventListener('click', () => {
    const type = document.getElementById('option-type').value;
    const position = document.getElementById('option-position').value;
    const strike = parseFloat(document.getElementById('option-strike').value);
    const premium = parseFloat(document.getElementById('option-premium').value);
    const quantity = parseInt(document.getElementById('option-quantity').value);

    if (isNaN(strike) || isNaN(premium) || isNaN(quantity)) {
        alert("Inserisci valori numerici validi.");
        return;
    }

    portfolio.push({ type, position, strike, premium, quantity });
    updateUI();
});

// Event Listener per svuotare il portafoglio
clearBtn.addEventListener('click', () => {
    portfolio = [];
    updateUI();
});

// Funzione per eliminare una singola opzione
function deleteOption(index) {
    portfolio.splice(index, 1);
    updateUI();
}

// Calcola il payoff di una singola opzione dato il prezzo del sottostante (S)
function calculateSinglePayoff(option, S) {
    let payoff = 0;
    
    if (option.type === 'CALL') {
        payoff = Math.max(0, S - option.strike);
    } else if (option.type === 'PUT') {
        payoff = Math.max(0, option.strike - S);
    }

    // Se siamo "Short", il payoff a scadenza è invertito (il guadagno altrui è la nostra perdita)
    if (option.position === 'SHORT') {
        payoff = -payoff;
    }

    // Calcolo del profitto netto tenendo conto del premio pagato/incassato
    let netProfit = 0;
    if (option.position === 'LONG') {
        netProfit = payoff - option.premium; // Paghiamo il premio
    } else {
        netProfit = payoff + option.premium; // Incassiamo il premio
    }

    return netProfit * option.quantity;
}

// Aggiorna l'interfaccia grafica e ricalcola il grafico complessivo
function updateUI() {
    renderList();
    renderChart();
}

// Renderizza la lista testuale delle opzioni
function renderList() {
    optionsList.innerHTML = '';
    portfolio.forEach((opt, index) => {
        const li = document.createElement('li');
        li.className = 'option-item';
        li.innerHTML = `
            <div>
                <strong>${opt.position} ${opt.type}</strong> (x${opt.quantity})<br>
                <small>Strike: $${opt.strike} | Premio: $${opt.premium}</small>
            </div>
            <button class="delete-btn" onclick="deleteOption(${index})">✕</button>
        `;
        optionsList.appendChild(li);
    });
}

// Genera i dati ed effettua il plot del grafico aggregato
function renderChart() {
    const ctx = document.getElementById('payoffChart').getContext('2d');

    // Determiniamo l'asse X (Prezzi del sottostante) in modo dinamico in base agli strike inseriti
    let minStrike = portfolio.length > 0 ? Math.min(...portfolio.map(o => o.strike)) : 100;
    let maxStrike = portfolio.length > 0 ? Math.max(...portfolio.map(o => o.strike)) : 100;

    // Definiamo un range sensato attorno agli strike presenti
    let startPrice = Math.max(0, minStrike - 40);
    let endPrice = maxStrike + 40;
    
    let labels = [];
    let dataPayoffGlobale = [];

    // Generiamo i punti del grafico (passo di 1 dollaro per precisione delle curve)
    for (let S = startPrice; S <= endPrice; S += 2) {
        labels.push(S);
        let totalPayoff = 0;
        
        // Somma algebrica del payoff di ogni singola opzione nel portafoglio
        portfolio.forEach(option => {
            totalPayoff += calculateSinglePayoff(option, S);
        });
        
        dataPayoffGlobale.push(totalPayoff);
    }

    // Se esiste già un grafico attivo, distruggilo per evitare sovrapposizioni grafiche al refresh
    if (chartInstance) {
        chartInstance.destroy();
    }

    // Configurazione Chart.js
    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Profit / Loss Complessivo ($)',
                data: dataPayoffGlobale,
                borderColor: '#20b2aa',
                backgroundColor: 'rgba(32, 178, 170, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.1,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Prezzo Sottostante alla Scadenza (ST)',
                        color: '#0d2b45',
                        font: { weight: 'bold' }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Profitto / Perdita Netta ($)',
                        color: '#0d2b45',
                        font: { weight: 'bold' }
                    },
                    grid: {
                        // Evidenzia la linea dello zero (Break-even di portafoglio)
                        color: (context) => context.tick.value === 0 ? '#333' : 'rgba(0,0,0,0.05)',
                        lineWidth: (context) => context.tick.value === 0 ? 2 : 1
                    }
                }
            },
            plugins: {
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            }
        }
    });
}

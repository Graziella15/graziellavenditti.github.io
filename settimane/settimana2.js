function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function welfordStats(values) {
  let n = 0;
  let mean = 0;
  let M2 = 0;

  for (const x of values) {
    n++;
    const delta = x - mean;
    mean = mean + delta / n;
    const delta2 = x - mean;
    M2 = M2 + delta * delta2;
  }

  const variancePopulation = n > 0 ? M2 / n : 0;
  const varianceSample = n > 1 ? M2 / (n - 1) : 0;

  return {
    n,
    mean,
    variancePopulation,
    varianceSample
  };
}

function naiveStats(values) {
  const n = values.length;

  if (n === 0) {
    return {
      n: 0,
      mean: 0,
      variancePopulation: 0
    };
  }

  let sum = 0;
  let sumSquares = 0;

  for (const x of values) {
    sum += x;
    sumSquares += x * x;
  }

  const mean = sum / n;
  const variancePopulation = (sumSquares / n) - (mean * mean);

  return {
    n,
    mean,
    variancePopulation
  };
}

function formatNumber(x) {
  return Number.isFinite(x) ? x.toFixed(6) : String(x);
}

function showResults(values, title = "Risultati") {
  const numbersBox = document.getElementById("numbersBox");
  const results = document.getElementById("results");

  numbersBox.textContent = values.join(", ");

  const w = welfordStats(values);
  const naive = naiveStats(values);

  results.innerHTML = `
    <h3>${title}</h3>
    <table>
      <tr>
        <th>Metodo</th>
        <th>Media</th>
        <th>Varianza popolazione</th>
      </tr>
      <tr>
        <td>Welford</td>
        <td>${formatNumber(w.mean)}</td>
        <td>${formatNumber(w.variancePopulation)}</td>
      </tr>
      <tr>
        <td>Naive</td>
        <td>${formatNumber(naive.mean)}</td>
        <td>${formatNumber(naive.variancePopulation)}</td>
      </tr>
    </table>

    <p><strong>Numero di valori:</strong> ${w.n}</p>
    <p><strong>Varianza campionaria con Welford:</strong> ${formatNumber(w.varianceSample)}</p>
    <p>
      Welford è più stabile numericamente della formula naive.
    </p>
  `;
}

document.getElementById("generateBtn").addEventListener("click", () => {
  const count = parseInt(document.getElementById("count").value);
  const min = parseFloat(document.getElementById("min").value);
  const max = parseFloat(document.getElementById("max").value);

  if (isNaN(count) || isNaN(min) || isNaN(max) || count <= 0 || min > max) {
    alert("Controlla i valori inseriti.");
    return;
  }

  const values = [];
  for (let i = 0; i < count; i++) {
    values.push(randomInt(min, max));
  }

  showResults(values, "Risultati sui numeri pseudocasuali");
});

document.getElementById("pathologicalBtn").addEventListener("click", () => {
  const values = [
    1000000001,
    1000000002,
    1000000003,
    1000000004,
    1000000005
  ];

  showResults(values, "Test con sequenza patologica");

  const results = document.getElementById("results");
  results.innerHTML += `
    <p class="highlight">
      In questa sequenza la formula naive può avere problemi di precisione numerica,
      mentre Welford resta più affidabile.
    </p>
  `;
});

  

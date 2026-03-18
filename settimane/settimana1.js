// Funzione per mostrare e nascondere il contenuto dei tuoi homework
function toggleSolution(id) {
  const element = document.getElementById(id);
  
  // Controlla se l'elemento ha già la classe 'active'
  if (element.classList.contains("active")) {
    element.classList.remove("active");
  } else {
    element.classList.add("active");
  }
}
// Funzione 1: Modifica il contenuto HTML del DIV
function cambiaTesto() {
  const mioDiv = document.getElementById("target-div");
  mioDiv.innerHTML = "<strong>Magia! ✨</strong> Il contenuto di questo DIV è stato appena modificato da JavaScript.";
}

// Funzione 2: Modifica lo stile CSS del DIV (Colori, bordi, font)
function cambiaStile() {
  const mioDiv = document.getElementById("target-div");
  mioDiv.style.backgroundColor = "#0284c7"; // Sfondo blu scuro
  mioDiv.style.color = "#ffffff"; // Testo bianco
  mioDiv.style.border = "3px dashed #38bdf8"; // Bordo tratteggiato azzurro
  mioDiv.style.borderRadius = "20px"; // Arrotonda di più i bordi
  mioDiv.style.transform = "scale(1.02)"; // Ingrandisce leggermente il div
}

// Funzione 3: Nasconde o mostra il DIV
function nascondiMostra() {
  const mioDiv = document.getElementById("target-div");
  // Controlla se il div è nascosto
  if (mioDiv.style.display === "none") {
    mioDiv.style.display = "block"; // Se è nascosto, mostralo
  } else {
    mioDiv.style.display = "none"; // Altrimenti, nascondilo
  }
}

// Funzione Bonus: Ripristina il DIV alle condizioni iniziali
function resetDiv() {
  const mioDiv = document.getElementById("target-div");
  mioDiv.innerHTML = "Questo è il testo originale del DIV. Usa i bottoni qui sotto per modificarmi!";
  
  // Resetta tutti gli stili
  mioDiv.style.backgroundColor = "";
  mioDiv.style.color = "";
  mioDiv.style.border = "";
  mioDiv.style.borderRadius = "";
  mioDiv.style.transform = "";
  mioDiv.style.display = "block";
}

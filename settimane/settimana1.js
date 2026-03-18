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

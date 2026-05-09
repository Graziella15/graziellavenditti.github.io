// Settimana 7 - Logica per l'interazione dei teoremi
document.addEventListener('DOMContentLoaded', () => {
    console.log("Modulo Settimana 7 caricato correttamente.");
    
    // Esempio: evidenzia le dimostrazioni al passaggio del mouse
    const proofs = document.querySelectorAll('.proof');
    proofs.forEach(p => {
        p.addEventListener('mouseenter', () => {
            p.style.backgroundColor = "#e8f0fe";
        });
        p.addEventListener('mouseleave', () => {
            p.style.backgroundColor = "#f0f7ff";
        });
    });
});

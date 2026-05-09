/**
 * Settimana 7: Logica Interattiva
 * Gestione evidenziazione e logica dei contenuti
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema Settimana 7 inizializzato: Teoria -> Limiti -> Derivati.");

    // Effetto interattivo sulle sezioni di dimostrazione
    const proofs = document.querySelectorAll('.proof');
    
    proofs.forEach(proof => {
        proof.addEventListener('mouseenter', () => {
            proof.style.backgroundColor = "#eef6ff";
            proof.style.transform = "translateX(5px)";
            proof.style.transition = "all 0.3s ease";
        });

        proof.addEventListener('mouseleave', () => {
            proof.style.backgroundColor = "#f8fbff";
            proof.style.transform = "translateX(0px)";
        });
    });

    // Logger per la parte finanziaria
    const optionalSection = document.querySelector('.optional');
    if (optionalSection) {
        optionalSection.addEventListener('click', () => {
            console.info("Analisi Strategie: Ricorda che il payoff complessivo è la somma algebrica dei singoli rami.");
        });
    }
});

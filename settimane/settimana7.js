const canvas = document.getElementById('wienerCanvas');
const ctx = canvas.getContext('2d');

function runDonskerSimulation() {
    // Reset Canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const steps = 2000;
    const paths = 3;
    const colors = ['#3498db', '#e74c3c', '#2ecc71'];

    paths.forEach((color, p) => {
        let x = 0;
        let y = canvas.height / 2;
        let sum = 0;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.moveTo(x, y);

        for (let i = 0; i < steps; i++) {
            // Incremento i.i.d Mean=0, Var=1
            const increment = (Math.random() - 0.5) * 2; 
            sum += increment;
            
            x = (i / steps) * canvas.width;
            // Riscalamento di Donsker: 1/sqrt(n)
            const scaledY = (canvas.height / 2) - (sum / Math.sqrt(steps)) * 250;
            
            ctx.lineTo(x, scaledY);
        }
        ctx.stroke();
    });
}

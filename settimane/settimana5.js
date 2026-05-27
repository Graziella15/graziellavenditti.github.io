function generateSimulation() {
    const abmCanvas = document.getElementById('abmCanvas');
    const gbmCanvas = document.getElementById('gbmCanvas');

    const ctxABM = abmCanvas.getContext('2d');
    const ctxGBM = gbmCanvas.getContext('2d');

    abmCanvas.width = abmCanvas.offsetWidth;
    abmCanvas.height = abmCanvas.offsetHeight;
    gbmCanvas.width = gbmCanvas.offsetWidth;
    gbmCanvas.height = gbmCanvas.offsetHeight;

    const S0 = parseFloat(document.getElementById('s0').value);
    const mu = parseFloat(document.getElementById('mu').value);
    const sigma = parseFloat(document.getElementById('sigma').value);
    const n = parseInt(document.getElementById('steps').value);
    const m = parseInt(document.getElementById('paths').value);

    const dt = 1.0 / n;
    const padding = 50;

    ctxABM.clearRect(0, 0, abmCanvas.width, abmCanvas.height);
    ctxGBM.clearRect(0, 0, gbmCanvas.width, gbmCanvas.height);

    const colors = ['#0984e3', '#e17055', '#00b894', '#6c5ce7', '#d63031'];

    function boxMuller() {
        let u = Math.random();
        let v = Math.random();

        while (u === 0) {
            u = Math.random();
        }

        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }

    let abmTrajectories = [];
    let gbmTrajectories = [];

    let abmMax = -Infinity;
    let abmMin = Infinity;
    let gbmMax = -Infinity;
    let gbmMin = Infinity;

    for (let i = 0; i < m; i++) {
        let abmPath = [S0];
        let gbmPath = [S0];

        let currentABM = S0;
        let currentX = 0;

        for (let j = 0; j < n; j++) {
            const z = boxMuller();

            currentABM += mu * dt + sigma * S0 * Math.sqrt(dt) * z;

            currentX += (mu - 0.5 * sigma * sigma) * dt
                + sigma * Math.sqrt(dt) * z;

            const currentGBM = S0 * Math.exp(currentX);

            abmPath.push(currentABM);
            gbmPath.push(currentGBM);

            if (currentABM > abmMax) abmMax = currentABM;
            if (currentABM < abmMin) abmMin = currentABM;

            if (currentGBM > gbmMax) gbmMax = currentGBM;
            if (currentGBM < gbmMin) gbmMin = currentGBM;
        }

        abmTrajectories.push(abmPath);
        gbmTrajectories.push(gbmPath);
    }

    if (abmMax === abmMin) {
        abmMax += 1;
        abmMin -= 1;
    }

    if (gbmMax === gbmMin) {
        gbmMax += 1;
        gbmMin -= 1;
    }

    function drawAxes(ctx, canvas, minY, maxY) {
        const gridLines = 5;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = "#e0e0e0";
        ctx.lineWidth = 1;
        ctx.font = "12px Arial";
        ctx.fillStyle = "#333";

        for (let i = 0; i <= gridLines; i++) {
            const y = padding + (i / gridLines) * (canvas.height - 2 * padding);
            const value = maxY - (i / gridLines) * (maxY - minY);

            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();

            ctx.fillText(value.toFixed(1), 8, y + 4);
        }

        for (let i = 0; i <= gridLines; i++) {
            const x = padding + (i / gridLines) * (canvas.width - 2 * padding);
            const time = i / gridLines;

            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, canvas.height - padding);
            ctx.stroke();

            ctx.fillText(time.toFixed(1), x - 10, canvas.height - 25);
        }

        ctx.strokeStyle = "#000";
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.stroke();

        ctx.fillStyle = "#000";
        ctx.font = "14px Arial";

        ctx.fillText("Tempo (anni)", canvas.width / 2 - 45, canvas.height - 8);

        ctx.save();
        ctx.translate(18, canvas.height / 2 + 25);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText("Prezzo", 0, 0);
        ctx.restore();
    }

    function drawTrajectory(ctx, canvas, path, minY, maxY, color) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        for (let j = 0; j < path.length; j++) {
            const x = padding + (j / n) * (canvas.width - 2 * padding);

            const y = canvas.height - padding -
                ((path[j] - minY) / (maxY - minY)) *
                (canvas.height - 2 * padding);

            if (j === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
    }

    drawAxes(ctxABM, abmCanvas, abmMin, abmMax);
    drawAxes(ctxGBM, gbmCanvas, gbmMin, gbmMax);

    abmTrajectories.forEach((path, idx) => {
        drawTrajectory(
            ctxABM,
            abmCanvas,
            path,
            abmMin,
            abmMax,
            colors[idx % colors.length]
        );
    });

    gbmTrajectories.forEach((path, idx) => {
        drawTrajectory(
            ctxGBM,
            gbmCanvas,
            path,
            gbmMin,
            gbmMax,
            colors[idx % colors.length]
        );
    });
}

window.onload = generateSimulation;

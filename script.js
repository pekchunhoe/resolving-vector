const V1 = document.getElementById("V1");
const V2 = document.getElementById("V2");

const x1 = document.getElementById("x1");
const x2 = document.getElementById("x2");
const y1 = document.getElementById("y1");
const y2 = document.getElementById("y2");

const resolveBtn = document.getElementById("resolveBtn");
const resetBtn = document.getElementById("resetBtn");


// =====================================
// ENABLE / DISABLE RESOLVE BUTTON
// =====================================

function checkInputs() {

    if (V1.value !== "" && V2.value !== "") {
        resolveBtn.disabled = false;
    } else {
        resolveBtn.disabled = true;
    }
}

V1.addEventListener("change", checkInputs);
V2.addEventListener("change", checkInputs);


// =====================================
// QUADRANT DIAGRAM
// =====================================

function drawQuadrants() {

    const canvas = document.getElementById("quadrantCanvas");
    const ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#2a5db0";
    ctx.lineWidth = 4;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(50, cy);
    ctx.lineTo(canvas.width - 50, cy);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(cx, 50);
    ctx.lineTo(cx, canvas.height - 50);
    ctx.stroke();

    // Arrowheads
    ctx.beginPath();
    ctx.moveTo(canvas.width - 50, cy);
    ctx.lineTo(canvas.width - 70, cy - 10);
    ctx.lineTo(canvas.width - 70, cy + 10);
    ctx.closePath();
    ctx.fillStyle = "#2a5db0";
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, 50);
    ctx.lineTo(cx - 10, 70);
    ctx.lineTo(cx + 10, 70);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "darkred";
    ctx.font = "bold 28px Arial";

    ctx.fillText("Quadrant II (-,+)", 80, 120);
    ctx.fillText("Quadrant I (+,+)", 580, 120);

    ctx.fillText("Quadrant III (-,-)", 80, 400);
    ctx.fillText("Quadrant IV (+,-)", 560, 400);

    ctx.fillStyle = "green";
    ctx.font = "24px Arial";

    ctx.fillText("y-axis", cx + 15, 40);
    ctx.fillText("x-axis", canvas.width - 120, cy - 15);
}

drawQuadrants();


// =====================================
// RESOLVE BUTTON
// =====================================

resolveBtn.addEventListener("click", () => {

    // x sign

    if (V1.value === "Q1" || V1.value === "Q4") {
        x1.textContent = "+";
    } else {
        x1.textContent = "-";
    }

    // y sign

    if (V1.value === "Q1" || V1.value === "Q2") {
        y1.textContent = "+";
    } else {
        y1.textContent = "-";
    }

    // trig function

    if (V2.value === "x") {
        x2.textContent = "cos";
        y2.textContent = "sin";
    } else {
        x2.textContent = "sin";
        y2.textContent = "cos";
    }

    drawVectorDiagram();
});


// =====================================
// RESET BUTTON
// =====================================

resetBtn.addEventListener("click", () => {

    V1.selectedIndex = 0;
    V2.selectedIndex = 0;

    x1.textContent = "";
    x2.textContent = "";
    y1.textContent = "";
    y2.textContent = "";

    resolveBtn.disabled = true;

    clearVectorCanvas();
});


// =====================================
// VECTOR CANVAS
// =====================================

function clearVectorCanvas() {

    const canvas = document.getElementById("vectorCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();
}

function drawAxes() {

    const canvas = document.getElementById("vectorCanvas");
    const ctx = canvas.getContext("2d");

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(canvas.width, cy);
    ctx.stroke();

    // y-axis
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, canvas.height);
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    ctx.fillText("x", canvas.width - 20, cy - 10);
    ctx.fillText("y", cx + 10, 20);
}


// =====================================
// VECTOR DIAGRAM
// =====================================

function drawVectorDiagram() {

    const canvas = document.getElementById("vectorCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAxes();

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const magnitude = 290;
    const angle = 30 * Math.PI / 180;

    let sx = 1;
    let sy = -1;

    switch (V1.value) {

        case "Q1":
            sx = 1;
            sy = -1;
            break;

        case "Q2":
            sx = -1;
            sy = -1;
            break;

        case "Q3":
            sx = -1;
            sy = 1;
            break;

        case "Q4":
            sx = 1;
            sy = 1;
            break;
    }

    let vx, vy;

    if (V2.value === "x") {

        vx = sx * magnitude * Math.cos(angle);
        vy = sy * magnitude * Math.sin(angle);

    } else {

        vx = sx * magnitude * Math.sin(angle);
        vy = sy * magnitude * Math.cos(angle);
    }

    // ======================
    // COMPONENT TRIANGLE
    // ======================

    ctx.lineWidth = 4;

    if (V2.value === "x") {

        // Angle measured from x-axis
        // x side touches the 30° angle

        ctx.strokeStyle = "green";

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + vx, cy);
        ctx.stroke();

        ctx.strokeStyle = "orange";

        ctx.beginPath();
        ctx.moveTo(cx + vx, cy);
        ctx.lineTo(cx + vx, cy + vy);
        ctx.stroke();

    } else {

        // Angle measured from y-axis
        // y side touches the 30° angle

        ctx.strokeStyle = "orange";

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + vy);
        ctx.stroke();

        ctx.strokeStyle = "green";

        ctx.beginPath();
        ctx.moveTo(cx, cy + vy);
        ctx.lineTo(cx + vx, cy + vy);
        ctx.stroke();
    }

    // ======================
    // RESULTANT VECTOR
    // ======================

    ctx.strokeStyle = "red";

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + vx, cy + vy);
    ctx.stroke();

    // ======================
    // LABELS
    // ======================

    ctx.font = "20px Arial";

    if (V2.value === "x") {

        ctx.fillStyle = "green";
        ctx.fillText("x-component", cx + vx / 2, cy - 10);

        ctx.fillStyle = "orange";
        ctx.fillText("y-component", cx + vx + 10, cy + vy / 2);

    } else {

        ctx.fillStyle = "orange";
        ctx.fillText("y-component", cx + 10, cy + vy / 2);

        ctx.fillStyle = "green";
        ctx.fillText("x-component", cx + vx / 2, cy + vy - 10);
    }

    ctx.fillStyle = "red";
    ctx.fillText("Vector", cx + vx + 10, cy + vy - 10);

    // ======================
    // ANGLE ARC
    // ======================

    ctx.strokeStyle = "purple";
    ctx.lineWidth = 3;

    const arcRadius = 60;

    // Direction of resultant vector
    const vectorAngle = Math.atan2(vy, vx);

    // Direction of reference axis
    let refAngle = 0;

    switch (V1.value) {

        case "Q1":
            refAngle = (V2.value === "x")
                ? 0
                : -Math.PI / 2;
            break;

        case "Q2":
            refAngle = (V2.value === "x")
                ? Math.PI
                : -Math.PI / 2;
            break;

        case "Q3":
            refAngle = (V2.value === "x")
                ? Math.PI
                : Math.PI / 2;
            break;

        case "Q4":
            refAngle = (V2.value === "x")
                ? 0
                : Math.PI / 2;
            break;
    }

    // Find shortest angular difference
    let diff = vectorAngle - refAngle;

    while (diff > Math.PI) diff -= 2 * Math.PI;
    while (diff < -Math.PI) diff += 2 * Math.PI;

    // Draw arc
    ctx.beginPath();
    ctx.arc(
        cx,
        cy,
        arcRadius,
        refAngle,
        refAngle + diff,
        diff < 0
    );
    ctx.stroke();

    // ======================
    // ANGLE LABEL
    // ======================

    const midAngle = refAngle + diff / 2;

    const tx = cx + (arcRadius + 25) * Math.cos(midAngle);
    const ty = cy + (arcRadius + 25) * Math.sin(midAngle);

    ctx.fillStyle = "purple";
    ctx.font = "22px Arial";
    ctx.fillText("30°", tx, ty);

    // ======================
    // REFERENCE AXIS LABEL
    // ======================

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";

    if (V2.value === "x") {
        ctx.fillText("Angle measured with x-axis", 20, 30);
    } else {
        ctx.fillText("Angle measured with y-axis", 20, 30);
    }
}

clearVectorCanvas();
// 結案單專屬邏輯 (數位簽署與滿意度)
let isDrawing = false;
let ctx = null;
let canvas = null;

function initSignaturePad() {
    canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        ctx.strokeStyle = "#000000"; 
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    const start = (e) => {
        isDrawing = true;
        const pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
        if (e.type === 'touchstart') e.preventDefault();
    };

    const move = (e) => {
        if (!isDrawing) return;
        const pos = getPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        if (e.type === 'touchmove') e.preventDefault();
    };

    const stop = () => {
        isDrawing = false;
    };

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);

    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', stop);
}

function clearSignature() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
    }
}

window.onload = () => {
    initSignaturePad();
};

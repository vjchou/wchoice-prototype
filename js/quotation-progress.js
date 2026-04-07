// 報價進度管理邏輯
const QUOTATION_PROGRESS_STATE = {
    id: '',
    client: '',
    price: 0,
    status: 'pending',
    fileUploaded: false,
    reason: ''
};

function initProgressPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('無效的報價編號');
        location.href = 'quotation-list.html';
        return;
    }

    // 從 Mock Data 查找資料 (以此示意，實際應從資料庫)
    // 這裡我們暫時模擬一筆資料或從 parent 獲取
    QUOTATION_PROGRESS_STATE.id = id;
    QUOTATION_PROGRESS_STATE.client = id === 'Q-20260405-002' ? '毛小孩天堂' : (id === 'Q-20260401-003' ? '汪汪美容' : '吹毛球痴');
    QUOTATION_PROGRESS_STATE.price = id === 'Q-20260405-002' ? 12000 : (id === 'Q-20260401-003' ? 6200 : 8500);
    QUOTATION_PROGRESS_STATE.status = id === 'Q-20260405-002' ? 'approved' : (id === 'Q-20260401-003' ? 'rejected' : 'pending');

    renderState();
}

function renderState() {
    document.getElementById('display-id').innerText = QUOTATION_PROGRESS_STATE.id;
    document.getElementById('display-client').innerText = QUOTATION_PROGRESS_STATE.client;
    document.getElementById('display-price').innerText = `$${QUOTATION_PROGRESS_STATE.price.toLocaleString()}`;
    
    const statusSelect = document.getElementById('status-select');
    statusSelect.value = QUOTATION_PROGRESS_STATE.status;

    toggleInputsByStatus(QUOTATION_PROGRESS_STATE.status);
}

function toggleInputsByStatus(status) {
    const approvalSection = document.getElementById('approval-section');
    const reasonArea = document.getElementById('reason-area');
    const reasonLabel = document.getElementById('reason-label');

    if (status === 'approved') {
        approvalSection.style.display = 'block';
        reasonArea.style.display = 'block';
        reasonLabel.innerText = '備註說明 (選填)';
        
        // 如果當前在簽章分頁，需重新計算尺寸
        const signTab = document.getElementById('confirm-sign-tab');
        if (signTab.style.display === 'block') {
            setTimeout(resizeCanvas, 0);
        }
    } else if (status === 'rejected') {
        approvalSection.style.display = 'none';
        reasonArea.style.display = 'block';
        reasonLabel.innerHTML = '不成立原因 <span style="color: red;">*必填</span>';
    } else {
        approvalSection.style.display = 'none';
        reasonArea.style.display = 'none';
    }
}

function switchConfirmTab(tabEl, type) {
    const parent = tabEl.closest('.el-tabs');
    parent.querySelectorAll('.el-tabs__item').forEach(item => item.classList.remove('is-active'));
    tabEl.classList.add('is-active');

    document.getElementById('confirm-file-tab').style.display = type === 'file' ? 'block' : 'none';
    document.getElementById('confirm-sign-tab').style.display = type === 'sign' ? 'block' : 'none';

    if (type === 'sign') {
        setTimeout(resizeCanvas, 0);
    }
}

// 數位簽章邏輯
let isDrawing = false;
let ctx = null;
let canvas = null;

function initSignaturePad() {
    canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    // 初始化繪圖樣式
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
        const clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };

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

    const stop = () => isDrawing = false;

    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    window.addEventListener('mouseup', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', stop);
}

function resizeCanvas() {
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    // 只有在欄位顯示時才進行 resize，避免 clientRect 為 0
    if (rect.width > 0) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }
}

function clearSignature() {
    if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;
    }
}

function handleFileChange(input) {
    if (input.files && input.files[0]) {
        QUOTATION_PROGRESS_STATE.fileUploaded = true;
        document.getElementById('file-status').innerText = `已選擇: ${input.files[0].name}`;
        document.getElementById('file-status').style.color = 'var(--primary-color)';
    }
}

function saveProgress() {
    const status = document.getElementById('status-select').value;
    const reason = document.getElementById('reason-text').value;

    // 驗證
    if (status === 'approved') {
        if (!QUOTATION_PROGRESS_STATE.fileUploaded) {
            alert('報價成立必須上傳簽署後的報價單檔案');
            return;
        }
    } else if (status === 'rejected') {
        if (!reason.trim()) {
            alert('報價不成立必須填寫原因說明');
            return;
        }
    }

    // 模擬儲存成功
    alert(`報價單 ${QUOTATION_PROGRESS_STATE.id} 狀態已更新為: ${status === 'approved' ? '報價成立' : (status === 'rejected' ? '報價不成立' : '報價中')}`);
    
    if (status === 'approved') {
        alert('系統已自動在「服務單維護」中建立對應專案。');
    }

    location.href = 'quotation-list.html';
}

window.onload = () => {
    initProgressPage();
    initSignaturePad();
    window.addEventListener('resize', resizeCanvas);
};

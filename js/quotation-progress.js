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
    const fileArea = document.getElementById('file-upload-area');
    const reasonArea = document.getElementById('reason-area');
    const fileLabel = document.getElementById('file-label');
    const reasonLabel = document.getElementById('reason-label');

    if (status === 'approved') {
        fileArea.style.display = 'block';
        reasonArea.style.display = 'block';
        fileLabel.innerHTML = '報價單回傳 (簽名掃描檔) <span style="color: red;">*必填</span>';
        reasonLabel.innerText = '備註說明 (選填)';
    } else if (status === 'rejected') {
        fileArea.style.display = 'none';
        reasonArea.style.display = 'block';
        reasonLabel.innerHTML = '不成立原因 <span style="color: red;">*必填</span>';
    } else {
        fileArea.style.display = 'none';
        reasonArea.style.display = 'none';
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

window.onload = initProgressPage;

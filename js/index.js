// 完整服務項目與報價參數矩陣 (根據需求更新)
const MASTER_DATA = {
    "美容室": [
        { name: "冷氣", unit: "台", conditions: [{ label: "標準清消", price: 800, time: 10 }, { label: "深層(含濾網)", price: 1200, time: 20 }] },
        { name: "牆面", unit: "面", conditions: [{ label: "局部擦拭", price: 100, time: 5 }, { label: "全室噴灑", price: 300, time: 15 }] },
        { name: "洗澡台", unit: "座", conditions: [{ label: "標準規模", price: 500, time: 15 }] },
        { name: "烘箱", unit: "座", conditions: [{ label: "小烘箱", price: 400, time: 15 }, { label: "大烘箱", price: 1000, time: 60 }] },
        { name: "線籠", unit: "組", conditions: [{ label: "基本清消", price: 200, time: 10 }] },
        { name: "地面", unit: "坪", conditions: [{ label: "一般清掃", price: 100, time: 5 }, { label: "抗菌刷洗", price: 300, time: 20 }] },
        { name: "美容台", unit: "張", conditions: [{ label: "表面清消", price: 150, time: 5 }] },
        { name: "吹水機", unit: "台", conditions: [{ label: "進氣過濾清理", price: 200, time: 10 }] },
        { name: "玻璃", unit: "面", conditions: [{ label: "標準刮拭", price: 300, time: 10 }] },
        { name: "抗菌鍍膜", unit: "式", conditions: [{ label: "全效防護", price: 2000, time: 60 }] },
        { name: "擦拭", unit: "式", conditions: [{ label: "雜物架/櫃體", price: 500, time: 30 }] }
    ],
    "會客區": [
        { name: "冷氣", unit: "台", conditions: [{ label: "標準清消", price: 800, time: 10 }] },
        { name: "抗菌鍍膜", unit: "式", conditions: [{ label: "全效防護", price: 2000, time: 60 }] },
        { name: "擦拭", unit: "式", conditions: [{ label: "櫃檯與座椅", price: 500, time: 30 }] },
        { name: "玻璃", unit: "面", conditions: [{ label: "落地景觀窗", price: 600, time: 20 }] },
        { name: "地面", unit: "坪", conditions: [{ label: "高流量清潔", price: 150, time: 10 }] }
    ]
};

// 切換主頁籤 (美容區/會客區)
function switchMainTab(tabEl, sectionId) {
    const parent = tabEl.closest('.el-tabs');
    parent.querySelectorAll('.el-tabs__item').forEach(item => item.classList.remove('is-active'));
    tabEl.classList.add('is-active');
    document.querySelectorAll('.service-section').forEach(s => s.classList.remove('is-active'));
    document.getElementById(sectionId + '-section').classList.add('is-active');
}

// 初始化頁籤內容 (直接列出服務項目，不使用子配置 Card)
function initTabs() {
    renderItems('grooming', '美容室');
    renderItems('lobby', '會客區');
}

function renderItems(containerPrefix, dataKey) {
    const container = document.getElementById(containerPrefix + '-container');
    container.innerHTML = ''; // 清空內容
    
    // 建立一個扁平的列表容器 (item-list)
    const listWrapper = document.createElement('div');
    listWrapper.className = 'item-list';
    
    MASTER_DATA[dataKey].forEach(itemData => {
        const itemTemplate = document.getElementById('item-template');
        const itemClone = itemTemplate.content.cloneNode(true);
        const card = itemClone.querySelector('.item-card');
        
        card.querySelector('.item-name').innerText = itemData.name;
        
        // 填充條件屬性
        const condSelect = card.querySelector('.condition-select');
        itemData.conditions.forEach((c, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.innerText = `${c.label} ($${c.price} / ${c.time}min)`;
            opt.dataset.price = c.price;
            opt.dataset.time = c.time;
            condSelect.appendChild(opt);
        });

        // 填充單位
        card.querySelector('.item-unit-text').innerText = itemData.unit;

        listWrapper.appendChild(itemClone);
    });
    
    container.appendChild(listWrapper);
}

// 處理整列點選
function itemRowClick(card, event) {
    const check = card.querySelector('.item-check');
    check.checked = !check.checked;
    toggleOptions(check);
}

// 監聽勾選狀態切換顯示內容
function toggleOptions(check) {
    const card = check.closest('.item-card');
    const isChecked = check.checked;
    if (isChecked) {
        card.classList.add('is-checked');
    } else {
        card.classList.remove('is-checked');
    }
    card.querySelector('.item-options').style.display = isChecked ? 'block' : 'none';
    calculateAll();
}

// 處理實體檔案選取
function handleFileSelect(input) {
    const files = input.files;
    const container = input.closest('.image-section').querySelector('.image-upload-area');
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            createPreviewBox(container, e.target.result);
        };
        reader.readAsDataURL(file);
    });
    input.value = '';
}

// 建立預覽方塊
function createPreviewBox(container, imageUrl) {
    const box = document.createElement('div');
    box.className = 'preview-box';
    box.style.backgroundImage = `url(${imageUrl})`;
    const removeBtn = document.createElement('div');
    removeBtn.className = 'remove-btn';
    removeBtn.innerHTML = '×';
    removeBtn.onclick = (e) => {
        e.stopPropagation();
        box.remove();
    };
    box.onclick = () => {
        container.querySelectorAll('.preview-box').forEach(p => p.classList.remove('is-cover'));
        box.classList.add('is-cover');
    };
    box.appendChild(removeBtn);
    container.appendChild(box);
}

function calculateAll() {
    let totalPrice = 0;
    let totalTime = 0;
    document.querySelectorAll('.item-card').forEach(card => {
        const check = card.querySelector('.item-check');
        if (check && check.checked) {
            const condSelect = card.querySelector('.condition-select');
            const countInput = card.querySelector('.item-count');
            const selectedOpt = condSelect.options[condSelect.selectedIndex];
            if (!selectedOpt) return;
            const price = parseFloat(selectedOpt.dataset.price);
            const time = parseFloat(selectedOpt.dataset.time);
            const count = parseInt(countInput.value) || 0;
            totalPrice += price * count;
            totalTime += time * count;
            
            const priceEl = card.querySelector('.item-price');
            if (priceEl) priceEl.innerText = `$${(price * count).toLocaleString()}`;
        } else {
            const priceEl = card.querySelector('.item-price');
            if (priceEl) priceEl.innerText = '-';
        }
    });

    // 更新底部輸入框 (自動帶入，允許二次編輯)
    document.getElementById('inputTotalTime').value = Math.round(totalTime);
    document.getElementById('inputTotalHours').value = (totalTime / 60 / 2).toFixed(1);
    
    const totalPriceInput = document.getElementById('inputTotalPrice');
    totalPriceInput.value = totalPrice.toLocaleString();
}

// 輔助：手動輸入時也自動補回千分位 (當離開焦點時)
document.getElementById('inputTotalPrice').onblur = function() {
    let val = this.value.replace(/,/g, ''); // 先移除舊的千分位
    if (!isNaN(val) && val !== '') {
        this.value = parseInt(val).toLocaleString();
    }
};

document.getElementById('inputTotalPrice').onfocus = function() {
    this.value = this.value.replace(/,/g, ''); // 進入編輯時移除千分位，方便輸入
};

function generateInvoice() {
    const client = document.getElementById('clientName').value;
    if (!client) { alert('請輸入客戶名稱'); return; }
    alert(`【王寵系統模擬】已產製報價單並推播給：${client}`);
}

window.onload = () => {
    // 根據頁面特定元素初始化
    if (document.getElementById('grooming-container')) {
        initTabs();
        initExpiryDate();
    }
    
    if (document.getElementById('signatureCanvas')) {
        initSignaturePad();
    }

    if (document.getElementById('dispatchDate')) {
        initDispatchDate();
    }
};

function initDispatchDate() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 14); // 系統日 + 14 天
    const formattedDate = targetDate.toISOString().split('T')[0];
    const dispatchDateInput = document.getElementById('dispatchDate');
    if (dispatchDateInput) {
        dispatchDateInput.value = formattedDate;
    }
}

function toggleStaff(el) {
    el.classList.toggle('active');
}

function addStaffRow() {
    const container = document.getElementById('staff-container');
    const div = document.createElement('div');
    div.className = 'staff-row';
    div.style.cssText = "display: flex; gap: 10px; margin-bottom: 10px;";
    div.innerHTML = `
        <input type="text" placeholder="人員姓名" style="flex: 1;">
        <input type="text" placeholder="備註/工具" style="flex: 2;">
        <button class="btn" style="color: #f56c6c; padding: 5px 10px;" onclick="this.parentElement.remove()">×</button>
    `;
    container.appendChild(div);
}

function initExpiryDate() {
    const today = new Date().toISOString().split('T')[0];
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.value = today;
        expiryDateInput.onclick = function() {
            if (this.showPicker) this.showPicker();
        };
    }
}

// --- 電子簽章邏輯 ---
let isDrawing = false;
let ctx = null;
let canvas = null;

function initSignaturePad() {
    canvas = document.getElementById('signatureCanvas');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // 解決跑版與解析度問題：將畫布屬性設為與顯示大小一致
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // 重新設定畫筆屬性 (Resize 後會重置)
        ctx.strokeStyle = "#1a3c40"; 
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 取得精確坐標避開滾動偏移
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }

    // 事件監聽 (整合 Mouse & Touch)
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
        // 清除後重新設定屬性
        ctx.strokeStyle = "#1a3c40";
        ctx.lineWidth = 3;
    }
}

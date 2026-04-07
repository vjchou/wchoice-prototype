// 派工單專屬資料結構 (根據需求更新，確保美容室 11 項，會客區 5 項)
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

// 初始化頁籤內容
function initTabs() {
    renderItems('grooming', '美容室');
    renderItems('lobby', '會客區');
}

function renderItems(containerPrefix, dataKey) {
    const container = document.getElementById(containerPrefix + '-container');
    if (!container) return;
    container.innerHTML = ''; 
    
    MASTER_DATA[dataKey].forEach(itemData => {
        const itemTemplate = document.getElementById('item-template');
        const itemClone = itemTemplate.content.cloneNode(true);
        const card = itemClone.querySelector('.item-card');
        
        card.querySelector('.item-name').innerText = itemData.name;
        
        // 填充條件 (派工單預設唯讀)
        const condSelect = card.querySelector('.condition-select');
        itemData.conditions.forEach((c, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.innerText = c.label;
            condSelect.appendChild(opt);
        });

        // 填充單位
        card.querySelector('.item-unit-text').innerText = itemData.unit;
        
        // 派工單特殊邏輯：勾選框預設全選，且不允許取消勾選 (因由報價單核定)
        const check = card.querySelector('.item-check');
        check.checked = true;
        check.setAttribute('onclick', 'return false;'); 

        container.appendChild(itemClone);
    });
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

function initDispatchDate() {
    const today = new Date().toISOString().split('T')[0];
    const dispatchDateInput = document.getElementById('dispatchDate');
    if (dispatchDateInput) {
        dispatchDateInput.value = today;
        dispatchDateInput.onclick = function() { this.showPicker(); };
    }
}

window.onload = () => {
    initTabs();
    initDispatchDate();
};

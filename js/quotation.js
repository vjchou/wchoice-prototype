// 報價單專屬資料結構
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

function switchMainTab(tabEl, sectionId) {
    const parent = tabEl.closest('.el-tabs');
    parent.querySelectorAll('.el-tabs__item').forEach(item => item.classList.remove('is-active'));
    tabEl.classList.add('is-active');
    document.querySelectorAll('.service-section').forEach(s => s.classList.remove('is-active'));
    document.getElementById(sectionId + '-section').classList.add('is-active');
}

function initTabs() {
    renderItems('grooming', '美容室');
    renderItems('lobby', '會客區');
}

function renderItems(containerPrefix, dataKey) {
    const container = document.getElementById(containerPrefix + '-container');
    if (!container) return;
    container.innerHTML = '';
    
    MASTER_DATA[dataKey].forEach((itemData, itemIdx) => {
        const itemTemplate = document.getElementById('item-template');
        const itemClone = itemTemplate.content.cloneNode(true);
        const card = itemClone.querySelector('.item-card');
        
        card.querySelector('.item-name').innerText = itemData.name;
        
        const condSelect = card.querySelector('.condition-select');
        itemData.conditions.forEach((c, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.innerText = `${c.label} ($${c.price} / ${c.time}min)`;
            opt.dataset.price = c.price;
            opt.dataset.time = c.time;
            condSelect.appendChild(opt);
        });

        card.querySelector('.item-unit-text').innerText = itemData.unit;
        condSelect.onchange = calculateAll;
        card.querySelector('.item-count').oninput = calculateAll;
        card.querySelector('.item-check').onclick = function(e) {
            e.stopPropagation();
            toggleOptions(this);
        };
        card.onclick = function() { itemRowClick(this); };

        container.appendChild(itemClone);
    });
}

function itemRowClick(card) {
    const check = card.querySelector('.item-check');
    check.checked = !check.checked;
    toggleOptions(check);
}

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
            card.querySelector('.item-price').innerText = `$${(price * count).toLocaleString()}`;
        } else {
            const priceEl = card.querySelector('.item-price');
            if (priceEl) priceEl.innerText = '-';
        }
    });

    document.getElementById('inputTotalTime').value = Math.round(totalTime);
    document.getElementById('inputTotalHours').value = (totalTime / 60 / 2).toFixed(1);
    document.getElementById('inputTotalPrice').value = totalPrice.toLocaleString();
}

function handleFileSelect(input) {
    const files = input.files;
    const container = input.closest('.image-section').querySelector('.image-upload-area');
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const box = document.createElement('div');
            box.className = 'preview-box';
            box.style.backgroundImage = `url(${e.target.result})`;
            const removeBtn = document.createElement('div');
            removeBtn.className = 'remove-btn';
            removeBtn.innerHTML = '×';
            removeBtn.onclick = (e) => { e.stopPropagation(); box.remove(); };
            box.appendChild(removeBtn);
            container.appendChild(box);
        };
        reader.readAsDataURL(file);
    });
}

function initExpiryDate() {
    const today = new Date().toISOString().split('T')[0];
    const expiryDateInput = document.getElementById('expiryDate');
    if (expiryDateInput) {
        expiryDateInput.value = today;
    }
}

window.onload = () => {
    initTabs();
    initExpiryDate();
};

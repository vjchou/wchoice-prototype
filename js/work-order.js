const MASTER_DATA = {
    "美容室": [
        { name: "冷氣", unit: "台", qty: 1 },
        { name: "牆面", unit: "面", qty: 4 },
        { name: "洗澡台", unit: "座", qty: 1 },
        { name: "烘箱", unit: "座", qty: 2 },
        { name: "線籠", unit: "組", qty: 8 },
        { name: "地面", unit: "坪", qty: 6 },
        { name: "美容台", unit: "張", qty: 3 },
        { name: "吹水機", unit: "台", qty: 3 },
        { name: "玻璃", unit: "面", qty: 1 },
        { name: "抗菌鍍膜", unit: "式", qty: 1 },
        { name: "擦拭", unit: "式", qty: 1 },
        { name: "天花板", unit: "面", qty: 1 }
    ],
    "會客區": [
        { name: "冷氣", unit: "台", qty: 1 },
        { name: "抗菌鍍膜", unit: "式", qty: 1 },
        { name: "擦拭", unit: "式", qty: 1 },
        { name: "玻璃", unit: "面", qty: 4 },
        { name: "地面", unit: "坪", qty: 4 }
    ]
};

function switchExecutionTab(tabEl, sectionId) {
    const parent = tabEl.closest('.el-tabs');
    parent.querySelectorAll('.el-tabs__item').forEach(item => item.classList.remove('is-active'));
    tabEl.classList.add('is-active');
    
    document.querySelectorAll('.execution-section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId + '-section').style.display = 'block';
}

function renderExecutionItems() {
    renderCategory('grooming-list', '美容室');
    renderCategory('lobby-list', '會客區');
}

function renderCategory(containerId, categoryKey) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    MASTER_DATA[categoryKey].forEach(item => {
        const template = document.getElementById('execution-item-template');
        const clone = template.content.cloneNode(true);
        
        clone.querySelector('.item-name').innerText = item.name;
        clone.querySelector('.item-qty').innerText = item.qty || 1;
        clone.querySelector('.item-unit').innerText = item.unit;
        
        // 狀態顏色聯動
        const select = clone.querySelector('.status-select');
        const card = clone.querySelector('.execution-item-card');
        select.onchange = () => {
            if (select.value === 'done') card.style.borderLeftColor = '#67c23a';
            else if (select.value === 'current') card.style.borderLeftColor = '#409eff';
            else card.style.borderLeftColor = '#dcdfe6';
        };

        container.appendChild(clone);
    });
}

function handleExecutionFile(input) {
    const card = input.closest('.execution-item-card');
    const area = card.querySelector('.execution-photo-area');
    const files = input.files;
    
    // 移除提示
    const tip = area.querySelector('.empty-photo-tip');
    if (tip) tip.remove();

    for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgWrap = document.createElement('div');
            imgWrap.style.cssText = 'width: 50px; height: 50px; border-radius: 4px; overflow: hidden; border: 1px solid #eee; position: relative; cursor: pointer;';
            imgWrap.className = 'thumb-wrap';
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.cssText = 'width: 100%; height: 100%; object-fit: cover;';
            
            imgWrap.onclick = () => {
                // 清除其他封面標記
                card.querySelectorAll('.thumb-wrap').forEach(w => {
                    w.style.borderColor = '#eee';
                    const label = w.querySelector('.cover-label');
                    if (label) label.remove();
                });
                
                // 設為封面
                imgWrap.style.borderColor = 'var(--primary-color)';
                const label = document.createElement('div');
                label.className = 'cover-label';
                label.innerText = '封面';
                label.style.cssText = 'position: absolute; bottom: 0; left: 0; right: 0; background: var(--primary-color); color: #fff; font-size: 10px; text-align: center;';
                imgWrap.appendChild(label);
            };

            imgWrap.appendChild(img);
            area.appendChild(imgWrap);

            // 第一張自動設為封面
            if (area.querySelectorAll('.thumb-wrap').length === 1) {
                imgWrap.click();
            }
        };
        reader.readAsDataURL(files[i]);
    }
}

window.onload = () => {
    renderExecutionItems();
};

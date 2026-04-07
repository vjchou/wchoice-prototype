// 服務單 (Service/Project) Mock Data
const SERVICE_DATA = [
    { 
        id: 'S-20260405-001', 
        quotationId: 'Q-20260405-002', 
        client: '毛小孩天堂', 
        phone: '02-2964-xxxx',
        address: '新北市板橋區文化路一段', 
        price: 12000, 
        progress: 'dispatching', 
        steps: { dispatch: true, order: false, final: false }
    },
    { 
        id: 'S-20260406-001', 
        quotationId: 'Q-20260406-001', 
        client: '貓狗大棧 (中和店)', 
        phone: '02-2240-xxxx',
        address: '新北市中和區景平路 120 號', 
        price: 15500, 
        progress: 'dispatching', 
        steps: { dispatch: false, order: false, final: false }
    },
    { 
        id: 'S-20260406-002', 
        quotationId: 'Q-20260406-003', 
        client: '寵物公園 (新莊店)', 
        phone: '02-2277-xxxx',
        address: '新北市新莊區幸福路 99 號', 
        price: 8800, 
        progress: 'execution', 
        steps: { dispatch: true, order: true, final: false }
    },
    { 
        id: 'S-20260407-001', 
        quotationId: 'Q-20260407-002', 
        client: '汪汪小築', 
        phone: '02-2365-xxxx',
        address: '台北市大安區新生南路一段', 
        price: 5400, 
        progress: 'completion', 
        steps: { dispatch: true, order: true, final: true }
    },
    { 
        id: 'S-20260407-002', 
        quotationId: 'Q-20260407-005', 
        client: '喵電感應 (桃園門市)', 
        phone: '03-332-xxxx',
        address: '桃園市桃園區中正路 500 號', 
        price: 22000, 
        progress: 'dispatching', 
        steps: { dispatch: true, order: false, final: false }
    },
    { 
        id: 'S-20260407-003', 
        quotationId: 'Q-20260407-008', 
        client: '快樂小狗 (新竹店)', 
        phone: '03-577-xxxx',
        address: '新竹市東區慈雲路 10 號', 
        price: 10000, 
        progress: 'execution', 
        steps: { dispatch: true, order: true, final: false }
    },
    { 
        id: 'S-20260407-004', 
        quotationId: 'Q-20260407-010', 
        client: '寵愛一生 (西屯店)', 
        phone: '04-2259-xxxx',
        address: '台中市西屯區台灣大道三段', 
        price: 18000, 
        progress: 'dispatching', 
        steps: { dispatch: false, order: false, final: false }
    }
];

function renderServiceList() {
    const tbody = document.getElementById('service-list-body');
    if (!tbody) return;

    tbody.innerHTML = SERVICE_DATA.map(item => {
        let progressHtml = '';
        
        // 進度標籤
        if (item.progress === 'dispatching') {
            progressHtml = `<span class="status-tag pending">🟡 派工中</span>`;
        } else if (item.progress === 'execution') {
            progressHtml = `<span class="status-tag approved">🔵 施工中</span>`;
        } else if (item.progress === 'completion') {
            progressHtml = `<span class="status-tag approved">🟢 已結案</span>`;
        }

        // 逐步解鎖按鈕邏輯
        // 初始: [派工單 ✎] [施工單 🔒] [結案單 🔒]
        // 派工已建: [派工單 ✓] [施工單 ✎] [結案單 🔒]
        
        const dispatchBtn = item.steps.dispatch 
            ? `<a href="work-dispatch.html?id=${item.id}" class="action-btn">派工單 ✓</a>` 
            : `<a href="work-dispatch.html?id=${item.id}" class="action-btn primary">派工單 ✎</a>`;
        
        const orderBtn = item.steps.order 
            ? `<a href="work-order.html?id=${item.id}" class="action-btn">專業施作單 ✓</a>`
            : (item.steps.dispatch 
                ? `<a href="work-order.html?id=${item.id}" class="action-btn primary">專業施作單 ✎</a>`
                : `<span class="action-btn disabled" title="請先完成派工">專業施作單 🔒</span>`);

        const finalBtn = item.steps.final 
            ? `<a href="completion.html?id=${item.id}" class="action-btn">結案單 ✓</a>`
            : (item.steps.order 
                ? `<a href="completion.html?id=${item.id}" class="action-btn primary">結案單 ✎</a>`
                : `<span class="action-btn disabled" title="請先完成施工">結案單 🔒</span>`);

        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.client}</td>
                <td>${item.phone}</td>
                <td>${item.address}</td>
                <td>$${item.price.toLocaleString()}</td>
                <td>${progressHtml}</td>
                <td>
                    <div class="action-btn-group">
                        ${dispatchBtn}
                        ${orderBtn}
                        ${finalBtn}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.onload = renderServiceList;

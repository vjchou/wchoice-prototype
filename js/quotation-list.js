// 報價單 Mock Data
const QUOTATION_DATA = [
    { id: 'Q-20260407-001', client: '吹毛球痴', phone: '02-2732-xxxx', address: '台北市大安區基隆路二段', price: 8500, agent: '王小明', status: 'pending', date: '2026-04-07' },
    { id: 'Q-20260405-002', client: '毛小孩天堂', phone: '02-2964-xxxx', address: '新北市板橋區文化路一段', price: 12000, agent: '李專員', status: 'approved', date: '2026-04-05' },
    { id: 'Q-20260401-003', client: '汪汪美容', phone: '03-333-xxxx', address: '桃園市桃園區中正路', price: 6200, agent: '陳經理', status: 'rejected', date: '2026-04-01' },
    { id: 'Q-20260406-004', client: '喵星人Spa', phone: '04-2252-xxxx', address: '台中市西屯區台灣大道三段', price: 15800, agent: '張特助', status: 'pending', date: '2026-04-06' }
];

function renderQuotationList() {
    const tbody = document.getElementById('quotation-list-body');
    if (!tbody) return;

    tbody.innerHTML = QUOTATION_DATA.map(item => {
        let statusHtml = '';
        let actionButtons = '';

        if (item.status === 'pending') {
            statusHtml = `<span class="status-tag pending">🟡 報價中</span>`;
            actionButtons = `
                <a href="quotation-add.html?id=${item.id}" class="action-btn primary">編輯</a>
                <a href="quotation-progress.html?id=${item.id}" class="action-btn">報價進度</a>
            `;
        } else if (item.status === 'approved') {
            statusHtml = `<span class="status-tag approved">🟢 報價成立</span>`;
            actionButtons = `
                <a href="quotation-add.html?id=${item.id}&view=true" class="action-btn">檢視</a>
                <a href="quotation-progress.html?id=${item.id}" class="action-btn">報價進度</a>
            `;
        } else {
            statusHtml = `<span class="status-tag rejected">🔴 報價不成立</span>`;
            actionButtons = `
                <a href="quotation-add.html?id=${item.id}&view=true" class="action-btn">檢視</a>
                <a href="quotation-progress.html?id=${item.id}" class="action-btn">報價進度</a>
            `;
        }

        return `
            <tr>
                <td>${item.id}</td>
                <td>${item.client}</td>
                <td>${item.phone}</td>
                <td>${item.address}</td>
                <td>$${item.price.toLocaleString()}</td>
                <td>${statusHtml}</td>
                <td>${item.agent}</td>
                <td>${item.date}</td>
                <td>
                    <div class="action-btn-group">
                        ${actionButtons}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

window.onload = () => {
    renderQuotationList();
};

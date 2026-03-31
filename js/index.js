// 看板資料數據
const PROJECT_DATA = [
    {
        id: "PJ-20260331-001",
        client: "吹毛球痴 (忠孝店)",
        stage: 1,
        statusText: "報價中等回覆",
        date: "2026-03-31",
        price: 5400,
        actions: [
            { label: "報價單", url: "quotation.html" },
            { label: "派工單", url: "work-dispatch.html" }
        ]
    },
    {
        id: "PJ-20260328-095",
        client: "萌寵寵物店 (大安)",
        stage: 2,
        statusText: "派工中",
        date: "2026-03-28",
        price: 8200,
        actions: [
            { label: "派工單", url: "work-dispatch.html" }
        ]
    },
    {
        id: "PJ-20260325-088",
        client: "王小明 (美容教室)",
        stage: 3,
        statusText: "施作中",
        date: "2026-03-25",
        price: 12800,
        actions: [
            { label: "施工單", url: "work-order.html" },
            { label: "結案單", url: "completion.html" }
        ]
    },
    {
        id: "PJ-20260320-015",
        client: "王大衛 (居家消毒)",
        stage: 4,
        statusText: "已結案",
        date: "2026-03-20",
        price: 3200,
        actions: [
            { label: "結案單", url: "completion.html" }
        ]
    }
];

// 渲染看板函數
function renderDashboard() {
    const tbody = document.getElementById('project-list-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    PROJECT_DATA.forEach(project => {
        const tr = document.createElement('tr');
        
        // 1. 產生進度點位 HTML
        let stepsHtml = '<div class="progress-steps">';
        for (let i = 1; i <= 4; i++) {
            const activeClass = i <= project.stage ? 'active' : '';
            stepsHtml += `<div class="step-dot ${activeClass}"></div>`;
        }
        stepsHtml += '</div>';

        // 2. 產生操作連結 HTML
        const actionsHtml = project.actions.map(act => 
            `<a href="${act.url}" class="action-link">${act.label}</a>`
        ).join('<span style="margin: 0 5px; color: #eee;">|</span>');

        tr.innerHTML = `
            <td>${project.id}</td>
            <td>${project.client}</td>
            <td>
                <span class="status-badge stage-${project.stage}">
                    <span class="status-dot"></span>${project.statusText}
                </span>
            </td>
            <td>${stepsHtml}</td>
            <td>${project.date}</td>
            <td>$${project.price.toLocaleString()}</td>
            <td>${actionsHtml}</td>
        `;
        tbody.appendChild(tr);
    });
}

// 頁面載入後初始化
window.onload = () => {
    renderDashboard();
};

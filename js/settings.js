/**
 * Global Configuration & Master Data for WANG CHOICE
 * Shared between quotation, item settings, and area settings.
 */

const GLOBAL_AREAS = [
    { id: 1, name: '美容室', code: 'GROOMING_ROOM', status: '啟用', count: 12 },
    { id: 2, name: '會客區', code: 'LOBBY', status: '啟用', count: 5 },
    { id: 3, name: '休息區', code: 'BREAKROOM', status: '停用', count: 2 }
];

const GLOBAL_SERVICE_ITEMS = [
    { id: 1, name: '冷氣清消', unit: '台', price: 800, time: 10, areas: ['美容室', '會客區'], desc: '分離式冷氣清消<br>1.清潔濾網<br>2.安裝濾膜<br>3.抗菌鍍膜<br>4.清潔出風口<br>5.清潔機身', note: '標準清消: $800, 10分<br>深層(含濾網): $1200, 20分' },
    { id: 2, name: '牆面清消', unit: '面', price: 100, time: 5, areas: ['美容室'], desc: '牆面除毛<br>1.除塵毯左至右上至下除毛<br>2.濕布左至右上至下用力擦拭<br>3.重點髒污清潔', note: '局部擦拭: $100, 5分<br>全室噴灑: $300, 15分' },
    { id: 3, name: '洗澡台', unit: '座', price: 500, time: 15, areas: ['美容室'], desc: '洗澡台清潔<br>1.移動洗澡台(兩人)<br>2.清潔後方牆面毛髮及基本髒污<br>3.清潔後方地面毛髮及基本髒汙<br>4.移回洗澡台(兩人)<br>5.由左面>中間>右面>槽體不鏽鋼擦拭清潔<br>6.洗澡台門縫黴菌清潔.鐵條陰角清潔<br>7.出水孔濾網清潔', note: '標準規模: $500, 15分' },
    { id: 4, name: '烘箱', unit: '座', price: 400, time: 15, areas: ['美容室'], desc: '烘箱清潔<br>1.移動烘箱(兩人)<br>2.清潔後方牆面髒污及毛髮<br>3.清潔後方地面毛髮及基本髒污<br>4.清潔上蓋內部毛髮及粉塵<br>5.清潔烘箱內部毛髮', note: '小烘箱: $400, 15分<br>大烘箱: $1000, 60分' },
    { id: 5, name: '線籠', unit: '組', price: 200, time: 10, areas: ['美容室'], desc: '線籠清潔<br>1.除毛清潔<br>2.紙巾擦拭', note: '基本清消: $200, 10分' },
    { id: 6, name: '地面清消', unit: '坪', price: 100, time: 5, areas: ['美容室', '會客區'], desc: '洗地流程<br>1.移動美容桌及線籠<br>2.地坪吸塵<br>3.專業洗地<br>4.地坪吸水', note: '一般清掃: $100, 5分<br>高流量清潔: $150, 10分<br>抗菌刷洗: $300, 20分' },
    { id: 7, name: '美容台', unit: '張', price: 150, time: 5, areas: ['美容室'], desc: '美容台清潔<br>1.桌面擦拭<br>2.陰陽角擦拭<br>3.椅子毛髮清潔', note: '表面清消: $150, 5分' },
    { id: 8, name: '吹水機', unit: '台', price: 200, time: 10, areas: ['美容室'], desc: '吹水機清潔<br>1.濾網清潔<br>2.出風口清潔', note: '進氣過濾清理: $200, 10分' },
    { id: 9, name: '玻璃門窗', unit: '面', price: 300, time: 10, areas: ['美容室', '會客區'], desc: '專業玻璃清潔流程<br>1.濕布擦拭<br>2.髒污清除<br>3.水漬去除<br>4.乾布收尾', note: '標準刮拭: $300, 10分<br>落地景觀窗: $600, 20分' },
    { id: 10, name: '全效防護', unit: '式', price: 2000, time: 60, areas: ['美容室', '會客區'], desc: '環境整體抗菌除臭鍍膜流程', note: '全效防護: $2000, 60分' },
    { id: 11, name: '現場擦拭', unit: '式', price: 500, time: 30, areas: ['美容室', '會客區'], desc: '環境細部與高難度部位擦拭流程', note: '雜物架/櫃體: $500, 30分<br>櫃檯與座椅: $500, 30分' },
    { id: 12, name: '天花板清消', unit: '面', price: 100, time: 10, areas: ['美容室'], desc: '天花板除殘垢與除塵流程', note: '標準清消: $100, 10分' }
];

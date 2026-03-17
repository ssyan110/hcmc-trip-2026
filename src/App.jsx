import React, { useState, useEffect } from 'react';
import {
  Plane, Utensils, ShoppingBag, Calendar,
  Sun, CloudRain, Languages, X, Volume2,
  Calculator, ChevronRight, ChevronDown, Navigation, Map,
  Users, CheckSquare, Square, Youtube, BookOpen
} from 'lucide-react';

// ==========================================
// 1. 全域設定
// ==========================================
const EXCHANGE_RATE = 850; // 1 TWD = 850 VND

// 輔助函式：計算價格字串
const formatPrice = (vnd, isFixedTwd = null) => {
  if (vnd === 0) return "免費";
  const twd = isFixedTwd || Math.round(vnd / EXCHANGE_RATE);
  return `${(vnd / 1000).toFixed(0)}k VND (約 $${twd})`;
};

// 輔助函式：Youtube 搜尋連結
const getYoutubeLink = (keyword) => {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent("胡志明 " + keyword + " vlog")}`;
};

// ==========================================
// 2. 資料設定
// ==========================================

const ITINERARY = [
  {
    day: 1,
    date: "3/17 (週二)",
    title: "抵達 & 市區初探",
    desc: "VJ885 • 飯店入住 • 越式晚餐",
    details: [
      {
        time: "14:55",
        label: "抵達胡志明 (VJ885)",
        note: "預約接送：訂Grab。入境約 1.5hr",
        costVND: 200000,
        mapQuery: "Tan Son Nhat International Terminal",
        ytKeyword: "新山一機場 入境"
      },
      {
        time: "17:00",
        label: "飯店 Check-in",
        note: "第一郡/第四郡 • 稍作休息",
        costVND: 0,
        mapQuery: "District 1 Ho Chi Minh City",
        ytKeyword: "胡志明第一郡飯店"
      },
      {
        time: "18:30",
        label: "晚餐：Om Nướng Ba Son",
        note: "集結各式小吃，環境好。人均約 400-700 台幣 (看點的菜）",
        costVND: 450000,
        mapQuery: "Om Nướng Ba Son",
        ytKeyword: "胡志明Om Nướng Ba Son"
      },
      {
        time: "20:30",
        label: "阮惠街步行廣場",
        note: "看胡志明銅像、市政廳夜景，很寬敞",
        costVND: 0,
        mapQuery: "Nguyen Hue Walking Street",
        ytKeyword: "阮惠街步行街"
      }
    ]
  },
  {
    day: 2,
    date: "3/18 (週三)",
    title: "地標巡禮 & 遊船晚餐",
    desc: "粉紅教堂 • 書街 • 西貢河夜景",
    details: [
      {
        time: "08:00",
        label: "早餐：越南河粉",
        note: "推薦：Pho Hoa 或 自選",
        costVND: 70000,
        mapQuery: "Pho Hoa Pasteur",
        ytKeyword: "胡志明 河粉 推薦"
      },
      {
        time: "09:30",
        label: "市區地標散步",
        note: "紅教堂、郵局、書街 (點都很近)",
        costVND: 0,
        mapQuery: "Saigon Central Post Office",
        ytKeyword: "胡志明 中央郵局 書街"
      },
      {
        time: "12:00",
        label: "午餐推薦：Secret Garden",
        note: "頂樓花園餐廳，氣氛佳家常菜",
        costVND: 180000,
        mapQuery: "Secret Garden Restaurant Pasteur",
        ytKeyword: "Secret Garden 胡志明"
      },
      {
        time: "13:30",
        label: "粉紅教堂 & 椰子咖啡",
        note: "Tan Dinh Church • 對面喝 Cong Cafe",
        costVND: 65000,
        mapQuery: "Tan Dinh Church",
        ytKeyword: "粉紅教堂 胡志明"
      },
      {
        time: "18:30",
        label: "西貢河遊船晚餐",
        note: "Indochina Queen • 船上自助餐看夜景",
        costVND: 650000,
        mapQuery: "Indochina Queen",
        ytKeyword: "西貢河遊船晚餐"
      }
    ]
  },
  {
    day: 3,
    date: "3/19 (週四)",
    title: "湄公河深度一日遊",
    desc: "美托 & 檳知 • 獨角獸島 • 永長寺",
    details: [
      {
        time: "07:30",
        label: "專車接送出發",
        note: "坐車到指定地點，上車跟團前往美托",
        costVND: 550000,
        mapQuery: "District 1 Ho Chi Minh City",
        ytKeyword: "美托檳知一日遊"
      },
      {
        time: "10:30",
        label: "獨角獸島生態體驗",
        note: "養蜂場、蜂蜜茶、與蟒蛇合照",
        costVND: 0, // 含在團費
        mapQuery: "Thoi Son Island",
        ytKeyword: "湄公河 獨角獸島"
      },
      {
        time: "11:00",
        label: "椰子糖工坊 & 民歌",
        note: "觀看製作、試吃、聽 Don Ca Tai Tu",
        costVND: 0, // 含在團費
        mapQuery: "Ben Tre Coconut Candy",
        ytKeyword: "越南 椰子糖工廠"
      },
      {
        time: "12:30",
        label: "午餐：鳳凰島 (Ben Tre)",
        note: "享用特色餐 (團費包含)",
        costVND: 0,
        mapQuery: "Con Phung",
        ytKeyword: "湄公河 鳳凰島"
      },
      {
        time: "15:00",
        label: "參觀永長寺",
        note: "前江省最大寺廟，中法混血風格",
        costVND: 0,
        mapQuery: "Vinh Trang Pagoda",
        ytKeyword: "永長寺"
      }
    ]
  },
  {
    day: 4,
    date: "3/20 (週五)",
    title: "華人區 & 動物園",
    desc: "第五郡美食 • 親子動物園 • 巴士",
    details: [
      {
        time: "08:30",
        label: "早餐推薦：九龍冰室",
        note: "港式點心，體驗堤岸華人文化",
        costVND: 300000,
        mapQuery: "Kowloon Bing Sutt Ho Chi Minh",
        ytKeyword: "胡志明 九龍冰室"
      },
      {
        time: "09:30",
        label: "天后宮 & 平西市場",
        note: "香火鼎盛媽祖廟 • 批發市場",
        costVND: 0,
        mapQuery: "Thien Hau Temple",
        ytKeyword: "胡志明 天后宮"
      },
      {
        time: "12:00",
        label: "午餐推薦：東源雞飯",
        note: "海南雞飯，醬料一絕",
        costVND: 150000,
        mapQuery: "Com Ga Dong Nguyen",
        ytKeyword: "東源雞飯"
      },
      {
        time: "14:30",
        label: "西貢動物園",
        note: "胡志明市唯一一個動物園",
        costVND: 60000,
        mapQuery: "Saigon Zoo and Botanical Garden",
        ytKeyword: "西貢動物園"
      },
      {
        time: "19:00",
        label: "自由活動士",
        note: "胡志明市自由活動",
        costVND: 0,
        mapQuery: "胡志明市",
        ytKeyword: "胡志明市自由活動"
      }
    ]
  },
  {
    day: 5,
    date: "3/21 (週六)",
    title: "早午餐 & 返家",
    desc: "咖啡公寓 • 最後衝刺 • 機場",
    details: [
      {
        time: "00:00",
        label: "推薦咖啡公寓 / 早午餐",
        note: "42 Nguyen Hue • 拍照打卡",
        costVND: 100000,
        mapQuery: "The Cafe Apartment",
        ytKeyword: "咖啡公寓 胡志明"
      },
      {
        time: "10:00",
        label: "可到超市做最後採買 & 午餐",
        note: "把越盾花完",
        costVND: 0,
        mapQuery: "Ben Thanh Market",
        ytKeyword: "濱城市場 美食"
      },
      {
        time: "14:00",
        label: "最晚下午兩點出發前往機場 (T2)",
        note: "易塞車，提早出發",
        costVND: 0,
        mapQuery: "Tan Son Nhat International Terminal",
        ytKeyword: "新山一機場 出境"
      }
    ]
  }
];

// --- 地點卡 (含越南文) ---
const LOCATIONS = [
  { name: "新山一機場 (T2)", vnName: "Sân bay Tân Sơn Nhất (Ga Quốc tế)", address: "International Terminal", mapQuery: "Tan Son Nhat International Terminal" },
  { name: "安貢館 (晚餐)", vnName: "Nhà Hàng Ngon", address: "160 Pasteur, Bến Nghé, Quận 1", mapQuery: "Nha Hang Ngon 160 Pasteur" },
  { name: "粉紅教堂", vnName: "Nhà thờ Tân Định", address: "289 Hai Bà Trưng, Phường 8, Quận 3", mapQuery: "Tan Dinh Church" },
  { name: "Indochina Queen 遊船", vnName: "Tàu Indochina Queen", address: "5 Nguyễn Tất Thành, Quận 4", mapQuery: "Indochina Queen" },
  { name: "Ba Ghien 碎米飯", vnName: "Cơm Tấm Ba Ghiền", address: "84 Đặng Văn Ngữ, Phú Nhuận", mapQuery: "Com Tam Ba Ghien" },
  { name: "天后宮", vnName: "Chùa Bà Thiên Hậu", address: "710 Nguyễn Trãi, Quận 5", mapQuery: "Thien Hau Temple" },
  { name: "西貢動物園", vnName: "Thảo Cầm Viên Sài Gòn", address: "2 Nguyễn Bỉnh Khiêm, Quận 1", mapQuery: "Saigon Zoo and Botanical Garden" },
  { name: "平西市場", vnName: "Chợ Bình Tây", address: "57A Tháp Mười, Quận 6", mapQuery: "Binh Tay Market" },
  { name: "雙層巴士站", vnName: "Trạm Xe Buýt 2 Tầng", address: "Saigon Opera House", mapQuery: "Saigon Opera House" },
];

// --- 美食清單 (詳細版) ---
const FOOD_MENU = [
  { name: "牛肉河粉", vn: "Phở Bò", icon: "🍜", price: 50000, desc: "越南國寶美食，湯頭鮮甜，記得加檸檬和香草。" },
  { name: "法國麵包", vn: "Bánh Mì", icon: "🥖", price: 35000, desc: "外酥內軟，夾烤肉、豬肝醬、醃蘿蔔。" },
  { name: "碎米飯", vn: "Cơm Tấm", icon: "🍱", price: 50000, desc: "南部特色早餐，烤排骨通常很大塊，配魚露吃。" },
  { name: "生春捲", vn: "Gỏi Cuốn", icon: "🍤", price: 15000, desc: "清爽健康，沾花生醬或是魚露吃。" },
  { name: "煉乳咖啡", vn: "Cà Phê Sữa Đá", icon: "☕", price: 45000, desc: "越南必喝！非常甜也非常濃，冰塊融化後剛好。" },
  { name: "椰子咖啡", vn: "Cốt Dừa Cà Phê", icon: "🥥", price: 65000, desc: "Cong Cafe 招牌，像椰子冰沙加咖啡，超消暑。" },
  { name: "甘蔗汁", vn: "Nước Mía", icon: "🥤", price: 10000, desc: "路邊常見，通常會加一顆金桔，微酸很解渴。" },
  { name: "越南煎餅", vn: "Bánh Xèo", icon: "🌮", price: 80000, desc: "越南煎餅，黃色脆皮包豆芽蝦仁，用生菜包著吃。" },
];

// --- 行李清單 ---
const DEFAULT_CHECKLIST = [
  "護照 (效期6個月以上)", "越南電子簽證", "台幣或美金 (換匯用)",
  "越南SIM卡 / 漫遊開通", "個人常備藥 / 腸胃藥", "兒童退燒藥 / 體溫計",
  "防蚊液", "防曬用品", "薄外套 (飛機/冷氣房/防曬)",
  "泳衣 / 泳具", "牙刷牙膏", "手機充電線 / 行動電源"
];

const TAB_ITEMS = [
  { id: 'itinerary', label: '行程安排', shortLabel: '行程', icon: Calendar, note: '每日動線與地圖捷徑' },
  { id: 'tools', label: '工具與美食', shortLabel: '工具', icon: Utensils, note: '匯率、點餐、交通卡' },
  { id: 'info', label: '行李建議', shortLabel: '行李', icon: ShoppingBag, note: '打包清單與提醒' },
  { id: 'travel-notes', label: '注意事項', shortLabel: '注意', icon: BookOpen, note: '入境、交通、安全資訊' },
];

// ==========================================
// 3. 子元件
// ==========================================

// 天氣
const WeatherWidget = () => {
  const [temp, setTemp] = useState(null);
  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=10.8231&longitude=106.6297&current=temperature_2m&timezone=Asia%2FBangkok')
      .then(res => res.json()).then(data => { if (data.current) setTemp(Math.round(data.current.temperature_2m)); })
      .catch(e => console.error(e));
  }, []);
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
      {temp ? <>{temp > 30 ? <Sun className="w-4 h-4 text-yellow-300" /> : <CloudRain className="w-4 h-4 text-blue-200" />}<span>{temp}°C</span></> : <span>...</span>}
    </div>
  );
};

// 匯率
const CurrencyConverter = () => {
  const [vnd, setVnd] = useState('');
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 p-5 text-white shadow-xl sm:p-6">
      <div className="relative z-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-2 font-bold"><Calculator className="w-5 h-5" /> 匯率換算</h3>
        <span className="w-fit rounded-full bg-white/20 px-2.5 py-1 text-xs">1 TWD ≈ {EXCHANGE_RATE} VND</span>
      </div>
      <div className="space-y-3 relative z-10">
        <input type="text" inputMode="numeric" value={vnd ? parseInt(vnd).toLocaleString() : ''} onChange={(e) => setVnd(e.target.value.replace(/,/g, ''))} className="w-full rounded-2xl border border-white/30 bg-black/20 px-4 py-4 text-right text-xl text-white placeholder-white/30 focus:outline-none sm:text-2xl" placeholder="輸入越盾 (VND)" />
        <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-teal-800"><span className="text-sm font-bold">約台幣 (TWD)</span><span className="font-mono text-2xl font-bold">{vnd ? Math.round(vnd / EXCHANGE_RATE).toLocaleString() : '0'}</span></div>
      </div>
      <div className="relative z-10 mt-4 flex flex-wrap justify-end gap-2">{[10000, 50000, 100000, 500000].map(amt => <button key={amt} onClick={() => setVnd(amt.toString())} className="rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-medium">{amt / 1000}k</button>)}</div>
    </div>
  );
};

// 計程車卡
const TaxiCardModal = ({ location, onClose }) => {
  if (!location) return null;
  const openMap = () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`, '_blank');

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-5 sm:p-6" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full bg-gray-100 p-1.5"><X className="w-6 h-6 text-gray-500" /></button>
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 text-center">請給司機看 (Show Driver)</h3>
        <div className="text-center py-6 border-y-2 border-teal-500 my-2">
          <h2 className="text-2xl font-extrabold text-teal-800 mb-4">{location.vnName}</h2>
          <p className="text-gray-800 text-lg">{location.address}</p>
        </div>
        <div className="mt-6 flex gap-3">
          <button onClick={openMap} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700"><Map className="w-5 h-5" /> 開啟導航</button>
        </div>
      </div>
    </div>
  );
};

// 互動式清單
const PackingList = () => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('hcmc_packing_list');
    return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST.map(i => ({ name: i, checked: false }));
  });

  useEffect(() => { localStorage.setItem('hcmc_packing_list', JSON.stringify(items)); }, [items]);

  const toggle = (idx) => {
    const newItems = [...items];
    newItems[idx].checked = !newItems[idx].checked;
    setItems(newItems);
  };

  const progress = Math.round((items.filter(i => i.checked).length / items.length) * 100);

  return (
    <div className="rounded-3xl border border-purple-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-gray-800 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-purple-500" /> 行李清單</h2>
        <span className="w-fit rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-600">{progress}% 完成</span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        {items.map((item, idx) => (
          <div key={idx} onClick={() => toggle(idx)} className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50">
            {item.checked ? <CheckSquare className="w-5 h-5 text-purple-500" /> : <Square className="w-5 h-5 text-gray-300" />}
            <span className={`${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// Accordion Component
// ==========================================
const AccordionSection = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 sm:px-6"
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-bold text-gray-800 sm:text-base">{title}</span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="animate-fade-in border-t border-gray-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          {children}
        </div>
      )}
    </div>
  );
};

const TabButton = ({ tab, active, onClick, mobile = false }) => {
  const Icon = tab.icon;
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all ${
        active
          ? 'border-teal-200 bg-teal-50 text-teal-700 shadow-sm'
          : 'border-transparent bg-white/70 text-slate-600 hover:border-slate-200 hover:bg-white'
      } ${mobile ? 'min-w-[7.5rem] justify-center px-3 py-2.5' : 'w-full'}`}
    >
      <Icon className={`${mobile ? 'h-5 w-5' : 'h-5 w-5 flex-shrink-0'}`} />
      <span className={`${mobile ? 'text-xs font-semibold' : 'min-w-0'}`}>
        <span className="block font-semibold">{mobile ? tab.shortLabel : tab.label}</span>
        {!mobile && <span className="mt-0.5 block text-xs text-slate-400">{tab.note}</span>}
      </span>
    </button>
  );
};

// ==========================================
// Travel Notes Page (旅遊注意事項)
// ==========================================
const TravelNotesPage = () => (
  <div className="mx-auto max-w-5xl animate-fade-in space-y-5">
    <div className="text-center mb-2">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">📘 旅遊注意事項</h2>
      <p className="text-sm text-gray-500">點擊展開各項說明</p>
    </div>

    {/* 航班資訊 */}
    <AccordionSection title="航班資訊" icon="✈️">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-teal-50 rounded-xl p-4">
          <h4 className="font-bold text-teal-700 mb-2">🛫 去程</h4>
          <p className="text-sm text-gray-700 font-bold">高雄 → 胡志明市</p>
          <div className="text-sm text-gray-600 mt-1 space-y-0.5">
            <p>航空公司：越捷航空VietJet Air｜航班：VJ885</p>
            <p>日期：2026/03/17</p>
            <p>起飛 <strong>12:45</strong> 高雄</p>
            <p>抵達 <strong>14:55</strong> 胡志明 新山一機場 T2</p>
          </div>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <h4 className="font-bold text-amber-700 mb-2">🛬 回程</h4>
          <p className="text-sm text-gray-700 font-bold">胡志明市 → 高雄</p>
          <div className="text-sm text-gray-600 mt-1 space-y-0.5">
            <p>航空公司：越南航空 Vietnam Airlines｜航班：VN580</p>
            <p>日期：2026/03/21</p>
            <p>起飛 <strong>17:50</strong></p>
            <p>抵達 <strong>21:45</strong> 高雄</p>
          </div>
        </div>
      </div>
    </AccordionSection>

    {/* 行李檢查清單 */}
    <AccordionSection title="行李檢查清單" icon="🧳">
      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <h4 className="font-bold text-gray-700 mb-2">📄 必備證件</h4>
          <p className="text-sm text-gray-500 mb-2">出發前確認：</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 護照（有效期限至少六個月）</li>
            <li>• 簽證（建議列印）</li>
            <li>• 機票確認單（建議列印）</li>
            <li>• 旅遊保險（建議列印保險證明）</li>
            <li>• 備用護照照片 2 張</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-700 mb-2">👕 服裝建議</h4>
          <p className="text-sm text-gray-500 mb-1">胡志明市 3 月氣溫：<strong>28°C – 35°C</strong>，有可能悶熱潮濕。</p>
          <p className="text-sm text-gray-500 mb-2">建議攜帶：</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 輕便夏季服裝</li>
            <li>• 薄外套（防曬或突然進冷氣房）</li>
            <li>• 防曬用品</li>
            <li>• 太陽眼鏡</li>
            <li>• 帽子</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-700 mb-2">💊 必備藥品</h4>
          <p className="text-sm text-gray-500 mb-2">建議準備：</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 腸胃藥</li>
            <li>• 感冒藥</li>
            <li>• 個人常用藥</li>
            <li>• OK繃</li>
            <li>• 防曬用品</li>
            <li>• 濕紙巾</li>
          </ul>
        </div>
      </div>
    </AccordionSection>

    {/* 入境流程 */}
    <AccordionSection title="入境流程" icon="🛃">
      <div className="space-y-3">
        <p className="text-sm text-gray-700 font-bold">下飛機後：</p>
        <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700 space-y-2">
          <p><strong>1.</strong> 跟著人群走到移民審查</p>
          <p><strong>2.</strong> 準備：</p>
          <ul className="ml-4 space-y-0.5">
            <li>• 護照</li>
            <li>• 簽證</li>
            <li>• 登機證（很重要）</li>
          </ul>
          <p className="text-sm text-red-600 mt-1">⚠️ 一定要留好登機證，每個人都必須有上面三項文件。</p>
          <p className="text-sm text-red-600 mt-1">⚠️ 只要准備好文件，就一定可以過海關，如果遇到海關故意慢吞吞或不做事情， 什麼都別做，不要露出緊張或害怕的表情，只要面無表情的看著他就好。</p>
          <p className="text-sm text-red-600 mt-1">⚠️ 最後請確認海關有蓋「入境章」。</p>
        </div>
        <p className="text-sm text-gray-700">之後流程：</p>
        <div className="flex flex-col gap-2 rounded-xl bg-teal-50 px-4 py-3 text-sm font-bold text-teal-700 sm:flex-row sm:flex-wrap sm:items-center">
          <span>移民審查</span><ChevronRight className="w-4 h-4" />
          <span>領行李</span><ChevronRight className="w-4 h-4" />
          <span>走出海關</span>
        </div>
        <div className="bg-green-50 rounded-xl p-3 text-sm text-green-800">
          <p>請走：<strong>🟢 綠色通道 — Nothing to Declare</strong></p>
        </div>
      </div>
    </AccordionSection>

    {/* 當地交通 */}
    <AccordionSection title="當地交通" icon="🚕">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-green-50 rounded-xl p-4">
          <h4 className="font-bold text-green-700 mb-2">🟢 Grab（最推薦）</h4>
          <p className="text-sm text-gray-700">越南版 Uber。</p>
          <p className="text-sm text-gray-700 mt-1">建議：<strong>提前下載 Grab app，並綁定好信用卡。</strong></p>
          <p className="text-sm text-gray-500 mt-1">可以叫：汽車、機車、外送</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-4">
          <h4 className="font-bold text-gray-700 mb-2">🚖 計程車</h4>
          <p className="text-sm text-gray-700">建議品牌：</p>
          <ul className="text-sm text-gray-700 mt-1 space-y-0.5">
            <li>• <strong>Vinasun</strong></li>
            <li>• <strong>Mai Linh</strong></li>
          </ul>
          <p className="text-sm text-red-600 mt-1">⚠️ 避免不明計程車，絕對不要接受主動來招攬客人的人。</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4">
          <h4 className="font-bold text-amber-700 mb-2">🚶 過馬路技巧</h4>
          <p className="text-sm text-gray-700">胡志明市過馬路方式：</p>
          <p className="text-sm text-gray-800 font-bold mt-1">慢慢走、不要突然停、不要跑</p>
          <p className="text-sm text-gray-500 mt-1">機車會繞過行人。</p>
        </div>
      </div>
    </AccordionSection>

    {/* 支付方式 */}
    <AccordionSection title="支付方式" icon="💳">
      <div className="space-y-3">
        <p className="text-sm text-gray-700">越南使用：<strong>越南盾 VND</strong></p>
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-700 mb-2">常見面額：</p>
          <div className="flex flex-wrap gap-2">
            {['10k(約12台幣)', '20k(約24台幣)', '50k(約60台幣)', '100k(約120台幣)', '200k(約240台幣)', '500k(約600台幣)'].map((v) => (
              <span key={v} className="text-xs font-bold bg-teal-100 text-teal-700 px-3 py-1 rounded-full">{v}</span>
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-700">💳 信用卡：大餐廳 / 商場 / 咖啡店可以使用。</p>
        <p className="text-sm text-red-600 mt-1">⚠️ 需特別特別注意越盾「兩萬」和「五十萬」的紙鈔！</p>
      </div>
    </AccordionSection>

    {/* 換錢攻略 */}
    <AccordionSection title="換錢攻略" icon="💰">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-bold text-gray-700 mb-1">方法 1：台灣先換</h4>
          <p className="text-sm text-gray-600">安全但匯率通常很差。</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4">
          <h4 className="font-bold text-gray-700 mb-1">方法 2：機場換</h4>
          <p className="text-sm text-gray-600">方便但匯率較差。只建議少量。</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-200">
          <h4 className="font-bold text-green-700 mb-1">方法 3：市區金店換（⭐ 推薦）</h4>
          <p className="text-sm text-gray-700">胡志明市很多金店可以換錢。</p>
          <p className="text-sm text-gray-700">匯率通常最好。</p>
          <div className="mt-2 text-sm text-red-600">
            <p>⚠️ 注意：</p>
            <ul className="mt-1 space-y-0.5">
              <li>• 找人多的店</li>
              <li>• 不要在路邊找陌生人換錢</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-700">ℹ️ 推薦金店：https://share.google/SWm0ZalzGRY2asAQo</p>
    </AccordionSection>

    {/* 飲食注意事項 */}
    <AccordionSection title="飲食注意事項" icon="🍜">
      <div className="space-y-3">
        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-gray-700">🚰 飲水：<strong>只喝瓶裝水。</strong></p>
          <p className="text-sm text-red-600 mt-1">⚠️ 避免：未開封來源不明的水或飲料。</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-700 mb-2">🍽️ 吃東西建議：</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>✅ 找客人多的店</p>
            <p>✅ 找 Google 評價好的店</p>
            <p>✅ 可以在超商先買優格吃，讓肚子習慣當地的菌</p>
            <p>❌ 避免完全沒有客人的店</p>
            <p>❌ 避免太過當地的店</p>
          </div>
        </div>
      </div>
    </AccordionSection>

    {/* 治安注意事項 */}
    <AccordionSection title="治安注意事項" icon="🛡️">
      <div className="space-y-3">
        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-gray-700">胡志明市最常見的大問題：<strong className="text-red-600">機車黨搶手機</strong></p>
          <div className="mt-2 text-sm text-gray-700 space-y-1">
            <p>⚠️ 強烈建議應避免：</p>
            <ul className="ml-2 space-y-0.5">
              <li>• 在馬路上滑手機</li>
              <li>• 手機拿在外側</li>
              <li>• 邊走邊用手機</li>
              <li>• 用手機繩</li>
              <li>• 拿著手機走來走去</li>
            </ul>
          </div>
        </div>
        <div className="text-sm text-gray-700 space-y-1">
          <p>🎒 背包建議：<strong>背在後面沒關係，但別放貴重物品。進入人多的地方再背到前面，但需要同時注意褲子和外套口袋。</strong></p>
          <p>💍 避免佩戴：大金項鍊、名錶、看起來很貴的飾品</p>
        </div>
      </div>
    </AccordionSection>

    {/* 防詐騙指南 */}
    <AccordionSection title="防詐騙指南" icon="🚨">
      <div className="space-y-4">
        <p className="text-sm text-gray-500">常見觀光詐騙：</p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-700 mb-1">🚖 計程車繞路</h4>
            <p className="text-sm text-gray-600">解法：只用 <strong>Grab</strong>訂車。</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-700 mb-1">💲 被商家宰</h4>
            <p className="text-sm text-gray-600">有些小店家可能會因為觀光客而抬高價格。</p>
            <p className="text-sm text-red-600 mt-1">做法：<strong>永遠記得，一定要先問價格，並用手機/計算機按出來。這裡可能會按200，表示200K（20萬越盾）；50表示50K（5萬越盾），以此類推。</strong></p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-700 mb-1">💱 換錢詐騙</h4>
            <p className="text-sm text-gray-600">避免：街頭換錢。只去：<strong>金店或銀行</strong>。</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-bold text-gray-700 mb-1">💆 按摩店詐騙</h4>
            <p className="text-sm text-gray-600">有些店會強迫加價、收奇怪費用。</p>
            <p className="text-sm text-teal-600 mt-1">建議：<strong>先確認價格。</strong>，絕對不要去門口被遮起來，或完全沒辦法從外面看到內部的店家。</p>
          </div>
        </div>
      </div>
    </AccordionSection>

    {/* 緊急聯絡資訊 */}
    <AccordionSection title="緊急聯絡資訊" icon="🆘">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr),minmax(0,1fr)]">
        <div className="bg-red-50 rounded-xl p-4">
          <h4 className="font-bold text-red-700 mb-2">越南緊急電話</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-xl p-3"><p className="text-xl font-bold text-red-600">113</p><p className="text-xs text-gray-500">警察</p></div>
            <div className="bg-white rounded-xl p-3"><p className="text-xl font-bold text-orange-600">114</p><p className="text-xs text-gray-500">消防</p></div>
            <div className="bg-white rounded-xl p-3"><p className="text-xl font-bold text-blue-600">115</p><p className="text-xs text-gray-500">救護車</p></div>
          </div>
        </div>
        <div className="bg-blue-50 rounded-xl p-4">
          <h4 className="font-bold text-blue-700 mb-2">🇹🇼 台北經濟文化辦事處</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>📞 電話：<strong>+84-28-3822-5757</strong></p>
            <p>📍 地址：336 Nguyen Tri Phuong Street, District 10, Ho Chi Minh City</p>
          </div>
        </div>
      </div>
    </AccordionSection>
  </div>
);

// ==========================================
// 4. 主程式
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [openDay, setOpenDay] = useState(1);

  const playAudio = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'vi-VN'; u.rate = 0.8; window.speechSynthesis.speak(u);
    } else alert("不支援語音");
  };

  const openMap = (query) => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, '_blank');
  const openYoutube = (query) => window.open(getYoutubeLink(query), '_blank');

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-teal-900/10 bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-white/80">
                Ho Chi Minh City Trip
              </div>
              <h1 className="font-bold text-2xl flex items-center gap-2 tracking-tight sm:text-3xl">
              <Plane className="w-5 h-5 transform -rotate-45 text-teal-300" /> 胡志明自由行
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-teal-50/90 sm:text-base">
                手機優先的旅遊助手，現在也會在平板與桌面寬度下自動展開更寬鬆的資訊布局。
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-teal-100/90 sm:text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Calendar className="h-3.5 w-3.5" /> 2026/3/17-21</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><Users className="h-3.5 w-3.5" /> 13人同行</span>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto">
              <WeatherWidget />
            </div>
          </div>

          <div className="hidden gap-3 overflow-x-auto pb-1 md:flex lg:hidden">
            {TAB_ITEMS.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                mobile
              />
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 pt-4 sm:px-6 lg:grid-cols-[18rem,minmax(0,1fr)] lg:px-8 lg:pt-6">
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white shadow-xl">
              <p className="text-xs uppercase tracking-[0.25em] text-teal-200">旅程總覽</p>
              <h2 className="mt-2 text-2xl font-bold">5 天 4 夜</h2>
              <p className="mt-2 text-sm text-slate-300">手機保留底部導覽，桌面改成固定側欄，切換分頁時不需要回到底部。</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-slate-300">主要區域</div>
                  <div className="mt-1 font-semibold">第一郡 / 第五郡</div>
                </div>
                <div className="rounded-2xl bg-white/10 p-3">
                  <div className="text-slate-300">重點</div>
                  <div className="mt-1 font-semibold">美食 + 親子動線</div>
                </div>
              </div>
            </div>

            <nav className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Sections</div>
              <div className="space-y-2">
                {TAB_ITEMS.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
            </nav>
          </div>
        </aside>

        <section className="min-w-0 space-y-4">
          {/* TAB 1: 行程 */}
          {activeTab === 'itinerary' && (
            <div className="animate-fade-in grid gap-4 xl:grid-cols-2">
            {ITINERARY.map((day) => (
              <div key={day.day} className="overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                {/* Day Header */}
                <button
                  onClick={() => setOpenDay(openDay === day.day ? null : day.day)}
                  className="flex w-full items-start justify-between gap-3 p-5 text-left transition-transform active:scale-[0.99] sm:items-center sm:p-6"
                >
                  <div className="flex min-w-0 items-start gap-4 sm:items-center">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 shadow-lg shadow-teal-500/20 sm:h-16 sm:w-16">
                      <div className="text-center">
                        <div className="text-[10px] font-semibold text-teal-100 uppercase tracking-wide">Day</div>
                        <div className="text-2xl font-bold text-white leading-none">{day.day}</div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <h3 className="mb-0.5 text-base font-semibold leading-tight text-gray-900 sm:text-lg">{day.title}</h3>
                      <p className="text-xs text-gray-400 font-medium">{day.date}</p>
                      <p className="mt-0.5 text-[11px] text-gray-400 sm:text-xs">{day.desc}</p>
                    </div>
                  </div>
                  <ChevronDown className={`ml-2 h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ${openDay === day.day ? 'rotate-180' : ''}`} />
                </button>

                {/* Day Content */}
                {openDay === day.day && (
                  <div className="bg-gradient-to-b from-gray-50/50 to-white px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
                    <div className="space-y-5">
                      {day.details.map((item, idx) => (
                        <div key={idx} className="relative">
                          {/* Timeline connector */}
                          {idx !== day.details.length - 1 && (
                            <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 to-transparent"></div>
                          )}

                          {/* Activity Card */}
                          <div className="flex gap-3 sm:gap-4">
                            {/* Time indicator */}
                            <div className="flex-shrink-0 pt-1">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-teal-500 shadow-lg shadow-teal-500/25">
                                <span className="text-white text-xs font-bold">{item.time.split(':')[0]}<span className="text-[8px]">:{item.time.split(':')[1]}</span></span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 rounded-2xl border border-gray-100/50 bg-white p-4 shadow-sm">
                              {/* Title & Cost */}
                              <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <h4 className="flex-1 text-[15px] font-semibold leading-tight text-gray-900">{item.label}</h4>
                                {item.costVND !== 0 && (
                                  <div className="flex-shrink-0 sm:ml-3">
                                    <div className="text-left sm:text-right">
                                      <div className="text-xs font-bold text-teal-600">
                                        ${item.fixedTwd || Math.round(item.costVND / EXCHANGE_RATE)}
                                      </div>
                                      <div className="text-[9px] text-gray-400 font-medium">TWD</div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Description */}
                              <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.note}</p>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={(e) => { e.stopPropagation(); openMap(item.mapQuery); }}
                                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                >
                                  <Map className="w-3.5 h-3.5" />
                                  <span className="font-medium">導航</span>
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); openYoutube(item.ytKeyword); }}
                                  className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                                >
                                  <Youtube className="w-3.5 h-3.5" />
                                  <span className="font-medium">影片</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
          )}

          {/* TAB 2: 工具 */}
          {activeTab === 'tools' && (
            <div className="animate-fade-in grid gap-6 xl:grid-cols-2">
              <div className="xl:col-span-2">
                <CurrencyConverter />
              </div>

              {/* 點餐手指通 (新版) */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-800"><Utensils className="w-5 h-5 text-teal-600" /> 美食圖鑑 & 點餐</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                {FOOD_MENU.map((f, idx) => (
                  <div key={idx} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-gray-100 p-3 transition-colors hover:bg-orange-50" onClick={() => playAudio(f.vn)}>
                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gray-50 text-4xl">{f.icon}</div>
                    <div className="flex-1">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="font-bold text-gray-800">{f.name}</h3>
                        <div className="text-left sm:text-right">
                          <span className="block text-xs font-bold text-teal-600">{formatPrice(f.price)}</span>
                        </div>
                      </div>
                      <div className="text-xs text-teal-600 font-bold mb-1">{f.vn} <Volume2 className="w-3 h-3 inline ml-1 opacity-50" /></div>
                      <p className="text-xs text-gray-500 leading-tight">{f.desc}</p>
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-800"><Navigation className="w-5 h-5 text-teal-600" /> 計程車卡 (含導航)</h2>
                <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                {LOCATIONS.map((loc, idx) => (
                  <button key={idx} onClick={() => setSelectedLocation(loc)} className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-left transition-all hover:bg-teal-50 active:scale-95">
                    <div className="text-sm font-bold text-gray-700">{loc.name}</div>
                    <div className="mt-1 text-[10px] leading-relaxed text-gray-400">{loc.vnName}</div>
                  </button>
                ))}
                </div>
              </div>

              {/* 常用語音 */}
              <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
                <h2 className="mb-4 flex items-center gap-2 font-bold text-gray-800"><Languages className="w-5 h-5 text-teal-600" /> 常用語音</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { ch: "你好", vn: "Xin chào" }, { ch: "謝謝", vn: "Cảm ơn" },
                  { ch: "買單", vn: "Tính tiền" }, { ch: "太貴了", vn: "Mắc quá" },
                  { ch: "不要加冰", vn: "Không đá" }, { ch: "廁所?", vn: "Toilet?" }
                ].map((p, i) => (
                  <button key={i} onClick={() => playAudio(p.vn)} className="flex items-center justify-between rounded-2xl border border-gray-100 p-3 hover:bg-gray-50">
                    <span className="text-sm font-bold text-gray-700">{p.ch}</span>
                    <Volume2 className="w-4 h-4 text-teal-500" />
                  </button>
                ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: 資訊 */}
          {activeTab === 'info' && (
            <div className="animate-fade-in grid gap-6 xl:grid-cols-[minmax(0,1fr),20rem]">
              <PackingList />

              <div className="rounded-3xl border border-red-100 bg-red-50 p-5 shadow-sm sm:p-6">
                <h2 className="mb-2 flex items-center gap-2 font-bold text-red-700">注意</h2>
                <div className="space-y-3 text-sm text-red-800">
                  <p>請依照個人需求準備行李，特別是醫藥品、清潔用品、過敏藥等等。</p>
                  <p>平板與桌面版會把清單拆成雙欄，手機維持單列，勾選區域也更好點擊。</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 旅遊注意事項 */}
          {activeTab === 'travel-notes' && <TravelNotesPage />}
        </section>
      </main>

      {/* 底部導覽 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-gray-200 bg-white/95 px-3 pb-safe pt-2 backdrop-blur-md md:hidden">
        {TAB_ITEMS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-[4.5rem] flex-col items-center rounded-2xl px-2 py-2.5 ${active ? 'bg-teal-50 text-teal-600' : 'text-gray-400'}`}
            >
              <Icon className="h-5 w-5" />
              <span className="mt-1 text-[10px] font-medium">{tab.shortLabel}</span>
            </button>
          );
        })}
      </div>

      {selectedLocation && <TaxiCardModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Plane, MapPin, Utensils, ShoppingBag, Calendar, 
  CreditCard, Info, Sun, CloudRain, 
  Languages, Phone, X, Volume2, 
  Calculator, ChevronRight, Navigation, Map,
  Users, CheckSquare, Square, Youtube, Bus, Video
} from 'lucide-react';

// ==========================================
// 1. 全域設定
// ==========================================
const EXCHANGE_RATE = 850; // 1 TWD = 850 VND

// 輔助函式：計算價格字串
const formatPrice = (vnd, isFixedTwd = null) => {
  if (vnd === 0) return "免費";
  const twd = isFixedTwd || Math.round(vnd / EXCHANGE_RATE);
  return `${(vnd/1000).toFixed(0)}k VND (約 $${twd})`;
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
        label: "晚餐：Nha Hang Ngon", 
        note: "集結各式小吃，環境好。人均約 300 台幣", 
        costVND: 250000, 
        mapQuery: "Nha Hang Ngon 160 Pasteur",
        ytKeyword: "Nha Hang Ngon 胡志明"
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
        note: "推薦：Pho Hoa 或 飯店早餐", 
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
        label: "午餐：Secret Garden", 
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
        costVND: 500000, 
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
        note: "第1郡飯店上車，前往美托", 
        costVND: 550000, 
        mapQuery: "District 1 Ho Chi Minh City",
        ytKeyword: "美托一日遊"
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
        label: "早餐：九龍冰室", 
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
        label: "午餐：東源雞飯", 
        note: "海南雞飯，醬料一絕", 
        costVND: 150000, 
        mapQuery: "Com Ga Dong Nguyen",
        ytKeyword: "東源雞飯"
      },
      { 
        time: "14:30", 
        label: "西貢動物園", 
        note: "門票便宜，可餵長頸鹿", 
        costVND: 60000, 
        mapQuery: "Saigon Zoo and Botanical Garden",
        ytKeyword: "西貢動物園"
      },
      { 
        time: "19:00", 
        label: "雙層觀光巴士", 
        note: "兜風看夜景 (歌劇院旁搭車)", 
        costVND: 150000, 
        mapQuery: "Saigon Opera House",
        ytKeyword: "胡志明 雙層巴士"
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
        time: "09:30", 
        label: "咖啡公寓 / 早午餐", 
        note: "42 Nguyen Hue • 拍照打卡", 
        costVND: 100000, 
        mapQuery: "The Cafe Apartment",
        ytKeyword: "咖啡公寓 胡志明"
      },
      { 
        time: "11:30", 
        label: "最後採買 & 午餐", 
        note: "把越盾花完", 
        costVND: 0, 
        mapQuery: "Ben Thanh Market",
        ytKeyword: "濱城市場 美食"
      },
      { 
        time: "14:00", 
        label: "前往機場 (T2)", 
        note: "週六易塞車，提早出發", 
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
  { name: "煎班燒", vn: "Bánh Xèo", icon: "🌮", price: 80000, desc: "越南蛋餅，黃色脆皮包豆芽蝦仁，用生菜包著吃。" },
];

// --- 行李清單 ---
const DEFAULT_CHECKLIST = [
  "護照 (效期6個月以上)", "越南電子簽證 (紙本x2)", "美金 (換匯用)", 
  "網卡 / 漫遊開通", "個人常備藥 / 腸胃藥", "兒童退燒藥 / 體溫計",
  "防蚊液 (很重要)", "防曬乳 / 帽子 / 墨鏡", "薄外套 (飛機/冷氣房)",
  "泳衣 / 泳具", "牙刷牙膏 (環保旅店)", "手機充電線 / 行動電源"
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
    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-sm border border-white/20">
      {temp ? <>{temp > 30 ? <Sun className="w-4 h-4 text-yellow-300"/> : <CloudRain className="w-4 h-4 text-blue-200"/>}<span>{temp}°C</span></> : <span>...</span>}
    </div>
  );
};

// 匯率
const CurrencyConverter = () => {
  const [vnd, setVnd] = useState('');
  return (
    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white shadow-xl mb-6 relative overflow-hidden">
      <div className="flex justify-between mb-4 relative z-10"><h3 className="font-bold flex gap-2"><Calculator className="w-5 h-5"/> 匯率換算</h3><span className="text-xs bg-white/20 px-2 py-1 rounded">1 TWD ≈ {EXCHANGE_RATE} VND</span></div>
      <div className="space-y-3 relative z-10">
        <input type="text" inputMode="numeric" value={vnd ? parseInt(vnd).toLocaleString() : ''} onChange={(e)=>setVnd(e.target.value.replace(/,/g,''))} className="w-full bg-black/20 border-white/30 rounded-xl px-3 py-4 text-2xl text-right text-white focus:outline-none placeholder-white/30" placeholder="輸入越盾 (VND)" />
        <div className="bg-white text-teal-800 rounded-xl px-4 py-3 flex justify-between items-center"><span className="text-sm font-bold">約台幣 (TWD)</span><span className="text-2xl font-bold font-mono">{vnd ? Math.round(vnd/EXCHANGE_RATE).toLocaleString() : '0'}</span></div>
      </div>
      <div className="mt-4 flex justify-end gap-2 relative z-10">{[10000, 50000, 100000, 500000].map(amt=><button key={amt} onClick={()=>setVnd(amt.toString())} className="text-[10px] bg-white/20 px-2 py-1 rounded">{amt/1000}k</button>)}</div>
    </div>
  );
};

// 計程車卡
const TaxiCardModal = ({ location, onClose }) => {
  if (!location) return null;
  const openMap = () => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`, '_blank');
  
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 bg-gray-100 p-1 rounded-full"><X className="w-6 h-6 text-gray-500"/></button>
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 text-center">請給司機看 (Show Driver)</h3>
        <div className="text-center py-6 border-y-2 border-teal-500 my-2">
          <h2 className="text-2xl font-extrabold text-teal-800 mb-4">{location.vnName}</h2>
          <p className="text-gray-800 text-lg">{location.address}</p>
        </div>
        <div className="mt-6 flex gap-3">
           <button onClick={openMap} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700"><Map className="w-5 h-5"/> 開啟導航</button>
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
    <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-purple-400">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-gray-800 flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-purple-500"/> 行李清單</h2>
        <span className="text-xs font-bold text-purple-600 bg-purple-100 px-2 py-1 rounded-full">{progress}% 完成</span>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} onClick={() => toggle(idx)} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            {item.checked ? <CheckSquare className="w-5 h-5 text-purple-500"/> : <Square className="w-5 h-5 text-gray-300"/>}
            <span className={`${item.checked ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. 主程式
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
    <div className="min-h-screen bg-gray-50 font-sans pb-24 md:pb-0">
      {/* Header */}
      <header className="bg-teal-700 text-white px-5 py-4 sticky top-0 z-40 shadow-lg">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl flex items-center gap-2 tracking-tight">
              <Plane className="w-5 h-5 transform -rotate-45 text-teal-300" /> 胡志明親子團
            </h1>
            <div className="flex items-center gap-2 text-xs text-teal-100/80 mt-0.5">
              <Calendar className="w-3 h-3"/> 2026/3/17-21 <span className="w-1 h-1 bg-teal-300 rounded-full"></span> <Users className="w-3 h-3"/> 9人
            </div>
          </div>
          <WeatherWidget />
        </div>
      </header>

      <main className="max-w-md mx-auto p-4 space-y-6">
        {/* TAB 1: 行程 */}
        {activeTab === 'itinerary' && (
          <div className="animate-fade-in space-y-4">
            {ITINERARY.map((day) => (
              <div key={day.day} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className={`p-4 flex justify-between items-center cursor-pointer ${openDay === day.day ? 'bg-teal-50/50' : 'bg-white'}`} onClick={() => setOpenDay(openDay === day.day ? null : day.day)}>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-bold ${openDay === day.day ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-500'}`}><span className="text-[10px] uppercase">Day</span><span className="text-xl leading-none">{day.day}</span></div>
                    <div><h3 className="font-bold text-gray-800 text-lg">{day.title}</h3><p className="text-xs text-gray-500">{day.date}</p></div>
                  </div>
                </div>
                {openDay === day.day && (
                  <div className="px-4 pb-6 pt-2 bg-white">
                    <div className="ml-6 pl-6 border-l-2 border-dashed border-teal-200 space-y-6">
                      {day.details.map((item, idx) => (
                        <div key={idx} className="relative pb-2">
                          <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-teal-400 rounded-full ring-4 ring-white"></div>
                          
                          {/* Time & Title */}
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-teal-600 font-bold text-xs bg-teal-50 px-2 py-0.5 rounded-full">{item.time}</span>
                              <h4 className="font-bold text-gray-800 mt-1">{item.label}</h4>
                            </div>
                            {item.costVND !== 0 && (
                                <div className="text-right">
                                    <span className="block text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded">
                                        {item.fixedTwd ? `預計花費：$${item.fixedTwd} TWD` : `預計花費$${Math.round(item.costVND/EXCHANGE_RATE)} TWD`}
                                    </span>
                                </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-500 my-1">{item.note}</p>
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-2">
                             <button onClick={() => openMap(item.mapQuery)} className="flex items-center gap-1 text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">
                                <Map className="w-3 h-3" /> 導航
                             </button>
                             <button onClick={() => openYoutube(item.ytKeyword)} className="flex items-center gap-1 text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded border border-red-100">
                                <Youtube className="w-3 h-3" /> 看影片
                             </button>
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
          <div className="animate-fade-in space-y-6">
            <CurrencyConverter />
            
            {/* 點餐手指通 (新版) */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Utensils className="w-5 h-5 text-teal-600"/> 美食圖鑑 & 點餐</h2>
              <div className="grid gap-3">
                {FOOD_MENU.map((f, idx) => (
                  <div key={idx} className="border border-gray-100 p-3 rounded-xl flex items-start gap-3 hover:bg-orange-50 cursor-pointer transition-colors" onClick={() => playAudio(f.vn)}>
                    <div className="text-4xl bg-gray-50 w-16 h-16 flex items-center justify-center rounded-lg">{f.icon}</div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800">{f.name}</h3>
                            <div className="text-right">
                                <span className="block text-xs font-bold text-teal-600">{formatPrice(f.price)}</span>
                            </div>
                        </div>
                        <div className="text-xs text-teal-600 font-bold mb-1">{f.vn} <Volume2 className="w-3 h-3 inline ml-1 opacity-50"/></div>
                        <p className="text-xs text-gray-500 leading-tight">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Navigation className="w-5 h-5 text-teal-600"/> 計程車卡 (含導航)</h2>
              <div className="grid grid-cols-2 gap-3">
                {LOCATIONS.map((loc, idx) => (
                  <button key={idx} onClick={() => setSelectedLocation(loc)} className="p-3 bg-gray-50 hover:bg-teal-50 border border-gray-200 rounded-xl text-left active:scale-95 transition-all">
                    <div className="font-bold text-gray-700 text-sm truncate">{loc.name}</div>
                    <div className="text-[10px] text-gray-400 truncate mt-0.5">{loc.vnName}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* 常用語音 */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2"><Languages className="w-5 h-5 text-teal-600"/> 常用語音</h2>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   {ch:"你好",vn:"Xin chào"},{ch:"謝謝",vn:"Cảm ơn"},
                   {ch:"買單",vn:"Tính tiền"},{ch:"太貴了",vn:"Mắc quá"},
                   {ch:"不要加冰",vn:"Không đá"},{ch:"廁所?",vn:"Toilet?"}
                 ].map((p,i)=>(
                   <button key={i} onClick={()=>playAudio(p.vn)} className="p-3 border border-gray-100 rounded-xl flex justify-between items-center hover:bg-gray-50">
                     <span className="text-sm font-bold text-gray-700">{p.ch}</span>
                     <Volume2 className="w-4 h-4 text-teal-500"/>
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 資訊 */}
        {activeTab === 'info' && (
          <div className="animate-fade-in space-y-6">
            <PackingList />
            
            <div className="bg-red-50 rounded-2xl shadow-sm p-5 border border-red-100">
              <h2 className="font-bold text-red-700 mb-2 flex items-center gap-2"><Phone className="w-5 h-5"/> 緊急聯絡</h2>
              <div className="text-sm space-y-2 text-red-800">
                <p><strong>駐胡志明辦事處：</strong> +84-903-927019</p>
                <p><strong>報警：</strong> 113 / <strong>救護車：</strong> 115</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 底部導覽 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 pb-safe pt-2 px-6 flex justify-around md:hidden z-50">
        <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center w-16 p-2 rounded-xl ${activeTab === 'itinerary' ? 'text-teal-600 bg-teal-50' : 'text-gray-400'}`}><Calendar className="w-6 h-6"/><span className="text-[10px] font-medium">行程</span></button>
        <button onClick={() => setActiveTab('tools')} className={`flex flex-col items-center w-16 p-2 rounded-xl ${activeTab === 'tools' ? 'text-teal-600 bg-teal-50' : 'text-gray-400'}`}><Utensils className="w-6 h-6"/><span className="text-[10px] font-medium">工具/美食</span></button>
        <button onClick={() => setActiveTab('info')} className={`flex flex-col items-center w-16 p-2 rounded-xl ${activeTab === 'info' ? 'text-teal-600 bg-teal-50' : 'text-gray-400'}`}><ShoppingBag className="w-6 h-6"/><span className="text-[10px] font-medium">清單</span></button>
      </div>

      {selectedLocation && <TaxiCardModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />}
    </div>
  );
}
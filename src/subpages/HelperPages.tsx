import { useState } from 'react'
import { ArrowLeft, Search, Star, MapPin, Heart, X, Bell, CalendarDays, Clock, MessageCircle, ChevronRight, CheckCircle2 } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const ALL_SERVICES = [
  { id:'scrubs',    name:'Scrubs Cleaning',      cat:'Home Services', price:'160.00', rating:4.8, reviews:230, dist:'2.27', emoji:'🧹', color:'bg-red-100' },
  { id:'quickshine',name:'QuickShine Auto Wash', cat:'Car Services',  price:'120.00', rating:4.7, reviews:89,  dist:'3.20', emoji:'🚗', color:'bg-sky-100' },
  { id:'glow',      name:'Glow Salon & Spa',     cat:'Salon & Spa',   price:'200.00', rating:4.9, reviews:204, dist:'5.50', emoji:'💅', color:'bg-pink-100' },
  { id:'sparkle',   name:'Sparkle Deep Clean',   cat:'Home Services', price:'240.00', rating:4.6, reviews:87,  dist:'5.10', emoji:'✨', color:'bg-purple-100' },
  { id:'quickfix',  name:'QuickFix Maintenance', cat:'Home Services', price:'120.00', rating:4.5, reviews:203, dist:'4.20', emoji:'🔧', color:'bg-amber-100' },
  { id:'luxe',      name:'Luxe Beauty Studio',   cat:'Salon & Spa',   price:'180.00', rating:4.8, reviews:118, dist:'3.90', emoji:'💆', color:'bg-rose-100' },
  { id:'autocare',  name:'AutoCare Pro',          cat:'Car Services',  price:'220.00', rating:4.9, reviews:134, dist:'5.80', emoji:'🚘', color:'bg-blue-100' },
  { id:'happy',     name:'Happy Home Services',  cat:'Home Services', price:'150.00', rating:4.7, reviews:145, dist:'3.80', emoji:'🏡', color:'bg-green-100' },
  { id:'fastdel',   name:'FastDeliver QA',        cat:'Deliveries',    price:'25.00',  rating:4.5, reviews:430, dist:'City', emoji:'🚚', color:'bg-lime-100' },
  { id:'bliss',     name:'Bliss Spa Doha',        cat:'Salon & Spa',   price:'350.00', rating:4.7, reviews:76,  dist:'8.20', emoji:'🛁', color:'bg-fuchsia-100' },
]

const RECENT_SEARCHES = ['home cleaning', 'car wash', 'salon', 'deep cleaning']

// ── Search Page ──────────────────────────────────────────────────────────────
export function SearchPage() {
  const { goBack, navigate } = useNav()
  const [q, setQ] = useState('')
  const [saved, setSaved] = useState<string[]>([])

  const results = q.length > 0 ? ALL_SERVICES.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) ||
    s.cat.toLowerCase().includes(q.toLowerCase())
  ) : []

  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-600"/>
        </button>
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-gray-100">
          <Search size={15} className="text-brand-500 shrink-0"/>
          <input autoFocus value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search for services, categories..."
            className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-gray-400"/>
          {q && <button onClick={() => setQ('')}><X size={15} className="text-gray-400"/></button>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {q === '' ? (
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-3">Recent Searches</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {RECENT_SEARCHES.map(r => (
                <button key={r} onClick={() => setQ(r)}
                  className="flex items-center gap-1.5 bg-white rounded-full px-4 py-2 shadow-sm text-[12px] font-semibold text-gray-600">
                  <Search size={12} className="text-gray-400"/>{r}
                </button>
              ))}
            </div>
            <p className="text-[13px] font-bold text-gray-700 mb-3">Popular Services</p>
            <div className="space-y-3">
              {ALL_SERVICES.slice(0, 5).map(s => (
                <button key={s.id} onClick={() => navigate('service-detail', s)}
                  className="w-full flex items-center gap-3 bg-white rounded-2xl shadow-sm p-3 text-left">
                  <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center text-2xl shrink-0`}>{s.emoji}</div>
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-gray-900">{s.name}</p>
                    <p className="text-[11px] text-gray-400">{s.cat} • from {s.price} QR</p>
                    <div className="flex items-center gap-1 mt-0.5"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] font-semibold text-gray-700">{s.rating}</span></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : results.length > 0 ? (
          <div>
            <p className="text-[13px] font-semibold text-gray-500 mb-3">{results.length} results for "{q}"</p>
            <div className="space-y-3">
              {results.map(s => (
                <button key={s.id} onClick={() => navigate('service-detail', s)}
                  className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex active:scale-[0.99] transition-transform text-left">
                  <div className={`w-24 h-24 ${s.color} flex items-center justify-center text-4xl shrink-0`}>{s.emoji}</div>
                  <div className="flex-1 p-3">
                    <div className="flex items-start justify-between">
                      <p className="text-[13px] font-bold text-gray-900">{s.name}</p>
                      <button onClick={e => { e.stopPropagation(); setSaved(sv => sv.includes(s.id) ? sv.filter(x => x !== s.id) : [...sv, s.id]) }}>
                        <Heart size={14} className={saved.includes(s.id) ? 'text-red-500 fill-red-500' : 'text-gray-300'}/>
                      </button>
                    </div>
                    <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">{s.cat}</span>
                    <p className="text-[14px] font-bold text-brand-500 mt-1">{s.price} QR</p>
                    <div className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] text-gray-600">{s.rating} ({s.reviews})</span></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-[14px] font-semibold text-gray-500">No results for "{q}"</p>
            <p className="text-[12px] text-gray-400">Try a different keyword</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ── All Services Page ────────────────────────────────────────────────────────
export function AllServicesPage() {
  const { goBack, navigate } = useNav()
  const [saved, setSaved] = useState<string[]>([])
  const [filter, setFilter] = useState('All')
  const cats = ['All', 'Home Services', 'Car Services', 'Salon & Spa', 'Deliveries']
  const filtered = filter === 'All' ? ALL_SERVICES : ALL_SERVICES.filter(s => s.cat === filter)

  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={18} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">All Services</h1><p className="text-[11px] text-gray-400">{ALL_SERVICES.length} services available</p></div>
      </div>
      <div className="flex gap-2 px-4 mb-3 overflow-x-auto">
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${filter === c ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-100'}`}>{c}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filtered.map(s => (
          <button key={s.id} onClick={() => navigate('service-detail', s)}
            className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex active:scale-[0.99] transition-transform text-left">
            <div className={`w-28 h-28 ${s.color} flex items-center justify-center text-5xl shrink-0`}>{s.emoji}</div>
            <div className="flex-1 p-3">
              <div className="flex items-start justify-between">
                <p className="text-[14px] font-bold text-gray-900 flex-1 pr-1">{s.name}</p>
                <button onClick={e => { e.stopPropagation(); setSaved(sv => sv.includes(s.id) ? sv.filter(x => x !== s.id) : [...sv, s.id]) }}
                  className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Heart size={13} className={saved.includes(s.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}/>
                </button>
              </div>
              <span className="text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">{s.cat}</span>
              <p className="text-[11px] text-gray-400 mt-1">from</p>
              <p className="text-[15px] font-bold text-brand-500">{s.price} QR</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] font-semibold text-gray-700">{s.rating} ({s.reviews})</span></div>
                {s.dist !== 'City' && <div className="flex items-center gap-0.5"><MapPin size={11} className="text-gray-400"/><span className="text-[11px] text-gray-400">{s.dist} KM</span></div>}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Notifications Page ───────────────────────────────────────────────────────
export function NotificationsPage() {
  const { goBack } = useNav()
  const [notifs, setNotifs] = useState([
    { id:1, emoji:'✅', title:'Booking Confirmed!',     body:'Your Scrubs Cleaning booking for May 30 at 12:00 PM is confirmed.',    time:'10:30 AM', read:false, color:'bg-green-50' },
    { id:2, emoji:'💬', title:'New Message',            body:'Scrubs Cleaning: "Hi! We\'ll be there at 12 PM. Please ensure access."', time:'10:45 AM', read:false, color:'bg-blue-50' },
    { id:3, emoji:'🎉', title:'20% OFF Home Cleaning!', body:'Book Scrubs Cleaning today and save 20% on your first booking.',        time:'9:00 AM',  read:true,  color:'bg-amber-50' },
    { id:4, emoji:'⭐', title:'Rate Your Experience',   body:'How was your QuickShine Auto Wash? Leave a review.',                    time:'Yesterday',read:true,  color:'bg-purple-50' },
    { id:5, emoji:'🚗', title:'Booking Reminder',       body:'Your QuickShine Auto Wash is tomorrow at 10:00 AM.',                   time:'May 28',   read:true,  color:'bg-sky-50' },
    { id:6, emoji:'💳', title:'Payment Successful',     body:'Payment of 160 QR for General Cleaning confirmed.',                    time:'May 25',   read:true,  color:'bg-green-50' },
  ])
  const unread = notifs.filter(n => !n.read).length
  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-4 pt-2 pb-3">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={18} className="text-gray-600"/></button>
          <div><h1 className="text-[18px] font-bold text-gray-900">Notifications</h1>{unread > 0 && <p className="text-[11px] text-brand-500 font-semibold">{unread} unread</p>}</div>
        </div>
        {unread > 0 && <button onClick={() => setNotifs(n => n.map(x => ({...x, read:true})))} className="text-brand-500 text-[12px] font-semibold">Mark all read</button>}
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {notifs.map(n => (
            <button key={n.id} onClick={() => setNotifs(ns => ns.map(x => x.id === n.id ? {...x, read:true} : x))}
              className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${n.read ? '' : 'bg-blue-50/40'}`}>
              <div className={`w-10 h-10 rounded-xl ${n.color} flex items-center justify-center text-xl shrink-0`}>{n.emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[13px] ${n.read ? 'font-semibold text-gray-700' : 'font-bold text-gray-900'}`}>{n.title}</p>
                  <span className="text-[10px] text-gray-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{n.body}</p>
              </div>
              {!n.read && <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0 mt-2"/>}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Order Detail Page ────────────────────────────────────────────────────────
export function OrderDetailPage() {
  const { goBack, navigate, params } = useNav()
  const o = params || {}
  const statusColor: Record<string,string> = {
    Upcoming:'bg-blue-100 text-blue-600', Completed:'bg-green-100 text-green-600', Cancelled:'bg-red-100 text-red-400'
  }
  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={18} className="text-gray-600"/></button>
        <h1 className="text-[18px] font-bold text-gray-900">Order Details</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
        {/* Provider card */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-14 h-14 rounded-2xl ${o.color || 'bg-red-100'} flex items-center justify-center text-3xl`}>{o.providerLogo || '🧹'}</div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-gray-900">{o.serviceName || 'General Cleaning'}</p>
              <p className="text-[12px] text-brand-500 font-semibold">{o.provider || 'Scrubs Cleaning'}</p>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${statusColor[o.status || 'Upcoming']}`}>{o.status || 'Upcoming'}</span>
          </div>
          <div className="space-y-3">
            {[{Icon:CalendarDays,label:'Date',value:o.date||'May 30, 2024'},{Icon:Clock,label:'Time',value:o.time||'12:00 PM'},{Icon:MapPin,label:'Location',value:'Viva Bahriya, The Pearl-Qatar'}].map(({Icon,label,value})=>(
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><Icon size={14} className="text-brand-500"/></div>
                <div><p className="text-[10px] text-gray-400">{label}</p><p className="text-[13px] font-semibold text-gray-800">{value}</p></div>
              </div>
            ))}
          </div>
        </div>
        {/* Payment */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-[14px] font-bold text-gray-800 mb-3">Payment Summary</p>
          <div className="space-y-2">
            <div className="flex justify-between"><span className="text-[13px] text-gray-500">Service fee</span><span className="text-[13px] font-semibold">{o.price || 160}.00 QR</span></div>
            <div className="flex justify-between"><span className="text-[13px] text-gray-500">Platform fee</span><span className="text-[13px] font-semibold text-green-500">FREE</span></div>
            <div className="h-px bg-gray-100 my-1"/>
            <div className="flex justify-between"><span className="text-[14px] font-bold">Total</span><span className="text-[14px] font-bold text-brand-500">{o.price || 160}.00 QR</span></div>
          </div>
        </div>
        {/* Booking ID */}
        <div className="bg-blue-50 rounded-2xl p-4 flex items-center justify-between">
          <div><p className="text-[11px] text-gray-400">Booking ID</p><p className="text-[14px] font-bold text-gray-900">#{(o.id || 'ABC123').toString().slice(-6)}</p></div>
          <CheckCircle2 size={22} className="text-green-500"/>
        </div>
        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => navigate('chat-thread',{id:'scrubs',name:o.provider||'Scrubs Cleaning',emoji:o.providerLogo||'🧹',color:o.color||'bg-red-100',online:true})}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 bg-white text-gray-700 text-[13px] font-semibold">
            <MessageCircle size={16}/>Chat
          </button>
          {o.status === 'Completed' && (
            <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-500 text-white text-[13px] font-semibold">
              <Star size={16}/>Rate Service
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

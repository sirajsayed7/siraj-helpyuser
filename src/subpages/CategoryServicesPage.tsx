import { useState } from 'react'
import { ArrowLeft, Star, MapPin, Heart, ChevronRight, Search } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SERVICES_BY_CAT: Record<string, any[]> = {
  cleaning: [
    { id:'scrubs',    name:'Scrubs Cleaning',     sub:'Professional home cleaning', price:'160.00', rating:4.8, reviews:230, dist:'2.27', emoji:'🧹', color:'bg-red-100' },
    { id:'sparkle',   name:'Sparkle Deep Clean',  sub:'Deep intensive cleaning',    price:'240.00', rating:4.6, reviews:87,  dist:'5.10', emoji:'✨', color:'bg-purple-100' },
    { id:'happy',     name:'Happy Home Services', sub:'Regular & one-time cleaning',price:'150.00', rating:4.7, reviews:145, dist:'3.80', emoji:'🏡', color:'bg-green-100' },
    { id:'pristine',  name:'Pristine Clean Co.',  sub:'Move-in/out specialists',    price:'280.00', rating:4.9, reviews:62,  dist:'7.50', emoji:'🫧', color:'bg-blue-100' },
  ],
  home: [
    { id:'quickfix',  name:'QuickFix Maintenance',sub:'Plumbing, electrical & more',price:'120.00', rating:4.5, reviews:203, dist:'4.20', emoji:'🔧', color:'bg-amber-100' },
    { id:'homepro',   name:'HomePro Services',    sub:'All-in-one home maintenance', price:'180.00', rating:4.7, reviews:89,  dist:'6.10', emoji:'🏠', color:'bg-orange-100' },
    { id:'scrubs',    name:'Scrubs Cleaning',     sub:'Professional home cleaning', price:'160.00', rating:4.8, reviews:230, dist:'2.27', emoji:'🧹', color:'bg-red-100' },
  ],
  car: [
    { id:'quickshine',name:'QuickShine Auto Wash',sub:'Full car wash & detail',     price:'120.00', rating:4.7, reviews:89,  dist:'3.20', emoji:'🚗', color:'bg-sky-100' },
    { id:'autocare',  name:'AutoCare Pro',        sub:'Premium car detailing',       price:'220.00', rating:4.9, reviews:134, dist:'5.80', emoji:'🚘', color:'bg-blue-100' },
    { id:'driveshine',name:'DriveShine Express',  sub:'Express wash 30 mins',        price:'80.00',  rating:4.4, reviews:201, dist:'1.50', emoji:'💦', color:'bg-cyan-100' },
  ],
  salon: [
    { id:'glow',      name:'Glow Salon & Spa',    sub:'Full beauty treatments',      price:'200.00', rating:4.9, reviews:204, dist:'5.50', emoji:'💅', color:'bg-pink-100' },
    { id:'luxe',      name:'Luxe Beauty Studio',  sub:'Hair, nails & facials',       price:'180.00', rating:4.8, reviews:118, dist:'3.90', emoji:'💆', color:'bg-rose-100' },
    { id:'bliss',     name:'Bliss Spa Doha',      sub:'Relaxation & wellness',       price:'350.00', rating:4.7, reviews:76,  dist:'8.20', emoji:'🛁', color:'bg-fuchsia-100' },
  ],
  digital: [
    { id:'techpro',   name:'TechPro Solutions',   sub:'IT support & software',      price:'150.00', rating:4.6, reviews:55,  dist:'N/A',  emoji:'💻', color:'bg-cyan-100' },
    { id:'webcraft',  name:'WebCraft Studio',     sub:'Website & app design',       price:'500.00', rating:4.8, reviews:38,  dist:'N/A',  emoji:'🌐', color:'bg-indigo-100' },
  ],
  education: [
    { id:'tutor1',    name:'Elite Tutoring Centre',sub:'K-12 all subjects',         price:'120.00', rating:4.9, reviews:92,  dist:'2.10', emoji:'📚', color:'bg-yellow-100' },
    { id:'tutor2',    name:'Language Masters',    sub:'Arabic, English, French',    price:'100.00', rating:4.7, reviews:67,  dist:'4.00', emoji:'🌍', color:'bg-green-100' },
  ],
  delivery: [
    { id:'fastdel',   name:'FastDeliver QA',      sub:'Same-day delivery',          price:'25.00',  rating:4.5, reviews:430, dist:'Citywide', emoji:'🚚', color:'bg-lime-100' },
    { id:'expresso',  name:'Expresso Delivery',   sub:'Express 2-hour delivery',    price:'40.00',  rating:4.6, reviews:215, dist:'Citywide', emoji:'⚡', color:'bg-amber-100' },
  ],
}

const FALLBACK = [
  { id:'generic1', name:'Professional Service Co.',sub:'Quality professionals',     price:'150.00', rating:4.6, reviews:50,  dist:'N/A',  emoji:'⭐', color:'bg-blue-100' },
  { id:'generic2', name:'Expert Solutions QA',    sub:'Certified experts',          price:'200.00', rating:4.8, reviews:30,  dist:'N/A',  emoji:'🏆', color:'bg-purple-100' },
]

export default function CategoryServicesPage() {
  const { goBack, navigate, params } = useNav()
  const cat = params?.cat || { id: 'cleaning', label: 'Cleaning Services', emoji: '🧹' }
  const services = SERVICES_BY_CAT[cat.id] || FALLBACK
  const [saved, setSaved] = useState<string[]>([])
  const [sort, setSort] = useState('rating')

  const sorted = [...services].sort((a, b) =>
    sort === 'rating' ? b.rating - a.rating :
    sort === 'price' ? parseFloat(a.price) - parseFloat(b.price) :
    parseFloat(a.dist) - parseFloat(b.dist)
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-600"/>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">{cat.emoji}</span>
            <h1 className="text-[18px] font-bold text-gray-900">{cat.label}</h1>
          </div>
          <p className="text-[11px] text-gray-400">{services.length} services available</p>
        </div>
      </div>

      {/* Sort chips */}
      <div className="flex gap-2 px-4 mb-3 overflow-x-auto">
        {[{id:'rating',label:'Top Rated'},{id:'price',label:'Lowest Price'},{id:'dist',label:'Nearest'}].map(s => (
          <button key={s.id} onClick={() => setSort(s.id)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all
              ${sort === s.id ? 'bg-brand-500 text-white' : 'bg-white text-gray-600 shadow-sm border border-gray-100'}`}>
            {s.label}
          </button>
        ))}
      </div>

      {/* Services list */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {sorted.map(s => (
          <button key={s.id} onClick={() => navigate('service-detail', { ...s, cat: cat.label })}
            className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex active:scale-[0.99] transition-transform text-left">
            <div className={`w-28 h-28 ${s.color} flex items-center justify-center text-5xl shrink-0`}>{s.emoji}</div>
            <div className="flex-1 p-3">
              <div className="flex items-start justify-between">
                <p className="text-[14px] font-bold text-gray-900 flex-1 pr-2">{s.name}</p>
                <button onClick={e => { e.stopPropagation(); setSaved(sv => sv.includes(s.id) ? sv.filter(x => x !== s.id) : [...sv, s.id]) }}
                  className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                  <Heart size={13} className={saved.includes(s.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}/>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
              <p className="text-[11px] text-gray-400 mt-1">from</p>
              <p className="text-[15px] font-bold text-brand-500">{s.price} QR</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  <Star size={11} className="text-amber-400 fill-amber-400"/>
                  <span className="text-[11px] font-semibold text-gray-700">{s.rating} ({s.reviews})</span>
                </div>
                {s.dist !== 'N/A' && s.dist !== 'Citywide' && (
                  <div className="flex items-center gap-0.5">
                    <MapPin size={11} className="text-gray-400"/>
                    <span className="text-[11px] text-gray-400">{s.dist} KM</span>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

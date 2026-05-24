import { useState, useEffect } from 'react'
import { Bell, Search, ChevronRight, Star, MapPin, SlidersHorizontal, Crown, Heart } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

// Adverts
const ADVERTS = [
  {
    id: 'carwash', bg: 'from-sky-500 to-blue-700', emoji: '🚗',
    badge: 'QuickShine Auto', title: 'Up to', big: '10% OFF', sub: 'Car Wash & Detailing',
    cta: 'Book Now', provider: 'QuickShine Auto', service: 'Car Wash & Detailing', price: 120
  },
  {
    id: 'salon', bg: 'from-pink-400 to-rose-600', emoji: '💆‍♀️',
    badge: 'Glow Salon & Spa', title: 'Up to', big: '15% OFF', sub: 'Salon & Spa Treatments',
    cta: 'Book Now', provider: 'Glow Salon & Spa', service: 'Salon & Spa', price: 200
  },
  {
    id: 'cleaning', bg: 'from-emerald-500 to-green-700', emoji: '🏠',
    badge: 'Scrubs Cleaning', title: 'Up to', big: '20% OFF', sub: 'Home Cleaning Services',
    cta: 'Book Now', provider: 'Scrubs Cleaning', service: 'General Cleaning', price: 160
  },
]

const HOME_CATS = [
  { id: 'digital',    label: 'Digital',       emoji: '💻' },
  { id: 'education',  label: 'Education',     emoji: '🎓' },
  { id: 'car',        label: 'Car Services',  emoji: '🚗' },
  { id: 'home',       label: 'Home Services', emoji: '🔧' },
  { id: 'delivery',   label: 'Deliveries',    emoji: '🚚' },
  { id: 'salon',      label: 'Salon & Spa',   emoji: '✂️' },
  { id: 'market',     label: 'Marketplace',   emoji: '🛒' },
  { id: 'more',       label: 'More',          emoji: '···' },
]

const FEATURED = [
  { id: 'scrubs',    provider: 'Scrubs',  name: 'Scrubs Cleaning',    cat: 'Home Services', price: '160.00', rating: 4.8, reviews: 120, dist: '11.84', emoji: '🧹', color: 'bg-red-100' },
  { id: 'quickshine',provider: 'QuickShine',name: 'QuickShine Auto Wash',cat: 'Car Services',price:'120.00', rating: 4.7, reviews: 89,  dist: '3.20',  emoji: '🚗', color: 'bg-sky-100' },
  { id: 'glow',      provider: 'Glow',    name: 'Glow Salon & Spa',   cat: 'Salon & Spa',  price: '200.00', rating: 4.9, reviews: 204, dist: '5.50',  emoji: '💅', color: 'bg-pink-100' },
  { id: 'sparkle',   provider: 'Sparkle', name: 'Sparkle Deep Clean', cat: 'Home Services', price: '240.00', rating: 4.6, reviews: 67,  dist: '8.10',  emoji: '✨', color: 'bg-purple-100' },
]

export default function HomePage() {
  const { navigate } = useNav()
  const [adIdx, setAdIdx] = useState(0)
  const [saved, setSaved] = useState<string[]>([])

  useEffect(() => {
    const t = setInterval(() => setAdIdx(i => (i + 1) % ADVERTS.length), 3500)
    return () => clearInterval(t)
  }, [])

  const ad = ADVERTS[adIdx]

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-1 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-xl">👤</span>
            </div>
            <div>
              <p className="text-[13px] text-gray-500">Hi, la santi 👋</p>
              <p className="text-[16px] font-bold text-gray-900">Welcome to Helpy</p>
            </div>
          </div>
          <button onClick={() => navigate('notifications')} className="relative w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
            <Bell size={20} className="text-gray-600"/>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-brand-500 border border-white"/>
          </button>
        </div>

        {/* Location + Join */}
        <div className="flex items-center gap-2 px-4 mb-3">
          <button onClick={() => navigate('location-picker')} className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm border border-gray-100">
            <MapPin size={15} className="text-brand-500 shrink-0"/>
            <span className="text-[13px] font-semibold text-gray-700 truncate flex-1">Viva Bahriya 10, The Pearl-Qatar</span>
            <ChevronRight size={14} className="text-gray-400 shrink-0"/>
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-brand-500 rounded-2xl px-3 py-2.5 shadow-sm">
            <Crown size={14} className="text-brand-500"/>
            <span className="text-[12px] font-bold text-brand-500 whitespace-nowrap">Join for Free</span>
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-4 mb-4">
          <button onClick={() => navigate('search')} className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-100">
            <Search size={16} className="text-gray-400"/>
            <span className="text-[13px] text-gray-400">Search for services, categories...</span>
          </button>
          <button className="w-11 h-11 bg-white rounded-xl shadow-sm flex items-center justify-center border border-gray-100">
            <SlidersHorizontal size={17} className="text-gray-500"/>
          </button>
        </div>

        {/* Advert Banner */}
        <div className="px-4 mb-4">
          <div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${ad.bg} p-5 shadow-md`} style={{minHeight:180}}>
            {/* Background emoji */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[90px] opacity-30">{ad.emoji}</div>
            <div className="relative z-10">
              <span className="inline-block bg-black/30 text-white text-[11px] font-bold px-3 py-1 rounded-full mb-2">{ad.badge}</span>
              <p className="text-white/90 text-[13px] font-medium">{ad.title}</p>
              <p className="text-white text-[36px] font-black leading-none">{ad.big}</p>
              <p className="text-white text-[15px] font-bold mt-1 mb-4">{ad.sub}</p>
              <button onClick={() => navigate('service-detail', ADVERTS[adIdx])}
                className="bg-brand-500 text-white text-[13px] font-bold px-5 py-2.5 rounded-2xl shadow-sm">
                {ad.cta} →
              </button>
            </div>
            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {ADVERTS.map((_, i) => (
                <button key={i} onClick={() => setAdIdx(i)}
                  className={`rounded-full transition-all ${i === adIdx ? 'w-4 h-2 bg-white' : 'w-2 h-2 bg-white/50'}`}/>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[16px] font-bold text-gray-900">Categories</p>
            <button onClick={() => navigate('categories')} className="flex items-center gap-1 text-brand-500 text-[13px] font-semibold">View all <ChevronRight size={14}/></button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {HOME_CATS.map(c => (
              <button key={c.id} onClick={() => c.id === 'more' ? navigate('categories') : navigate('category-services', { cat: c })}
                className="bg-white rounded-2xl p-3 flex flex-col items-center gap-1.5 shadow-sm active:scale-95 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl">{c.emoji}</div>
                <p className="text-[10px] font-semibold text-gray-700 text-center leading-tight">{c.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Services */}
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[16px] font-bold text-gray-900">Featured Services</p>
            <button onClick={() => navigate('all-services')} className="flex items-center gap-1 text-brand-500 text-[13px] font-semibold">View all <ChevronRight size={14}/></button>
          </div>
          {/* Filter chips */}
          <div className="flex gap-2 mb-3 overflow-x-auto">
            {['All','Digital','Education','Car Services','Home Services'].map((f,i) => (
              <button key={f} className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-[12px] font-semibold ${i===0?'bg-brand-500 text-white':'bg-white text-gray-600 shadow-sm'}`}>{f}</button>
            ))}
          </div>
          {/* Service cards */}
          <div className="space-y-3">
            {FEATURED.map(s => (
              <button key={s.id} onClick={() => navigate('service-detail', s)}
                className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex active:scale-[0.99] transition-transform text-left">
                {/* Image */}
                <div className={`w-28 h-28 ${s.color} flex items-center justify-center text-5xl shrink-0`}>{s.emoji}</div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] text-brand-500 font-semibold">{s.provider}</p>
                      <p className="text-[14px] font-bold text-gray-900 leading-tight">{s.name}</p>
                    </div>
                    <button onClick={e => { e.stopPropagation(); setSaved(sv => sv.includes(s.id) ? sv.filter(x=>x!==s.id) : [...sv,s.id]) }}
                      className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">
                      <Heart size={15} className={saved.includes(s.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}/>
                    </button>
                  </div>
                  <span className="inline-block text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">{s.cat}</span>
                  <p className="text-[11px] text-gray-400 mt-1">from</p>
                  <p className="text-[15px] font-bold text-brand-500">{s.price} QR</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-0.5"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] font-semibold text-gray-700">{s.rating} ({s.reviews})</span></div>
                    <div className="flex items-center gap-0.5"><MapPin size={11} className="text-gray-400"/><span className="text-[11px] text-gray-400">{s.dist} KM away</span></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

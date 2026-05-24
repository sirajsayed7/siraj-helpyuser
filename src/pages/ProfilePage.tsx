import { useState } from 'react'
import { Bell, ChevronRight, Wallet, Languages, Heart, MapPin, MessageCircle, FileText, Shield, LogOut, ArrowLeft, Plus, Trash2, Star } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

// ── Profile Main ─────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { navigate, setActiveTab } = useNav()

  const ACC = [
    { Icon:Wallet,      bg:'bg-blue-50',   color:'text-blue-500',  label:'My Wallet',         sub:'View balance, payments & history',    screen:'wallet',    right: null },
    { Icon:Languages,   bg:'bg-blue-50',   color:'text-blue-500',  label:'Language',           sub:'Choose your preferred language',      screen:null,        right: <span className="flex items-center gap-1 text-[12px] font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-xl">English <ChevronRight size={12}/></span> },
    { Icon:Heart,       bg:'bg-blue-50',   color:'text-blue-500',  label:'My Favorites',       sub:'Saved places, services & stores',     screen:'favorites', right: null },
    { Icon:MapPin,      bg:'bg-blue-50',   color:'text-blue-500',  label:'Manage Addresses',   sub:'Your saved delivery addresses',       screen:'addresses', right: null },
  ]
  const MORE = [
    { Icon:MessageCircle,bg:'bg-blue-50', color:'text-blue-500',  label:'Contact Us',         sub:"We're here to help",                  screen:'contact'  },
    { Icon:FileText,    bg:'bg-blue-50',   color:'text-blue-500',  label:'Terms of Services',  sub:'Read our terms and conditions',       screen:'terms'    },
    { Icon:Shield,      bg:'bg-blue-50',   color:'text-blue-500',  label:'Privacy Policy',     sub:'How we protect your data',            screen:'privacy'  },
  ]

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-[24px] font-bold text-gray-900">Profile</h1>
            <span className="w-2 h-2 rounded-full bg-brand-500"/>
          </div>
          <p className="text-[12px] text-gray-400 mt-0.5">Manage your account and preferences</p>
        </div>
        <button onClick={()=>navigate('notifications')} className="relative w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <Bell size={19} className="text-gray-500"/>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500 border border-white"/>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-white text-3xl">👤</span>
            </div>
            <button className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center border-2 border-white">
              <span className="text-white text-[9px] font-bold">✎</span>
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-[17px] font-bold text-gray-900">Adriana</p>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#2563EB"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="text-[12px] text-gray-500">adrianaklimek00@gmail.com</p>
            <div className="flex items-center gap-1 mt-1.5 bg-blue-50 rounded-full px-2.5 py-0.5 w-fit">
              <span className="text-brand-500 text-[11px]">✦</span>
              <span className="text-[11px] font-semibold text-brand-500">Helpy Member</span>
            </div>
          </div>
          <ChevronRight size={16} className="text-gray-300"/>
        </div>

        {/* Account section */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1 h-4 rounded-full bg-brand-500"/>
            <p className="text-[14px] font-bold text-gray-900">Account</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {ACC.map(item => (
              <button key={item.label} onClick={()=>item.screen&&navigate(item.screen as any)}
                className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}><item.Icon size={17} className={item.color}/></div>
                <div className="flex-1 text-left"><p className="text-[13px] font-semibold text-gray-800">{item.label}</p><p className="text-[11px] text-gray-400">{item.sub}</p></div>
                {item.right || <ChevronRight size={15} className="text-gray-300 shrink-0"/>}
              </button>
            ))}
          </div>
        </div>

        {/* More section */}
        <div>
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-1 h-4 rounded-full bg-brand-500"/>
            <p className="text-[14px] font-bold text-gray-900">More</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
            {MORE.map(item => (
              <button key={item.label} onClick={()=>navigate(item.screen as any)}
                className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}><item.Icon size={17} className={item.color}/></div>
                <div className="flex-1 text-left"><p className="text-[13px] font-semibold text-gray-800">{item.label}</p><p className="text-[11px] text-gray-400">{item.sub}</p></div>
                <ChevronRight size={15} className="text-gray-300 shrink-0"/>
              </button>
            ))}
          </div>
        </div>

        {/* Sign out */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button onClick={()=>setActiveTab('home')}
            className="w-full flex items-center gap-3 px-4 py-3.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center shrink-0"><LogOut size={17} className="text-red-500"/></div>
            <span className="flex-1 text-left text-[13px] font-bold text-red-500">Sign Out</span>
            <ChevronRight size={15} className="text-gray-300 shrink-0"/>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Sub pages shell ──────────────────────────────────────────────────────────
function Shell({ title, sub, children }: { title: string; sub?: string; children: React.ReactNode }) {
  const { goBack } = useNav()
  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-4">
        <button onClick={goBack} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center"><ArrowLeft size={20} className="text-gray-600"/></button>
        <div><h1 className="text-[18px] font-bold text-gray-900">{title}</h1>{sub&&<p className="text-[11px] text-gray-400">{sub}</p>}</div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">{children}</div>
    </div>
  )
}

export function WalletPage() {
  const { navigate } = useNav()
  return (
    <Shell title="My Wallet" sub="Manage your balance and payments">
      <div className="rounded-2xl p-5 text-white" style={{background:'linear-gradient(135deg,#2563EB,#1D4ED8)'}}>
        <p className="text-white/80 text-[13px]">Available Balance</p>
        <p className="text-[36px] font-bold mt-1">250.00 QR</p>
        <p className="text-white/70 text-[12px] mt-1">Last updated: Today</p>
        <button className="mt-4 bg-white/20 text-white text-[13px] font-bold px-5 py-2.5 rounded-2xl">Top Up</button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-5">
        <p className="text-[14px] font-bold text-gray-800 mb-3">Recent Transactions</p>
        {[
          {label:'General Cleaning — Scrubs',  amount:'-160.00', date:'May 30', type:'debit'},
          {label:'Wallet Top Up',              amount:'+500.00', date:'May 25', type:'credit'},
          {label:'Full Detail — QuickShine',   amount:'-220.00', date:'May 22', type:'debit'},
          {label:'Promo Cashback',             amount:'+30.00',  date:'May 20', type:'credit'},
        ].map((t,i)=>(
          <div key={i} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.type==='credit'?'bg-green-50':'bg-red-50'}`}>
              <span className={`font-bold ${t.type==='credit'?'text-green-500':'text-red-400'}`}>{t.type==='credit'?'↑':'↓'}</span>
            </div>
            <div className="flex-1"><p className="text-[13px] font-semibold text-gray-800">{t.label}</p><p className="text-[11px] text-gray-400">{t.date}</p></div>
            <p className={`text-[14px] font-bold ${t.type==='credit'?'text-green-500':'text-red-500'}`}>{t.amount} QR</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function FavoritesPage() {
  const { navigate } = useNav()
  const favs = [
    { id:'scrubs',    name:'Scrubs Cleaning',    cat:'Home Services', price:'160.00', rating:4.8, emoji:'🧹', color:'bg-red-100' },
    { id:'glow',      name:'Glow Salon & Spa',   cat:'Salon & Spa',   price:'200.00', rating:4.9, emoji:'💅', color:'bg-pink-100' },
    { id:'quickshine',name:'QuickShine Auto Wash',cat:'Car Services',  price:'120.00', rating:4.7, emoji:'🚗', color:'bg-sky-100' },
  ]
  return (
    <Shell title="My Favorites" sub="Your saved services">
      {favs.map(f=>(
        <button key={f.id} onClick={()=>navigate('service-detail',f)} className="w-full bg-white rounded-2xl shadow-sm overflow-hidden flex text-left active:scale-[0.99] transition-transform">
          <div className={`w-24 h-24 ${f.color} flex items-center justify-center text-4xl shrink-0`}>{f.emoji}</div>
          <div className="flex-1 p-3">
            <p className="text-[14px] font-bold text-gray-900">{f.name}</p>
            <span className="text-[11px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full font-semibold">{f.cat}</span>
            <p className="text-[15px] font-bold text-brand-500 mt-1">{f.price} QR</p>
            <div className="flex items-center gap-1 mt-0.5"><Star size={11} className="text-amber-400 fill-amber-400"/><span className="text-[11px] font-semibold">{f.rating}</span></div>
          </div>
        </button>
      ))}
    </Shell>
  )
}

export function AddressesPage() {
  const [addrs, setAddrs] = useState([
    { id:1, label:'Home', addr:'Viva Bahriya 10, The Pearl-Qatar', default:true },
    { id:2, label:'Work', addr:'West Bay Tower 3, Doha',           default:false },
  ])
  return (
    <Shell title="Manage Addresses" sub="Your saved delivery addresses">
      {addrs.map(a=>(
        <div key={a.id} className="bg-white rounded-2xl shadow-sm p-4 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0"><MapPin size={18} className="text-brand-500"/></div>
          <div className="flex-1">
            <div className="flex items-center gap-2"><p className="text-[13px] font-bold text-gray-900">{a.label}</p>{a.default&&<span className="text-[10px] font-bold bg-brand-500 text-white px-2 py-0.5 rounded-full">Default</span>}</div>
            <p className="text-[12px] text-gray-500 mt-0.5">{a.addr}</p>
          </div>
          <button onClick={()=>setAddrs(s=>s.filter(x=>x.id!==a.id))}><Trash2 size={15} className="text-red-400"/></button>
        </div>
      ))}
      <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-dashed border-brand-500 text-brand-500 text-[13px] font-bold">
        <Plus size={16}/>Add New Address
      </button>
    </Shell>
  )
}

export function ContactPage() {
  const { navigate } = useNav()
  return (
    <Shell title="Contact Us" sub="We're here to help">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {[{emoji:'💬',label:'Live Chat',sub:'Chat with support now',action:()=>navigate('chat-thread',{id:'support',name:'Helpy Support',emoji:'🎧',color:'bg-brand-500',online:true})},
          {emoji:'📧',label:'Email Us',sub:'support@helpy.qa',action:()=>{}},
          {emoji:'📞',label:'Call Us',sub:'+974 4000 1234',action:()=>{}},
          {emoji:'❓',label:'FAQ',sub:'Browse common questions',action:()=>{}},
        ].map(c=>(
          <button key={c.label} onClick={c.action} className="w-full flex items-center gap-3 py-3 border-b border-gray-50 last:border-0 text-left">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">{c.emoji}</div>
            <div className="flex-1"><p className="text-[13px] font-bold text-gray-900">{c.label}</p><p className="text-[11px] text-gray-400">{c.sub}</p></div>
            <ChevronRight size={15} className="text-gray-300"/>
          </button>
        ))}
      </div>
    </Shell>
  )
}

export function TermsPage() {
  return (
    <Shell title="Terms of Services">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {['1. Acceptance of Terms','2. Use of Services','3. User Responsibilities','4. Payment Terms','5. Cancellation Policy','6. Liability Limitations','7. Changes to Terms'].map(s=>(
          <div key={s} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <p className="text-[13px] font-bold text-gray-800 mb-1">{s}</p>
            <p className="text-[12px] text-gray-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function PrivacyPage() {
  return (
    <Shell title="Privacy Policy">
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
        {['Data We Collect','How We Use Your Data','Data Sharing','Your Rights','Cookies Policy','Contact for Privacy'].map(s=>(
          <div key={s} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <p className="text-[13px] font-bold text-gray-800 mb-1">{s}</p>
            <p className="text-[12px] text-gray-500 leading-relaxed">We take your privacy seriously. Your personal data is protected under Qatar Data Protection Law. We collect only what is necessary to provide our services.</p>
          </div>
        ))}
      </div>
    </Shell>
  )
}

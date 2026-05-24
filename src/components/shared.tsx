import { Home, ShoppingBag, MessageCircle, User } from 'lucide-react'
import { useNav } from '../context/NavContext'

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? 'text-white' : 'text-gray-800'
  return (
    <div className={`flex items-center justify-between px-5 pt-4 pb-1 shrink-0 ${c}`}>
      <span className="text-[13px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="5" width="3" height="7" rx="1" fill="currentColor"/><rect x="4.5" y="3" width="3" height="9" rx="1" fill="currentColor"/><rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor"/><rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/></svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><circle cx="8" cy="10.5" r="1.5" fill="currentColor"/><path d="M4.5,7 C5.8,5.7 7,5 8,5 C9,5 10.2,5.7 11.5,7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/><path d="M1.5,4 C3.5,2 5.7,1 8,1 C10.3,1 12.5,2 14.5,4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
      </div>
    </div>
  )
}
const TABS=[{id:'home',label:'Home',Icon:Home},{id:'orders',label:'Order',Icon:ShoppingBag},{id:'chat',label:'Chat',Icon:MessageCircle},{id:'profile',label:'Profile',Icon:User}]
export function BottomNav(){const{activeTab,setActiveTab}=useNav();const unread=3;return <div className="absolute bottom-5 left-1/2 z-50 w-[92%] -translate-x-1/2 rounded-[30px] border border-white/70 bg-white/95 px-2 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl"> <div className="flex items-center justify-around">{TABS.map(({id,label,Icon})=>{const active=activeTab===id;return <button key={id} onClick={()=>setActiveTab(id)} className={`relative flex flex-col items-center gap-1 rounded-2xl px-4 py-2 transition-all ${active?'bg-blue-50':''}`}><div className="relative"><Icon size={22} className={active?'text-brand-500':'text-gray-400'}/>{id==='chat'&&unread>0&&<span className="absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-brand-500 px-1 text-[9px] font-bold text-white">{unread}</span>}</div><span className={`text-[11px] font-semibold ${active?'text-brand-500':'text-gray-500'}`}>{label}</span></button>})}</div></div>}

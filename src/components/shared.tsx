import { Home, ShoppingBag, MessageCircle, User } from 'lucide-react'
import { useNav } from '../context/NavContext'

export function StatusBar({ light = false }: { light?: boolean }) {
  const c = light ? 'text-white' : 'text-gray-800'
  return (
    <div className={`flex items-center justify-between px-5 pt-4 pb-1 shrink-0 ${c}`}>
      <span className="text-[13px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="5" width="3" height="7" rx="1" fill="currentColor"/>
          <rect x="4.5" y="3" width="3" height="9" rx="1" fill="currentColor"/>
          <rect x="9" y="1" width="3" height="11" rx="1" fill="currentColor"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor"/>
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <circle cx="8" cy="10.5" r="1.5" fill="currentColor"/>
          <path d="M4.5,7 C5.8,5.7 7,5 8,5 C9,5 10.2,5.7 11.5,7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
          <path d="M1.5,4 C3.5,2 5.7,1 8,1 C10.3,1 12.5,2 14.5,4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1"/>
          <rect x="2" y="2" width="17" height="8" rx="1.5" fill="currentColor"/>
          <path d="M22.5,4 L22.5,8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  )
}

const TABS = [
  { id: 'home',   label: 'Home',    Icon: Home },
  { id: 'orders', label: 'Order',   Icon: ShoppingBag },
  { id: 'chat',   label: 'Chat',    Icon: MessageCircle },
  { id: 'profile',label: 'Profile', Icon: User },
]

export function BottomNav() {
  const { activeTab, setActiveTab, bookedServices } = useNav()
  const unread = 3
  return (
    <>
      <div className="shrink-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 pt-3 pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.07)]">
        {TABS.map(({ id, label, Icon }) => {
          const active = activeTab === id
          return (
            <button key={id} onClick={() => setActiveTab(id)} className="flex flex-col items-center gap-0.5 min-w-[60px] relative">
              <div className="relative">
                <Icon size={22} className={active ? 'text-brand-500' : 'text-gray-400'} strokeWidth={active ? 2.4 : 1.8}/>
                {id === 'chat' && unread > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-brand-500 text-white text-[9px] font-bold flex items-center justify-center">{unread}</span>
                )}
              </div>
              <span className={`text-[10px] font-semibold ${active ? 'text-brand-500' : 'text-gray-400'}`}>{label}</span>
              {active && <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full bg-brand-500"/>}
            </button>
          )
        })}
      </div>
      <div className="h-1.5 bg-white flex items-center justify-center pb-1">
        <div className="w-28 h-1 rounded-full bg-black/15"/>
      </div>
    </>
  )
}

export function HelpyLogo({ size = 'md', dark = false }: { size?: 'sm'|'md'|'lg'; dark?: boolean }) {
  const s = size === 'lg' ? 56 : size === 'sm' ? 32 : 44
  return (
    <div className="flex flex-col items-center">
      <svg width={s} height={s * 0.55} viewBox="0 0 100 55" fill="none">
        <path d="M15 45 C15 30 30 20 50 25 C70 30 85 20 85 10 C85 25 70 35 50 30 C30 25 15 35 15 45Z" fill="#2563EB"/>
        <path d="M20 35 C25 20 45 15 65 22 C80 27 90 20 88 12 C82 28 65 33 45 26 C28 21 18 30 20 35Z" fill="#3B82F6" opacity="0.7"/>
      </svg>
      <span className={`font-black tracking-widest text-[${size==='lg'?'22':size==='sm'?'13':'17'}px] leading-none ${dark?'text-gray-900':'text-gray-900'}`} style={{fontSize: size==='lg'?22:size==='sm'?13:17}}>HELPY</span>
    </div>
  )
}

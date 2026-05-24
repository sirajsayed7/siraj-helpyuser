import { useState } from 'react'
import { CheckCircle2, MessageCircle, CalendarDays, Clock, ChevronRight } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

// ── Booking Confirm ──────────────────────────────────────────────────────────
export function BookingConfirmPage() {
  const { params, setActiveTab, navigate } = useNav()
  const b = params?.booking || {}
  const emoji = params?.emoji || '🧹'
  const color = params?.color || 'bg-blue-50'

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="flex-1 overflow-y-auto px-5 pb-10">
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-4 shadow-sm">
            <CheckCircle2 size={48} className="text-green-500"/>
          </div>
          <p className="text-[22px] font-bold text-gray-900">Booking Confirmed! 🎉</p>
          <p className="text-[13px] text-gray-500 mt-1 text-center">Your booking has been placed successfully</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center text-3xl`}>{emoji}</div>
            <div>
              <p className="text-[15px] font-bold text-gray-900">{b.serviceName || 'Service'}</p>
              <p className="text-[12px] text-brand-500 font-semibold">{b.provider || 'Provider'}</p>
            </div>
          </div>
          <div className="h-px bg-gray-100"/>
          {[
            { Icon: CalendarDays, label: 'Date',     value: b.date || 'May 30, 2024' },
            { Icon: Clock,        label: 'Time',     value: b.time || '12:00 PM' },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0"><Icon size={15} className="text-brand-500"/></div>
              <div><p className="text-[10px] text-gray-400">{label}</p><p className="text-[13px] font-semibold text-gray-800">{value}</p></div>
            </div>
          ))}
          <div className="h-px bg-gray-100"/>
          <div className="flex justify-between items-center">
            <p className="text-[14px] font-bold text-gray-900">Total Paid</p>
            <p className="text-[16px] font-bold text-brand-500">{b.price || 160}.00 QR</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 mb-4 flex items-center justify-between">
          <div><p className="text-[11px] text-gray-400">Booking ID</p><p className="text-[14px] font-bold text-gray-900">#{(b.id || '482917').toString().slice(-6)}</p></div>
          <span className="bg-green-100 text-green-600 text-[11px] font-bold px-3 py-1 rounded-full">Confirmed</span>
        </div>
        <div className="space-y-3">
          <button onClick={() => navigate('chat-thread', { id: (b.provider||'scrubs').toLowerCase().replace(/\s+/g,''), name: b.provider || 'Scrubs Cleaning', emoji, color })}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border-2 border-brand-500 text-brand-500 text-[14px] font-bold">
            <MessageCircle size={18}/> Chat with Provider
          </button>
          <button onClick={() => setActiveTab('orders')}
            className="w-full py-3.5 rounded-2xl bg-brand-500 text-white text-[14px] font-bold shadow-sm">
            View My Orders
          </button>
          <button onClick={() => setActiveTab('home')} className="w-full text-gray-400 text-[13px] font-semibold py-2">Back to Home</button>
        </div>
      </div>
    </div>
  )
}

// ── Orders Page ──────────────────────────────────────────────────────────────
export function OrdersPage() {
  const { navigate, bookedServices } = useNav()
  const [tab, setTab] = useState('upcoming')

  const STATUS_COLOR: Record<string,string> = {
    Upcoming:  'bg-blue-100 text-blue-600',
    Completed: 'bg-green-100 text-green-600',
    Cancelled: 'bg-red-100 text-red-400',
  }

  const dummy = [
    { id:'d1', serviceName:'General Cleaning',  provider:'Scrubs Cleaning',  providerLogo:'🧹', date:'May 30, 2024', time:'12:00 PM', price:160, status:'Upcoming',  service:'Home Services', color:'bg-red-100' },
    { id:'d2', serviceName:'Full Detail',        provider:'QuickShine Auto',  providerLogo:'🚗', date:'May 22, 2024', time:'10:00 AM', price:220, status:'Completed', service:'Car Services',  color:'bg-sky-100' },
    { id:'d3', serviceName:'Haircut & Style',    provider:'Glow Salon & Spa', providerLogo:'💅', date:'May 15, 2024', time:'02:00 PM', price:200, status:'Completed', service:'Salon & Spa',   color:'bg-pink-100' },
  ]

  const all: any[] = [...bookedServices, ...dummy]
  const filtered = tab === 'upcoming' ? all.filter(o => o.status === 'Upcoming')
    : tab === 'completed' ? all.filter(o => o.status === 'Completed')
    : all

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="px-5 pt-2 pb-3">
        <h1 className="text-[24px] font-bold text-gray-900">My Orders</h1>
        <p className="text-[12px] text-gray-400 mt-0.5">Track your bookings and services</p>
      </div>
      <div className="px-4 mb-3">
        <div className="bg-white rounded-2xl p-1 flex gap-1 shadow-sm">
          {['upcoming','completed','all'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-[12px] font-semibold capitalize transition-all ${tab===t?'bg-brand-500 text-white shadow-sm':'text-gray-500'}`}>
              {t === 'upcoming' ? 'Upcoming' : t === 'completed' ? 'Completed' : 'All'}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <span className="text-5xl">📋</span>
            <p className="text-[15px] font-semibold text-gray-400">No orders here</p>
            <button onClick={() => navigate('all-services')} className="px-6 py-2.5 rounded-2xl bg-brand-500 text-white text-[13px] font-bold">Browse Services</button>
          </div>
        )}
        {filtered.map((o: any) => (
          <button key={o.id} onClick={() => navigate('order-detail', o)}
            className="w-full bg-white rounded-2xl shadow-sm p-4 text-left active:scale-[0.99] transition-transform">
            <div className="flex items-start gap-3">
              <div className={`w-14 h-14 rounded-2xl ${o.color || 'bg-blue-50'} flex items-center justify-center text-3xl shrink-0`}>{o.providerLogo}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-gray-900">{o.serviceName}</p>
                    <p className="text-[12px] text-brand-500 font-semibold">{o.provider}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_COLOR[o.status] || 'bg-gray-100 text-gray-500'}`}>{o.status}</span>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1"><CalendarDays size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">{o.date}</span></div>
                  <div className="flex items-center gap-1"><Clock size={12} className="text-gray-400"/><span className="text-[11px] text-gray-500">{o.time}</span></div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-[15px] font-bold text-brand-500">{o.price}.00 QR</p>
                  <div className="flex items-center gap-2">
                    <button onClick={e=>{e.stopPropagation();navigate('chat-thread',{id:'scrubs',name:o.provider,emoji:o.providerLogo,color:o.color||'bg-blue-50',online:true})}}
                      className="flex items-center gap-1 bg-blue-50 text-brand-500 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl">
                      <MessageCircle size={12}/>Chat
                    </button>
                    <ChevronRight size={16} className="text-gray-300"/>
                  </div>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

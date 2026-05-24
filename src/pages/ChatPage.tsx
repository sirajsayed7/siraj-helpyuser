import { useState } from 'react'
import { Search, PenSquare, ChevronRight, ArrowLeft, Send, Phone, Video, Paperclip, Smile } from 'lucide-react'
import { StatusBar } from '../components/shared'
import { useNav } from '../context/NavContext'

const CONVOS = [
  { id:'scrubs',   name:'Scrubs Cleaning',    badge:true,  time:'10:30 AM', unread:2, online:true,  emoji:'🧹', color:'bg-red-100',    preview:"Hi la santi! 👋 Your booking for May 30 at 12:00 PM is confirmed." },
  { id:'happy',    name:'Happy Home Services', badge:false, time:'Yesterday',unread:1, online:true,  emoji:'🏠', color:'bg-green-100',  preview:"Thanks for your feedback! We're glad you're happy with our service." },
  { id:'support',  name:'Helpy Support',       badge:false, time:'Yesterday',unread:0, online:false, emoji:'🎧', color:'bg-brand-500',  preview:"How can we help you today?" },
  { id:'sparkle',  name:'Sparkle Cleaners',    badge:false, time:'May 28',   unread:0, online:false, emoji:'✨', color:'bg-purple-100', preview:"Reminder: Your booking is scheduled for tomorrow at 10:00 AM." },
  { id:'quickfix', name:'QuickFix Maintenance', badge:false,time:'May 27',   unread:0, online:true,  emoji:'🔧', color:'bg-amber-100',  preview:"We've received your request and our team will contact you soon." },
  { id:'offers',   name:'Helpy Offers',         badge:false, time:'May 25',  unread:0, online:false, emoji:'%',  color:'bg-pink-100',   preview:"Special offer just for you! Get 20% OFF on your next booking." },
]

const THREAD_MESSAGES: Record<string, { from: 'me'|'them'; text: string; time: string }[]> = {
  scrubs: [
    { from:'them', text:"Hi la santi! 👋 Your booking for May 30 at 12:00 PM is confirmed.", time:'10:30 AM' },
    { from:'me',   text:"Great, thank you! Will there be parking available?", time:'10:32 AM' },
    { from:'them', text:"Yes, of course! We'll send our team member with all equipment needed.", time:'10:35 AM' },
    { from:'me',   text:"Perfect. Please bring eco-friendly supplies if possible.", time:'10:37 AM' },
    { from:'them', text:"Absolutely! We use 100% eco-friendly products. See you on May 30! 🌿", time:'10:38 AM' },
  ],
  support: [
    { from:'them', text:"Hello! Welcome to Helpy Support. How can we assist you today?", time:'Yesterday' },
    { from:'me',   text:"Hi, I have a question about my recent booking.", time:'Yesterday' },
    { from:'them', text:"Of course! Please share your booking ID and we'll look into it right away.", time:'Yesterday' },
  ],
  default: [
    { from:'them', text:"Hello! How can I help you?", time:'10:00 AM' },
  ]
}

const QUICK = ['On my way','Running 10 mins late','When will you arrive?','Can you confirm booking?']

// ── Chat List ────────────────────────────────────────────────────────────────
export default function ChatPage() {
  const { navigate } = useNav()
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')

  const filtered = CONVOS.filter(c =>
    (filter === 'all' || (filter === 'bookings' && ['scrubs','sparkle','happy'].includes(c.id)) || (filter === 'offers' && c.id === 'offers') || (filter === 'support' && c.id === 'support')) &&
    (c.name.toLowerCase().includes(q.toLowerCase()) || c.preview.toLowerCase().includes(q.toLowerCase()))
  )

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center justify-between px-5 pt-2 pb-2">
        <div>
          <h1 className="text-[24px] font-bold text-gray-900">Messages</h1>
          <p className="text-[12px] text-gray-400 mt-0.5">Stay connected with your service providers</p>
        </div>
        <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <PenSquare size={18} className="text-brand-500"/>
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-4 mb-3">
        <div className="flex-1 flex items-center gap-2 bg-white rounded-2xl px-3 py-2.5 shadow-sm">
          <Search size={15} className="text-gray-400"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search messages..." className="flex-1 text-[13px] outline-none bg-transparent placeholder:text-gray-400"/>
        </div>
        <button className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none"><path d="M1 1h14M3 7h10M5 13h6" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 mb-3 overflow-x-auto">
        {[{id:'all',label:'All',count:8},{id:'bookings',label:'Bookings',count:4},{id:'offers',label:'Offers',count:2},{id:'support',label:'Support',count:2}].map(f=>(
          <button key={f.id} onClick={()=>setFilter(f.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-all ${filter===f.id?'bg-brand-500 text-white':'bg-white text-gray-600 shadow-sm'}`}>
            {f.label}
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${filter===f.id?'bg-white/20':'bg-gray-100'}`}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
          {filtered.map(c=>(
            <button key={c.id} onClick={()=>navigate('chat-thread',{id:c.id,name:c.name,emoji:c.emoji,color:c.color,online:c.online})}
              className="w-full flex items-start gap-3 p-4 active:bg-gray-50 text-left">
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full ${c.color} flex items-center justify-center font-bold text-lg`}>
                  {c.emoji.length>2?<span>{c.emoji}</span>:c.emoji}
                </div>
                {c.online&&<span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white"/>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[13px] font-bold text-gray-900 truncate">{c.name}</p>
                    {c.badge&&<svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M9 1L11.06 3.26L14.07 2.75L14.93 5.63L17.66 6.9L16.75 9.87L17.66 12.84L14.93 14.1L14.07 16.98L11.06 16.47L9 18.73L6.94 16.47L3.93 16.98L3.07 14.1L0.34 12.84L1.25 9.87L0.34 6.9L3.07 5.63L3.93 2.75L6.94 3.26L9 1Z" fill="#2563EB"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className="text-[11px] text-gray-400 shrink-0">{c.time}</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-0.5 leading-snug line-clamp-2">{c.preview}</p>
              </div>
              {c.unread>0?(
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">{c.unread}</span>
              ):(
                <ChevronRight size={15} className="text-gray-300 shrink-0"/>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Chat Thread ──────────────────────────────────────────────────────────────
export function ChatThreadPage() {
  const { goBack, params, navigate } = useNav()
  const { id='scrubs', name='Scrubs Cleaning', emoji='🧹', color='bg-red-100', online=true } = params || {}
  const [msgs, setMsgs] = useState(THREAD_MESSAGES[id] || THREAD_MESSAGES.default)
  const [text, setText] = useState('')

  const send = (t: string) => {
    if (!t.trim()) return
    setMsgs(m => [...m, { from:'me', text:t.trim(), time:'now' }])
    setText('')
    setTimeout(() => {
      setMsgs(m => [...m, { from:'them', text:'Thank you for your message! Our team will respond shortly. 😊', time:'now' }])
    }, 1200)
  }

  return (
    <div className="flex flex-col flex-1 bg-[#EEF3FF] overflow-hidden">
      <StatusBar/>
      {/* Header */}
      <div className="bg-white shadow-sm px-4 pt-1 pb-3 flex items-center gap-3">
        <button onClick={goBack} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><ArrowLeft size={18} className="text-gray-600"/></button>
        <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center font-bold text-lg`}>{emoji}</div>
        <div className="flex-1">
          <p className="text-[14px] font-bold text-gray-900">{name}</p>
          <p className={`text-[11px] font-semibold ${online?'text-green-500':'text-gray-400'}`}>{online?'● Online':'● Offline'}</p>
        </div>
        <button className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Phone size={16} className="text-brand-500"/></button>
        <button className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center"><Video size={16} className="text-brand-500"/></button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="text-center mb-2"><span className="text-[11px] text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">Today</span></div>
        {msgs.map((m,i)=>(
          <div key={i} className={`flex ${m.from==='me'?'justify-end':'justify-start'}`}>
            {m.from==='them'&&<div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-sm mr-2 shrink-0 self-end`}>{emoji}</div>}
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl shadow-sm ${m.from==='me'?'bg-brand-500 text-white rounded-br-sm':'bg-white text-gray-800 rounded-bl-sm'}`}>
              <p className="text-[13px] leading-snug">{m.text}</p>
              <p className={`text-[10px] mt-1 ${m.from==='me'?'text-white/60':'text-gray-400'}`}>{m.time}</p>
            </div>
          </div>
        ))}
        {/* Book again button */}
        {id==='scrubs'&&<div className="flex justify-center mt-3"><button onClick={()=>navigate('service-detail',{id:'scrubs',name:'Scrubs Cleaning',emoji:'🧹',color:'bg-red-100',rating:4.8,reviews:230,dist:'2.27',cat:'Home Services'})} className="bg-brand-500 text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-sm">📅 Book Again</button></div>}
      </div>

      {/* Quick replies */}
      <div className="px-3 pb-2 flex gap-2 overflow-x-auto">
        {QUICK.map(q=>(
          <button key={q} onClick={()=>send(q)} className="shrink-0 text-[11px] font-semibold text-brand-500 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full whitespace-nowrap">{q}</button>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-100 px-3 py-3 flex items-center gap-2">
        <button className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center"><Paperclip size={15} className="text-gray-400"/></button>
        <div className="flex-1 flex items-center bg-gray-100 rounded-2xl px-3 py-2 gap-2">
          <input className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-gray-400" placeholder="Type a message..." value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(text)}/>
          <Smile size={15} className="text-gray-400 shrink-0"/>
        </div>
        <button onClick={()=>send(text)} className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-sm"><Send size={14} className="text-white"/></button>
      </div>
    </div>
  )
}

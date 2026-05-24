import { useState } from 'react'
import { ArrowLeft, ChevronRight, Search } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const ALL_CATS = [
  { id: 'cleaning',  label: 'Cleaning Services',       emoji: '🧹', bg: 'bg-blue-50'   },
  { id: 'craft',     label: 'Craftsmanship',            emoji: '🔨', bg: 'bg-amber-50'  },
  { id: 'design',    label: 'Design and Branding',      emoji: '🎨', bg: 'bg-purple-50' },
  { id: 'gift',      label: 'Gift',                     emoji: '🎁', bg: 'bg-pink-50'   },
  { id: 'gov',       label: 'Governmental Paper Handler',emoji: '🏛', bg: 'bg-gray-50'   },
  { id: 'hardware',  label: 'Hardware',                 emoji: '💻', bg: 'bg-slate-50'  },
  { id: 'language',  label: 'Language',                 emoji: '🌐', bg: 'bg-teal-50'   },
  { id: 'maintenance',label:'Maintenance',              emoji: '⚙️', bg: 'bg-orange-50' },
  { id: 'health',    label: 'Personal Health Services', emoji: '❤️‍🩺', bg: 'bg-red-50'   },
  { id: 'treatment', label: 'Treatment',                emoji: '🏥', bg: 'bg-rose-50'   },
  { id: 'tutoring',  label: 'Tutoring',                 emoji: '🎓', bg: 'bg-indigo-50' },
  { id: 'visuals',   label: 'Visuals',                  emoji: '🎬', bg: 'bg-violet-50' },
  { id: 'digital',   label: 'Digital',                  emoji: '💻', bg: 'bg-cyan-50'   },
  { id: 'education', label: 'Education',                emoji: '📚', bg: 'bg-yellow-50' },
  { id: 'car',       label: 'Car Services',             emoji: '🚗', bg: 'bg-sky-50'    },
  { id: 'home',      label: 'Home Services',            emoji: '🔧', bg: 'bg-green-50'  },
  { id: 'delivery',  label: 'Deliveries',               emoji: '🚚', bg: 'bg-lime-50'   },
  { id: 'salon',     label: 'Salon & Spa',              emoji: '✂️', bg: 'bg-fuchsia-50'},
  { id: 'market',    label: 'Marketplace',              emoji: '🛒', bg: 'bg-emerald-50'},
  { id: 'healthcare',label: 'Health Care',              emoji: '💊', bg: 'bg-red-50'    },
]

const FILTER_TABS = ['All', 'Digital', 'Education', 'Health Care', 'Services', 'Lifestyle']

export default function CategoriesPage() {
  const { goBack, navigate } = useNav()
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = ALL_CATS.filter(c =>
    c.label.toLowerCase().includes(search.toLowerCase()) &&
    (activeFilter === 'All' ||
      (activeFilter === 'Digital' && ['digital','hardware','design','language','visuals'].includes(c.id)) ||
      (activeFilter === 'Education' && ['education','tutoring','language'].includes(c.id)) ||
      (activeFilter === 'Health Care' && ['health','treatment','healthcare'].includes(c.id)) ||
      (activeFilter === 'Services' && ['cleaning','craft','maintenance','car','home','delivery','gov'].includes(c.id)) ||
      (activeFilter === 'Lifestyle' && ['salon','market','gift','design'].includes(c.id))
    )
  )

  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-2">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-600"/>
        </button>
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] font-bold text-gray-900">Categories</h1>
          <span className="text-purple-400 text-xl">✦</span>
          <span className="text-pink-400 text-sm">✦</span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
          <Search size={15} className="text-gray-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search categories..." className="flex-1 text-[13px] outline-none placeholder:text-gray-400 bg-transparent"/>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto">
        {FILTER_TABS.map(f => (
          <button key={f} onClick={() => setActiveFilter(f)}
            className={`shrink-0 px-4 py-2 rounded-full text-[12px] font-semibold transition-all
              ${activeFilter === f ? 'bg-brand-500 text-white shadow-sm' : 'bg-white text-gray-600 shadow-sm border border-gray-100'}`}>
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="grid grid-cols-3 gap-3">
          {filtered.map(cat => (
            <button key={cat.id}
              onClick={() => navigate('category-services', { cat })}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col items-center gap-2 active:scale-95 transition-transform text-left">
              <div className={`w-16 h-16 rounded-2xl ${cat.bg} flex items-center justify-center text-3xl`}>
                {cat.emoji}
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-[11px] font-semibold text-gray-800 leading-tight flex-1">{cat.label}</p>
                <ChevronRight size={12} className="text-gray-300 shrink-0"/>
              </div>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-[14px] font-semibold text-gray-400">No categories found</p>
          </div>
        )}
      </div>
    </div>
  )
}

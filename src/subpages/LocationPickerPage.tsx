import { useState } from 'react'
import { ArrowLeft, MapPin, Search, ChevronRight, Check } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const SAVED_LOCATIONS = [
  { id: 'home',   icon: '🏠', label: 'Home',           addr: 'Viva Bahriya 10, The Pearl-Qatar' },
  { id: 'work',   icon: '💼', label: 'Work',           addr: 'West Bay Tower 3, 4th Floor, Doha' },
]

const POPULAR = [
  { id: 'pearl',  icon: '🏝', label: 'The Pearl-Qatar',    addr: 'The Pearl Island, Doha' },
  { id: 'lusail', icon: '🌆', label: 'Lusail City',        addr: 'Lusail, North Doha' },
  { id: 'westbay',icon: '🏙', label: 'West Bay',           addr: 'West Bay, Doha' },
  { id: 'alwaab', icon: '🏘', label: 'Al Waab',            addr: 'Al Waab Street, Doha' },
  { id: 'msheireb',icon:'🏛', label: 'Msheireb Downtown', addr: 'Msheireb, Central Doha' },
  { id: 'alrayyan',icon:'🌿', label: 'Al Rayyan',          addr: 'Al Rayyan Municipality, Qatar' },
  { id: 'alsadd', icon: '🏪', label: 'Al Sadd',            addr: 'Al Sadd, Central Doha' },
  { id: 'wakrah', icon: '🌊', label: 'Al Wakrah',          addr: 'Al Wakrah, South Qatar' },
]

export default function LocationPickerPage() {
  const { goBack } = useNav()
  const [selected, setSelected] = useState('home')
  const [search, setSearch] = useState('')
  const [saved, setSaved] = useState(false)

  const allLocs = [...SAVED_LOCATIONS, ...POPULAR]
  const filtered = allLocs.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase()) ||
    l.addr.toLowerCase().includes(search.toLowerCase())
  )
  const filteredSaved = SAVED_LOCATIONS.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase()) || l.addr.toLowerCase().includes(search.toLowerCase())
  )
  const filteredPopular = POPULAR.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase()) || l.addr.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (id: string) => {
    setSelected(id)
    setSaved(true)
    setTimeout(() => { setSaved(false); goBack() }, 800)
  }

  return (
    <div className="flex flex-col flex-1 bg-[#F5F7FF] overflow-hidden">
      <StatusBar/>
      <div className="flex items-center gap-3 px-4 pt-2 pb-3">
        <button onClick={goBack} className="w-9 h-9 bg-white rounded-xl shadow-sm flex items-center justify-center">
          <ArrowLeft size={18} className="text-gray-600"/>
        </button>
        <div>
          <h1 className="text-[18px] font-bold text-gray-900">Set Location</h1>
          <p className="text-[11px] text-gray-400">Choose your service location</p>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mx-4 mb-3 rounded-2xl overflow-hidden shadow-sm" style={{ height: 160 }}>
        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 relative flex items-center justify-center">
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(0deg,#2563EB 0,#2563EB 1px,transparent 1px,transparent 32px),repeating-linear-gradient(90deg,#2563EB 0,#2563EB 1px,transparent 1px,transparent 32px)'
          }}/>
          {/* Roads */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/60 -translate-y-1/2"/>
            <div className="absolute left-1/3 top-0 bottom-0 w-1 bg-white/60"/>
            <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-white/40"/>
            <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white/40"/>
          </div>
          {/* Pin */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center shadow-lg">
              <MapPin size={20} className="text-white"/>
            </div>
            <div className="w-3 h-3 rounded-full bg-brand-500/30 mt-1"/>
          </div>
          {/* Location label */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="bg-white rounded-xl px-3 py-2 shadow-sm flex items-center gap-2">
              <MapPin size={13} className="text-brand-500 shrink-0"/>
              <p className="text-[11px] font-semibold text-gray-700 truncate">
                {allLocs.find(l => l.id === selected)?.addr || 'Viva Bahriya 10, The Pearl-Qatar'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 shadow-sm border border-gray-100">
          <Search size={15} className="text-gray-400"/>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search for a location..." className="flex-1 text-[13px] outline-none placeholder:text-gray-400 bg-transparent"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {/* Saved */}
        {filteredSaved.length > 0 && (
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-2">Saved Locations</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
              {filteredSaved.map(loc => (
                <button key={loc.id} onClick={() => handleSelect(loc.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl shrink-0">{loc.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="text-[13px] font-bold text-gray-900">{loc.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{loc.addr}</p>
                  </div>
                  {selected === loc.id ? (
                    <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-white"/>
                    </div>
                  ) : <ChevronRight size={15} className="text-gray-300 shrink-0"/>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Popular */}
        {filteredPopular.length > 0 && (
          <div>
            <p className="text-[13px] font-bold text-gray-700 mb-2">Popular in Doha</p>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-50">
              {filteredPopular.map(loc => (
                <button key={loc.id} onClick={() => handleSelect(loc.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 active:bg-gray-50">
                  <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">{loc.icon}</div>
                  <div className="flex-1 text-left">
                    <p className="text-[13px] font-semibold text-gray-900">{loc.label}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{loc.addr}</p>
                  </div>
                  {selected === loc.id ? (
                    <div className="w-6 h-6 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                      <Check size={13} className="text-white"/>
                    </div>
                  ) : <ChevronRight size={15} className="text-gray-300 shrink-0"/>}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirm button */}
      <div className="px-4 pb-4">
        <button onClick={() => { setSaved(true); setTimeout(goBack, 600) }}
          className={`w-full py-4 rounded-2xl text-white text-[14px] font-bold shadow-sm transition-colors ${saved ? 'bg-green-500' : 'bg-brand-500'}`}>
          {saved ? '✓ Location Set!' : 'Confirm Location'}
        </button>
      </div>
    </div>
  )
}

import { useState, useRef, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

const CORRECT = '123456'

export default function VerifyPage() {
  const { navigate, goBack } = useNav()
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [timer, setTimer] = useState(20)
  const [success, setSuccess] = useState(false)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (timer > 0) { const t = setTimeout(() => setTimer(v => v - 1), 1000); return () => clearTimeout(t) }
  }, [timer])

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const n = [...code]; n[i] = val.slice(-1); setCode(n); setError('')
    if (val && i < 5) inputs.current[i + 1]?.focus()
  }

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) inputs.current[i - 1]?.focus()
  }

  const verify = () => {
    const entered = code.join('')
    if (entered.length < 6) { setError('Please enter the full 6-digit code'); return }
    if (entered !== CORRECT) { setError('Incorrect code. Try 123456'); return }
    setSuccess(true)
    setTimeout(() => navigate('home'), 1200)
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'linear-gradient(180deg,#EEF4FF 0%,#F8FBFF 40%,#ffffff 100%)' }}>
      <StatusBar/>

      {/* Doha skyline illustration area */}
      <div className="relative flex-1 overflow-y-auto">
        {/* Top content */}
        <div className="px-5 pt-2">
          <div className="flex items-center justify-between mb-6">
            <button onClick={goBack} className="w-9 h-9 rounded-xl bg-white/80 shadow-sm flex items-center justify-center">
              <ArrowLeft size={18} className="text-gray-600"/>
            </button>
            {/* Helpy logo */}
            <div className="flex flex-col items-center">
              <svg width="36" height="22" viewBox="0 0 120 65" fill="none">
                <path d="M10 55 C10 35 30 18 60 25 C90 32 110 15 112 5 C108 28 88 42 58 35 C28 28 10 42 10 55Z" fill="#1D4ED8"/>
                <path d="M18 44 C24 24 50 16 78 24 C98 30 112 18 110 8 C104 30 82 40 55 32 C32 26 16 37 18 44Z" fill="#3B82F6" opacity="0.65"/>
              </svg>
              <span className="text-[12px] font-black tracking-widest text-gray-900">HELPY</span>
            </div>
          </div>

          <h1 className="text-[28px] font-bold text-gray-900 mb-3">Verify Code</h1>
          <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
            We've sent a verification code to{' '}
            <span className="text-brand-500 font-semibold">user@helpy.qa</span>{' '}
            please enter the code to proceed.
          </p>

          {/* OTP inputs */}
          <div className="flex gap-3 mb-6">
            {code.map((c, i) => (
              <input
                key={i}
                ref={el => { inputs.current[i] = el }}
                type="text" inputMode="numeric" maxLength={1} value={c}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKey(i, e)}
                className={`flex-1 aspect-square rounded-2xl text-center text-[24px] font-bold outline-none border-2 transition-all
                  ${c ? 'border-brand-500 text-brand-500 bg-blue-50' : 'border-gray-200 bg-white text-gray-800'}
                  ${error ? 'border-red-300' : ''}
                  ${success ? 'border-green-400 bg-green-50 text-green-600' : ''}
                  shadow-sm`}
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-[13px] font-semibold text-center mb-3">{error}</p>}
          {success && <p className="text-green-500 text-[13px] font-semibold text-center mb-3">✓ Verified! Redirecting...</p>}

          <button onClick={verify}
            className={`w-full py-4 rounded-2xl text-white text-[15px] font-bold shadow-md transition-all mb-4 ${success ? 'bg-green-500' : 'bg-brand-500'}`}>
            Continue
          </button>

          <div className="text-center">
            <p className="text-[13px] text-gray-500">Didn't get a code?</p>
            {timer > 0 ? (
              <p className="text-[13px] mt-1"><span className="text-brand-500 font-bold">Resend OTP</span> <span className="text-gray-500">00:{String(timer).padStart(2,'0')}</span></p>
            ) : (
              <button onClick={() => setTimer(20)} className="text-brand-500 font-bold text-[13px] mt-1">Resend OTP</button>
            )}
          </div>
        </div>

        {/* Doha skyline decorative area */}
        <div className="mt-8 px-5 relative">
          {/* Ghost watermark logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <svg width="200" height="120" viewBox="0 0 120 65" fill="none">
              <path d="M10 55 C10 35 30 18 60 25 C90 32 110 15 112 5 C108 28 88 42 58 35 C28 28 10 42 10 55Z" fill="#1D4ED8"/>
            </svg>
          </div>

          {/* Doha skyline SVG illustration */}
          <svg viewBox="0 0 380 220" className="w-full opacity-25" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Water */}
            <rect x="0" y="170" width="380" height="50" fill="#BFDBFE" rx="4"/>
            <path d="M0 170 C50 165 100 175 150 170 C200 165 250 175 300 170 C330 167 360 172 380 170 L380 220 L0 220Z" fill="#93C5FD" opacity="0.5"/>
            {/* Buildings */}
            <rect x="20" y="120" width="25" height="50" rx="2" fill="#2563EB" opacity="0.6"/>
            <rect x="50" y="100" width="20" height="70" rx="2" fill="#3B82F6" opacity="0.5"/>
            <rect x="75" y="80" width="18" height="90" rx="2" fill="#1D4ED8" opacity="0.7"/>
            <polygon points="84,60 84,80 75,80 93,80" fill="#1D4ED8" opacity="0.7"/>
            <rect x="100" y="110" width="30" height="60" rx="2" fill="#3B82F6" opacity="0.4"/>
            <rect x="135" y="90" width="22" height="80" rx="2" fill="#2563EB" opacity="0.6"/>
            <rect x="162" y="70" width="20" height="100" rx="2" fill="#1D4ED8" opacity="0.8"/>
            <polygon points="172,50 172,70 162,70 182,70" fill="#1D4ED8" opacity="0.8"/>
            <rect x="187" y="85" width="28" height="85" rx="2" fill="#3B82F6" opacity="0.5"/>
            <rect x="220" y="95" width="22" height="75" rx="2" fill="#2563EB" opacity="0.6"/>
            <rect x="247" y="75" width="18" height="95" rx="2" fill="#1D4ED8" opacity="0.7"/>
            <rect x="270" y="105" width="30" height="65" rx="2" fill="#3B82F6" opacity="0.4"/>
            <rect x="305" y="115" width="20" height="55" rx="2" fill="#2563EB" opacity="0.5"/>
            <rect x="330" y="130" width="25" height="40" rx="2" fill="#3B82F6" opacity="0.4"/>
            {/* Street lamp */}
            <rect x="355" y="140" width="3" height="30" fill="#4B5563" opacity="0.4"/>
            <circle cx="356" cy="138" r="4" fill="#FCD34D" opacity="0.5"/>
            {/* Palm trees */}
            <rect x="10" y="145" width="3" height="25" fill="#6B7280" opacity="0.3"/>
            <ellipse cx="11" cy="143" rx="8" ry="5" fill="#34D399" opacity="0.3"/>
          </svg>

          {/* Helpy billboard */}
          <div className="mx-auto mt-2 w-44 bg-brand-500 rounded-2xl p-4 shadow-lg opacity-60">
            <div className="flex items-center gap-2 mb-2">
              <svg width="20" height="12" viewBox="0 0 120 65" fill="none">
                <path d="M10 55 C10 35 30 18 60 25 C90 32 110 15 112 5 C108 28 88 42 58 35 C28 28 10 42 10 55Z" fill="white"/>
              </svg>
              <span className="text-white font-black text-[13px] tracking-widest">HELPY</span>
            </div>
            <p className="text-white/80 text-[11px] font-bold">Doha</p>
            <p className="text-white/70 text-[10px] leading-tight">Services made simple.<br/>People made stronger.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

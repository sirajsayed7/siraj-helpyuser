import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'

export default function LoginPage() {
  const { navigate } = useNav()
  const [showPw, setShowPw] = useState(false)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  return (
    <div className="flex flex-col flex-1 overflow-hidden relative" style={{ background: 'linear-gradient(180deg,#EBF4FF 0%,#F8FBFF 50%,#ffffff 100%)' }}>
      <StatusBar />

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-40 h-40 rounded-full opacity-40" style={{ background: 'radial-gradient(circle,#BFDBFE,transparent)', transform: 'translate(-40%,-40%)' }}/>
      <div className="absolute top-0 right-0 w-52 h-52 rounded-full opacity-30" style={{ background: 'radial-gradient(circle,#93C5FD,transparent)', transform: 'translate(30%,-30%)' }}/>

      <div className="flex-1 overflow-y-auto px-6 pb-10">
        {/* Logo area */}
        <div className="flex flex-col items-center pt-8 pb-6">
          {/* Helpy logo SVG */}
          <div className="mb-2">
            <svg width="90" height="52" viewBox="0 0 120 65" fill="none">
              <path d="M10 55 C10 35 30 18 60 25 C90 32 110 15 112 5 C108 28 88 42 58 35 C28 28 10 42 10 55Z" fill="#1D4ED8"/>
              <path d="M18 44 C24 24 50 16 78 24 C98 30 112 18 110 8 C104 30 82 40 55 32 C32 26 16 37 18 44Z" fill="#3B82F6" opacity="0.65"/>
            </svg>
          </div>
          <span className="text-[26px] font-black tracking-[0.15em] text-gray-900 leading-none">HELPY</span>

          <h2 className="text-[22px] font-bold text-gray-900 mt-6 mb-1">Welcome back 👋</h2>
          <p className="text-[14px] text-gray-500 text-center leading-snug">Sign in to continue and explore<br/>amazing services near you</p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-200 shadow-sm">
            <Mail size={18} className="text-gray-400 shrink-0"/>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email or phone number"
              className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-gray-400"/>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 border border-gray-200 shadow-sm">
            <Lock size={18} className="text-gray-400 shrink-0"/>
            <input type={showPw ? 'text' : 'password'} value={pw} onChange={e => setPw(e.target.value)} placeholder="Password"
              className="flex-1 text-[14px] outline-none bg-transparent placeholder:text-gray-400"/>
            <button onClick={() => setShowPw(v => !v)}>{showPw ? <EyeOff size={18} className="text-gray-400"/> : <Eye size={18} className="text-gray-400"/>}</button>
          </div>
          <div className="flex justify-end">
            <button className="text-brand-500 text-[13px] font-semibold">Forgot password?</button>
          </div>
        </div>

        {/* Sign in */}
        <button onClick={() => navigate('verify')}
          className="w-full mt-5 py-4 rounded-2xl bg-brand-500 text-white text-[15px] font-bold shadow-md active:opacity-90 transition-opacity">
          Sign In
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200"/>
          <span className="text-[12px] text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200"/>
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          {[
            { label: 'Continue with Google', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            )},
            { label: 'Continue with Apple', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            )},
            { label: 'Continue with Facebook', icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            )},
          ].map(s => (
            <button key={s.label} onClick={() => navigate('verify')}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-white border border-gray-200 text-[14px] font-semibold text-gray-700 shadow-sm active:bg-gray-50">
              {s.icon}{s.label}
            </button>
          ))}
        </div>

        {/* Sign up */}
        <p className="text-center text-[14px] text-gray-500 mt-6">
          Don't have an account?{' '}
          <button onClick={() => navigate('verify')} className="text-brand-500 font-bold">Sign Up</button>
        </p>
      </div>

      {/* Home indicator */}
      <div className="pb-2 flex justify-center"><div className="w-28 h-1 rounded-full bg-black/15"/></div>
    </div>
  )
}

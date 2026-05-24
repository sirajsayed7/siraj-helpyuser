import { useState, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNav } from '../context/NavContext'
import { StatusBar } from '../components/shared'
import logo from '../assets/helpy-logo.jpeg'
const CORRECT='123456'
export default function VerifyPage(){const{navigate,goBack}=useNav();const[code,setCode]=useState(['','','','','','']);const[error,setError]=useState('');const inputs=useRef<(HTMLInputElement | null)[]>([])
const handle=(i:number,v:string)=>{if(!/^\d*$/.test(v))return;const n=[...code];n[i]=v.slice(-1);setCode(n);if(v&&i<5)inputs.current[i+1]?.focus()}
const verify=()=>{if(code.join('')===CORRECT)navigate('home');else setError('Incorrect code. Use 123456')}
return <div className="flex flex-1 flex-col bg-[#EEF3FF]"><StatusBar/><div className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pt-4"><button onClick={goBack} className="mb-6 flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow"><ArrowLeft size={18}/></button><div className="rounded-[36px] bg-white px-6 py-8 shadow-xl"><img src={logo} className="mx-auto mb-5 h-20 w-20 rounded-3xl object-cover"/><h1 className="text-center text-3xl font-black text-gray-900">Verification</h1><p className="mt-3 text-center text-sm leading-6 text-gray-500">Enter the 6-digit code sent to your phone or email.</p><div className="mt-8 flex justify-center gap-3">{code.map((c,i)=><input key={i} ref={el=>inputs.current[i]=el} value={c} onChange={e=>handle(i,e.target.value)} maxLength={1} className="h-14 w-12 rounded-2xl border border-gray-200 bg-[#F7FAFF] text-center text-xl font-bold outline-none focus:border-brand-500"/> )}</div>{error&&<p className="mt-4 text-center text-sm text-red-500">{error}</p>}<button onClick={verify} className="mt-8 w-full rounded-2xl bg-brand-500 py-4 text-sm font-bold text-white shadow-lg">Verify & Continue</button></div></div></div>}

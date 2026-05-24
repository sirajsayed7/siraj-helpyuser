import { createContext, useContext, useState, ReactNode } from 'react'

export type Screen =
  | 'login' | 'verify' | 'home' | 'orders' | 'chat' | 'profile'
  | 'categories' | 'service-detail' | 'booking-flow' | 'booking-confirm'
  | 'chat-thread' | 'location-picker' | 'all-services' | 'search'
  | 'wallet' | 'favorites' | 'addresses' | 'contact' | 'terms' | 'privacy'
  | 'notifications' | 'order-detail' | 'category-services'

interface NavState { screen: Screen; params?: any; history: { screen: Screen; params?: any }[] }
interface NavCtx {
  screen: Screen; params: any
  navigate: (s: Screen, p?: any) => void
  goBack: () => void
  canGoBack: boolean
  activeTab: string
  setActiveTab: (t: string) => void
  bookedServices: BookedService[]
  addBooking: (b: BookedService) => void
}
export interface BookedService {
  id: string; serviceName: string; provider: string; providerLogo: string
  date: string; time: string; price: number; status: string; service: string
}

const Ctx = createContext<NavCtx>(null as any)

export function NavProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NavState>({ screen: 'login', history: [] })
  const [activeTab, setActiveTabState] = useState('home')
  const [bookedServices, setBookedServices] = useState<BookedService[]>([])

  const navigate = (screen: Screen, params?: any) =>
    setState(s => ({ screen, params, history: [...s.history, { screen: s.screen, params: s.params }] }))

  const goBack = () =>
    setState(s => {
      const h = [...s.history]; const prev = h.pop()
      return prev ? { screen: prev.screen, params: prev.params, history: h } : s
    })

  const setActiveTab = (t: string) => {
    setActiveTabState(t)
    setState({ screen: t as Screen, params: undefined, history: [] })
  }

  const addBooking = (b: BookedService) => setBookedServices(prev => [b, ...prev])

  return (
    <Ctx.Provider value={{ screen: state.screen, params: state.params, navigate, goBack, canGoBack: state.history.length > 0, activeTab, setActiveTab, bookedServices, addBooking }}>
      {children}
    </Ctx.Provider>
  )
}

export const useNav = () => useContext(Ctx)

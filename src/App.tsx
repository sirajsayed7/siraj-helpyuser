import { NavProvider, useNav } from './context/NavContext'
import { BottomNav } from './components/shared'

// Auth pages
import LoginPage from './pages/LoginPage'
import VerifyPage from './pages/VerifyPage'

// Main tab pages
import HomePage from './pages/HomePage'
import { OrdersPage } from './pages/OrdersPage'
import ChatPage, { ChatThreadPage } from './pages/ChatPage'
import ProfilePage, { WalletPage, FavoritesPage, AddressesPage, ContactPage, TermsPage, PrivacyPage } from './pages/ProfilePage'

// Service pages
import ServiceDetailPage from './pages/ServiceDetailPage'
import { BookingConfirmPage } from './pages/OrdersPage'

// Sub-pages
import CategoriesPage from './subpages/CategoriesPage'
import CategoryServicesPage from './subpages/CategoryServicesPage'
import LocationPickerPage from './subpages/LocationPickerPage'
import { SearchPage, AllServicesPage, NotificationsPage, OrderDetailPage } from './subpages/HelperPages'

const TAB_SCREENS = ['home', 'orders', 'chat', 'profile']
const AUTH_SCREENS = ['login', 'verify']

function AppShell() {
  const { screen, activeTab, setActiveTab } = useNav()
  const isAuth = AUTH_SCREENS.includes(screen)
  const isTab = TAB_SCREENS.includes(screen)

  const renderScreen = () => {
    switch (screen) {
      // Auth
      case 'login':             return <LoginPage/>
      case 'verify':            return <VerifyPage/>
      // Tabs
      case 'home':              return <HomePage/>
      case 'orders':            return <OrdersPage/>
      case 'chat':              return <ChatPage/>
      case 'profile':           return <ProfilePage/>
      // Service flow
      case 'service-detail':    return <ServiceDetailPage/>
      case 'booking-confirm':   return <BookingConfirmPage/>
      // Chat thread
      case 'chat-thread':       return <ChatThreadPage/>
      // Discovery
      case 'categories':        return <CategoriesPage/>
      case 'category-services': return <CategoryServicesPage/>
      case 'all-services':      return <AllServicesPage/>
      case 'search':            return <SearchPage/>
      // Location
      case 'location-picker':   return <LocationPickerPage/>
      // Profile sub-pages
      case 'wallet':            return <WalletPage/>
      case 'favorites':         return <FavoritesPage/>
      case 'addresses':         return <AddressesPage/>
      case 'contact':           return <ContactPage/>
      case 'terms':             return <TermsPage/>
      case 'privacy':           return <PrivacyPage/>
      // Misc
      case 'notifications':     return <NotificationsPage/>
      case 'order-detail':      return <OrderDetailPage/>
      default:                  return <HomePage/>
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center" style={{ background: '#C7D8F5' }}>
      <div className="relative w-full max-w-[430px] min-h-screen flex flex-col overflow-hidden shadow-2xl bg-white">

        {/* Page content — fills space above frozen nav */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          {renderScreen()}
        </div>

        {/* FROZEN bottom nav — only shown when logged in */}
        {!isAuth && (
          <BottomNav/>
        )}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <NavProvider>
      <AppShell/>
    </NavProvider>
  )
}

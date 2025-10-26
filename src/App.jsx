import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import BaseLayout from './components/layout/BaseLayout'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import Home from './pages/dashboard/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CreateTicket from './pages/dashboard/TicketsPage'
import TicketsPage from './pages/dashboard/TicketsPage'

const queryClient = new QueryClient()

function App() {

  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <Toaster
    position="top-right"
    toastOptions={{
      style: {
        fontFamily: "Inter, sans-serif",
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        padding: "10px 16px",
      },
      success: {
        iconTheme: { primary: "#22c55e", secondary: "#fff" },
      },
      error: {
        iconTheme: { primary: "#ef4444", secondary: "#fff" },
      },
    }}
  />
  <Routes>
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path='/dashboard' element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>} >
          <Route index element={<Home />} />
          <Route path='/dashboard/tickets' element={<TicketsPage />} />
        </Route>

      </Route>
    </Routes>
    </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App

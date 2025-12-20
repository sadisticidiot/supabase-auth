import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { AuthProvider } from './logic/AuthProvider.jsx'
import ProtectedRoute from './logic/ProtectedRoute.jsx'

import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Landing from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ForgotPass from './pages/ForgotPassword.jsx'
import ResetPass from './pages/ResetPassword.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Landing />},
  { path: '/login', element: <Login />},
  { path: '/signup', element: <Signup />},
  { path: '/forgot-password', element: <ForgotPass />},
  { path: '/reset-password', element: <ResetPass />},
  {
    element: <ProtectedRoute />,
    children: [
      {path: '/dashboard', element: <Dashboard />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>,
)
import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/styles.scss'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignupPage from './pages/SignupPage.jsx'
// import LoginPage from './pages/LoginPage.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import ClientDashboard from './pages/ClientDashboard.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './lib/utils/ProtectedRoute.jsx'
import { useEffect } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
    
  },
  {
    path: '/signup',
    element: <SignupPage />
  },
  {
    path: '/admindashboard',
    element: <ProtectedRoute> <AdminDashboard /> </ProtectedRoute>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute> <ClientDashboard />   </ProtectedRoute>
  }

])
useEffect(()=> initialUsers(), [])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)

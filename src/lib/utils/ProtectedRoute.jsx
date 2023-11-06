import React from 'react'

export default function ProtectedRoute() {
    let auth = false
    
  return (
    auth ? <Outlet /> : <Navigate to='/' />
  )
}

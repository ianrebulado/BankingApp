import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const SignedInUser = JSON.parse(localStorage.getItem('SignedInUser'));
  const getSigninState = localStorage.getItem('signedIn');
  const isAuthenticated = getSigninState === 'true';
  const userRole = SignedInUser ? SignedInUser.role : useNavigate('/')

  const canAccessRoute = isAuthenticated && requiredRole === userRole;
  
  if (!canAccessRoute) {
    return <Navigate to={'/'} />; 
  }

  return canAccessRoute ? children : null;
}

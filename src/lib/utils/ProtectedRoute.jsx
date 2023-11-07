import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole }) {
  const SignedInUser = JSON.parse(localStorage.getItem('SignedInUser'));
  const userRole = SignedInUser.role; 
  const getSigninState = localStorage.getItem('signedIn');
  const isAuthenticated = getSigninState === 'true';

  console.log(isAuthenticated);
  console.log(SignedInUser);
  console.log(userRole);

  const canAccessRoute = isAuthenticated && requiredRole === userRole;
  
  if (!canAccessRoute) {
    return <Navigate to={'/'} />; 
  }

  return canAccessRoute ? children : null;
}

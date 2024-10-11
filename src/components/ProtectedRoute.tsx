import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // const isAuthenticated = !!localStorage.getItem('user');
  const isAuthenticated = true;

  if (isAuthenticated) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

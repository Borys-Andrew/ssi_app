import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useAuthContext();
  console.log('🚀 ~ isAuth:', isAuth);

  if (isAuth) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

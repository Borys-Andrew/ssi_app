import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuth } = useContext(AuthContext);

  if (isAuth) {
    return <>{element}</>;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;

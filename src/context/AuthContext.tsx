import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuth: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('db_app_user'));

  const login = () => {
    setIsAuth(true);
    localStorage.setItem('db_app_user', 'true');
  };

  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('db_app_user');
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

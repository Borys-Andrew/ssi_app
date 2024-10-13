import { useEffect, useState } from 'react';

type User = {
  userId: string | undefined;
  isAuth: boolean;
};

export const useAuth = () => {
  const [user, setUser] = useState<User>(() => {
    const storedUser = localStorage.getItem('db_app_user');

    return storedUser
      ? JSON.parse(storedUser)
      : {
          userId: undefined,
          isAuth: false,
        };
  });

  useEffect(() => {
    localStorage.setItem('db_app_user', JSON.stringify(user));
  }, [user]);

  const logout = () => {
    setUser({
      userId: undefined,
      isAuth: false,
    });

    localStorage.removeItem('db_app_user');
  };

  return { user, setUser, logout };
};

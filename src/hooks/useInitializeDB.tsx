import { useEffect } from 'react';

const useInitializeDatabase = () => {
  useEffect(() => {
    const storedData = localStorage.getItem('db_app');

    const initialData = {
      users: [],
      movies: [],
    };

    if (!storedData) {
      localStorage.setItem('db_app', JSON.stringify(initialData));
    }
  }, []);
};

export default useInitializeDatabase;

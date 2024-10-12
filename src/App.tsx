import { Navigate, Route, Routes } from 'react-router-dom';
import {
  AboutPage,
  AddMoviePage,
  ContactsPage,
  EditMoviePage,
  HomePage,
  LoginPage,
  NotFoundPage,
} from './pages';
import ProtectedRoute from './components/ProtectedRoute';
import useInitializeDatabase from './hooks/useInitializeDB';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';

function App() {
  useInitializeDatabase();

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route element={<Layout />}>
          <Route
            index
            path="/"
            element={<ProtectedRoute element={<HomePage />} />}
          />
          <Route
            path="/home"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />
          <Route
            path="/add-movie"
            element={<ProtectedRoute element={<AddMoviePage />} />}
          />
          <Route
            path="/edit-movie/:id"
            element={<ProtectedRoute element={<EditMoviePage />} />}
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<AboutPage />} />}
          />
          <Route
            path="/contacts"
            element={<ProtectedRoute element={<ContactsPage />} />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;

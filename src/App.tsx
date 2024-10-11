import React from 'react';
import './App.css';
import {
  AddMoviePage,
  EditMoviePage,
  ListMoviesPage,
  LoginPage,
  NotFoundPage,
} from './pages';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage />}
      />
      <Route
        path="/movies"
        element={<ProtectedRoute element={<ListMoviesPage />} />}
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
        path="*"
        element=<NotFoundPage />
      />
    </Routes>
  );
}

export default App;

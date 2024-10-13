import React from 'react';
import MoviesList from '../components/MoviesList';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '24px 0' }}>
      <Button
        color="primary"
        size="large"
        style={{ marginBottom: '24px' }}
        variant="outlined"
        onClick={() => navigate('/add-movie')}
      >
        Add Movie
      </Button>

      <MoviesList />
    </div>
  );
};

export default HomePage;

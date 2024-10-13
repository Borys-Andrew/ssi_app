import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import MovieCard from './MovieCard';
import { Movie } from '../types';

const MoviesList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setMovies([...JSON.parse(localStorage.getItem('db_app') as string).movies]);
  }, []);

  const handleDelete = (id: string) => {
    const updatedMovies = movies.filter((movie: Movie) => movie.id !== id);

    setMovies(updatedMovies);

    const db = JSON.parse(localStorage.getItem('db_app') as string);

    db.movies = updatedMovies;
    localStorage.setItem('db_app', JSON.stringify(db));
  };

  return (
    <div>
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
      >
        {movies.map(({ id, title, poster, description }) => (
          <Grid
            key={id}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <MovieCard
              id={String(id)}
              title={title}
              poster={poster}
              description={description}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MoviesList;

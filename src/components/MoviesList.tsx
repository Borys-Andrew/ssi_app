import React from 'react';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid2';

const movies = [
  {
    id: 1,
    title: 'Початок',
    poster: 'https://placehold.co/600x800',
    description: 'Фільм про сни всередині снів.',
  },
  {
    id: 2,
    title: 'Матриця',
    poster: 'https://placehold.co/600x800',
    description: 'Культовий фільм про віртуальну реальність.',
  },
  {
    id: 3,
    title: 'Темний лицар',
    poster: 'https://placehold.co/600x800',
    description: 'Боротьба Бетмена з Джокером.',
  },
  {
    id: 4,
    title: 'Інтерстеллар',
    poster: 'https://placehold.co/600x800',
    description: 'Космічна подорож у пошуках нової планети.',
  },
  {
    id: 5,
    title: 'Гаррі Поттер',
    poster: 'https://placehold.co/600x800',
    description: 'Історія про магію та пригоди.',
  },
  {
    id: 6,
    title: 'Володар перснів',
    poster: 'https://placehold.co/600x800',
    description: 'Епічна сага про боротьбу добра і зла.',
  },
  {
    id: 7,
    title: 'Аватар',
    poster: 'https://placehold.co/600x800',
    description: 'Пригоди на планеті Пандора.',
  },
  {
    id: 8,
    title: 'Месники: Завершення',
    poster: 'https://placehold.co/600x800',
    description: 'Заключна битва героїв Marvel.',
  },
  {
    id: 9,
    title: 'Джокер',
    poster: 'https://placehold.co/600x800',
    description: 'Трагічна історія комедійного лиходія.',
  },
  {
    id: 10,
    title: 'Титанік',
    poster: 'https://placehold.co/600x800',
    description: 'Романтична драма на тлі катастрофи.',
  },
  {
    id: 11,
    title: 'Зоряні війни',
    poster: 'https://placehold.co/600x800',
    description: 'Космічна сага про боротьбу з Імперією.',
  },
  {
    id: 12,
    title: 'Форест Гамп',
    poster: 'https://placehold.co/600x800',
    description: 'Неймовірна історія життя простої людини.',
  },
  {
    id: 13,
    title: 'Шоушенк: Втеча',
    poster: 'https://placehold.co/600x800',
    description: "Втеча з найвідомішої в'язниці.",
  },
  {
    id: 14,
    title: 'Парк Юрського періоду',
    poster: 'https://placehold.co/600x800',
    description: 'Динозаври повертаються до життя.',
  },
  {
    id: 15,
    title: 'Великий Гетсбі',
    poster: 'https://placehold.co/600x800',
    description: 'Історія багатства, кохання і трагедії.',
  },
];

const MoviesList = () => {
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
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default MoviesList;

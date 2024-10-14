const MOVIE_BASE_URL = 'https://api.themoviedb.org/3/';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2JhMTk2NGNkMGQ0YWM4NGE3ZGQxNDlhZTI3MTFmYiIsIm5iZiI6MTcyODg1NzI5NS41MDYzMzksInN1YiI6IjYxZjA3NWMyZGYyOTQ1MDA2ODc4ZGZjMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dMnlQFH1eHLLeM8-ghoxWthOYk0zJmY9Y-yCRWC7gF0';

const OPTIONS = {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

export const searchMovies = async (query: string) => {
  const url = `${MOVIE_BASE_URL}search/movie?query=${encodeURIComponent(
    query,
  )}&include_adult=false&language=en-US&page=1`;

  try {
    const response = await fetch(url, OPTIONS);
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();

    return data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
    }));
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

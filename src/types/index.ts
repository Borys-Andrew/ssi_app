export interface User {
  id: string;
  email: string;
  password: string;
  favorites?: [string];
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  discription: string;
  actors: [string];
  director: string;
}

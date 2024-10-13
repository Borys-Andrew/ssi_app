export interface User {
  id: string;
  email: string;
  password: string;
  favorites?: string[];
}

export interface Movie {
  id?: string;
  title: string;
  description: string;
  poster: string;
  createdBy?: string;
}

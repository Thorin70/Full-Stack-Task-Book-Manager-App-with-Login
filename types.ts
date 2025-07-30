
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  yearPublished: number;
}

export interface User {
  username: string;
  password?: string; // Password should not be stored or passed around in the frontend
}

export type BookFormData = Omit<Book, 'id'>;

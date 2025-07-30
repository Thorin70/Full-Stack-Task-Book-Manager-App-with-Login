
import { Book, BookFormData, User } from '../types';

// In-memory storage for users and books
const users: User[] = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "user123" },
];

let books: Book[] = [
  { id: "1", title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", yearPublished: 1988 },
  { id: "2", title: "Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", yearPublished: 1937 },
  { id: "3", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", yearPublished: 1965 },
  { id: "4", title: "Project Hail Mary", author: "Andy Weir", genre: "Sci-Fi", yearPublished: 2021 },
];

// Simple ID generator
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// --- API Functions ---

// Simulate network delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  login: async (credentials: Pick<User, 'username' | 'password'>): Promise<{ token: string }> => {
    await delay(500);
    const user = users.find(u => u.username === credentials.username && u.password === credentials.password);
    if (user) {
      // Create a mock JWT token. In a real app, this would be a signed JWT.
      const token = btoa(JSON.stringify({ username: user.username, iat: Date.now() }));
      return { token };
    }
    throw new Error('Invalid username or password');
  },

  getBooks: async (): Promise<Book[]> => {
    await delay(500);
    return [...books]; // Return a copy
  },

  addBook: async (bookData: BookFormData, token: string | null): Promise<Book> => {
    await delay(500);
    if (!token) throw new Error('Unauthorized');
    const newBook: Book = {
      id: generateId(),
      ...bookData,
      yearPublished: Number(bookData.yearPublished)
    };
    books.push(newBook);
    return newBook;
  },

  updateBook: async (id: string, bookData: BookFormData, token: string | null): Promise<Book> => {
    await delay(500);
    if (!token) throw new Error('Unauthorized');
    const bookIndex = books.findIndex(b => b.id === id);
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }
    const updatedBook = { ...books[bookIndex], ...bookData, yearPublished: Number(bookData.yearPublished) };
    books[bookIndex] = updatedBook;
    return updatedBook;
  },

  deleteBook: async (id: string, token: string | null): Promise<{ success: boolean }> => {
    await delay(500);
    if (!token) throw new Error('Unauthorized');
    const initialLength = books.length;
    books = books.filter(b => b.id !== id);
    if (books.length === initialLength) {
        throw new Error('Book not found');
    }
    return { success: true };
  },
};

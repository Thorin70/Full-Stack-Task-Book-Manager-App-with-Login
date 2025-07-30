import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Book } from '../types';
import BookCard from './BookCard';
import BookForm from './BookForm';
import Header from './Header';
import ConfirmationModal from './ConfirmationModal';
import Alert from './Alert';
import Login from './Login';

const Dashboard: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [bookToEdit, setBookToEdit] = useState<Book | undefined>(undefined);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const { token, isAuthenticated } = useAuth();

    const fetchBooks = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await api.getBooks();
            setBooks(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch books.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const handleAddClick = () => {
        setBookToEdit(undefined);
        setIsFormOpen(true);
    };

    const handleEditClick = (book: Book) => {
        setBookToEdit(book);
        setIsFormOpen(true);
    };

    const handleDeleteClick = (book: Book) => {
        setBookToDelete(book);
        setIsConfirmOpen(true);
    };

    const confirmDelete = async () => {
        if (!bookToDelete) return;
        try {
            await api.deleteBook(bookToDelete.id, token);
            setNotification({ message: `"${bookToDelete.title}" deleted successfully.`, type: 'success' });
            fetchBooks();
        } catch (err: any) {
            setNotification({ message: err.message || 'Failed to delete book.', type: 'error' });
        } finally {
            setIsConfirmOpen(false);
            setBookToDelete(null);
        }
    };
    
    const handleSuccess = (message: string) => {
        setNotification({ message, type: 'success' });
        fetchBooks();
        setIsFormOpen(false);
    };

    return (
        <div className="min-h-screen bg-dark-bg">
            <Header onAddClick={handleAddClick} onLoginClick={() => setIsLoginOpen(true)} />
            <main className="p-4 sm:p-6 lg:p-8">
                {isLoading && <p className="text-center text-xl text-light-text">Loading books...</p>}
                {error && <p className="text-center text-xl text-red-400">{error}</p>}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                        {books.map(book => (
                            <BookCard 
                                key={book.id} 
                                book={book}
                                onEdit={() => handleEditClick(book)}
                                onDelete={() => handleDeleteClick(book)}
                                isAuthenticated={isAuthenticated}
                            />
                        ))}
                    </div>
                )}
                 {!isLoading && !error && books.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold">No Books Found</h3>
                        <p className="text-light-text/80 mt-2">Click "Add Book" to start your collection.</p>
                    </div>
                )}
            </main>

            <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

            {isAuthenticated && isFormOpen && (
                <BookForm 
                    isOpen={isFormOpen} 
                    onClose={() => setIsFormOpen(false)} 
                    onSuccess={handleSuccess}
                    bookToEdit={bookToEdit} 
                />
            )}

            {isAuthenticated && isConfirmOpen && bookToDelete && (
                 <ConfirmationModal
                    isOpen={isConfirmOpen}
                    onClose={() => setIsConfirmOpen(false)}
                    onConfirm={confirmDelete}
                    title="Delete Book"
                    message={`Are you sure you want to delete "${bookToDelete.title}"? This action cannot be undone.`}
                />
            )}
            
            {notification && (
                <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 sm:left-auto sm:right-5 sm:translate-x-0 sm:w-auto sm:px-0 z-50">
                    <Alert 
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
import React, { useState, useEffect, FormEvent } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import type { Book, BookFormData } from '../types';
import { XIcon } from './Icons';

interface BookFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (message: string) => void;
    bookToEdit?: Book;
}

const BookForm: React.FC<BookFormProps> = ({ isOpen, onClose, onSuccess, bookToEdit }) => {
    const [formData, setFormData] = useState<BookFormData>({
        title: '',
        author: '',
        genre: '',
        yearPublished: new Date().getFullYear(),
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (bookToEdit) {
            setFormData({
                title: bookToEdit.title,
                author: bookToEdit.author,
                genre: bookToEdit.genre,
                yearPublished: bookToEdit.yearPublished,
            });
        } else {
            setFormData({
                title: '',
                author: '',
                genre: '',
                yearPublished: new Date().getFullYear(),
            });
        }
        setError(null);
    }, [bookToEdit, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const isYear = name === 'yearPublished';
        setFormData(prev => ({ ...prev, [name]: isYear ? (value === '' ? '' : Number(value)) : value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            if (bookToEdit) {
                await api.updateBook(bookToEdit.id, formData, token);
                onSuccess(`"${formData.title}" updated successfully.`);
            } else {
                await api.addBook(formData, token);
                onSuccess(`"${formData.title}" added successfully.`);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-dark-card w-full max-w-lg p-6 rounded-xl shadow-neon-lg border border-neon-purple relative max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-light-text hover:text-white p-1 rounded-full hover:bg-white/10">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-white mb-6">{bookToEdit ? 'Edit Book' : 'Add New Book'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-light-text">Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg/50 border border-neon-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-neon-pink focus:border-neon-pink"/>
                    </div>
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-light-text">Author</label>
                        <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg/50 border border-neon-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-neon-pink focus:border-neon-pink"/>
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-sm font-medium text-light-text">Genre</label>
                        <input type="text" name="genre" id="genre" value={formData.genre} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg/50 border border-neon-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-neon-pink focus:border-neon-pink"/>
                    </div>
                    <div>
                        <label htmlFor="yearPublished" className="block text-sm font-medium text-light-text">Year Published</label>
                        <input type="number" name="yearPublished" id="yearPublished" value={formData.yearPublished} onChange={handleChange} required className="mt-1 block w-full bg-dark-bg/50 border border-neon-purple rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-neon-pink focus:border-neon-pink"/>
                    </div>
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 w-full sm:w-auto rounded-full text-light-text bg-transparent border border-light-text hover:bg-white/10 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="py-2 px-4 w-full sm:w-auto rounded-full text-white bg-neon-pink hover:bg-opacity-80 disabled:bg-gray-500 transition-colors">
                            {isLoading ? 'Saving...' : 'Save Book'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookForm;
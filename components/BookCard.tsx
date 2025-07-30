import React from 'react';
import type { Book } from '../types';
import { EditIcon, TrashIcon } from './Icons';

interface BookCardProps {
    book: Book;
    onEdit: () => void;
    onDelete: () => void;
    isAuthenticated: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, onEdit, onDelete, isAuthenticated }) => {
    return (
        <div className="bg-dark-card border border-neon-purple/50 rounded-lg shadow-neon p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-neon-lg hover:-translate-y-1">
            <div>
                <h3 className="text-lg sm:text-xl font-bold text-white truncate">{book.title}</h3>
                <p className="text-light-text/80 mt-1">by {book.author}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="bg-neon-pink/20 text-neon-pink text-xs font-semibold px-2.5 py-0.5 rounded-full">{book.genre}</span>
                    <span className="bg-neon-purple/20 text-neon-purple text-xs font-semibold px-2.5 py-0.5 rounded-full">{book.yearPublished}</span>
                </div>
            </div>
            {isAuthenticated && (
                <div className="mt-6 flex justify-end gap-2">
                    <button onClick={onEdit} className="text-light-text hover:text-white transition-colors p-2 rounded-full hover:bg-white/10" aria-label={`Edit ${book.title}`}>
                        <EditIcon className="w-5 h-5" />
                    </button>
                    <button onClick={onDelete} className="text-light-text hover:text-neon-pink transition-colors p-2 rounded-full hover:bg-white/10" aria-label={`Delete ${book.title}`}>
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default BookCard;
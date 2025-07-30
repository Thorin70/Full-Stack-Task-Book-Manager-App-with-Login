import React from 'react';
import { XIcon } from './Icons';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-dark-card w-full max-w-md p-6 rounded-xl shadow-neon-lg border border-neon-purple relative">
                 <button onClick={onClose} className="absolute top-4 right-4 text-light-text hover:text-white p-1 rounded-full hover:bg-white/10">
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 className="text-xl font-bold text-white">{title}</h2>
                <p className="mt-4 text-light-text/90">{message}</p>
                <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button onClick={onClose} className="py-2 px-4 w-full sm:w-auto rounded-full text-light-text bg-transparent border border-light-text hover:bg-white/10 transition-colors">
                        Cancel
                    </button>
                    <button onClick={onConfirm} className="py-2 px-4 w-full sm:w-auto rounded-full text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg">
                        Confirm Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
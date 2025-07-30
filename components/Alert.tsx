
import React, { useEffect } from 'react';
import { XIcon } from './Icons';

interface AlertProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    const baseClasses = "flex items-center justify-between w-full max-w-sm p-4 rounded-lg shadow-lg text-white";
    const typeClasses = {
        success: 'bg-green-500/80 backdrop-blur-sm border border-green-400',
        error: 'bg-red-500/80 backdrop-blur-sm border border-red-400',
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white/20">
                <XIcon className="w-5 h-5"/>
            </button>
        </div>
    );
};

export default Alert;

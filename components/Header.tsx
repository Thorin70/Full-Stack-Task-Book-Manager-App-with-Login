import React from 'react';
import { useAuth } from '../context/AuthContext';
import { BookOpenIcon, LogoutIcon, PlusIcon, LoginIcon } from './Icons';

interface HeaderProps {
    onAddClick: () => void;
    onLoginClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick, onLoginClick }) => {
    const { logout, isAuthenticated } = useAuth();

    return (
        <header className="bg-dark-card/50 backdrop-blur-md sticky top-0 z-40 shadow-neon border-b border-neon-purple/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center space-x-3">
                        <BookOpenIcon className="h-7 w-7 sm:h-8 sm:w-8 text-neon-pink" />
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wider">Book Manager</h1>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={onAddClick}
                                    className="flex items-center bg-neon-pink text-white font-medium pl-2 sm:pl-4 pr-2 py-1.5 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-neon-lg"
                                >
                                    <span className="hidden sm:inline pr-2">Add Book</span>
                                    <div className="bg-white/20 rounded-full p-1">
                                        <PlusIcon className="h-5 w-5"/>
                                    </div>
                                </button>
                                <button
                                    onClick={logout}
                                    className="flex items-center bg-red-500 text-white font-medium pl-2 sm:pl-4 pr-2 py-1.5 rounded-full hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                                >
                                    <span className="hidden sm:inline pr-2">Logout</span>
                                    <div className="bg-white/20 rounded-full p-1">
                                        <LogoutIcon className="h-5 w-5" />
                                    </div>
                                </button>
                            </>
                        ) : (
                             <button
                                onClick={onLoginClick}
                                className="flex items-center bg-neon-purple text-white font-medium pl-2 sm:pl-4 pr-2 py-1.5 rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-neon-lg"
                            >
                                <span className="hidden sm:inline pr-2">Sign In</span>
                                <div className="bg-white/20 rounded-full p-1">
                                    <LoginIcon className="h-5 w-5" />
                                </div>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
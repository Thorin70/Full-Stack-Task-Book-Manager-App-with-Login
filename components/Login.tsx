import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';
import Alert from './Alert';
import { XIcon } from './Icons';

interface LoginProps {
    isOpen: boolean;
    onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            await login({ username, password });
            onClose(); // Close modal on success
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4" aria-modal="true" role="dialog">
            <div className="bg-dark-card w-full max-w-md p-6 sm:p-8 rounded-xl shadow-neon-lg border border-neon-purple/50 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-light-text hover:text-white transition-colors p-1 rounded-full hover:bg-white/10" aria-label="Close">
                    <XIcon className="w-6 h-6" />
                </button>
                
                <div>
                    <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-white">
                        Sign In
                    </h2>
                    <p className="mt-2 text-center text-sm text-light-text">
                        to add, edit, or delete books
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username-modal" className="sr-only">Username</label>
                            <input
                                id="username-modal"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neon-purple bg-dark-bg/50 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-neon-pink focus:border-neon-pink focus:z-10 sm:text-sm transition-all"
                                placeholder="Username (try admin)"
                            />
                        </div>
                        <div>
                            <label htmlFor="password-modal" className="sr-only">Password</label>
                            <input
                                id="password-modal"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-neon-purple bg-dark-bg/50 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-neon-pink focus:border-neon-pink focus:z-10 sm:text-sm transition-all"
                                placeholder="Password (try admin123)"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-neon-purple hover:bg-neon-magenta focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-magenta disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300"
                        >
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                {error && 
                    <div className="mt-4">
                        <Alert message={error} type="error" onClose={() => setError(null)} />
                    </div>
                }
            </div>
        </div>
    );
};

export default Login;
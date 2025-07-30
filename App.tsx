
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';

const AppContent: React.FC = () => {
    return (
        <div className="min-h-screen font-sans text-light-text">
            <Dashboard />
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;

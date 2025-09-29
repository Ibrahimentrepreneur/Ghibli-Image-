
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white mt-12 py-4 shadow-inner">
            <div className="container mx-auto px-4 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} Ghibli Image Studio. Created with AI.</p>
            </div>
        </footer>
    );
};

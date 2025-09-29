
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
                    Ghibli Image Studio
                </h1>
                <p className="text-lg text-gray-500 mt-2">
                    Turn your photos into Ghibli magic.
                </p>
            </div>
        </header>
    );
};

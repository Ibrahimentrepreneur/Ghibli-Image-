
import React from 'react';
import { ImageIcon, LoadingSpinner } from './Icons';

interface ImageDisplayProps {
    title: string;
    imageUrl: string | null;
    isLoading?: boolean;
}

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ title, imageUrl, isLoading = false }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
            <div className="w-full aspect-square bg-white rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
                {isLoading ? (
                    <div className="flex flex-col items-center text-gray-500">
                        <LoadingSpinner className="w-12 h-12" />
                        <p className="mt-4 text-lg">Brewing Ghibli magic...</p>
                    </div>
                ) : imageUrl ? (
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                     <div className="flex flex-col items-center text-gray-400 p-8 text-center">
                        <ImageIcon className="w-16 h-16" />
                        <p className="mt-4 text-lg">Your Ghibli-fied image will appear here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

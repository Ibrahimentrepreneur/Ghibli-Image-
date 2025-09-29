
import React, { useState, useCallback, useRef } from 'react';
import type { UploadedFile } from '../types';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
    onImageUpload: (file: UploadedFile | null) => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            // remove "data:mime/type;base64," prefix
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = useCallback(async (files: FileList | null) => {
        if (files && files[0]) {
            const file = files[0];
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file.');
                return;
            }
            
            const base64 = await fileToBase64(file);
            onImageUpload({
                name: file.name,
                type: file.type,
                size: file.size,
                url: URL.createObjectURL(file),
                base64: base64,
            });
        }
    }, [onImageUpload]);

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            handleFileChange(files);
        }
    };
    
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div 
            className={`w-full max-w-md p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 ${dragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-gray-50'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input 
                type="file" 
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files)}
            />
            <div className="flex flex-col items-center justify-center text-center">
                <UploadIcon className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-lg font-semibold text-gray-700">Drag & drop your image here</p>
                <p className="text-gray-500">or click to browse</p>
                <p className="text-sm text-gray-400 mt-2">PNG, JPG, WEBP accepted</p>
            </div>
        </div>
    );
};

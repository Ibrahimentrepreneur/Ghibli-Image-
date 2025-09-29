
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { ImageDisplay } from './components/ImageDisplay';
import { Button } from './components/Button';
import { DownloadIcon, SparklesIcon } from './components/Icons';
import { convertToGhibliStyle } from './services/geminiService';
import type { UploadedFile } from './types';

const App: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<UploadedFile | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: UploadedFile | null) => {
    setOriginalFile(file);
    setGeneratedImage(null);
    setError(null);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalFile) return;

    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const ghibliImage = await convertToGhibliStyle(originalFile.base64, originalFile.type);
      if (ghibliImage) {
        setGeneratedImage(`data:image/jpeg;base64,${ghibliImage}`);
      } else {
        setError('The AI could not generate an image. Please try another photo.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating the image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [originalFile]);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#F0F4F8] font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-4xl text-center mb-8">
            <p className="text-lg md:text-xl text-gray-600">
                Upload your photo and watch as AI magically transforms it into the whimsical Ghibli art style.
            </p>
        </div>

        <ImageUploader onImageUpload={handleImageUpload} />

        {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg w-full max-w-md text-center">
                {error}
            </div>
        )}

        {originalFile && (
            <div className="w-full max-w-4xl mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ImageDisplay title="Original" imageUrl={originalFile.url} />
                    <ImageDisplay title="Ghibli-fied" imageUrl={generatedImage} isLoading={isLoading} />
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                    <Button 
                        onClick={handleGenerateClick} 
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                    >
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating Magic...' : 'Generate Ghibli Style'}
                    </Button>
                    {generatedImage && !isLoading && (
                        <a
                            href={generatedImage}
                            download="ghibli-image.jpg"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full sm:w-auto transition-colors"
                        >
                            <DownloadIcon className="w-5 h-5 mr-2" />
                            Download Image
                        </a>
                    )}
                </div>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;

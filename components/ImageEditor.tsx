
import React, { useState, ChangeEvent } from 'react';
import { editImageWithPrompt } from '../services/geminiService';

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the prefix 'data:*/*;base64,'
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const ImageEditor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setOriginalFile(file);
      setEditedImage(null);
      setError(null);
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!originalFile || !prompt) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const base64Image = await fileToBase64(originalFile);
      const result = await editImageWithPrompt(base64Image, originalFile.type, prompt);
      if (result) {
        setEditedImage(`data:image/png;base64,${result}`);
      } else {
        setError('Failed to edit image. The API returned no image data.');
      }
    } catch (e) {
      setError('An error occurred while editing the image.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-5xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-400">Gemini Image Editor</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input section */}
        <div className="flex flex-col space-y-4">
            <div className="p-4 bg-gray-700/50 rounded-lg border-2 border-dashed border-gray-600 h-64 flex flex-col justify-center items-center">
            {originalImage ? (
                <img src={originalImage} alt="Original" className="max-h-full max-w-full object-contain rounded-md" />
            ) : (
                <div className="text-center text-gray-400">
                    <p>Upload an image to start</p>
                    <p className="text-sm">PNG, JPG, WEBP</p>
                </div>
            )}
            </div>
             <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-500"
            />
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='e.g., "Add a retro filter"'
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button
                onClick={handleEdit}
                disabled={isLoading || !originalImage || !prompt}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
             {error && <p className="text-red-400 text-center mt-2">{error}</p>}
        </div>
        
        {/* Output section */}
        <div className="flex flex-col justify-center items-center bg-gray-900/50 rounded-lg border-2 border-dashed border-gray-600 h-full min-h-[300px] p-4">
            {isLoading && (
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto"></div>
                    <p className="mt-4 text-gray-300">Gemini is thinking...</p>
                </div>
            )}
            {editedImage && !isLoading && (
                <img src={editedImage} alt="Edited" className="max-h-full max-w-full object-contain rounded-md" />
            )}
            {!editedImage && !isLoading && (
                 <div className="text-center text-gray-400">
                    <p>Your edited image will appear here</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

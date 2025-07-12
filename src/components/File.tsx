import React, { useState, useRef as useDomRef } from 'react';
import { Upload, X } from 'lucide-react';

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/gif'];

const File = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useDomRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (!ACCEPTED_TYPES.includes(selectedFile.type)) {
      setError('Only PNG, JPG, and GIF files are allowed.');
      setFile(null);
      setPreview(null);
      return;
    }
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setUploadStatus('uploading');
    setProgress(0);
    // Simulate upload progress
    let prog = 0;
    const interval = setInterval(() => {
      prog += 10;
      setProgress(prog);
      if (prog >= 100) {
        clearInterval(interval);
        setUploadStatus('success');
        setTimeout(() => {
          setUploadStatus('idle');
          setFile(null);
          setPreview(null);
          setProgress(0);
        }, 2000);
      }
    }, 120);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full relative flex justify-center items-center py-16 overflow-hidden">
      {/* Main upload card - wider and with bg color */}
      <div className="w-full max-w-5xl rounded-2xl shadow-xl bg-blue-50 p-0.5 z-10">
        <div className="rounded-2xl bg-blue-50 p-10 md:p-12 lg:p-16 flex flex-col items-center w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Upload className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-900 font-bold tracking-wide text-sm">file upload</span>
            </div>
            {file && (
              <button
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-400 hover:bg-gray-200 transition-colors duration-200"
                onClick={() => { setFile(null); setPreview(null); setUploadStatus('idle'); setProgress(0); }}
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {/* Drop area */}
          <div
            className={`flex flex-col items-center justify-center rounded-xl transition-all duration-300 py-10 px-4 mb-6 relative 
              ${isDragOver ? 'bg-blue-50 shadow-[0_0_32px_0_rgba(59,130,246,0.15)] ring-2 ring-blue-400 scale-105' : 'bg-gray-50 hover:scale-102 hover:shadow-lg'}
              backdrop-blur-md bg-opacity-80 border border-transparent`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{ cursor: 'pointer' }}
          >
            <div className="flex flex-col items-center">
              <span
                className={`inline-block mb-4 transition-all duration-300 ${isDragOver ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}
              >
                <Upload className="w-12 h-12 text-blue-400" />
              </span>
              <div className="text-gray-900 text-lg font-semibold mb-1">Drop files here</div>
              <div className="text-gray-500 text-sm mb-4">or click to browse</div>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-semibold px-6 py-2 rounded-lg shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:scale-105 active:scale-95"
                tabIndex={-1}
                onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}
                type="button"
              >
                SELECT FILES
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif"
                className="hidden"
                onChange={handleInputChange}
              />
              <div className="text-xs text-gray-400 mt-3">PNG, JPG, GIF up to 10MB</div>
              {error && <div className="mt-3 text-red-500 text-sm font-medium">{error}</div>}
              {file && preview && (
                <div className="mt-6 flex flex-col items-center">
                  <img src={preview} alt="preview" className="w-32 h-32 object-cover rounded-lg shadow-md mb-2 border border-gray-200" />
                  <div className="text-gray-700 text-xs mb-2">{file.name}</div>
                  {uploadStatus === 'uploading' && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-700 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  )}
                  {uploadStatus === 'success' && <div className="text-green-600 font-medium">Upload successful!</div>}
                </div>
              )}
              {uploadStatus === 'uploading' && !file && (
                <div className="mt-4 text-blue-600 font-medium animate-pulse">Uploading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default File; 
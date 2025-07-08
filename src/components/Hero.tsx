import React, { useState } from 'react';
import { ArrowRight, Play, Upload, Link, Share2, CheckCircle, Zap, Globe } from 'lucide-react';

const Hero = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

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
    setUploadStatus('uploading');
    
    // Simulate upload
    setTimeout(() => {
      setUploadStatus('success');
      setTimeout(() => setUploadStatus('idle'), 3000);
    }, 2000);
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-16 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-600 mr-2"></span>
              Now supporting 50+ image formats
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              The simplest way to
              <span className="text-blue-600"> share images</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Upload unlimited images and get instant shareable links. No accounts required, 
              no storage limits. Built for developers, loved by everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 font-semibold flex items-center justify-center transition-colors">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 hover:border-gray-400 font-semibold flex items-center justify-center transition-colors">
                <Play className="mr-2 h-5 w-5" />
                Watch demo
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">2.3M+</div>
                <div className="text-sm text-gray-600">Images uploaded daily</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">47ms</div>
                <div className="text-sm text-gray-600">Average response time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime guarantee</div>
              </div>
            </div>
          </div>

          {/* Right content - Interactive demo */}
          <div className="relative">
            <div className="bg-white border-2 border-gray-200 p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 mx-auto mb-4 flex items-center justify-center">
                  {uploadStatus === 'success' ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <Upload className="h-8 w-8 text-blue-600" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {uploadStatus === 'success' ? 'Upload Complete!' : 'Drop your image here'}
                </h3>
                <p className="text-gray-600">
                  {uploadStatus === 'success' ? 'Your SupaLink is ready to share' : 'Or click to browse files'}
                </p>
              </div>

              <div 
                className={`border-2 border-dashed p-12 text-center transition-all cursor-pointer ${
                  isDragOver 
                    ? 'border-blue-400 bg-blue-50' 
                    : uploadStatus === 'success'
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  {uploadStatus === 'uploading' ? (
                    <div className="text-blue-600">
                      <div className="animate-spin h-12 w-12 mx-auto mb-4">
                        <Zap className="h-12 w-12" />
                      </div>
                      <p>Processing your image...</p>
                    </div>
                  ) : uploadStatus === 'success' ? (
                    <div className="text-green-600">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4" />
                      <div className="bg-gray-100 p-3 text-left text-sm font-mono text-gray-800 mb-4">
                        https://supaimg.com/x7k9m2
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors">
                        Copy Link
                      </button>
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <Upload className="h-12 w-12 mx-auto mb-4" />
                      <div>
                        <p className="text-gray-600">Drag & drop your image</p>
                        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 mr-3"></div>
                  <span>Instant upload processing</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Link className="w-4 h-4 text-blue-600 mr-3" />
                  <span>Get shareable link immediately</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Share2 className="w-4 h-4 text-purple-600 mr-3" />
                  <span>Works everywhere - Slack, Discord, email</span>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 text-sm font-medium">
              ✓ No signup required
            </div>
            <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 text-sm font-medium">
              ✓ Unlimited uploads
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
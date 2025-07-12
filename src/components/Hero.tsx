import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen pt-16 pb-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium mb-6 mx-auto rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
          <span className="w-2 h-2 bg-blue-600 mr-2 rounded-full animate-pulse"></span>
          Now supporting 50+ image formats
        </div>
        
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          <span className="block relative">
            <span className="inline-block hover:scale-105 transition-transform duration-300">
              The simplest way to
            </span>
          </span>
          <span className="text-blue-600 block mt-2">
            <span className="inline-block hover:scale-105 transition-transform duration-300">
              share images
            </span>
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed hover:text-gray-700 transition-colors duration-300">
          Upload unlimited images and get instant shareable links. No accounts required, 
          no storage limits. Built for developers, loved by everyone.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
          <button className="group bg-blue-600 text-white px-8 py-4 hover:bg-blue-700 font-semibold flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform">
            Get started for free
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
          <button className="group border-2 border-gray-300 text-gray-700 px-8 py-4 hover:border-gray-400 hover:bg-gray-50 font-semibold flex items-center justify-center transition-all duration-300 shadow hover:shadow-lg hover:scale-105 transform">
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            Watch demo
          </button>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { value: '2.3M+', label: 'Images uploaded daily' },
            { value: '47ms', label: 'Average response time' },
            { value: '99.9%', label: 'Uptime guarantee' },
          ].map((stat, index) => (
            <div 
              className="text-center group cursor-pointer hover:scale-105 transition-all duration-300 p-4 rounded-lg hover:bg-white/50 hover:shadow-md" 
              key={stat.value}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                {stat.value}
              </div>
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
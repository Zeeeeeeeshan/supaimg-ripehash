import React from 'react';
import { Brain, BarChart3, Shield, Layers, Zap, Globe } from 'lucide-react';

const Roadmap = () => {
  const upcomingFeatures = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Smart Tagging",
      description: "Automatically tag your images so you can actually find them later",
      quarter: "Spring 2025"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Usage Insights",
      description: "See which images get the most views and where they're shared",
      quarter: "Spring 2025"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Private Links",
      description: "Password-protected links for sensitive images",
      quarter: "Summer 2025"
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: "Collections",
      description: "Group related images together and share entire collections",
      quarter: "Summer 2025"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Bulk Upload",
      description: "Drop entire folders and get organized links for everything",
      quarter: "Fall 2025"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Custom Domains",
      description: "Use your own domain for a more professional look",
      quarter: "Fall 2025"
    }
  ];

  return (
    <section className="py-32 bg-slate-900">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8">
            What's coming next
          </h2>
          <p className="text-2xl text-slate-400 font-light max-w-4xl mx-auto">
            We're building features that people actually ask for, not just what sounds cool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {upcomingFeatures.map((feature, index) => (
            <div 
              key={index}
              className="p-8 bg-slate-800 border-2 border-slate-700 hover:bg-slate-750 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="text-blue-400">
                  {feature.icon}
                </div>
                <span className="text-sm text-slate-500 font-medium px-3 py-1 bg-slate-700 border border-slate-600">
                  {feature.quarter}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Real testimonial */}
        <div className="bg-slate-800 border-2 border-slate-700 p-12">
          <div className="grid md:grid-cols-3 gap-12 items-center">
            <div className="md:col-span-2">
              <blockquote className="text-2xl md:text-3xl text-white font-light mb-8 leading-relaxed">
                "Finally, an image service that doesn't make me create an account just to share a screenshot. My team loves how simple this is."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">Maya Kim</p>
                  <p className="text-slate-400">Design Lead at Startup Inc</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-700 p-8 text-center">
              <div className="text-4xl font-bold text-white mb-3">2.1M</div>
              <div className="text-slate-400 mb-6">Images shared last month</div>
              <div className="text-3xl font-bold text-white mb-3">47ms</div>
              <div className="text-slate-400">Average upload time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
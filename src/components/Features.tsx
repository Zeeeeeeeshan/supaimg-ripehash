import React from 'react';
import { Zap, Shield, Globe, Code, BarChart3, Users, Upload, Link, Layers } from 'lucide-react';

const Features = () => {
  const mainFeatures = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Instant Upload",
      description: "Drop images and get shareable links in milliseconds. No forms, no waiting.",
      features: ["Drag & drop interface", "Bulk upload support", "50+ format support", "10MB file limit"]
    },
    {
      icon: <Link className="h-8 w-8" />,
      title: "SupaLinks",
      description: "Get clean, shareable URLs that work everywhere. Perfect for teams and collaboration.",
      features: ["Clean URLs", "Custom domains", "Link analytics", "Expiration control"]
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: "Developer API",
      description: "RESTful API with comprehensive documentation. Build integrations in minutes.",
      features: ["REST API", "SDKs available", "Webhook support", "Rate limiting"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "SOC 2 compliant with end-to-end encryption"
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global CDN",
      description: "Lightning-fast delivery from 200+ edge locations"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics",
      description: "Detailed insights on image views and engagement"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Collaboration",
      description: "Share collections and manage team access"
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Smart Organization",
      description: "Auto-categorization and intelligent tagging"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Processing",
      description: "Instant optimization and format conversion"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage images
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From instant uploads to enterprise-grade security, Supaimg provides all the tools 
            your team needs to handle images at scale.
          </p>
        </div>

        {/* Main features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-8 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-blue-600 mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-6 border border-gray-200 hover:border-blue-300 transition-colors">
              <div className="text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
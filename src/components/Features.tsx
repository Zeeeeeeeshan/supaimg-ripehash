import React from 'react';
import { Zap, Shield, Globe, Code, BarChart3, Users, Upload, Link, Layers, Sparkle, RefreshCw, Share2 } from 'lucide-react';

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
  },
  {
    icon: <Sparkle className="h-8 w-8" />,
    title: "AI Tagging",
    description: "Automatically tag and categorize images using advanced AI.",
    features: ["Smart search", "Auto-labeling", "Context-aware tags"]
  },
  {
    icon: <RefreshCw className="h-8 w-8" />,
    title: "Image Versioning",
    description: "Keep track of every change with full image version history.",
    features: ["Rollback support", "Change tracking", "Compare versions"]
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "One-Click Sharing",
    description: "Share images instantly to any platform with a single click.",
    features: ["Social integrations", "QR code sharing", "Embed support"]
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

const Features = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 drop-shadow-sm">
            Everything you need to manage images
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From instant uploads to enterprise-grade security, Supaimg provides all the tools 
            your team needs to handle images at scale.
          </p>
        </div>
        {/* Main features with border animation only */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white/70 backdrop-blur-lg p-8 border border-gray-200 rounded-2xl shadow-lg overflow-hidden hover:border-blue-400 hover:bg-white/90"
            >
              <div className="text-blue-600 mb-6 flex items-center justify-center">
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
                    <div className="w-1.5 h-1.5 bg-blue-600 mr-3 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
              {/* Border animation on hover */}
              <div className="absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-blue-400 group-hover:border-opacity-60 transition-all duration-300"></div>
            </div>
          ))}
        </div>
        {/* Additional features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur p-6 border border-gray-200 rounded-xl flex items-start gap-4 group hover:border-blue-400"
            >
              <div className="text-blue-600 mb-2 mt-1">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative blurred gradient shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-300 opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-blue-200 to-indigo-200 opacity-20 rounded-full blur-3xl z-0"></div>
    </section>
  );
};

export default Features;
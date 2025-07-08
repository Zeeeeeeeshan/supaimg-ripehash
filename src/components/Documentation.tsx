import React from 'react';
import { Code, Book, Zap, ArrowRight } from 'lucide-react';

const Documentation = () => {
  const resources = [
    {
      icon: <Code className="h-8 w-8" />,
      title: "API Documentation",
      description: "Complete REST API reference with examples in multiple languages",
      link: "View API docs",
      color: "blue"
    },
    {
      icon: <Book className="h-8 w-8" />,
      title: "Getting Started Guide",
      description: "Step-by-step tutorials to get you up and running in minutes",
      link: "Read guide",
      color: "green"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Integration Examples",
      description: "Ready-to-use code samples for popular frameworks and platforms",
      link: "Browse examples",
      color: "purple"
    }
  ];

  const codeExample = `// Upload an image with our JavaScript SDK
import { Supaimg } from '@supaimg/js';

const client = new Supaimg('your-api-key');

// Upload from file input
const result = await client.upload(file);
console.log(result.url); // https://supaimg.com/abc123

// Upload from URL
const result = await client.uploadFromUrl('https://example.com/image.jpg');
console.log(result.url); // https://supaimg.com/def456`;

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Built for developers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive documentation, SDKs, and examples to integrate Supaimg 
            into your applications quickly and easily.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Code example */}
          <div className="bg-gray-900 p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm font-medium">JavaScript</span>
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500"></div>
                <div className="w-3 h-3 bg-yellow-500"></div>
                <div className="w-3 h-3 bg-green-500"></div>
              </div>
            </div>
            <pre className="text-sm text-gray-300 font-mono leading-relaxed">
              <code>{codeExample}</code>
            </pre>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            {resources.map((resource, index) => (
              <div key={index} className="bg-white p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className={`text-${resource.color}-600 mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {resource.description}
                </p>
                <a 
                  href="#" 
                  className={`text-${resource.color}-600 hover:text-${resource.color}-700 font-medium flex items-center`}
                >
                  {resource.link}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* SDK languages */}
        <div className="bg-white p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Official SDKs and Libraries
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {['JavaScript', 'Python', 'PHP', 'Ruby', 'Go', 'Java'].map((lang) => (
              <div key={lang} className="text-center">
                <div className="w-16 h-16 bg-gray-100 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-gray-600 font-bold text-sm">{lang.slice(0, 2).toUpperCase()}</span>
                </div>
                <span className="text-sm font-medium text-gray-700">{lang}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
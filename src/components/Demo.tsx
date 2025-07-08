import React, { useState } from 'react';
import { Upload, Link, FolderOpen, ArrowRight } from 'lucide-react';

const Demo = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: "Drop it",
      description: "Drag your image anywhere on the page",
      icon: <Upload className="w-6 h-6" />,
      code: `// No forms, no signup
// Just drop your file

fetch('api.supaimg.com/upload', {
  method: 'POST',
  body: formData
})`
    },
    {
      title: "Get your link",
      description: "Instant SupaLink, ready to share",
      icon: <Link className="w-6 h-6" />,
      code: `{
  "url": "supaimg.com/x7k9m2",
  "original": "your-photo.jpg",
  "size": "2.4MB → 847KB",
  "formats": ["webp", "avif", "jpg"]
}`
    },
    {
      title: "Share anywhere",
      description: "Works in Slack, Discord, email, anywhere",
      icon: <FolderOpen className="w-6 h-6" />,
      code: `<!-- Paste anywhere -->
<img src="https://supaimg.com/x7k9m2" />

<!-- Or just share the link -->
https://supaimg.com/x7k9m2`
    }
  ];

  return (
    <section className="py-32 bg-slate-800">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-normal text-white mb-8">
            Three steps, that's it
          </h2>
          <p className="text-2xl text-slate-400 font-light">
            No tutorials needed. No setup required.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`p-8 border-2 cursor-pointer transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-slate-700 border-blue-500' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className="flex items-center space-x-6">
                  <div className={`p-4 ${
                    activeStep === index ? 'bg-blue-600' : 'bg-slate-700'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {index + 1}. {step.title}
                    </h3>
                    <p className="text-slate-400 text-lg">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRight className={`w-6 h-6 transition-opacity ${
                    activeStep === index ? 'text-blue-400' : 'text-slate-600'
                  }`} />
                </div>
              </div>
            ))}
          </div>

          {/* Code display */}
          <div className="bg-slate-900 border-2 border-slate-700">
            <div className="flex items-center justify-between p-6 border-b-2 border-slate-700">
              <span className="text-slate-400 font-medium text-lg">
                {steps[activeStep].title}
              </span>
              <div className="flex space-x-3">
                <div className="w-4 h-4 bg-red-500"></div>
                <div className="w-4 h-4 bg-yellow-500"></div>
                <div className="w-4 h-4 bg-green-500"></div>
              </div>
            </div>
            <div className="p-8">
              <pre className="text-base text-slate-300 font-mono overflow-x-auto leading-relaxed">
                <code>{steps[activeStep].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
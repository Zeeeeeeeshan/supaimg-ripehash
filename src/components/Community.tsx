import React from 'react';
import { MessageCircle, Users, Star, ArrowRight, Github, Twitter } from 'lucide-react';
// Remove framer-motion import

const Community = () => {
  const stats = [
    { label: 'Active Developers', value: '12,000+', icon: <Users className="h-6 w-6" /> },
    { label: 'GitHub Stars', value: '8,500+', icon: <Star className="h-6 w-6" /> },
    { label: 'Community Posts', value: '25,000+', icon: <MessageCircle className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      quote: "Supaimg's API is incredibly simple to integrate. We had our image upload system running in production within hours.",
      author: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      avatar: "SC"
    },
    {
      quote: "The performance is outstanding. Our image loading times improved by 60% after switching to Supaimg.",
      author: "Marcus Rodriguez",
      role: "CTO at StartupXYZ",
      avatar: "MR"
    },
    {
      quote: "Finally, an image service that doesn't require jumping through hoops. Just upload and share - exactly what we needed.",
      author: "Emily Watson",
      role: "Product Manager at DesignCo",
      avatar: "EW"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join our growing community
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with thousands of developers building amazing things with Supaimg. 
            Get help, share ideas, and stay updated.
          </p>
        </div>

        {/* Community stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 border border-gray-200">
              <div className="text-blue-600 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 border border-gray-200">
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center font-semibold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community links */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 text-white p-8">
            <div className="flex items-center mb-4">
              <Github className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Open Source</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Contribute to our open-source SDKs and tools. Help us build the future of image sharing.
            </p>
            <a href="#" className="inline-flex items-center text-white hover:text-gray-300 font-medium">
              View on GitHub
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          <div className="bg-blue-600 text-white p-8">
            <div className="flex items-center mb-4">
              <Twitter className="h-8 w-8 mr-3" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-blue-100 mb-6">
              Follow us for product updates, tips, and community highlights. Join the conversation.
            </p>
            <a href="#" className="inline-flex items-center text-white hover:text-blue-100 font-medium">
              Follow @supaimg
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
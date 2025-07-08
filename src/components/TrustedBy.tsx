import React from 'react';

const TrustedBy = () => {
  const companies = [
    { name: 'Shopify', logo: 'SHOPIFY' },
    { name: 'Stripe', logo: 'STRIPE' },
    { name: 'Notion', logo: 'NOTION' },
    { name: 'Linear', logo: 'LINEAR' },
    { name: 'Vercel', logo: 'VERCEL' },
    { name: 'Figma', logo: 'FIGMA' },
    { name: 'Ripe Hash', logo: 'RIPE HASH', isSpecial: true },
    { name: 'Slack', logo: 'SLACK' }
  ];

  return (
    <section className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 font-medium">Trusted by teams at</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {companies.map((company) => (
            <div 
              key={company.name}
              className="flex justify-center items-center h-12 opacity-60 hover:opacity-100 transition-opacity duration-300"
            >
              {company.isSpecial ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">RH</span>
                  </div>
                  <span className="text-gray-500 font-bold text-sm tracking-wide">
                    {company.logo}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500 font-bold text-sm tracking-wide">
                  {company.logo}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
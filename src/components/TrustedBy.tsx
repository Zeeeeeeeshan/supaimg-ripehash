import React from 'react';

const companies = [
  { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { name: 'Shopify', logo: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { name: 'Stripe', logo: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
  { name: 'Notion', logo: 'https://cdn.worldvectorlogo.com/logos/notion-2.svg' },
  { name: 'Linear', logo: 'https://cdn.worldvectorlogo.com/logos/linear-1.svg' },
  { name: 'Vercel', logo: 'https://cdn.worldvectorlogo.com/logos/vercel.svg' },
  { name: 'Figma', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg' },
  { name: 'Ripe Hash', logo: '/Group 2201.png' },
  { name: 'Slack', logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' }
];

const TrustedBy = () => {
  return (
    <section className="py-16 bg-white border-b border-gray-200 transition-colors duration-300">
      <style>{`
        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          height: 3rem;
        }
        .marquee__inner {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-600 font-medium">Trusted by teams at</p>
        </div>
        <div className="marquee">
          <div className="marquee__inner">
            {[...companies, ...companies].map((company, i) => (
              <span
                key={i + company.name}
                className="flex items-center mx-8 text-gray-500 font-bold text-lg tracking-wide whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={company.logo}
                  alt={company.name + ' logo'}
                  className="h-7 w-7 object-contain mr-2 drop-shadow-sm"
                  loading="lazy"
                  style={{ minWidth: 28 }}
                />
                {company.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal use and small projects',
      features: [
        '1,000 images per month',
        '10MB max file size',
        'Basic analytics',
        'Standard support',
        'Public links only'
      ],
      cta: 'Get started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and growing teams',
      features: [
        '50,000 images per month',
        '100MB max file size',
        'Advanced analytics',
        'Priority support',
        'Private links',
        'Custom domains',
        'API access'
      ],
      cta: 'Start free trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with specific needs',
      features: [
        'Unlimited images',
        'Unlimited file size',
        'Advanced security',
        'Dedicated support',
        'SSO integration',
        'Custom integrations',
        'SLA guarantee'
      ],
      cta: 'Contact sales',
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group bg-white/70 backdrop-blur-lg border-2 p-8 rounded-2xl shadow-lg overflow-visible hover:scale-105 transition-transform duration-200 ${
                plan.popular
                  ? 'border-blue-600 shadow-xl'
                  : 'border-gray-200'
              }`}
              style={{ cursor: 'pointer' }}
            >
              <div className="text-center mb-8">
                {plan.popular && (
                  <div className="flex justify-center mb-3">
                    <span
                      className="text-white px-4 py-2 text-sm font-medium rounded shadow-lg border-2 border-white z-20"
                      style={{ backgroundColor: '#2563eb' }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="flex-shrink-0">
                      <Check className="h-5 w-5 text-green-500 mr-3" />
                    </span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-6 font-semibold flex items-center justify-center rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95 ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                    : 'border-2 border-gray-300 text-gray-700 hover:border-blue-400 bg-white'
                }`}
              >
                {plan.cta}
                <span className="ml-2">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            All plans include our core features: instant uploads, global CDN, and 99.9% uptime.
          </p>
          <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
            Compare all features →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
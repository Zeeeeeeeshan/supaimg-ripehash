import React, { useState } from 'react';
import { Menu, X, ChevronDown, Search } from 'lucide-react';

interface NavbarProps {
  onDashboard: () => void;
}

const Navbar = ({ onDashboard }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const productItems = [
    { name: 'Image Upload', desc: 'Instant image hosting with CDN' },
    { name: 'SupaLinks', desc: 'Shareable image URLs' },
    { name: 'API Access', desc: 'Developer tools and SDKs' },
    { name: 'Analytics', desc: 'Usage insights and metrics' }
  ];

  const solutionItems = [
    { name: 'Content Teams', desc: 'For marketing and design teams' },
    { name: 'Developers', desc: 'API-first image management' },
    { name: 'Agencies', desc: 'Client collaboration tools' },
    { name: 'Enterprise', desc: 'Scale with confidence' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo copy.png" alt="Supaimg" className="h-8 w-8 mr-3" />
            <span className="text-xl font-bold text-gray-900">Supaimg</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'products' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 shadow-lg z-50"
                  onMouseEnter={() => setActiveDropdown('products')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-6">
                    <div className="grid gap-4">
                      {productItems.map((item) => (
                        <a key={item.name} href="#" className="block p-3 hover:bg-gray-50 transition-colors">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-blue-600 font-medium py-2"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                Solutions
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {activeDropdown === 'solutions' && (
                <div 
                  className="absolute top-full left-0 mt-1 w-80 bg-white border border-gray-200 shadow-lg z-50"
                  onMouseEnter={() => setActiveDropdown('solutions')}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="p-6">
                    <div className="grid gap-4">
                      {solutionItems.map((item) => (
                        <a key={item.name} href="#" className="block p-3 hover:bg-gray-50 transition-colors">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium py-2">Pricing</a>
            <a href="#docs" className="text-gray-700 hover:text-blue-600 font-medium py-2">Docs</a>
            <a href="#community" className="text-gray-700 hover:text-blue-600 font-medium py-2">Community</a>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            <button className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2">Log in</button>
            <button 
              onClick={onDashboard}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 font-medium transition-colors"
            >
              Dashboard
            </button>
            <button className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 font-medium transition-colors">
              Sign up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Products</a>
              <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Solutions</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Pricing</a>
              <a href="#docs" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Docs</a>
              <a href="#community" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Community</a>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <a href="#" className="block px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">Log in</a>
                <button 
                  onClick={onDashboard}
                  className="block w-full text-left px-3 py-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  Dashboard
                </button>
                <button className="block w-full text-left px-3 py-2 text-green-600 hover:text-green-700 font-medium">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
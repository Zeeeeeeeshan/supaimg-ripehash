import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Search, LayoutDashboard, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface NavbarProps {
  onDashboard: () => void;
}

const Navbar = ({ onDashboard }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Supabase-only app: we do not track Firebase user state here

  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

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

  // No-op logout here since Firebase is not used in this Navbar

  return (
    <nav className="bg-blue-50 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className={`flex items-center ${searchOpen ? 'w-32' : 'w-48'}`}> 
            <img src="/logo copy.png" alt="Supaimg" className="h-8 w-10 m-0 p-0" />
            <span className="text-xl font-bold whitespace-nowrap -ml-2 supaimg-gradient">Supaimg</span>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center space-x-8 ${searchOpen ? 'scale-90 opacity-70' : 'scale-100 opacity-100'}`}>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 font-medium py-2 relative hover:text-blue-600 focus:outline-none"
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:h-0.5">Products</span>
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
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
                        <a key={item.name} href="#" className="block p-3 hover:bg-gray-50 transition-colors duration-300">
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
                className="flex items-center text-gray-700 font-medium py-2 relative hover:text-blue-600 focus:outline-none"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full group-hover:after:h-0.5">Solutions</span>
                <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
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
                        <a key={item.name} href="#" className="block p-3 hover:bg-gray-50 transition-colors duration-300">
                          <div className="font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.desc}</div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a href="#pricing" className="text-gray-700 font-medium py-2 relative hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:after:h-0.5">Pricing</a>
            <a href="#docs" className="text-gray-700 font-medium py-2 relative hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:after:h-0.5">Docs</a>
            <a href="#community" className="text-gray-700 font-medium py-2 relative hover:text-blue-600 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full hover:after:h-0.5">Community</a>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Search Icon & Bar */}
            <div className="relative flex items-center -ml-5">
              {!searchOpen && (
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              )}
              {searchOpen && (
                <div className="flex items-center">
                  <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="pl-10 pr-4 py-2 border border-gray-300 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 rounded"
                    onBlur={() => setSearchOpen(false)}
                  />
                </div>
              )}
            </div>
            <button 
              onClick={onDashboard}
              className={`flex items-center text-white bg-blue-600 hover:bg-blue-700 font-medium px-4 py-2 rounded-md ${searchOpen ? 'px-2 text-sm' : ''}`}
            >
              <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
            </button>
            {/* Always show Log in button (Supabase auth handled on the Login page) */}
            <button
              className={`flex items-center text-white bg-green-600 hover:bg-green-700 font-medium px-4 py-2 rounded-md ${searchOpen ? 'px-2 text-sm' : ''}`}
              onClick={() => navigate('/login')}
            >
              <LogIn className="h-4 w-4 mr-2" /> Log in
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
                <button 
                  onClick={onDashboard}
                  className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                </button>
                <button className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:text-blue-600 font-medium">
                  <LogIn className="h-4 w-4 mr-2" /> Log in
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
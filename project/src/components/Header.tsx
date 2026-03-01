import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative text-gray-700 hover:text-orange-600 transition-colors font-medium after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-orange-600 after:transition-transform after:duration-300 after:transform ${isActive ? 'after:scale-x-100' : 'after:scale-x-0'} hover:after:scale-x-100`}
    >
      {children}
    </Link>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ta' : 'en');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeMenu}>
            <img src="/images/logo.webp" alt="Sri Lakshira Silks" className="h-12 w-12 object-cover rounded-full shadow-sm border border-orange-100" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/">{t('nav.home')}</NavLink>
            <NavLink to="/products">{t('nav.products')}</NavLink>
            <NavLink to="/about">{t('nav.about')}</NavLink>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <form onSubmit={handleSearch} className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300 focus:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </form>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 text-gray-700 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100"
              title="Toggle Language"
            >
              <Globe className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100">
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {state.itemCount}
                </span>
              )}
            </Link>



            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors rounded-full hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer with Proper Background */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 z-40"
          onClick={closeMenu}
        ></div>

        {/* Slide-in Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white z-50 shadow-xl transition-transform duration-300 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={closeMenu} className="p-2 text-gray-500 hover:text-gray-800">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-grow p-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search sarees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
              <nav className="flex flex-col space-y-2">
                <NavLink to="/" onClick={closeMenu}>{t('nav.home')}</NavLink>
                <NavLink to="/products" onClick={closeMenu}>{t('nav.products')}</NavLink>
                <NavLink to="/about" onClick={closeMenu}>{t('nav.about')}</NavLink>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

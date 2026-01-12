import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
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
  const { user, logout } = useAuth();
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
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">SS</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
              Sri Lakshira
            </span>
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

            {/* User Menu */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-1 p-2 text-gray-700 rounded-full hover:bg-gray-100 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-1">
                      <p className="px-4 py-2 text-sm text-gray-500">Welcome, {user.name}</p>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition-colors font-medium text-sm"
                >
                  {t('nav.login')}
                </Link>
              )}
            </div>

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
            <div className="p-4 border-t">
              {user ? (
                <div className="space-y-2">
                  <p className="text-gray-700">Welcome, {user.name}</p>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-medium"
                    onClick={closeMenu}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center bg-orange-600 text-white px-4 py-2 rounded-full font-medium"
                    onClick={closeMenu}
                  >
                    {t('nav.register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

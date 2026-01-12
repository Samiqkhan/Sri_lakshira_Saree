import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+919876543210?text=Hello! I need help with SareeStyle.', '_blank');
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SS</span>
              </div>
              <span className="text-2xl font-bold">Sri Lakshira</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Discover the finest collection of traditional and contemporary sarees. 
              Each piece is carefully curated to bring you the perfect blend of 
              elegance and style.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={handleWhatsAppClick}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span>{t('footer.whatsapp')}</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/cart" className="text-gray-300 hover:text-white transition-colors">Your Cart</Link></li>
              <li><Link to="/policies" className="text-gray-300 hover:text-white transition-colors">Policies</Link></li> {/* Added this line */}
              <li><Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login/Register</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500" />
                <span className="text-gray-300">srilakshira@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 mt-1" />
                <span className="text-gray-300">
                  123 Sri Lakshira,<br />
                  Mettur, Salem
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Sri Lakshira. All rights reserved. Made with ❤️ by Samiq.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

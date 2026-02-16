import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Sri Lakshira</h3>
            <p className="text-gray-400 text-sm">
              Weaving traditions into every thread. Bringing you the finest collection of handcrafted sarees from the heart of India.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-orange-400"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-400"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-400"><Twitter className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-orange-400">Home</Link></li>
              <li><Link to="/products" className="hover:text-orange-400">Shop Collection</Link></li>
              <li><Link to="/about" className="hover:text-orange-400">Our Story</Link></li>
              <li><Link to="/cart" className="hover:text-orange-400">My Cart</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/policies" className="hover:text-orange-400">Shipping Policy</Link></li>
              <li><Link to="/policies" className="hover:text-orange-400">Returns & Exchange</Link></li>
              <li><Link to="/policies" className="hover:text-orange-400">Terms & Conditions</Link></li>
              <li><Link to="/policies" className="hover:text-orange-400">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-orange-400 shrink-0" />
                <span>123 Silk Street, Kancheepuram, Tamil Nadu - 631501</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-orange-400 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-orange-400 shrink-0" />
                <span>support@srilakshira.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sri Lakshira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
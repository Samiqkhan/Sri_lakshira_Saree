import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

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
              <a href="https://www.facebook.com/share/1CMnknbLvt/?mibextid=wwXIfr" className="text-gray-400 hover:text-orange-400"><Facebook className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/sri_lakshira?igsh=YThxejQxcWJ2cngw&utm_source=qr" className="text-gray-400 hover:text-orange-400"><Instagram className="h-5 w-5" /></a>
              <a href="https://youtube.com/@srilakshira?si=7B66zeDIx6nwjbla" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400"><Youtube className="h-5 w-5" /></a>
              <a href="https://chat.whatsapp.com/D6Ojb8kWuXNIDBq6azRl5f?mode=gi_t" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400"><WhatsAppIcon className="h-5 w-5" /></a>
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
                <span>srilakshira@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Sri Lakshira Silks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
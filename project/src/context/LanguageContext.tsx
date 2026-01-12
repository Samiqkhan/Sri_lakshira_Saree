import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'hero.title': 'Discover Exquisite Sarees',
    'hero.subtitle': 'Traditional elegance meets contemporary style',
    'hero.cta': 'Shop Collection',
    'product.addToCart': 'Add to Cart',
    'product.price': 'Price',
    'product.size': 'Size',
    'product.color': 'Color',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.checkout': 'Proceed to Checkout',
    'footer.contact': 'Contact Us',
    'footer.whatsapp': 'WhatsApp Support',
  },
  ta: {
    'nav.home': 'முகப்பு',
    'nav.products': 'பொருட்கள்',
    'nav.about': 'எங்களைப் பற்றி',
    'nav.cart': 'கூடை',
    'nav.login': 'உள்நுழை',
    'nav.register': 'பதிவு',
    'hero.title': 'அద్భుத புடவைகளைக் கண்டறியுங்கள்',
    'hero.subtitle': 'பாரம்பரிய நேர்த்தி சமகால பாணியுடன் இணைகிறது',
    'hero.cta': 'சேகரிப்பைக் காண்க',
    'product.addToCart': 'கூடையில் சேர்',
    'product.price': 'விலை',
    'product.size': 'அளவு',
    'product.color': 'நிறம்',
    'cart.title': 'ஷாப்பிங் கூடை',
    'cart.empty': 'உங்கள் கூடை காலியாக உள்ளது',
    'cart.checkout': 'செக் அவுட் செல்லவும்',
    'footer.contact': 'தொடர்பு கொள்ள',
    'footer.whatsapp': 'வாட்ஸ்அப் ஆதரவு',
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

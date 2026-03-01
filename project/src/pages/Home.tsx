import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Building, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  fabric: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean; 
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const heroImages = [
    '/images/hero-bg.webp',
    '/images/hero-bg2.webp',
    '/images/hero-bg3.webp'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [heroImages.length]);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAll();

        const formattedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          originalPrice: item.originalPrice ? Number(item.originalPrice) : undefined,
          image: item.image,
          category: item.category,
          fabric: item.fabric,
          rating: 4.8, 
          reviews: 120,
          isNew: true,
          isFeatured: item.isFeatured
        }));

        const featured = formattedProducts.filter(p => p.isFeatured === true);
        setFeaturedProducts(featured);
        setNewArrivals(formattedProducts.slice(0, 4));

      } catch (error) {
        console.error("Failed to fetch home products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  // UPDATED CATEGORIES
  const categories = [
    { name: 'Soft Silk', image: '/images/hero-silk.webp', link: '/products?category=soft-silk' },
    { name: 'Pure Silk', image: '/images/pro-1.webp', link: '/products?category=pure-silk' },
    { name: 'Kancheepuram', image: '/images/hero-kancheepuram.webp', link: '/products?category=kancheepuram-silk' },
    { name: 'Crepe Silk', image: '/images/pro-3.webp', link: '/products?category=crepe-silk' },
    { name: 'Semi Silk', image: '/images/pro-4.webp', link: '/products?category=semi-silk' },
    { name: 'Daily Wear', image: '/images/hero-cotton.webp', link: '/products?category=daily-wear' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 z-10"></div>
        <div className="absolute inset-0">
          {heroImages.map((src, index) => (
            <div
              key={src}
              className={`w-full h-full absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${src})` }}
            />
          ))}
        </div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4 animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            {t('hero.subtitle')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-white py-3 border-b border-gray-200 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-gray-700 text-sm mx-6">✨ Free Shipping on Orders Above ₹2000</span>
          <span className="text-gray-300 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">🎉 New Collection: Banarasi Silk Sarees</span>
          <span className="text-gray-300 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">💎 Premium Quality Guaranteed</span>
          <span className="text-gray-300 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">🚚 Express Delivery Available</span>
          <span className="text-gray-300 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">⭐ Rated 4.8/5 by 10,000+ Customers</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our exquisite collection</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-3xl aspect-square hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <img src={category.image} alt={category.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white transform group-hover:translate-y-[-4px] transition-transform duration-300">
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Featured Collection</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked masterpieces</p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors truncate">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-orange-600" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No featured products available.</p>
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">New Arrivals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fresh from our artisan partners</p>
          </div>
          
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {newArrivals.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl"
                >
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">NEW</span>
                    )}
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-orange-600 transition-colors">{product.name}</h3>
                    <div className="flex items-baseline justify-center space-x-2">
                      <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No new arrivals found.</div>
          )}

          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
              View All Products
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="rounded-2xl overflow-hidden shadow-lg">
               <img src="/images/about.webp" alt="Saree" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
             </div>
             <div className="space-y-6">
               <div className="flex items-center">
                 <Building className="h-10 w-10 text-orange-600 mr-4" />
                 <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">About Sri Lakshira Silks</h2>
               </div>
               <p className="text-gray-700 leading-relaxed text-lg">Founded in 2024, Sri Lakshira Silks was born from a desire to celebrate the rich heritage of Indian textiles.</p>
               <Link to="/about" className="inline-flex items-center text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors group">
                 Read Our Full Story <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1" />
               </Link>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
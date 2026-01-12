import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, Building } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Define the Product interface to ensure type safety
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
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of images for the hero section slideshow
  const heroImages = [
    '/images/hero-bg.png',
    '/images/hero-bg2.png',
    '/images/hero-bg3.png'
  ];

  // Effect to handle the background image slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [heroImages.length]);


  // Mock data for featured products
  const featuredProducts = [
    {
      id: '1',
      name: 'Royal Silk Saree',
      price: 2999,
      image: '/images/pro-1.png',
      rating: 4.8,
      reviews: 124,
      category: 'silk',
      fabric: 'Pure Silk',
    },
    {
      id: '2',
      name: 'Designer Cotton Saree',
      price: 1899,
      image: '/images/pro-2.png',
      rating: 4.6,
      reviews: 89,
      category: 'cotton',
      fabric: 'Cotton',
    },
    {
      id: '3',
      name: 'Banarasi Silk Saree',
      price: 4999,
      image: '/images/pro-3.png',
      rating: 4.9,
      reviews: 156,
      category: 'silk',
      fabric: 'Banarasi Silk',
    }
  ];
  
  // In a real application, you would fetch this data from your API.
  // For now, we are using mock data to populate the "New Arrivals" section.
  useEffect(() => {
    const allProducts: Product[] = [
      {
        id: '4',
        name: 'Bridal Designer Saree',
        price: 8999,
        originalPrice: 12999,
        image: '/images/pro-4.png',
        category: 'bridal',
        fabric: 'Silk',
        rating: 4.7,
        reviews: 67,
        isNew: true
      },
      {
        id: '5',
        name: 'Printed Cotton Saree',
        price: 1299,
        image: '/images/pro-5.png',
        category: 'cotton',
        fabric: 'Cotton',
        rating: 4.4,
        reviews: 203,
        isNew: true
      },
      {
        id: '6',
        name: 'Designer Georgette Saree',
        price: 3499,
        image: '/images/pro-6.png',
        category: 'designer',
        fabric: 'Georgette',
        rating: 4.5,
        reviews: 98,
        isNew: true
      },
      {
        id: '1',
        name: 'Royal Silk Saree',
        price: 2999,
        originalPrice: 3999,
        image: '/images/pro-7.png',
        category: 'silk',
        fabric: 'Silk',
        rating: 4.8,
        reviews: 124,
        isNew: true
      },
    ];
    setNewArrivals(allProducts);
  }, []);

  const categories = [
    {
      name: 'Silk Sarees',
      image: '/images/hero-silk.png',
      link: '/products?category=silk'
    },
    {
      name: 'Cotton Sarees',
      image: '/images/hero-cotton.png',
      link: '/products?category=cotton'
    },
    {
      name: 'Kancheepuram Silk Sarees',
      image: '/images/hero-kancheepuram.png',
      link: '/products?category=designer'
    },
    {
      name: 'Ready to Wear',
      image: '/images/hero-readt-to-wear.png',
      link: '/products?category=bridal'
    }
  ];

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
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
            {t('hero.subtitle')}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {t('hero.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Elegant Marquee Section */}
<section className="bg-white py-3 border-b border-gray-200 overflow-hidden">
  <div className="flex animate-marquee whitespace-nowrap">
    {/* -- We repeat the items to create a seamless loop -- */}

    <span className="text-gray-700 text-sm mx-6">✨ Free Shipping on Orders Above ₹2000</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">🎉 New Collection: Banarasi Silk Sarees</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">💎 Premium Quality Guaranteed</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">🚚 Express Delivery Available</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">⭐ Rated 4.8/5 by 10,000+ Customers</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">🎁 Special Festive Offers</span>
    <span className="text-gray-300 mx-6">❖</span>

    {/* -- Duplicate the set of items for the marquee effect -- */}

    <span className="text-gray-700 text-sm mx-6">✨ Free Shipping on Orders Above ₹2000</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">🎉 New Collection: Banarasi Silk Sarees</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">💎 Premium Quality Guaranteed</span>
    <span className="text-gray-300 mx-6">❖</span>

    <span className="text-gray-700 text-sm mx-6">🚚 Express Delivery Available</span>
    
  </div>
</section>


      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our exquisite collection of handcrafted sarees, each telling a story of tradition and elegance</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="group relative overflow-hidden rounded-3xl aspect-square hover:scale-105 transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Handpicked masterpieces crafted by skilled artisans, each saree a testament to timeless beauty</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500 font-medium">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
                    <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-orange-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">New Arrivals</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fresh from our artisan partners - the latest additions to our curated collection</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:-translate-y-3 transition-all duration-500 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden aspect-[3/4]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.isNew && (
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">NEW</span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 truncate group-hover:text-orange-600 transition-colors">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 font-medium">{product.fabric}</p>
                  <div className="flex items-center justify-center space-x-2">
                     <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">₹{product.price.toLocaleString()}</span>
                     {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                     )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/products"
              className="inline-flex items-center bg-gradient-to-r from-orange-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              View All Products
              <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/about.png"
                alt="Close-up of a colorful saree"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center">
                <Building className="h-10 w-10 text-orange-600 mr-4" />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">About Sri Lakshira</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Founded in 2024, Sri Lakshira was born from a desire to celebrate the rich heritage of Indian textiles. We connect local artisans with saree lovers globally, believing every saree is a piece of art.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Our mission is to empower weavers through fair trade, offering authentic, handcrafted sarees that you will cherish for a lifetime.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors group"
              >
                Read Our Full Story
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-white p-8 rounded-3xl shadow-xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Truck className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Shipping</h3>
              <p className="text-gray-600 leading-relaxed">Free delivery on orders above ₹2000</p>
            </div>
            <div className="group bg-white p-8 rounded-3xl shadow-xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Payment</h3>
              <p className="text-gray-600 leading-relaxed">100% secure online payment methods</p>
            </div>
            <div className="group bg-white p-8 rounded-3xl shadow-xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Headphones className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">Round the clock customer support</p>
            </div>
            <div className="group bg-white p-8 rounded-3xl shadow-xl text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-3">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Star className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">Premium quality guaranteed</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

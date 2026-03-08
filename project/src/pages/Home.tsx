import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Building, Loader2, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
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
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (!reviewsContainerRef.current) return;
    const container = reviewsContainerRef.current;
    
    // Calculate the next index
    let nextIndex = activeReviewIndex + (direction === 'left' ? -1 : 1);
    
    // Bounds checking
    if (nextIndex < 0) nextIndex = 0;
    if (nextIndex > 2) nextIndex = 2; // We currently have exactly 3 reviews

    const targetCard = container.querySelector(`[data-index="${nextIndex}"]`) as HTMLElement;
    
    if (targetCard) {
      // Calculate exactly where this card sits in the container
      // offsetLeft gives exactly how far it is from the left edge of the scrolling container
      // We subtract the padding (which is dynamically calculated as the gap from the edge to the center)
      // to perfectly align the left edge of the card with the start of the visible padding area
      
      // Calculate padding from the CSS: max(1rem, calc(50vw - 42.5vw))
      const remBase = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const paddingLeft = Math.max(remBase, (window.innerWidth * 0.5) - (window.innerWidth * 0.425));
      
      container.scrollTo({
        left: targetCard.offsetLeft - paddingLeft,
        behavior: 'smooth'
      });
      
      // Optically update the active index immediately instead of waiting for IntersectionObserver
      setActiveReviewIndex(nextIndex);
    }
  };

  useEffect(() => {
    const container = reviewsContainerRef.current;
    if (!container || window.innerWidth >= 768) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveReviewIndex(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const children = Array.from(container.children);
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

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
      <section className="py-3 border-b border-pink-200 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="text-gray-700 text-sm mx-6">✨ Free Shipping on Orders Above ₹2000</span>
          <span className="text-gray-400 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">🎉 New Collection: Banarasi Silk Sarees</span>
          <span className="text-gray-400 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">💎 Premium Quality Guaranteed</span>
          <span className="text-gray-400 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">🚚 Express Delivery Available</span>
          <span className="text-gray-400 mx-6">❖</span>
          <span className="text-gray-700 text-sm mx-6">⭐ Rated 4.8/5 by 10,000+ Customers</span>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Discover our exquisite collection</p>
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
      <section className="py-16">
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
      <section className="py-16 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">New Arrivals</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">Fresh from our artisan partners</p>
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
      <section className="py-16">
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
               <p className="text-gray-800 leading-relaxed text-lg">Founded in 2024, Sri Lakshira Silks was born from a desire to celebrate the rich heritage of Indian textiles.</p>
               <Link to="/about" className="inline-flex items-center text-orange-600 font-bold text-lg hover:text-orange-700 transition-colors group">
                 Read Our Full Story <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1" />
               </Link>
             </div>
           </div>
        </div>
      </section>

      {/* Reviews Section */}
      {/* Reviews Section */}
      <section className="py-20 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-600 font-bold tracking-widest uppercase text-sm">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-4">
              Loved by Saree Enthusiasts
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="relative group">
            {/* Desktop Navigation Arrows (Visible on Hover) */}
            <button 
              onClick={() => scrollReviews('left')}
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-gray-800 hover:text-orange-600 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={() => scrollReviews('right')}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-xl text-gray-800 hover:text-orange-600 transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div 
              ref={reviewsContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-10 hide-scrollbar scroll-smooth px-2"
            >
              {[
                { name: "Priya Sharma", role: "Regular Customer", review: "The quality of the silk is absolutely premium! I've bought three sarees and each one is a masterpiece.", rating: 5 },
                { name: "Anita Reddy", role: "Wedding Shopper", review: "Wore their Kancheepuram silk for my sister's wedding. Everyone kept asking where I got it from. Highly recommended!", rating: 5 },
                { name: "Meera Patel", role: "First-time Buyer", review: "Fast delivery and the saree looks exactly like the pictures. The fabric feels amazing and authentic.", rating: 5 }
              ].map((testimonial, idx) => (
                <div 
                  key={idx} 
                  data-index={idx}
                  className="w-[85vw] md:w-[calc(33.333%-1rem)] shrink-0 snap-center bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col justify-between hover:border-orange-200 transition-colors"
                >
                  <div>
                    <div className="flex items-center mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
                        />
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 h-8 w-8 text-orange-50 opacity-10" />
                      <p className="text-gray-600 leading-relaxed text-lg italic relative z-10">
                        "{testimonial.review}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center mt-8 pt-6 border-t border-gray-50">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-lg mr-4 border-2 border-white shadow-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indicators for both Mobile and Desktop */}
          <div className="flex justify-center space-x-2 mt-4">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => {
                  const container = reviewsContainerRef.current;
                  if (container) {
                    const card = container.children[idx] as HTMLElement;
                    container.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeReviewIndex === idx ? 'w-8 bg-orange-500' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
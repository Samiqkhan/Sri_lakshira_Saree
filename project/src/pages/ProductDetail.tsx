import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/api';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  fabric: string;
  category: string;
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  specifications: Record<string, string>;
  videoUrl?: string;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { t } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        // Fetch real data from Supabase
        const data = await productService.getById(id);

        // Convert Supabase data to our Frontend Interface
        // Note: Since DB has 1 image, we put it in an array
        const formattedProduct: Product = {
          id: data.id,
          name: data.name,
          price: Number(data.price),
          originalPrice: Number(data.price) + 1000, // Mock original price
          images: [data.image, data.image, data.image], // Mock gallery using same image
          description: 'Experience the elegance of traditional craftsmanship with this exquisite saree. Perfect for weddings, festivals, and special occasions.',
          fabric: data.fabric,
          category: data.category,
          colors: ['Red', 'Pink', 'Gold', 'Blue'], // Default colors
          sizes: ['Free Size'],
          rating: 4.8,
          reviews: 124,
          specifications: data.specifications || {
             'Fabric': data.fabric,
             'Care': 'Dry Clean Only',
             'Origin': 'India'
          },
          videoUrl: '' 
        };

        setProduct(formattedProduct);
        
        // Set defaults
        if (formattedProduct.colors.length > 0) setSelectedColor(formattedProduct.colors[0]);
        if (formattedProduct.sizes.length > 0) setSelectedSize(formattedProduct.sizes[0]);

      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Could not load product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) {
      toast.error('Please select color and size');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity
    });

    toast.success('Added to cart successfully!');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-orange-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li><Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900 font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg relative group">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Gallery (Hidden if only 1 image, but we mocked 3 for now) */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index
                      ? 'border-orange-500'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-sm text-gray-500 mb-4">Category: <span className="capitalize text-gray-900 font-medium">{product.category}</span></p>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <div className="flex items-end space-x-4">
                <span className="text-4xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col mb-1">
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                  </div>
                )}
                <span className="text-green-600 font-bold mb-2 ml-2">
                   {Math.round((1 - product.price / (product.originalPrice || product.price * 1.2)) * 100)}% OFF
                </span>
              </div>
            </div>

            <div className="prose prose-sm text-gray-600">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6 pt-6 border-t border-gray-100">
              {/* Color Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{t('product.color')}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-900'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">{t('product.size')}</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-gray-900 text-white'
                          : 'bg-white border border-gray-200 text-gray-900 hover:border-gray-900'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col gap-4 pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 text-gray-600"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 text-gray-600"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm text-green-600 font-medium flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  In Stock & Ready to Ship
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-white border-2 border-orange-600 text-orange-600 py-3 px-6 rounded-lg font-bold hover:bg-orange-50 transition-colors"
                >
                  {t('product.addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-orange-200"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-3 border-2 border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50 transition-colors"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Truck className="h-6 w-6 text-gray-900 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Shield className="h-6 w-6 text-gray-900 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <RotateCcw className="h-6 w-6 text-gray-900 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-600">7 Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Product Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-100 pb-3">
                  <span className="text-gray-500 font-medium">{key}</span>
                  <span className="text-gray-900 font-semibold">{value}</span>
                </div>
              ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail; 
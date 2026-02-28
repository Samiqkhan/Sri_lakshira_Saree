import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Plus, Minus, PlayCircle, Loader2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { productService } from '../services/api';
import toast from 'react-hot-toast';

// --- CONFIG: SET YOUR SAMPLE VIDEO URL HERE ---
const DEFAULT_VIDEO_URL = "/images/drapping.mp4"; 

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
        // Fetch real data
        const data = await productService.getById(id);

        const formattedProduct: Product = {
          id: data.id,
          name: data.name,
          price: Number(data.price),
          originalPrice: Number(data.price) + 1000, 
          images: [data.image, data.image, data.image], 
          description: 'Experience the elegance of traditional craftsmanship with this exquisite saree.',
          fabric: data.fabric,
          category: data.category,
          colors: data.colors && data.colors.length > 0 ? data.colors : [], 
          sizes: ['Free Size'],
          rating: 4.8,
          reviews: 124,
          specifications: data.specifications || {},
          videoUrl: data.videoUrl // Get video from DB
        };

        setProduct(formattedProduct);
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

  // Use specific video if available, otherwise use default
  const displayVideoUrl = product?.videoUrl || DEFAULT_VIDEO_URL;

  const handleAddToCart = () => {
    if (!product) return;
    if (product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }
    if (product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-orange-600" /></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button onClick={() => navigate('/products')} className="bg-orange-600 text-white px-6 py-2 rounded-lg">Back to Products</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-lg relative">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square overflow-hidden rounded-lg border-2 ${selectedImage === index ? 'border-orange-500' : 'border-transparent'}`}>
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-end space-x-4 mt-4">
                <span className="text-4xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through mb-1">₹{product.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Selection */}
            <div className="space-y-6 pt-6 border-t border-gray-100">
               <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-md text-sm font-medium border ${selectedColor === color ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>{color}</button>
                  ))}
                </div>
               </div>
               <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`px-4 py-2 rounded-md text-sm font-medium border ${selectedSize === size ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>{size}</button>
                  ))}
                </div>
               </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 pt-6">
              <div className="flex items-center space-x-4">
                 <div className="flex items-center border rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus className="h-4 w-4" /></button>
                    <span className="px-4">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus className="h-4 w-4" /></button>
                 </div>
              </div>
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 bg-white border-2 border-orange-600 text-orange-600 py-3 rounded-lg font-bold hover:bg-orange-50">Add to Cart</button>
                <button onClick={handleBuyNow} className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-bold hover:bg-orange-700">Buy Now</button>
              </div>
            </div>

            {/* Features Icons */}
            {/* <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Truck className="h-5 w-5 text-gray-900 mx-auto mb-1" />
                <p className="text-[10px] font-medium text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <Shield className="h-5 w-5 text-gray-900 mx-auto mb-1" />
                <p className="text-[10px] font-medium text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <RotateCcw className="h-5 w-5 text-gray-900 mx-auto mb-1" />
                <p className="text-[10px] font-medium text-gray-600">Defect Exchange</p>
              </div>
            </div> */}

            {/* ADDED: Explicit Exchange Policy Box */}
            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mt-2">
                <h4 className="text-sm font-bold text-orange-900 flex items-center mb-1">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Exchange Policy
                </h4>
                <p className="text-xs text-orange-800 leading-relaxed">
                    Exchanges are applicable <strong>only for defective or damaged products</strong>. 
                    If your order arrives damaged, please contact us via WhatsApp at 
                    <strong className="whitespace-nowrap"> +91 98765 43210</strong> within 
                    <strong> 48 hours</strong> of delivery.
                </p>
            </div>

          </div>
        </div>

        {/* Specs & Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Specifications</h3>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="text-gray-500">{key}</span>
                    <span className="text-gray-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
           </div>

           {/* Video Section */}
           {displayVideoUrl && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center mb-4">
                  <PlayCircle className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Draping Tutorial</h3>
                </div>
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                   <iframe
                      src={displayVideoUrl}
                      title="Draping Tutorial"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                   ></iframe>
                </div>
             </div>
           )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
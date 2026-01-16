import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api'; // Import the service
import toast from 'react-hot-toast';

// ... interface OrderDetails remains the same ...
interface OrderDetails {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'online';
}

const Checkout: React.FC = () => {
  const { state, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'online'
  });

  const total = Math.round(state.total * 1.18);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // 1. Prepare data
      const orderPayload = {
        customer_name: `${orderDetails.firstName} ${orderDetails.lastName}`,
        email: orderDetails.email,
        phone: orderDetails.phone,
        shipping_address: {
          address: orderDetails.address,
          city: orderDetails.city,
          state: orderDetails.state,
          pincode: orderDetails.pincode
        },
        items: state.items,
        total_amount: total,
        status: 'pending',     // Initial status
        payment_status: 'pending' // Waiting for upload
      };

      // 2. Create Order in Supabase
      const newOrder = await orderService.create(orderPayload);
      
      // 3. Redirect to Payment Page with Order ID
      toast.success('Order created! Please complete payment.');
      navigate(`/payment/${newOrder.id}`);
      
    } catch (error) {
      console.error(error);
      toast.error('Failed to place order.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/cart');
    return null;
  }

  // ... Return Statement (The UI remains mostly the same) ...
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" required value={orderDetails.email} onChange={handleInputChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>

              {/* Shipping Info */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="firstName" placeholder="First Name" required value={orderDetails.firstName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2" />
                  <input type="text" name="lastName" placeholder="Last Name" required value={orderDetails.lastName} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2" />
                  <input type="tel" name="phone" placeholder="Phone" required value={orderDetails.phone} onChange={handleInputChange} className="md:col-span-2 border border-gray-300 rounded-md px-3 py-2" />
                  <input type="text" name="address" placeholder="Address" required value={orderDetails.address} onChange={handleInputChange} className="md:col-span-2 border border-gray-300 rounded-md px-3 py-2" />
                  <input type="text" name="city" placeholder="City" required value={orderDetails.city} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2" />
                  <select name="state" required value={orderDetails.state} onChange={handleInputChange} className="border border-gray-300 rounded-md px-3 py-2">
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                  </select>
                  <input type="text" name="pincode" placeholder="Pincode" required value={orderDetails.pincode} onChange={handleInputChange} className="md:col-span-2 border border-gray-300 rounded-md px-3 py-2" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isProcessing ? 'Processing...' : `Place Order - ₹${total.toLocaleString()}`}
              </button>
            </form>
          </div>

          {/* Order Summary (Right Side) */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-600">{item.color} | {item.size} | Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-orange-600">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  
};

export default Checkout;
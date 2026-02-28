import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderService } from '../services/api'; 
import toast from 'react-hot-toast';

// Complete list of Indian States and Union Territories
const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", 
  "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", 
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", 
  "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", 
  "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  // --- CALCULATIONS START ---
  // Delivery Fee: 
  // Tamil Nadu: Free if >= 2000, else ₹50
  // Other states: ₹100
  let deliveryFee = 100;
  if (orderDetails.state === 'Tamil Nadu') {
    deliveryFee = Number(state.total) >= 2000 ? 0 : 50;
  }
  
  const gstAmount = Math.round(state.total * 0.05); // 5% GST
  const total = state.total + gstAmount + deliveryFee;
  // --- CALCULATIONS END ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure state is selected
    if (!orderDetails.state) {
      toast.error('Please select a State');
      return;
    }
    
    if (!acceptedTerms) {
      toast.error('Please accept the Terms & Conditions and Exchange Policy');
      return;
    }

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={orderDetails.email}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={orderDetails.firstName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={orderDetails.lastName}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={orderDetails.phone}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={orderDetails.address}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={orderDetails.city}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <select
                      id="state"
                      name="state"
                      required
                      value={orderDetails.state}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select State</option>
                      {INDIAN_STATES.map((stateName) => (
                        <option key={stateName} value={stateName}>
                          {stateName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      required
                      value={orderDetails.pincode}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Secure Online Payment</h2>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="online"
                        checked={orderDetails.paymentMethod === 'online'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        disabled
                      />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                      <div>
                        <span className="text-gray-900 font-semibold">Secure Online Payment</span>
                        <p className="text-sm text-gray-600">Pay securely with UPI, Cards, or Net Banking</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                    <p className="flex items-center">
                      <Lock className="h-4 w-4 mr-2 text-green-600" />
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="focus:ring-orange-500 h-5 w-5 text-orange-600 border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700 cursor-pointer">
                    I agree to the <a href="/policies" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">Terms & Conditions</a> and <a href="/policies" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 underline">Exchange Policy</a>.
                  </label>
                  <p className="text-gray-500 text-xs mt-1">
                    Exchanges are only applicable for defective/damaged products reported within 48 hours. No cash refunds.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    <span>Place Order - ₹{total.toLocaleString()}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="flex items-center space-x-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                      <p className="text-xs text-gray-600">
                        {item.color} | {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-orange-600">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{state.total.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">GST (5%)</span>
                  <span className="text-gray-900">₹{gstAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex flex-col">
                    <span>Delivery Fee</span>
                    <span className="text-xs text-orange-500 mt-1">
                      (TN: ₹50 or Free &gt;₹2000, Others: ₹100)
                    </span>
                  </span>
                  <span className="text-gray-900">
                    {deliveryFee === 0 ? <span className="text-green-600 font-semibold">Free</span> : `₹${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
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
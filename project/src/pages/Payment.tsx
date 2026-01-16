import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Copy, CreditCard, Loader2 } from 'lucide-react';
import { orderService, productService } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch Order Details to show the amount
  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      try {
        // We reuse the getById from products, but really we need an order getter
        // For simplicity, assuming you added getById to orderService or we just use the ID
        // In a real app, fetch the specific order amount here.
        // For now, we will display a generic message if we can't fetch strictly.
      } catch (error) {
        console.error(error);
      }
    };
    loadOrder();
  }, [orderId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('srilakshira@upi'); // Replace with your UPI
    toast.success('UPI ID copied!');
  };

  const handleSubmit = async () => {
    if (!selectedFile || !orderId) {
      toast.error('Please upload the payment screenshot');
      return;
    }

    try {
      setIsUploading(true);

      // 1. Upload Image
      const proofUrl = await orderService.uploadProof(selectedFile);

      // 2. Update Order
      await orderService.addPaymentProof(orderId, proofUrl);

      // 3. Clear Cart & Finish
      clearCart();
      toast.success('Payment proof submitted successfully!');
      navigate('/'); // Go Home
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit proof. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Complete Payment</h2>
          <p className="mt-2 text-sm text-gray-600">Scan QR Code to pay for Order #{orderId?.slice(0, 8)}</p>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center space-y-4 border-b pb-6">
          <div className="p-4 bg-white border-2 border-orange-500 rounded-lg shadow-sm">
             {/* REPLACE THIS IMAGE SOURCE WITH YOUR ACTUAL QR CODE IMAGE */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=your-upi-id@upi&pn=SriLakshira&cu=INR" 
              alt="Payment QR Code" 
              className="w-48 h-48 object-contain"
            />
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="font-mono font-medium text-gray-700">srilakshira@upi</span>
            <button onClick={handleCopyUPI} className="text-orange-600 hover:text-orange-700">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Upload Payment Screenshot</label>
          
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 transition-colors">
            {previewUrl ? (
              <div className="relative">
                <img src={previewUrl} alt="Preview" className="h-48 object-contain" />
                <button 
                  onClick={() => { setPreviewUrl(''); setSelectedFile(null); }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  X
                </button>
              </div>
            ) : (
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Confirm Payment
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;
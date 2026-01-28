import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Upload, CheckCircle, Copy, CreditCard, Loader2, X } from 'lucide-react';
import { orderService } from '../services/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('srilakshira@upi');
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
             {/* Replace with your actual QR code image */}
            <img 
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=srilakshira@upi&pn=SriLakshira&cu=INR" 
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

        {/* Upload Section - FIXED: Whole Box is Clickable */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Upload Payment Screenshot</label>
          
          {previewUrl ? (
            // Preview State (Show Image + Remove Button)
            <div className="relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                <img src={previewUrl} alt="Preview" className="h-48 object-contain rounded" />
                <button 
                  onClick={() => { setPreviewUrl(''); setSelectedFile(null); }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
            </div>
          ) : (
            // Upload State (Clickable Box)
            <label 
              htmlFor="file-upload" 
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer group"
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-orange-500 transition-colors" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="font-medium text-orange-600 group-hover:text-orange-700">Click to upload</span>
                  <span className="pl-1">or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                {/* The input is hidden but active because it's inside the label */}
                <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file" 
                    className="sr-only" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                />
              </div>
            </label>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isUploading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-colors"
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
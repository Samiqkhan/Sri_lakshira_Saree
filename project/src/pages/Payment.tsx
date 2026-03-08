import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import {
  Upload,
  CheckCircle,
  Copy,
  Loader2,
  X,
  IndianRupee,
} from "lucide-react";
import { orderService } from "../services/api";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // Initialize location
  const { clearCart } = useCart();

  // Retrieve totalAmount from navigation state
  const totalAmount = location.state?.totalAmount || 0;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText("srilakshira@upi");
    toast.success("UPI ID copied!");
  };

  const handleSubmit = async () => {
    if (!selectedFile || !orderId) {
      toast.error("Please upload the payment screenshot");
      return;
    }

    try {
      setIsUploading(true);
      
      // 1. Upload the image directly to Supabase
      const proofUrl = await orderService.uploadPaymentProof(selectedFile);
      
      // 2. Update the existing order with the returned payment proof URL and switch status
      await orderService.update(orderId, {
        payment_proof_url: proofUrl,
        payment_status: 'under_review'
      });
      
      clearCart();
      toast.success("Payment proof submitted successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit proof. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Complete Payment</h2>
          <p className="mt-2 text-sm text-gray-600">
            Order #{orderId?.slice(0, 8)}
          </p>
        </div>

        {/* NEW: Price Display Section */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-orange-800 uppercase tracking-wider mb-1">
            Amount to Pay
          </p>
          <div className="flex items-center justify-center text-4xl font-extrabold text-orange-600">
            <IndianRupee className="h-8 w-8 mr-1" />
            <span>{totalAmount.toLocaleString("en-IN")}</span>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center space-y-4 border-b pb-6">
          <div className="p-4 bg-white border-2 border-orange-500 rounded-lg shadow-sm">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=srilakshira@upi&pn=SriLakshira&am=${totalAmount}&cu=INR`}
              alt="Payment QR Code"
              className="w-48 h-48 object-contain"
            />
          </div>

          <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
            <span className="font-mono font-medium text-gray-700">
              srilakshira@upi
            </span>
            <button
              onClick={handleCopyUPI}
              className="text-orange-600 hover:text-orange-700"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Upload Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Payment Screenshot
          </label>

          {previewUrl ? (
            <div className="relative mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-48 object-contain rounded"
              />
              <button
                onClick={() => {
                  setPreviewUrl("");
                  setSelectedFile(null);
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file-upload"
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-orange-500 hover:bg-orange-50 transition-all cursor-pointer group"
            >
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-orange-500" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <span className="font-medium text-orange-600 group-hover:text-orange-700">
                    Click to upload
                  </span>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                <input
                  id="file-upload"
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
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
        >
          {isUploading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            "Confirm Payment"
          )}
        </button>
      </div>
    </div>
  );
};

export default Payment;

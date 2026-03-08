import React from 'react';
import { Shield, Truck, RefreshCw, Lock, AlertCircle, Monitor } from 'lucide-react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Store Policies</h1>
          <p className="text-lg text-gray-600">Everything you need to know about shopping with Sri Lakshira</p>
        </div>

        <div className="space-y-8">
          {/* Shipping Policy */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Truck className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shipping Policy</h2>
            </div>
            <div className="prose text-gray-600">
              <ul className="list-disc pl-5 space-y-2">
                <li>We offer free shipping on all orders above ₹2000 within Tamilnadu.</li>
                <li>Orders are typically processed within 24-48 hours of payment confirmation.</li>
                <li>Standard delivery time is 5-7 business days for metro cities and 7-10 days for other locations.</li>
                <li>Express delivery options are available at checkout for select pin codes.</li>
                <li>You will receive a tracking number via email/SMS once your order is shipped.</li>
              </ul>
            </div>
          </div>

          {/* Exchange & Refund Policy */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <RefreshCw className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Return & Exchange Policy</h2>
            </div>
            <div className="prose text-gray-600 space-y-6">
              <p>
                Returns and exchanges are accepted only if the product is damaged or incorrect. If your order arrives damaged or incorrect, please contact us via WhatsApp at <strong className="text-orange-600">+91 93619 83337</strong>. Requests for returns or exchanges must be submitted within <strong>24 hours</strong> of receiving the order.
              </p>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Eligibility Conditions</h3>
                <p className="mb-3">
                  To qualify, the item must be unused, with tags intact, and returned in their original packaging. The following conditions must also be met:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>A parcel opening video is mandatory as proof.</li>
                  <li>The saree's fold must remain unchanged and should be returned in its original condition.</li>
                  <li>The saree's tag must not be removed.</li>
                  <li>The original invoice or bill is required to process the request.</li>
                </ul>
              </div>

              <p>
                Once we receive and inspect the returned product, we will either process an exchange or issue a refund based on the customer's choice. Refunds (if applicable) will be processed within 7-10 business days after inspection.
              </p>
              
              <div className="text-orange-800 bg-orange-50 p-4 rounded-lg space-y-2 text-sm font-medium">
                <p>Note: We do not offer refunds or exchanges for "change of mind" or color discrepancies due to screen settings.</p>
                <p>We offer exchange facilities under exceptional circumstances <strong>only once per order</strong>. We regretfully cannot accept repetitive exchange requests.</p>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Lock className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Privacy & Security</h2>
            </div>
            <div className="prose text-gray-600">
              <p className="mb-4">
                Your privacy is important to us. We use industry-standard encryption to protect your personal information and payment details.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We never store your credit/debit card information on our servers.</li>
                <li>Your personal data is used only for order processing and shipping purposes.</li>
                <li>We do not sell or share your information with third-party marketing agencies.</li>
              </ul>
            </div>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="flex items-center mb-6">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Quality Guarantee</h2>
            </div>
            <div className="prose text-gray-600">
              <p>
                Every saree at Sri Lakshira goes through a rigorous quality check before being shipped. We guarantee the authenticity of our fabrics and the craftsmanship of our weavers.
              </p>
            </div>
          </div>

          {/* Disclaimer - FULLY UPDATED */}
          <div className="bg-white rounded-2xl shadow-sm p-8 border-l-4 border-yellow-400">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
            </div>
            <div className="prose text-gray-600 space-y-4">
              <p className="leading-relaxed">
                Great care and effort has been taken to present the Sarees and other garments in our website to match their Original color and grandeur. Since our pictures are of Very High Quality it may take some time to download. Please be patient and allow the pictures to get completely downloaded before you can view or order it.
              </p>
              <p className="leading-relaxed">
                We always try to minimize color variations between the actual product and that displayed on the screen. However, the colors of the Sarees and other garments shown on the web catalogue may vary slightly from the original product due to various reasons like:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Variations in monitor resolution levels</li>
                <li>Having a poor VGA card (Display Card)</li>
                <li>Having the minimum color setting in your Monitor Display Properties</li>
                <li>Setting the Brightness and Contrast levels of your monitor to low or high values</li>
              </ul>

              <div className="bg-gray-50 p-4 rounded-lg mt-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                  <Monitor className="h-5 w-5 mr-2 text-gray-600" />
                  Recommended Color Settings
                </h3>
                <p className="mb-2 text-sm text-gray-700">
                  The following settings will help you view the Sarees and garments presented in our website closest to their original colors:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                  <li>Set the Screen Resolution to <strong>1366*768 pixels minimum</strong></li>
                  <li>Make your Monitor support <strong>more than 256 colors</strong>, by changing the Display settings</li>
                  <li>Set your Monitor Brightness value to <strong>75% of Maximum value</strong></li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Policies;
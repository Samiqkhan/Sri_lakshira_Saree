import React from 'react';
import { Shield, Truck, Package, Globe, Video, AlertTriangle, Mail, Phone, MessageCircle } from 'lucide-react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-stone-100 to-neutral-200 py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="h-16 w-16 text-orange-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Policies</h1>
          <p className="text-lg md:text-xl text-gray-600">
            Shipping, Returns, Refunds, and everything you need to know.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 prose lg:prose-lg">
        {/* Shipping Policy */}
        <div className="p-6 bg-white rounded-lg shadow-sm mb-8">
            <h2 className="flex items-center"><Truck className="h-6 w-6 mr-3 text-orange-600" />Shipping Policy</h2>
            <p>At Sri Lakshira, we are committed to ensuring a smooth and timely delivery experience for all our customers across India.</p>
            
            <h3>Domestic Shipping</h3>
            <ul>
                <li>Shipping charges will be calculated during checkout depending on the destination and weight of the package.</li>
                <li>Our logistic Courier Partners are Professional, DTDC, Delivery and ST.</li>
                <li>Orders are delivered within <strong>7 to 10 working days</strong> or earlier from the date of the order.</li>
                <li>We ship throughout the week except during Sundays and Public Holidays.</li>
            </ul>

            <h3>International Shipping</h3>
            <ul>
                <li>Shipping charges will be calculated during checkout depending on the destination and weight of the package.</li>
                <li>Our logistic Partner is DHL & FedEx.</li>
                <li>Orders are delivered within <strong>14 to 20 working days</strong> or earlier from the date of the order.</li>
                <li>We ship throughout the week except during Sundays and Public Holidays.</li>
                <li>Any additional Taxes/Import Duties/Customs charges levied by the country of import will be borne by the customer. The customer is liable to reimburse the carrier for any such charges paid by carrier on behalf of the customer.</li>
                <li>Shipping charges will be automatically added to your order at checkout. Please note that once an order is placed, cancellation requests cannot be accepted.</li>
            </ul>
        </div>

        {/* Unboxing Recommendation */}
        <div className="p-6 bg-white rounded-lg shadow-sm mb-8">
            <h2 className="flex items-center"><Video className="h-6 w-6 mr-3 text-orange-600" />Unboxing Recommendation</h2>
            <p>To ensure a smooth support experience, we recommend recording an <strong>unboxing video</strong> while opening your package. This helps in case of any concerns regarding your order. We appreciate your support and patience.</p>
        </div>

        {/* Disclaimer */}
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm mb-8">
            <h2 className="flex items-center"><AlertTriangle className="h-6 w-6 mr-3 text-yellow-600" />Disclaimer</h2>
            <ol>
                <li>Our products are packed in a secure tamper-proof packaging. If you find the package is tampered, <strong>please do not accept delivery</strong> and return it back to the delivery person. Please email us at <a href="mailto:srilakshira@gmail.com">srilakshira@gmail.com</a> mentioning your Order ID and we’ll do the needful. If the delivery has been accepted, it will be assumed that the package was received in a secure manner.</li>
                <li>We are not liable for any delays in delivery by the courier company. But will definitely support our customer to track down a package through our logistic partner.</li>
            </ol>
        </div>

        {/* Refund & Exchange Policy */}
        <div className="p-6 bg-white rounded-lg shadow-sm mb-8">
            <h2 className="flex items-center"><Package className="h-6 w-6 mr-3 text-orange-600" />Refund & Exchange Policy</h2>
            
            <h3>Order Cancellation</h3>
            <ul>
                <li>Customer can request order cancellation within <strong>12 Hours</strong> of placing the order by contacting our customer care via WhatsApp at <a href="https://wa.me/919876543210">+91 98765 43210</a> or Email at <a href="mailto:srilakshira@gmail.com">srilakshira@gmail.com</a>.</li>
                <li>Orders cannot be canceled if they have already been dispatched.</li>
                <li><strong>Sri Lakshira</strong> has full rights to cancel & refund the money of any orders without customer approval due to incorrect information in the order, or such issues beyond our control, like courier delay, manufacturing delay etc.</li>
                <li>In case the ordered product is out of stock, a refund will be processed within <strong>7 days</strong> via UPI ID or Bank Account.</li>
            </ul>

            <h3>Return & Exchange Policy</h3>
            <ul>
                <li>Exchanges are applicable <strong>only for defective or damaged products</strong>. If your order arrives damaged, please contact us via WhatsApp at <a href="https://wa.me/919876543210">+91 98765 43210</a> within <strong>48 hours</strong> of delivery.</li>
                <li>If you believe you have received the wrong or a damaged saree, kindly send an email to <a href="mailto:srilakshira@gmail.com">srilakshira@gmail.com</a> with a <strong>parcel opening video without any cut or edit</strong>.</li>
                <li>Exchange can be done with other products. We will bear the courier cost in case of returning a damaged/wrong saree.</li>
                <li>Record an unboxing video while returning the package to ensure a smooth process.</li>
                <li>Once the products are sold, they can be exchanged/returned against <strong>store credit only</strong>. (Store Credit is the amount of refund given back to the customer in the form of a coupon code with lifetime validity).</li>
            </ul>

            <h3>Refund Policy</h3>
            <p>We process refunds only after the returned product reaches our warehouse and passes the quality check.</p>
            <ul>
                <li><strong>Prepaid Orders:</strong> Refunds will be credited to your original payment method within <strong>3-4 business days</strong> after the product passes our quality check.</li>
            </ul>
        </div>

        {/* Disclaimers */}
         <div className="p-6 bg-white rounded-lg shadow-sm mb-8">
            <h2 className="flex items-center"><AlertTriangle className="h-6 w-6 mr-3 text-orange-600" />Disclaimers</h2>
            <h3>Color & Description Disclaimer</h3>
            <p>We strive to display colors as accurately as possible, but slight variations may occur due to lighting, photography conditions, and screen settings. Product details such as weight, work details, and size may vary slightly. Customers should consider these minor differences when making a purchase.</p>
            
            <h3>For Silk Sarees</h3>
            <ul>
                <li>Please note that as a policy we do not entertain money refunds or exchange under any circumstance.</li>
                <li>In exceptional situations when a product exchange is required, it can only be processed through store credit. Please note that we offer exchange facilities under exceptional circumstances only once per order. We regretfully cannot accept repetitive exchange requests.</li>
                <li>Once the order is booked the same cannot be cancelled.</li>
                <li>In the case of International shipments, if the customer intends to exchange/return the product under exceptional circumstance, the shipping, customs or any other additional charges on the returning product will have to be borne by the customer. Store credit will be given only for the value of the product.</li>
                <li>Special/Customised orders are made specifically on customer requests and therefore cannot be cancelled or exchanged once the order is placed.</li>
            </ul>
        </div>
        
        <div className="text-center text-gray-700">
            <p>Thank you for shopping with <strong>Sri Lakshira</strong>! We appreciate your trust and support.</p>
        </div>
      </div>
    </div>
  );
};

export default Policies;

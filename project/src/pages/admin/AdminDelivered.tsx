import React, { useState } from 'react';
import { Download, Search, CheckCircle } from 'lucide-react';

// This interface is specific to delivered orders for clarity
interface DeliveredOrder {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  product: string;
  total: number;
  status: 'delivered';
  paymentStatus: 'paid';
  createdAt: string;
}

const AdminDeliveredOrders: React.FC = () => {
  // In a real app, you would fetch this data. Here, it's mocked.
  const [orders] = useState<DeliveredOrder[]>([
    {
      id: 'ORD003',
      customer: { name: 'Meera Patel', email: 'meera.patel@email.com' },
      product: 'Banarasi Silk Saree',
      total: 5899,
      status: 'delivered',
      paymentStatus: 'paid',
      createdAt: '2024-07-13'
    },
    {
      id: 'ORD005',
      customer: { name: 'Sunita Singh', email: 'sunita.singh@email.com' },
      product: 'Kanjeevaram Saree',
      total: 8850,
      status: 'delivered',
      paymentStatus: 'paid',
      createdAt: '2024-07-11'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return order.id.toLowerCase().includes(lowerCaseSearch) ||
           order.customer.name.toLowerCase().includes(lowerCaseSearch) ||
           order.customer.email.toLowerCase().includes(lowerCaseSearch);
  });

  return (
    <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-lg shadow">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">Delivered Orders</h1>
            <p className="text-gray-600 mt-2">A record of all completed and delivered orders.</p>
          </div>
          <button className="mt-4 sm:mt-0 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-300 flex items-center space-x-2 shadow-lg">
            <Download className="h-4 w-4" />
            <span>Export Delivered Orders</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search delivered orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-green-50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{order.id}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-bold text-gray-900">{order.customer.name}</div>
                        <div className="text-sm text-gray-500">{order.customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{order.product}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-lg font-bold text-green-600">₹{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full capitalize border bg-green-100 text-green-800 border-green-200">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{order.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default AdminDeliveredOrders;

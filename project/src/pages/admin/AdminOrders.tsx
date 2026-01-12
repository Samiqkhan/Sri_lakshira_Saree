import React, { useState } from 'react';
import { Eye, Download, Search, Package, CheckCircle, Clock, Truck, ShoppingCart, Archive } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Define the structure of an order
interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  product: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid';
  createdAt: string;
}

// Main component for the admin orders page
const AdminOrders: React.FC = () => {
  // State for managing all orders
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD001', customer: { name: 'Priya Sharma', email: 'priya.sharma@email.com' }, product: 'Royal Silk Saree', total: 3539, status: 'processing', paymentStatus: 'paid', createdAt: '2024-07-15' },
    { id: 'ORD002', customer: { name: 'Anita Gupta', email: 'anita.gupta@email.com' }, product: 'Designer Cotton Saree', total: 4478, status: 'shipped', paymentStatus: 'paid', createdAt: '2024-07-14' },
    { id: 'ORD003', customer: { name: 'Meera Patel', email: 'meera.patel@email.com' }, product: 'Banarasi Silk Saree', total: 5899, status: 'delivered', paymentStatus: 'paid', createdAt: '2024-07-13' },
    { id: 'ORD004', customer: { name: 'Kavya Reddy', email: 'kavya.reddy@email.com' }, product: 'Bridal Designer Saree', total: 10619, status: 'pending', paymentStatus: 'paid', createdAt: '2024-07-12' },
    { id: 'ORD005', customer: { name: 'Sunita Singh', email: 'sunita.singh@email.com' }, product: 'Kanjeevaram Saree', total: 8850, status: 'delivered', paymentStatus: 'paid', createdAt: '2024-07-11' },
    { id: 'ORD006', customer: { name: 'Rohan Verma', email: 'rohan.verma@email.com' }, product: 'Cotton Kurta', total: 1500, status: 'cancelled', paymentStatus: 'paid', createdAt: '2024-07-10' },
  ]);

  // State for search term, status filter, and the active view (current vs. delivered)
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeView, setActiveView] = useState<'current' | 'delivered'>('current');

  // Filter orders based on the active view (current or delivered)
  const viewFilteredOrders = orders.filter(order => {
    if (activeView === 'delivered') {
      return order.status === 'delivered';
    }
    // 'current' view shows all orders that are not delivered
    return order.status !== 'delivered';
  });

  // Further filter the orders based on search term and status dropdown
  const filteredOrders = viewFilteredOrders.filter(order => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(lowerCaseSearch) ||
                          order.customer.name.toLowerCase().includes(lowerCaseSearch) ||
                          order.customer.email.toLowerCase().includes(lowerCaseSearch);
    
    // Status filter is only applied in the 'current' view
    const matchesStatus = activeView === 'delivered' || statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Handle changing the status of an order
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Order ${orderId} status updated to ${newStatus}`);
  };

  // Get a color scheme for the status badge
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Orders Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders efficiently.</p>
        </div>
        <button className="mt-4 sm:mt-0 bg-gradient-to-r from-orange-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-orange-700 hover:to-pink-700 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl">
          <Download className="h-4 w-4" />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'pending').length}</p>
            </div>
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">In Process</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'processing').length}</p>
            </div>
            <Package className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Shipped Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'shipped').length}</p>
            </div>
            <Truck className="h-12 w-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600 mt-2">₹{orders.filter(o=>o.status === 'delivered').reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* View Tabs and Filters Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Tabs to switch between Current and Delivered orders */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveView('current')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeView === 'current' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Current Orders</span>
          </button>
          <button
            onClick={() => setActiveView('delivered')}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 ${activeView === 'delivered' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-orange-500'}`}
          >
            <Archive className="h-5 w-5" />
            <span>Delivered Orders</span>
          </button>
        </div>
        
        {/* Search and Filter controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder={`Search in ${activeView} orders...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          {/* Status filter is only shown for the 'current' orders view */}
          {activeView === 'current' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>

      {/* Orders Table Section */}
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
              {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">{order.id}</span>
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
                    {activeView === 'current' ? (
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                        className={`w-full text-xs font-bold rounded-full capitalize border-2 p-2 appearance-none text-center focus:outline-none focus:ring-2 focus:ring-orange-500 ${getStatusColor(order.status)}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`text-xs font-bold rounded-full capitalize px-3 py-2 ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600">{order.createdAt}</td>
                </tr>
              )) : (
                <tr>
                    <td colSpan={6} className="text-center py-12">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                            <Archive className="w-16 h-16 mb-4 text-gray-300" />
                            <h3 className="text-xl font-semibold">No Orders Found</h3>
                            <p className="mt-1">There are no orders matching your current filters.</p>
                        </div>
                    </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;

import React, { useState, useEffect } from 'react';
import { Eye, Download, Search, Package, CheckCircle, Clock, Truck, ShoppingCart, Archive, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { orderService } from '../../services/api';

// Defined based on your Supabase Table
interface Order {
  id: string;
  fullId: string;
  customer: {
    name: string;
    email: string;
  };
  product: string; // Derived from items
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'paid';
  createdAt: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeView, setActiveView] = useState<'current' | 'delivered'>('current');

  // Fetch Orders from Supabase
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await orderService.getAll();
      
      // Transform Supabase Data to Component Interface
      const formattedOrders: Order[] = data.map((order: any) => {
        // Create a summary string for products (e.g., "Saree X, Saree Y")
        const productNames = order.items.map((item: any) => item.name);
        const productSummary = productNames.length > 1 
          ? `${productNames[0]} + ${productNames.length - 1} more` 
          : productNames[0];

        return {
          id: order.id.slice(0, 8).toUpperCase(), // Shorten UUID for display
          fullId: order.id, // Keep full ID for updates
          customer: { name: order.customer_name, email: order.email },
          product: productSummary || 'Unknown Product',
          total: order.total_amount,
          status: order.status,
          paymentStatus: order.payment_status,
          createdAt: new Date(order.created_at).toLocaleDateString()
        };
      });

      setOrders(formattedOrders);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (fullId: string, newStatus: string) => {
    try {
      // Optimistic Update
      setOrders(prev => prev.map(o => o.fullId === fullId ? { ...o, status: newStatus as any } : o));
      
      // API Call
      await orderService.updateStatus(fullId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
      fetchOrders(); // Revert on error
    }
  };

  // Filter Logic (Same as before)
  const viewFilteredOrders = orders.filter(order => {
    if (activeView === 'delivered') return order.status === 'delivered';
    return order.status !== 'delivered';
  });

  const filteredOrders = viewFilteredOrders.filter(order => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(lowerCaseSearch) ||
                          order.customer.name.toLowerCase().includes(lowerCaseSearch) ||
                          order.customer.email.toLowerCase().includes(lowerCaseSearch);
    const matchesStatus = activeView === 'delivered' || statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-orange-600 h-10 w-10" /></div>;
  }

  return (
    <div className="space-y-6 p-4 md:p-8 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">Orders Management</h1>
          <p className="text-gray-600 mt-2">Track and manage customer orders.</p>
        </div>
        <button onClick={fetchOrders} className="mt-4 sm:mt-0 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-gray-700 text-sm">Refresh List</button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-600 font-medium">Pending Orders</p><p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'pending').length}</p></div>
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-600 font-medium">In Process</p><p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'processing').length}</p></div>
            <Package className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-600 font-medium">Shipped Orders</p><p className="text-3xl font-bold text-gray-900 mt-2">{orders.filter(o => o.status === 'shipped').length}</p></div>
            <Truck className="h-12 w-12 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-600 font-medium">Total Revenue</p><p className="text-3xl font-bold text-green-600 mt-2">₹{orders.filter(o=>o.status === 'delivered').reduce((sum, order) => sum + order.total, 0).toLocaleString()}</p></div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex border-b border-gray-200 mb-6">
          <button onClick={() => setActiveView('current')} className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold ${activeView === 'current' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500'}`}>
            <ShoppingCart className="h-5 w-5" /><span>Current Orders</span>
          </button>
          <button onClick={() => setActiveView('delivered')} className={`flex items-center space-x-2 px-4 py-3 text-sm font-semibold ${activeView === 'delivered' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500'}`}>
            <Archive className="h-5 w-5" /><span>Delivered Orders</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input type="text" placeholder={`Search...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-full border border-gray-300 rounded-lg px-3 py-3" />
          </div>
          {activeView === 'current' && (
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-3">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Order ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Product</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Total</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? filteredOrders.map((order: any) => (
                <tr key={order.fullId} className="hover:bg-orange-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">{order.id}</span></td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <div><div className="text-sm font-bold text-gray-900">{order.customer.name}</div><div className="text-sm text-gray-500">{order.customer.email}</div></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-gray-900 truncate block max-w-xs" title={order.product}>{order.product}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-lg font-bold text-green-600">₹{order.total.toLocaleString()}</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {activeView === 'current' ? (
                      <select value={order.status} onChange={(e) => handleStatusChange(order.fullId, e.target.value)} className={`w-full text-xs font-bold rounded-full capitalize border-2 p-2 text-center focus:outline-none focus:ring-2 ${getStatusColor(order.status)}`}>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span className={`text-xs font-bold rounded-full capitalize px-3 py-2 ${getStatusColor(order.status)}`}>{order.status}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{order.createdAt}</td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">No Orders Found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
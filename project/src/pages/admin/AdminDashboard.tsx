import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, Plus, Eye, BarChart3 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      name: 'Total Products',
      value: '247',
      change: '+12%',
      changeType: 'positive',
      icon: Package,
    },
    {
      name: 'Total Orders',
      value: '1,234',
      change: '+18%',
      changeType: 'positive',
      icon: ShoppingCart,
    },
    {
      name: 'Total Customers',
      value: '892',
      change: '+8%',
      changeType: 'positive',
      icon: Users,
    },
    {
      name: 'Revenue',
      value: '₹2,34,567',
      change: '+25%',
      changeType: 'positive',
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    {
      id: 'ORD001',
      customer: 'Priya Sharma',
      product: 'Royal Silk Saree',
      amount: '₹2,999',
      status: 'Processing',
      date: '2024-01-15',
    },
    {
      id: 'ORD002',
      customer: 'Anita Gupta',
      product: 'Designer Cotton Saree',
      amount: '₹1,899',
      status: 'Shipped',
      date: '2024-01-14',
    },
    {
      id: 'ORD003',
      customer: 'Meera Patel',
      product: 'Banarasi Silk Saree',
      amount: '₹4,999',
      status: 'Delivered',
      date: '2024-01-13',
    },
    {
      id: 'ORD004',
      customer: 'Kavya Reddy',
      product: 'Bridal Designer Saree',
      amount: '₹8,999',
      status: 'Processing',
      date: '2024-01-12',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex space-x-3">
            <Link
              to="/admin/products"
              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Product</span>
            </Link>
            <Link
              to="/admin/orders"
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <Eye className="h-4 w-4" />
              <span>View Orders</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.value}
                      </div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
              <BarChart3 className="h-5 w-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Sales chart would be displayed here</p>
              </div>
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h2>
            <div className="space-y-4">
              {[
                { name: 'Silk Sarees', sales: 145, percentage: 35 },
                { name: 'Cotton Sarees', sales: 98, percentage: 25 },
                { name: 'Designer Sarees', sales: 76, percentage: 20 },
                { name: 'Bridal Sarees', sales: 52, percentage: 15 },
              ].map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.sales} sales</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{category.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              <Link
                to="/admin/orders"
                className="text-orange-600 hover:text-orange-700 text-sm font-medium"
              >
                View all orders
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
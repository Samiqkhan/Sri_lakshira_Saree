import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import AdminProducts from './AdminProducts';
import AdminOrders from './AdminOrders';

const AdminPanel: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="products" replace />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        {/* Add other admin routes here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminPanel;

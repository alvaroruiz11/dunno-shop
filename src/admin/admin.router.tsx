import { Navigate, type RouteObject } from 'react-router';
import { lazy } from 'react';
import { AdminRoute } from '@/components/routes/ProtectedRoutes';

// lazies
const AdminLayout = lazy(() => import('./layout/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const AdminProductsPage = lazy(
  () => import('./pages/products/AdminProductsPage')
);
const AdminProductPage = lazy(() => import('./pages/product/AdminProductPage'));
const AdminSellersPage = lazy(() => import('./pages/sellers/AdminSellersPage'));
const AdminSellerPage = lazy(() => import('./pages/seller/AdminSellerPage'));

export const adminRouter: RouteObject = {
  path: '/admin',
  element: (
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/admin/dashboard" />,
    },
    {
      path: 'dashboard',
      element: <DashboardPage />,
    },
    {
      path: 'productos',
      element: <AdminProductsPage />,
    },
    {
      path: 'productos/:id',
      element: <AdminProductPage />,
    },
    {
      path: 'vendedores',
      element: <AdminSellersPage />,
    },
    {
      path: 'vendedores/:id',
      element: <AdminSellerPage />,
    },
  ],
};

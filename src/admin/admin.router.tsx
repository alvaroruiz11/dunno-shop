import { Navigate, type RouteObject } from 'react-router';
import { lazy } from 'react';
import { AdminRoute } from '@/components/routes/ProtectedRoutes';

// lazies
const AdminLayout = lazy(() => import('./layout/AdminLayout'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const AdminProductsPage = lazy(
  () => import('./pages/products/AdminProductsPage')
);
const AdminCategoriesPage = lazy(
  () => import('./pages/categories/AdminCategoriesPage')
);
const AdminProductPage = lazy(() => import('./pages/product/AdminProductPage'));
const AdminSellersPage = lazy(() => import('./pages/sellers/AdminSellersPage'));
const AdminSellerPage = lazy(() => import('./pages/seller/AdminSellerPage'));

const AdminCustomersPage = lazy(
  () => import('./pages/customers/AdminCustomersPage')
);
const AdminCustomerPage = lazy(
  () => import('./pages/customer/AdminCustomerPage')
);

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
    // Admin
    {
      path: 'categorias',
      element: <AdminCategoriesPage />,
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
    {
      path: 'clientes',
      element: <AdminCustomersPage />,
    },
    {
      path: 'clientes/:id',
      element: <AdminCustomerPage />,
    },
  ],
};

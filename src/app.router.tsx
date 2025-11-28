import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
// Pages
import { HomePage } from './shop/pages/home/HomePage';
import { GenderPage } from './shop/pages/gender/GenderPage';
import { CategoryPage } from './shop/pages/category/CategoryPage';
import { CartPage } from './shop/pages/cart/CartPage';
import { ShopLayout } from './shop/layouts/ShopLayout';
import { ProductPage } from './shop/pages/product/ProductPage';
import { authRouter } from './auth/auth.router';
import { ProfileRoute } from './components/routes/ProtectedRoutes';
import { adminRouter } from './admin/admin.router';

import { OrdersPage } from './shop/pages/orders/OrdersPage';
import { AddressHomePage } from './shop/pages/account/ui/AddressHomePage';
import { ProfilePage } from './shop/pages/profile/ProfilePage';
import AddressesPage from './shop/pages/addresses/AddressesPage';
import { AddressPage } from './shop/pages/address/AddressPage';

// lazy
const CheckoutLayout = lazy(() => import('./shop/layouts/CheckoutLayout'));
const CheckoutPage = lazy(() => import('./shop/pages/checkout/CheckoutPage'));
const TermsConditionsPage = lazy(
  () => import('./shop/pages/terms-conditions/TermsConditionsPage')
);
const PaymentPage = lazy(() => import('./shop/pages/payment/PaymentPage'));

const AccountPage = lazy(() => import('./shop/pages/account/AccountPage'));

export const appRouter = createBrowserRouter([
  // Shop
  {
    path: '/',
    element: <ShopLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'genero/:gender',
        element: <GenderPage />,
      },
      {
        path: 'categorias/:category',
        element: <CategoryPage />,
      },
      {
        path: 'producto/:slug',
        element: <ProductPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'orden/:id',
        element: <PaymentPage />,
      },
      {
        path: 'pago/:orderId',
        element: (
          <ProfileRoute>
            <PaymentPage />
          </ProfileRoute>
        ),
      },
      {
        path: 'terminos-y-condiciones',
        element: <TermsConditionsPage />,
      },
      {
        path: 'account',
        element: (
          <ProfileRoute>
            <AccountPage />
          </ProfileRoute>
        ),
        children: [
          { path: 'home', element: <AddressHomePage /> },
          { path: 'info', element: <ProfilePage /> },
          { path: 'addresses', element: <AddressesPage /> },
          { path: 'addresses/:id', element: <AddressPage /> },
          { path: 'orders', element: <OrdersPage /> },
        ],
      },
    ],
  },
  // Checkout
  {
    path: '/checkout',
    element: <CheckoutLayout />,
    children: [
      {
        index: true,
        element: <CheckoutPage />,
      },
    ],
  },

  // Auth
  authRouter,

  // Admin
  adminRouter,
]);

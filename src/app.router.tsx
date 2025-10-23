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

// lazy
const CheckoutLayout = lazy(() => import('./shop/layouts/CheckoutLayout'));
const CheckoutPage = lazy(() => import('./shop/pages/checkout/CheckoutPage'));
const TermsConditionsPage = lazy(
  () => import('./shop/pages/terms-conditions/TermsConditionsPage')
);

const ProfilePage = lazy(() => import('./shop/pages/profile/ProfilePage'));

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
        path: 'terminos-y-condiciones',
        element: <TermsConditionsPage />,
      },
      {
        path: 'profile',
        element: (
          <ProfileRoute>
            <ProfilePage />
          </ProfileRoute>
        ),
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
]);

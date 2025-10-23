import { NotAuthenticatedRoute } from '@/components/routes/ProtectedRoutes';
import { lazy } from 'react';
import { Navigate, type RouteObject } from 'react-router';

const AuthLayout = lazy(() => import('./layout/AuthLayout'));
const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const RegisterPage = lazy(() => import('./pages/register/RegisterPage'));

export const authRouter: RouteObject = {
  path: '/auth',
  element: (
    <NotAuthenticatedRoute>
      <AuthLayout />
    </NotAuthenticatedRoute>
  ),
  children: [
    {
      index: true,
      element: <Navigate to="/auth/login" />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'registro',
      element: <RegisterPage />,
    },
  ],
};

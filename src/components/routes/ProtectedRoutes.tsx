import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import { useAuthStore } from '@/store/auth/auth.store';

export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);

  if (authStatus === 'checking') return null;

  if (authStatus === 'authenticated') return <Navigate to="/" />;

  // si esta en not-authenticated puede entrar a lo que es el /auth/*
  return children;
};

export const ProfileRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);

  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

  // si esta en not-authenticated puede entrar a lo que es el /auth/*
  return children;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const authStatus = useAuthStore((state) => state.authStatus);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  if (authStatus === 'checking') return null;

  if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

  if (!isAdmin()) return <Navigate to="/" />;

  return children;
};

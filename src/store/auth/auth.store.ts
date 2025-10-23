import { create } from 'zustand';

import { checkStatusAction } from '@/auth/actions/check-status.action';
import { loginAction } from '@/auth/actions/login.action';
import { registerAction, type FormLike } from '@/auth/actions/register.action';
import type {
  AuthResponse,
  User,
} from '@/auth/interfaces/auth-response.interface';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthState = {
  // Properties
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  // Getters
  isAdmin: () => boolean;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (form: FormLike) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;

  handleAuthSuccess: (data: AuthResponse) => boolean;
  handleAuthError: () => boolean;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: 'checking',

  // Getters
  isAdmin: () => {
    const roles = get().user?.roles ?? [];
    return roles.includes('admin');
  },

  // Actions
  login: async (email: string, password: string) => {
    try {
      const data = await loginAction(email, password);

      return get().handleAuthSuccess(data);
    } catch (error) {
      console.log(error);
      return get().handleAuthError();
    }
  },
  register: async (form: FormLike) => {
    try {
      const data = await registerAction(form);
      return get().handleAuthSuccess(data);
    } catch (error) {
      console.log(error);
      return get().handleAuthError();
    }
  },
  logout: () => {
    set({
      user: null,
      token: null,
      authStatus: 'not-authenticated',
    });
    localStorage.removeItem('token');
  },
  checkAuthStatus: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      get().logout();
      return false;
    }

    try {
      const data = await checkStatusAction();
      return get().handleAuthSuccess(data);
    } catch (error) {
      console.log(error);
      return get().handleAuthError();
    }
  },

  handleAuthSuccess: (data: AuthResponse) => {
    set({
      user: data.user,
      token: data.token,
      authStatus: 'authenticated',
    });
    localStorage.setItem('token', data.token);
    return true;
  },
  handleAuthError: () => {
    get().logout();
    return false;
  },
}));

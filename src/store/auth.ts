import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserType } from '../types/user';
import * as authService from '../services/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  signIn: (email: string, password: string, name: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, type: UserType) => Promise<void>;
  signOut: () => void;
  clearError: () => void;
  isNutritionist: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
      loading: false,
      signIn: async (email: string, password: string, name: string) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.signIn(email, password);
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign in failed' });
        } finally {
          set({ loading: false });
        }
      },
      signUp: async (email: string, password: string, name: string, type: UserType) => {
        set({ loading: true, error: null });
        try {
          const { user, token } = await authService.signUp(email, password, name, type);
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Sign up failed' });
        } finally {
          set({ loading: false });
        }
      },
      signOut: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },
      clearError: () => set({ error: null }),
      isNutritionist: () => get().user?.type === 'Nutritionist'
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
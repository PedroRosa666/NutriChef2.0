import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';
import type { UserType } from '../types/user';
import { useTranslation } from '../hooks/useTranslation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export function AuthModal({ isOpen, onClose, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<UserType>('client');
  const [loading, setLoading] = useState(false);
  const t = useTranslation();

  const { signIn, signUp } = useAuthStore();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'signin') {
        await signIn(email, password, name);
      } else {
        await signUp(email, password, name, userType);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          {mode === 'signin' ? t.common.signIn : t.common.createaccount}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                  {t.profile.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
                  {t.profile.accountType}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setUserType('client')}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-colors dark:bg-white dark:text-black",
                      userType === 'client'
                        ? "border-green-500 bg-green-50 dark:bg-green-50 text-green-700 dark:text-green-700"
                        : "border-gray-200 hover:border-green-200"
                    )}
                  >
                    {t.profile.client}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserType('nutritionist')}
                    className={cn(
                      "px-4 py-2 rounded-lg border-2 transition-colors dark:bg-white dark:text-black",
                      userType === 'nutritionist'
                        ? "border-green-500 bg-green-50 dark:bg-green-50 text-green-700 dark:text-green-700"
                        : "border-gray-200 hover:border-green-200"
                    )}
                  >
                    {t.profile.nutricionist}
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              {t.profile.password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full py-2 rounded-lg text-white font-medium transition-colors",
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            )}
          >
            {loading ? t.common.loading : mode === 'signin' ? t.common.signIn : t.common.signUp}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          {mode === 'signin' ? t.common.dontHaveAccount : t.common.alreadyHaveAccount}
          <button
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            {mode === 'signin' ? t.common.signUp : t.common.signIn}
          </button>
        </p>
      </div>
    </div>
  );
}
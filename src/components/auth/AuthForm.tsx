import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { UserType } from '../../types/user'; // Certifique-se de importar o tipo correto

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<UserType>('Client'); // Use o tipo UserType aqui
  const { signIn, signUp, error, loading, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [mode, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with:', { mode, email, password, name, userType });
    try {
      if (mode === 'signin') {
        await signIn(name, email, password); // Added the `name` argument to match the expected parameters
      } else {
        await signUp(name, userType, email, password);
      }
      console.log('Authentication successful');
      onSuccess?.();
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
            placeholder="Enter your name"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          required
          minLength={6}
          placeholder="Enter your password"
        />
      </div>

      {mode === 'signup' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setUserType('Client')} // Use o valor literal do tipo UserType
              className={cn(
                'px-4 py-2 rounded-lg border-2 transition-colors',
                userType === 'Client'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-200'
              )}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setUserType('Nutritionist')} // Use o valor literal do tipo UserType
              className={cn(
                'px-4 py-2 rounded-lg border-2 transition-colors',
                userType === 'Nutritionist'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-200'
              )}
            >
              Nutritionist
            </button>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={cn(
          'w-full py-2 rounded-lg text-white font-medium transition-colors',
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700'
        )}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
          </div>
        ) : mode === 'signin' ? (
          'Sign In'
        ) : (
          'Sign Up'
        )}
      </button>
    </form>
  );
}
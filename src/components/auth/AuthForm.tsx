import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/auth';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { UserType } from '../../types/user';

interface AuthFormProps {
  mode: 'signin' | 'signup';
  onSuccess?: () => void;
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [userType, setUserType] = useState<UserType>('client');
  const [profile, setProfile] = useState({
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
    healthGoals: [] as string[],
    specializations: [] as string[],
    certifications: [] as string[],
    experience: ''
  });

  const { signIn, signUp, error, loading, clearError } = useAuthStore();

  useEffect(() => {
    clearError();
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === 'signin') {
        await signIn(email, password, name);
      } else {
        await signUp(email, password, name, userType);
      }
      onSuccess?.();
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleArrayInput = (field: keyof typeof profile, value: string) => {
    if (!value.trim() || !Array.isArray(profile[field])) return;
    setProfile(prev => ({
      ...prev,
      [field]: [...new Set([...(prev[field] as string[]), value.trim()])]
    }));
  };
  
  const removeArrayItem = (field: keyof typeof profile, item: string) => {
    if (Array.isArray(profile[field])) {
      setProfile(prev => ({
        ...prev,
        [field]: (prev[field] as string[]).filter(i => i !== item)
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text">
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
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
        <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
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
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">
              Account Type
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('client')}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 transition-colors",
                  userType === 'client'
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-200"
                )}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setUserType('nutritionist')}
                className={cn(
                  "px-4 py-2 rounded-lg border-2 transition-colors",
                  userType === 'nutritionist'
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 hover:border-green-200"
                )}
              >
                Nutritionist
              </button>
            </div>
          </div>

          {userType === 'client' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dietary Preferences
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {profile.dietaryPreferences.map((pref) => (
                    <span
                      key={pref}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
                    >
                      {pref}
                      <button
                        type="button"
                        onClick={() => removeArrayItem('dietaryPreferences', pref)}
                        className="hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add dietary preference"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleArrayInput('dietaryPreferences', e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </>
          ) : (
            <>
            </>
          )}
        </>
      )};

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
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <LoadingSpinner size="sm" />
            {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
          </div>
        ) : (
          mode === 'signin' ? 'Sign In' : 'Sign Up'
        )}
      </button>
    </form>
  );
}
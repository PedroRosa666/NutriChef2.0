import type { User, UserType } from '../types/user';

interface AuthResponse {
  user: User;
  token: string;
}

interface UserProfile {
  dietaryPreferences?: string[];
  allergies?: string[];
  healthGoals?: string[];
  specializations?: string[];
  certifications?: string[];
  experience?: string;
}

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function signIn(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In a real app, this would validate against a backend
  if (!email || !password || !name) {
    throw new AuthError('Email, password and name are required');
  }

  // Simulate different user types based on email domain
  const isNutritionist = email.includes('nutritionist');
  const userProfile: UserProfile = isNutritionist ? {
    specializations: ['Sports Nutrition', 'Weight Management'],
    certifications: ['Certified Nutritionist', 'Sports Nutrition Specialist'],
    experience: '5+ years'
  } : {
    dietaryPreferences: ['Vegetarian'],
    allergies: ['Nuts'],
    healthGoals: ['Weight Loss', 'Muscle Gain']
  };

  return {
    user: {
      id: crypto.randomUUID(),
      email,
      name,
      type: isNutritionist ? 'nutritionist' : 'client',
      profile: userProfile
    },
    token: 'mock-jwt-token'
  };
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  type: UserType,
  profile?: UserProfile
): Promise<AuthResponse> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Validation
  if (!email || !password || !name) {
    throw new AuthError('All fields are required');
  }
  
  if (!['client', 'nutritionist'].includes(type)) {
    throw new AuthError('Invalid account type');
  }

  return {
    user: {
      id: crypto.randomUUID(),
      email,
      name,
      type,
      profile: profile || {}
    },
    token: 'mock-jwt-token'
  };
}
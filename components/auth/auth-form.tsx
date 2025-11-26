'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, AuthFormData, ROLE_OPTIONS, RoleKey } from '@/types/auth';

interface AuthFormProps {
  initialMode?: 'login' | 'register';
  onSuccess?: (user: User) => void;
  onModeChange?: (mode: 'login' | 'register') => void;
}

export default function AuthForm({ 
  initialMode = 'login',
  onSuccess,
  onModeChange 
}: AuthFormProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [formData, setFormData] = useState<Omit<AuthFormData, 'role'>>({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [selectedRole, setSelectedRole] = useState<RoleKey | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (mode === 'register' && (!formData.name || !selectedRole)) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setIsLoading(true);
    
    try {
      // TODO: Replace with actual API call
      console.log('Submitting:', { ...formData, role: selectedRole });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock success response
      const mockUser: User = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        did: 'did:example:' + Math.random().toString(36).substr(2, 16),
        name: formData.name || 'User',
        email: formData.email,
        role: selectedRole,
        roleLabel: ROLE_OPTIONS.find(r => r.key === selectedRole)?.label || null,
        createdAt: new Date().toISOString(),
        showRolePublicly: true
      };
      
      onSuccess?.(mockUser);
      router.push('/dashboard');
      
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'login' ? 'register' : 'login';
    setMode(newMode);
    onModeChange?.(newMode);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-4 bg-[#F7EFE0] py-8 overflow-y-auto">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-serif font-bold text-[#3B3B3B] mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h1>
          <p className="text-[#7B5A3C]">
            {mode === 'login' 
              ? 'Sign in to continue to your dashboard' 
              : 'Join our community of learners and educators'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pb-4">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C58B2C] focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C58B2C] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C58B2C] focus:border-transparent"
                placeholder="••••••••"
              />
              {mode === 'register' && (
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            {mode === 'register' && (
              <div className="pt-2">
                <p className="block text-sm font-medium text-gray-700 mb-3">
                  I am a... <span className="text-red-500">*</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROLE_OPTIONS.map((role) => (
                    <button
                      key={role.key}
                      type="button"
                      onClick={() => setSelectedRole(role.key)}
                      className={`p-3 border rounded-xl text-left transition-all duration-200 ${
                        selectedRole === role.key
                          ? 'border-[#C58B2C] bg-[#FFF9EE] ring-2 ring-[#C58B2C]/20'
                          : 'border-gray-200 hover:border-[#C58B2C]/50 hover:bg-[#FFFDFA]'
                      }`}
                      aria-pressed={selectedRole === role.key}
                    >
                      <div className="flex items-start">
                        <span className="text-xl mr-2" aria-hidden="true">{role.icon}</span>
                        <div>
                          <div className="font-medium text-gray-900">{role.label}</div>
                          <div className="text-xs text-gray-500">{role.desc}</div>
                        </div>
                        {selectedRole === role.key && (
                          <span className="ml-auto text-[#C58B2C]" aria-hidden="true">
                            ✓
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 sticky bottom-0 bg-white pb-4 -mx-6 px-6 border-t border-gray-100">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-6 bg-[#C58B2C] text-white font-medium text-base rounded-xl hover:bg-[#B37D24] focus:outline-none focus:ring-2 focus:ring-[#C58B2C] focus:ring-offset-2 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : mode === 'login' ? (
                  'Sign In'
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => alert('Google SSO coming soon')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C58B2C]"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => alert('ORCID SSO coming soon')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#C58B2C]"
              >
                <span className="sr-only">Sign in with ORCID</span>
                <span className="text-[#A6CE39] font-bold">ORCID</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-[#C58B2C] hover:text-[#A67C2A] focus:outline-none focus:underline"
              >
                {mode === 'login' ? 'Create account' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

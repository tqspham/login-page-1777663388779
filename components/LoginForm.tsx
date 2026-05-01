'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type ValidationErrors = {
  username?: string;
  password?: string;
  form?: string;
};

export function LoginForm(): React.ReactElement {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username or email is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors({ form: 'Invalid username or password' });
        } else {
          setErrors({ form: 'Connection failed. Please try again.' });
        }
        setIsLoading(false);
        return;
      }

      setUsername('');
      setPassword('');
      router.push('/dashboard');
    } catch {
      setErrors({ form: 'Connection failed. Please try again.' });
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
          Username or Email
        </label>
        <input
          id="username"
          type="text"
          aria-label="Username or Email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              setErrors((prev) => ({ ...prev, username: undefined }));
            }
          }}
          disabled={isLoading}
          className={twMerge(
            'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors',
            errors.username
              ? 'border-red-500 focus:ring-red-500 bg-red-50'
              : 'border-slate-300 focus:ring-blue-500 bg-white'
          )}
          placeholder="Enter your username or email"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            aria-label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) {
                setErrors((prev) => ({ ...prev, password: undefined }));
              }
            }}
            disabled={isLoading}
            className={twMerge(
              'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors pr-10',
              errors.password
                ? 'border-red-500 focus:ring-red-500 bg-red-50'
                : 'border-slate-300 focus:ring-blue-500 bg-white'
            )}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      {errors.form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{errors.form}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        aria-label="Login"
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="flex flex-col gap-3 text-center text-sm">
        <a
          href="/forgot-password"
          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Forgot Password?
        </a>
        <p className="text-slate-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Create Account
          </a>
        </p>
      </div>
    </form>
  );
}

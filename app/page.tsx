'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { LoginForm } from '@/components/LoginForm';

export default function LoginPage(): React.ReactElement {
  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-lg shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Sign in to your account
        </p>
        <LoginForm />
      </div>
    </div>
  );
}

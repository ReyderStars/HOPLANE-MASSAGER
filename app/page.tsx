'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { BackgroundElements } from '@/components/common/BackgroundElements';
import { Logo } from '@/components/common/Logo';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useAuth } from '@/lib/auth-context';

export default function Home() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.push('/messenger');
    }
  }, [currentUser, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      <BackgroundElements />

      <div className="relative z-10 flex flex-col items-center justify-center gap-8 w-full">
        {/* Logo Section */}
        <div className="text-center animate-fade-in">
          <h1 className="mb-2">
            <Logo size="lg" />
          </h1>
          <p className="text-gray-600 text-lg font-light tracking-wider">
            HOPLANE Messenger
          </p>
        </div>

        {/* Auth Card */}
        <AuthCard />

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs mt-8">
          <p>© 2024 HOPLANE. Все права защищены.</p>
          <p className="mt-2">Приватность защищена Firebase Security</p>
        </div>
      </div>
    </main>
  );
}

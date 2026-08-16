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

      <div className="relative z-10 flex flex-col items-center justify-center gap-6 sm:gap-8 w-full max-w-2xl">
        {/* Logo Section */}
        <div className="text-center animate-fade-in flex-shrink-0">
          <div className="mb-2 flex justify-center">
            <Logo size="lg" />
          </div>
          <p className="text-gray-600 text-base sm:text-lg font-light tracking-wider">
            HOPLANE Messenger
          </p>
        </div>

        {/* Auth Card - Responsive */}
        <div className="w-full flex justify-center px-0 sm:px-4">
          <div className="w-full max-w-md">
            <AuthCard />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs mt-6 sm:mt-8 flex-shrink-0">
          <p>© 2024 HOPLANE. Все права защищены.</p>
          <p className="mt-2">Приватность защищена Firebase Security</p>
        </div>
      </div>
    </main>
  );
}

'use client';

export const Logo = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-5xl',
    lg: 'text-7xl',
  };

  return (
    <div className={`${sizeClasses[size]} font-black text-dark`}>
      <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
        HOPLANE
      </span>
    </div>
  );
};

'use client';

export const BackgroundElements = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Gradient blur circles */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-32 left-10 w-72 h-72 bg-primary-100 rounded-full filter blur-3xl opacity-15"></div>
      
      {/* Decorative lines */}
      <div className="absolute top-1/4 left-10 w-1 h-32 bg-gradient-to-b from-primary-400 to-transparent opacity-30"></div>
      <div className="absolute bottom-1/3 right-5 w-1 h-24 bg-gradient-to-b from-primary-500 to-transparent opacity-25"></div>
      
      {/* Small dots */}
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary-500 rounded-full opacity-40"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-primary-400 rounded-full opacity-30"></div>
    </div>
  );
};

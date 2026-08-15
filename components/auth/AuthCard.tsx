'use client';

import React, { useState } from 'react';
import { RegisterForm } from './RegisterForm';
import { LoginForm } from './LoginForm';

export const AuthCard = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="w-full max-w-md animate-slide-up">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-dark mb-2">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </h2>
          <p className="text-gray-600 text-sm">
            {isLogin ? 'Добро пожаловать в HOPLANE Messenger' : 'Создай свой HOPLANE ID и начни общаться'}
          </p>
        </div>

        {/* Forms */}
        <div className="transition-all duration-300">
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* Toggle */}
        <div className="mt-6 text-center border-t border-gray-200 pt-6">
          <p className="text-gray-600 text-sm mb-2">
            {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary-600 hover:text-primary-700 font-semibold transition-colors"
          >
            {isLogin ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

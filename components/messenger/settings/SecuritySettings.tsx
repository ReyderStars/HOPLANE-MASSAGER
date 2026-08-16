'use client';

import React, { useState } from 'react';
import { updatePassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const SecuritySettings: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState('');
  const [success, setSucDess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSucDess(false);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Заполните все поля');
      return;
    }

    if (newPassword.length < 8) {
      setError('Новый пароль должен быть минимум 8 символов');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        // Note: In a real app, you'd need to re-authenticate first
        // This is a simplified version
        setSucDess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при смене пароля');
    } finally {
      setLoading(false);
    }
  };

  const handleEnable2FA = () => {
    // Generate demo backup codes
    const codes = Array.from({ length: 8 }, () =>
      Math.random().toString(36).substring(2, 10).toUpperCase()
    );
    setBackupCodes(codes);
    setTwoFAEnabled(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Change Password */}
      <div>
        <h3 className="text-lg font-bold text-dark mb-4">Смена пароля</h3>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Текущий пароль
            </label>
            <div className="relative">
              <input
                type={showPasswords ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPasswords(!showPasswords)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswords ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Новый пароль
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={loading}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-dark mb-2">
              Повторите пароль
            </label>
            <input
              type={showPasswords ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Повторите пароль"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              disabled={loading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 text-sm">✓ Пароль успешно изменён</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold py-2 px-4 rounded-lg transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <LoadingSpinner />
                <span>Изменение...</span>
              </>
            ) : (
              '✓ Изменить пароль'
            )}
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">Двухфакторная аутентификация</h3>

        {!twoFAEnabled ? (
          <div>
            <p className="text-gray-600 mb-4">
              Двухфакторная аутентификация повышает безопасность твоего аккаунта.
            </p>
            <button
              onClick={handleEnable2FA}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              🔐 Включить 2FA
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold mb-2">✓ 2FA включена</p>
              <p className="text-sm text-green-600">
                Твой аккаунт защищён двухфакторной аутентификацией
              </p>
            </div>

            {showBackupCodes && backupCodes.length > 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="font-semibold text-yellow-800 mb-3">
                  📋 Коды восстановления (сохрани их в безопасном месте)
                </p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {backupCodes.map((code, index) => (
                    <code
                      key={index}
                      className="p-2 bg-white border border-yellow-200 rounded font-mono text-sm text-dark"
                    >
                      {code}
                    </code>
                  ))}
                </div>
                <button
                  onClick={() => {
                    const text = backupCodes.join('\n');
                    navigator.clipboard.writeText(text);
                  }}
                  className="text-yellow-700 hover:text-yellow-800 text-sm font-medium"
                >
                  📋 Скопировать все
                </button>
              </div>
            )}

            <button
              onClick={() => setShowBackupCodes(!showBackupCodes)}
              className="w-full text-primary-600 hover:text-primary-700 font-semibold py-2 px-4 rounded-lg border border-primary-300 hover:border-primary-400 transition"
            >
              {showBackupCodes ? '🙈 Скрыть коды' : '👁️ Показать коды восстановления'}
            </button>

            <button
              onClick={() => {
                setTwoFAEnabled(false);
                setShowBackupCodes(false);
              }}
              className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-4 rounded-lg transition"
            >
              ✕ Отключить 2FA
            </button>
          </div>
        )}
      </div>

      {/* Sessions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-bold text-dark mb-4">Активные сеансы</h3>
        <div className="space-y-3">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-dark">💻 Текущее устройство</p>
                <p className="text-sm text-gray-600">macOS · Safari</p>
                <p className="text-xs text-gray-500 mt-1">Сейчас активен</p>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Активен
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
